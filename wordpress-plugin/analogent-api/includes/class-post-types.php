<?php
namespace AnalogentAPI;

if ( ! defined( 'ABSPATH' ) ) { exit; }

class Post_Types {
    public static function register_all() : void {
        self::register_job();
        self::register_application();
        self::register_contact();
    }

    private static function register_job() : void {
        $labels = [
            'name'               => __( 'Jobs', ANALOGENT_API_TEXTDOMAIN ),
            'singular_name'      => __( 'Job', ANALOGENT_API_TEXTDOMAIN ),
            'add_new'            => __( 'Add New', ANALOGENT_API_TEXTDOMAIN ),
            'add_new_item'       => __( 'Add New Job', ANALOGENT_API_TEXTDOMAIN ),
            'edit_item'          => __( 'Edit Job', ANALOGENT_API_TEXTDOMAIN ),
            'new_item'           => __( 'New Job', ANALOGENT_API_TEXTDOMAIN ),
            'view_item'          => __( 'View Job', ANALOGENT_API_TEXTDOMAIN ),
            'search_items'       => __( 'Search Jobs', ANALOGENT_API_TEXTDOMAIN ),
            'not_found'          => __( 'No jobs found', ANALOGENT_API_TEXTDOMAIN ),
            'not_found_in_trash' => __( 'No jobs found in Trash', ANALOGENT_API_TEXTDOMAIN ),
            'menu_name'          => __( 'Jobs', ANALOGENT_API_TEXTDOMAIN ),
        ];

        register_post_type( 'analogent_job', [
            'labels' => $labels,
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => true,
            'supports' => [ 'title', 'editor', 'excerpt', 'thumbnail' ],
            'show_in_rest' => true,
            'menu_icon' => 'dashicons-id',
            'capability_type' => 'post',
        ] );

        // Register meta fields (exposed to REST)
        $job_meta_keys = [
            'location' => 'text',
            'department' => 'text',
            'job_type' => 'text',
            'seniority' => 'text',
            'is_remote' => 'boolean',
            'external_apply_url' => 'text',
            'apply_email' => 'text',
        ];
        foreach ( $job_meta_keys as $key => $type ) {
            register_post_meta( 'analogent_job', 'analogent_job_' . $key, [
                'type' => $type,
                'single' => true,
                'show_in_rest' => true,
                'sanitize_callback' => $type === 'boolean' ? 'rest_sanitize_boolean' : 'sanitize_text_field',
                'auth_callback' => function() { return current_user_can( 'edit_posts' ); },
            ] );
        }

        // Meta box for Job info
        add_action( 'add_meta_boxes', function() {
            add_meta_box( 'analogent_job_meta', __( 'Job Details', ANALOGENT_API_TEXTDOMAIN ), [ __CLASS__, 'render_job_meta_box' ], 'analogent_job', 'normal', 'default' );
        } );
        add_action( 'save_post_analogent_job', [ __CLASS__, 'save_job_meta' ], 10, 2 );
    }

    public static function render_job_meta_box( $post ) : void {
        wp_nonce_field( 'analogent_job_meta', 'analogent_job_meta_nonce' );
        $fields = [
            'location' => __( 'Location', ANALOGENT_API_TEXTDOMAIN ),
            'department' => __( 'Department', ANALOGENT_API_TEXTDOMAIN ),
            'job_type' => __( 'Job Type', ANALOGENT_API_TEXTDOMAIN ),
            'seniority' => __( 'Seniority', ANALOGENT_API_TEXTDOMAIN ),
            'is_remote' => __( 'Remote', ANALOGENT_API_TEXTDOMAIN ),
            'external_apply_url' => __( 'External Apply URL', ANALOGENT_API_TEXTDOMAIN ),
            'apply_email' => __( 'Apply Email (override)', ANALOGENT_API_TEXTDOMAIN ),
        ];
        echo '<table class="form-table">';
        foreach ( $fields as $key => $label ) {
            $meta_key = 'analogent_job_' . $key;
            $val = get_post_meta( $post->ID, $meta_key, true );
            echo '<tr><th><label for="' . esc_attr( $meta_key ) . '">' . esc_html( $label ) . '</label></th><td>';
            if ( $key === 'is_remote' ) {
                echo '<label><input type="checkbox" name="' . esc_attr( $meta_key ) . '" value="1" ' . checked( $val, '1', false ) . ' /> ' . esc_html__( 'Yes', ANALOGENT_API_TEXTDOMAIN ) . '</label>';
            } else {
                echo '<input type="text" class="regular-text" name="' . esc_attr( $meta_key ) . '" id="' . esc_attr( $meta_key ) . '" value="' . esc_attr( $val ) . '" />';
            }
            echo '</td></tr>';
        }
        echo '</table>';
    }

    public static function save_job_meta( $post_id, $post ) : void {
        if ( ! isset( $_POST['analogent_job_meta_nonce'] ) || ! wp_verify_nonce( $_POST['analogent_job_meta_nonce'], 'analogent_job_meta' ) ) {
            return;
        }
        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) { return; }
        if ( ! current_user_can( 'edit_post', $post_id ) ) { return; }

        $keys = [ 'location','department','job_type','seniority','external_apply_url','apply_email' ];
        foreach ( $keys as $k ) {
            $val = isset( $_POST['analogent_job_' . $k] ) ? sanitize_text_field( wp_unslash( $_POST['analogent_job_' . $k] ) ) : '';
            update_post_meta( $post_id, 'analogent_job_' . $k, $val );
        }
        $is_remote = isset( $_POST['analogent_job_is_remote'] ) ? '1' : '';
        update_post_meta( $post_id, 'analogent_job_is_remote', $is_remote );
    }

    private static function register_application() : void {
        $labels = [
            'name'          => __( 'Applications', ANALOGENT_API_TEXTDOMAIN ),
            'singular_name' => __( 'Application', ANALOGENT_API_TEXTDOMAIN ),
            'menu_name'     => __( 'Applications', ANALOGENT_API_TEXTDOMAIN ),
        ];
        register_post_type( 'analogent_application', [
            'labels' => $labels,
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => 'edit.php?post_type=analogent_job',
            'supports' => [ 'title', 'editor' ],
            'show_in_rest' => false,
            'menu_icon' => 'dashicons-media-text',
            'capability_type' => 'post',
        ] );

        $app_meta = [ 'name','email','phone','linkedin','cover_letter','resume_id','resume_url','job_id','job_slug','source','status' ];
        foreach ( $app_meta as $k ) {
            register_post_meta( 'analogent_application', 'analogent_app_' . $k, [
                'type' => 'string',
                'single' => true,
                'show_in_rest' => false,
                'sanitize_callback' => 'sanitize_text_field',
                'auth_callback' => function() { return current_user_can( 'edit_posts' ); },
            ] );
        }

        add_action( 'add_meta_boxes', function() {
            add_meta_box( 'analogent_app_meta', __( 'Application Details', ANALOGENT_API_TEXTDOMAIN ), [ __CLASS__, 'render_application_meta_box' ], 'analogent_application', 'normal', 'default' );
        } );
    }

    public static function render_application_meta_box( $post ) : void {
        $fields = [ 'name'=>'Name','email'=>'Email','phone'=>'Phone','linkedin'=>'LinkedIn','job_slug'=>'Job Slug','job_id'=>'Job ID','resume_id'=>'Resume Attachment ID','resume_url'=>'Resume URL','status'=>'Status','source'=>'Source' ];
        echo '<table class="form-table">';
        foreach ( $fields as $key => $label ) {
            $meta_key = 'analogent_app_' . $key;
            $val = get_post_meta( $post->ID, $meta_key, true );
            echo '<tr><th>' . esc_html( $label ) . '</th><td><input type="text" readonly class="regular-text" value="' . esc_attr( $val ) . '" /></td></tr>';
        }
        $cover = get_post_meta( $post->ID, 'analogent_app_cover_letter', true );
        if ( $cover ) {
            echo '<tr><th>' . esc_html__( 'Cover Letter', ANALOGENT_API_TEXTDOMAIN ) . '</th><td><textarea readonly rows="6" class="large-text">' . esc_textarea( $cover ) . '</textarea></td></tr>';
        }
        echo '</table>';
    }

    private static function register_contact() : void {
        $labels = [
            'name'          => __( 'Contacts', ANALOGENT_API_TEXTDOMAIN ),
            'singular_name' => __( 'Contact', ANALOGENT_API_TEXTDOMAIN ),
            'menu_name'     => __( 'Contacts', ANALOGENT_API_TEXTDOMAIN ),
        ];
        register_post_type( 'analogent_contact', [
            'labels' => $labels,
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => 'edit.php?post_type=analogent_job',
            'supports' => [ 'title', 'editor' ],
            'show_in_rest' => false,
            'menu_icon' => 'dashicons-email-alt2',
            'capability_type' => 'post',
        ] );

        $contact_meta = [ 'name','email','company','phone','source' ];
        foreach ( $contact_meta as $k ) {
            register_post_meta( 'analogent_contact', 'analogent_contact_' . $k, [
                'type' => 'string',
                'single' => true,
                'show_in_rest' => false,
                'sanitize_callback' => 'sanitize_text_field',
                'auth_callback' => function() { return current_user_can( 'edit_posts' ); },
            ] );
        }

        add_action( 'add_meta_boxes', function() {
            add_meta_box( 'analogent_contact_meta', __( 'Contact Details', ANALOGENT_API_TEXTDOMAIN ), [ __CLASS__, 'render_contact_meta_box' ], 'analogent_contact', 'normal', 'default' );
        } );
    }

    public static function render_contact_meta_box( $post ) : void {
        $fields = [ 'name'=>'Name','email'=>'Email','company'=>'Company','phone'=>'Phone','source'=>'Source' ];
        echo '<table class="form-table">';
        foreach ( $fields as $key => $label ) {
            $meta_key = 'analogent_contact_' . $key;
            $val = get_post_meta( $post->ID, $meta_key, true );
            echo '<tr><th>' . esc_html( $label ) . '</th><td><input type="text" readonly class="regular-text" value="' . esc_attr( $val ) . '" /></td></tr>';
        }
        echo '</table>';
    }
}
