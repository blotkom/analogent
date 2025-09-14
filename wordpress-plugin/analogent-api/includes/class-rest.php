<?php
namespace AnalogentAPI;

use WP_Error;use WP_Query;use WP_REST_Request;use WP_REST_Response;

if ( ! defined( 'ABSPATH' ) ) { exit; }

class REST {
    private $settings; private $email; private $logger;
    private $ns = 'analogent/v1';

    public function __construct( Settings $settings, Email $email, Logger $logger ) {
        $this->settings = $settings; $this->email = $email; $this->logger = $logger;
        add_action( 'rest_api_init', [ $this, 'register_routes' ] );
    }

    public function register_routes() : void {
        register_rest_route( $this->ns, '/contact', [
            [ 'methods' => 'POST', 'permission_callback' => '__return_true', 'callback' => [ $this, 'handle_contact' ] ],
            [ 'methods' => 'OPTIONS', 'permission_callback' => '__return_true', 'callback' => [ $this, 'handle_options' ] ],
        ] );

        register_rest_route( $this->ns, '/jobs', [
            [ 'methods' => 'GET', 'permission_callback' => '__return_true', 'callback' => [ $this, 'get_jobs' ] ],
            [ 'methods' => 'OPTIONS', 'permission_callback' => '__return_true', 'callback' => [ $this, 'handle_options' ] ],
        ] );

        register_rest_route( $this->ns, '/jobs/(?P<slug>[^/]+)', [
            [ 'methods' => 'GET', 'permission_callback' => '__return_true', 'callback' => [ $this, 'get_job_by_slug' ] ],
            [ 'methods' => 'OPTIONS', 'permission_callback' => '__return_true', 'callback' => [ $this, 'handle_options' ] ],
        ] );

        register_rest_route( $this->ns, '/apply', [
            [ 'methods' => 'POST', 'permission_callback' => '__return_true', 'callback' => [ $this, 'handle_apply' ] ],
            [ 'methods' => 'OPTIONS', 'permission_callback' => '__return_true', 'callback' => [ $this, 'handle_options' ] ],
        ] );
    }

    public function handle_options( WP_REST_Request $request ) {
        return new WP_REST_Response( null, 200 );
    }

    public function handle_contact( WP_REST_Request $request ) {
        $params = $this->parse_request_params( $request );
        try {
            $name = $this->req( $params, 'name' );
            $email = $this->req( $params, 'email' );
            $message = $this->req( $params, 'message' );
        } catch ( \Exception $e ) {
            return new WP_Error( 'missing_field', $e->getMessage(), [ 'status' => 400 ] );
        }
        $phone = sanitize_text_field( $params['phone'] ?? '' );
        $company = sanitize_text_field( $params['company'] ?? '' );
        $source = sanitize_text_field( $params['source'] ?? 'home-contact' );

        if ( ! is_email( $email ) ) {
            return new WP_Error( 'invalid_email', __( 'Invalid email address', ANALOGENT_API_TEXTDOMAIN ), [ 'status' => 400 ] );
        }

        $post_id = wp_insert_post( [
            'post_type' => 'analogent_contact',
            'post_status' => 'publish',
            'post_title' => sprintf( 'Contact: %s (%s)', $name, current_time( 'mysql' ) ),
            'post_content' => $message,
        ], true );
        if ( is_wp_error( $post_id ) ) {
            $this->logger->error( 'Contact insert failed', [ 'error' => $post_id->get_error_message() ] );
            return new WP_Error( 'db_error', __( 'Could not save contact', ANALOGENT_API_TEXTDOMAIN ), [ 'status' => 500 ] );
        }
        update_post_meta( $post_id, 'analogent_contact_name', $name );
        update_post_meta( $post_id, 'analogent_contact_email', $email );
        update_post_meta( $post_id, 'analogent_contact_company', $company );
        update_post_meta( $post_id, 'analogent_contact_phone', $phone );
        update_post_meta( $post_id, 'analogent_contact_source', $source );

        $this->email->send_contact_notification( $post_id, [ 'name'=>$name,'email'=>$email,'company'=>$company,'phone'=>$phone,'message'=>$message,'source'=>$source ] );

        return new WP_REST_Response( [ 'success' => true, 'id' => $post_id ], 200 );
    }

    public function get_jobs( WP_REST_Request $request ) {
        $per_page = min( 100, max( 1, intval( $request->get_param( 'per_page' ) ?: 50 ) ) );
        $page = max( 1, intval( $request->get_param( 'page' ) ?: 1 ) );
        $search = sanitize_text_field( $request->get_param( 'search' ) ?: '' );
        $department = sanitize_text_field( $request->get_param( 'department' ) ?: '' );
        $location = sanitize_text_field( $request->get_param( 'location' ) ?: '' );
        $job_type = sanitize_text_field( $request->get_param( 'job_type' ) ?: '' );

        $meta_query = [ 'relation' => 'AND' ];
        if ( $department ) $meta_query[] = [ 'key' => 'analogent_job_department', 'value' => $department, 'compare' => 'LIKE' ];
        if ( $location ) $meta_query[] = [ 'key' => 'analogent_job_location', 'value' => $location, 'compare' => 'LIKE' ];
        if ( $job_type ) $meta_query[] = [ 'key' => 'analogent_job_job_type', 'value' => $job_type, 'compare' => 'LIKE' ];

        $q = new WP_Query( [
            'post_type' => 'analogent_job',
            'post_status' => 'publish',
            's' => $search ?: null,
            'meta_query' => count($meta_query) > 1 ? $meta_query : [],
            'posts_per_page' => $per_page,
            'paged' => $page,
        ] );

        $items = [];
        foreach ( $q->posts as $p ) {
            $items[] = $this->format_job( $p );
        }
        return new WP_REST_Response( [
            'total' => intval( $q->found_posts ),
            'page' => $page,
            'per_page' => $per_page,
            'items' => $items,
        ], 200 );
    }

    public function get_job_by_slug( WP_REST_Request $request ) {
        $slug = sanitize_title( $request['slug'] );
        $q = new WP_Query( [ 'post_type' => 'analogent_job', 'name' => $slug, 'post_status' => 'publish', 'posts_per_page' => 1 ] );
        if ( empty( $q->posts ) ) {
            return new WP_Error( 'not_found', __( 'Job not found', ANALOGENT_API_TEXTDOMAIN ), [ 'status' => 404 ] );
        }
        return new WP_REST_Response( $this->format_job( $q->posts[0], true ), 200 );
    }

    private function format_job( $post, $include_content = false ) : array {
        $data = [
            'id' => $post->ID,
            'slug' => $post->post_name,
            'title' => get_the_title( $post ),
            'excerpt' => wp_trim_words( $post->post_content, 40 ),
            'meta' => [
                'location' => get_post_meta( $post->ID, 'analogent_job_location', true ),
                'department' => get_post_meta( $post->ID, 'analogent_job_department', true ),
                'job_type' => get_post_meta( $post->ID, 'analogent_job_job_type', true ),
                'seniority' => get_post_meta( $post->ID, 'analogent_job_seniority', true ),
                'is_remote' => (bool) get_post_meta( $post->ID, 'analogent_job_is_remote', true ),
                'external_apply_url' => get_post_meta( $post->ID, 'analogent_job_external_apply_url', true ),
            ],
        ];
        if ( $include_content ) {
            $data['content'] = apply_filters( 'the_content', $post->post_content );
        }
        return $data;
    }

    public function handle_apply( WP_REST_Request $request ) {
        $params = $this->parse_request_params( $request );
        try {
            $name = $this->req( $params, 'name' );
            $email = $this->req( $params, 'email' );
        } catch ( \Exception $e ) {
            return new WP_Error( 'missing_field', $e->getMessage(), [ 'status' => 400 ] );
        }
        if ( ! is_email( $email ) ) {
            return new WP_Error( 'invalid_email', __( 'Invalid email address', ANALOGENT_API_TEXTDOMAIN ), [ 'status' => 400 ] );
        }
        $phone = sanitize_text_field( $params['phone'] ?? '' );
        $linkedin = sanitize_text_field( $params['linkedin'] ?? '' );
        $cover_letter = sanitize_textarea_field( $params['cover_letter'] ?? '' );
        $job_id = intval( $params['job_id'] ?? 0 );
        $job_slug = sanitize_title( $params['job_slug'] ?? '' );
        $general = filter_var( $params['general'] ?? false, FILTER_VALIDATE_BOOLEAN );
        $source = $general ? 'apply/general' : 'apply/job';

        if ( ! $general && ! $job_id && $job_slug ) {
            $job = get_page_by_path( $job_slug, OBJECT, 'analogent_job' );
            if ( $job ) { $job_id = $job->ID; }
        }

        $title_suffix = $general ? 'General' : ( $job_slug ?: ( $job_id ?: 'Unknown' ) );

        $post_id = wp_insert_post( [
            'post_type' => 'analogent_application',
            'post_status' => 'publish',
            'post_title' => sprintf( 'Application: %s (%s)', $name, $title_suffix ),
            'post_content' => $cover_letter,
        ], true );
        if ( is_wp_error( $post_id ) ) {
            $this->logger->error( 'Application insert failed', [ 'error' => $post_id->get_error_message() ] );
            return new WP_Error( 'db_error', __( 'Could not save application', ANALOGENT_API_TEXTDOMAIN ), [ 'status' => 500 ] );
        }

        // Handle resume file upload (multipart/form-data key: resume)
        $resume_id = 0; $resume_url = '';
        if ( ! empty( $_FILES['resume'] ) && ! empty( $_FILES['resume']['name'] ) ) {
            require_once ABSPATH . 'wp-admin/includes/file.php';
            require_once ABSPATH . 'wp-admin/includes/media.php';
            require_once ABSPATH . 'wp-admin/includes/image.php';
            $overrides = [ 'test_form' => false ];
            $file = wp_handle_upload( $_FILES['resume'], $overrides );
            if ( ! isset( $file['error'] ) ) {
                $attachment = [
                    'post_mime_type' => $file['type'],
                    'post_title'     => sanitize_file_name( $file['file'] ),
                    'post_content'   => '',
                    'post_status'    => 'inherit'
                ];
                $resume_id = wp_insert_attachment( $attachment, $file['file'], $post_id );
                if ( ! is_wp_error( $resume_id ) ) {
                    require_once ABSPATH . 'wp-admin/includes/image.php';
                    $meta = wp_generate_attachment_metadata( $resume_id, $file['file'] );
                    if ( $meta ) { wp_update_attachment_metadata( $resume_id, $meta ); }
                    $resume_url = wp_get_attachment_url( $resume_id );
                } else {
                    $this->logger->error( 'Resume attachment failed', [ 'error' => $resume_id->get_error_message() ] );
                    $resume_id = 0;
                }
            } else {
                $this->logger->error( 'Resume upload failed', [ 'error' => $file['error'] ] );
            }
        } else if ( ! empty( $params['resume_url'] ) ) {
            $resume_url = esc_url_raw( $params['resume_url'] );
        }

        update_post_meta( $post_id, 'analogent_app_name', $name );
        update_post_meta( $post_id, 'analogent_app_email', $email );
        update_post_meta( $post_id, 'analogent_app_phone', $phone );
        update_post_meta( $post_id, 'analogent_app_linkedin', $linkedin );
        update_post_meta( $post_id, 'analogent_app_cover_letter', $cover_letter );
        update_post_meta( $post_id, 'analogent_app_job_id', $job_id );
        update_post_meta( $post_id, 'analogent_app_job_slug', $job_slug );
        update_post_meta( $post_id, 'analogent_app_resume_id', $resume_id );
        update_post_meta( $post_id, 'analogent_app_resume_url', $resume_url );
        update_post_meta( $post_id, 'analogent_app_status', 'new' );
        update_post_meta( $post_id, 'analogent_app_source', $source );

        $this->email->send_application_notification( $post_id, [
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'linkedin' => $linkedin,
            'cover_letter' => $cover_letter,
            'job_id' => $job_id,
            'job_slug' => $job_slug,
            'resume_id' => $resume_id,
            'resume_url' => $resume_url,
            'general' => $general,
        ] );

        return new WP_REST_Response( [ 'success' => true, 'id' => $post_id ], 200 );
    }

    private function parse_request_params( WP_REST_Request $request ) : array {
        $params = $request->get_json_params();
        if ( empty( $params ) ) {
            $params = $request->get_body_params();
        }
        return is_array( $params ) ? $params : [];
    }

    private function req( array $arr, string $key ) : string {
        $v = trim( (string) ( $arr[ $key ] ?? '' ) );
        if ( $v === '' ) {
            throw new \Exception( sprintf( '%s is required', $key ) );
        }
        return sanitize_text_field( $v );
    }
}
