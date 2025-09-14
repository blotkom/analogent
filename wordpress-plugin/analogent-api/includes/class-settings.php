<?php
namespace AnalogentAPI;

if ( ! defined( 'ABSPATH' ) ) { exit; }

class Settings {
    private $option_key = 'analogent_api_settings';

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'admin_menu' ] );
        add_action( 'admin_init', [ $this, 'register_settings' ] );
    }

    public function get( string $key, $default = '' ) {
        $opts = get_option( $this->option_key, $this->defaults() );
        return $opts[ $key ] ?? $default;
    }

    public function admin_menu() : void {
        add_menu_page(
            __( 'Analogent API', ANALOGENT_API_TEXTDOMAIN ),
            __( 'Analogent API', ANALOGENT_API_TEXTDOMAIN ),
            'manage_options',
            'analogent-api',
            [ $this, 'render_page' ],
            'dashicons-rest-api',
            58
        );
    }

    public function register_settings() : void {
        register_setting( 'analogent_api_group', $this->option_key, [ 'type' => 'array', 'sanitize_callback' => [ $this, 'sanitize_settings' ] ] );

        add_settings_section( 'analogent_api_main', __( 'General Settings', ANALOGENT_API_TEXTDOMAIN ), '__return_false', 'analogent-api' );

        $fields = [
            'notify_emails' => __( 'Notification Emails (comma separated)', ANALOGENT_API_TEXTDOMAIN ),
            'from_name' => __( 'Email From Name', ANALOGENT_API_TEXTDOMAIN ),
            'from_email' => __( 'Email From Address', ANALOGENT_API_TEXTDOMAIN ),
            'allowed_origins' => __( 'Allowed Origins (comma separated)', ANALOGENT_API_TEXTDOMAIN ),
            'enable_cors' => __( 'Enable CORS', ANALOGENT_API_TEXTDOMAIN ),
            'enable_logging' => __( 'Enable Logging', ANALOGENT_API_TEXTDOMAIN ),
            'notify_on_contact' => __( 'Notify on Contact', ANALOGENT_API_TEXTDOMAIN ),
            'notify_on_application' => __( 'Notify on Application', ANALOGENT_API_TEXTDOMAIN ),
        ];

        foreach ( $fields as $key => $label ) {
            add_settings_field( $key, $label, [ $this, 'render_field' ], 'analogent-api', 'analogent_api_main', [ 'key' => $key ] );
        }
    }

    public function sanitize_settings( $input ) : array {
        $d = $this->defaults();
        return [
            'notify_emails' => sanitize_text_field( $input['notify_emails'] ?? $d['notify_emails'] ),
            'from_name' => sanitize_text_field( $input['from_name'] ?? $d['from_name'] ),
            'from_email' => sanitize_email( $input['from_email'] ?? $d['from_email'] ),
            'allowed_origins' => sanitize_text_field( $input['allowed_origins'] ?? $d['allowed_origins'] ),
            'enable_cors' => ! empty( $input['enable_cors'] ) ? 1 : 0,
            'enable_logging' => ! empty( $input['enable_logging'] ) ? 1 : 0,
            'notify_on_contact' => ! empty( $input['notify_on_contact'] ) ? 1 : 0,
            'notify_on_application' => ! empty( $input['notify_on_application'] ) ? 1 : 0,
        ];
    }

    public function render_field( $args ) : void {
        $key = $args['key'];
        $val = $this->get( $key, $this->defaults()[ $key ] );
        if ( in_array( $key, [ 'enable_cors', 'enable_logging', 'notify_on_contact', 'notify_on_application' ], true ) ) {
            echo '<label><input type="checkbox" name="' . esc_attr( $this->option_key ) . '[' . esc_attr( $key ) . ']" value="1" ' . checked( $val, 1, false ) . ' /> ' . esc_html__( 'Enabled', ANALOGENT_API_TEXTDOMAIN ) . '</label>';
        } else {
            $type = $key === 'from_email' ? 'email' : 'text';
            echo '<input type="' . esc_attr( $type ) . '" class="regular-text" name="' . esc_attr( $this->option_key ) . '[' . esc_attr( $key ) . ']" value="' . esc_attr( $val ) . '" />';
        }
    }

    public function render_page() : void {
        echo '<div class="wrap">';
        echo '<h1>' . esc_html__( 'Analogent API Settings', ANALOGENT_API_TEXTDOMAIN ) . '</h1>';
        echo '<form method="post" action="options.php">';
        settings_fields( 'analogent_api_group' );
        do_settings_sections( 'analogent-api' );
        submit_button();
        echo '</form>';
        echo '</div>';
    }

    public function get_allowed_origins() : array {
        $origins = $this->get( 'allowed_origins', '' );
        $arr = array_filter( array_map( 'trim', explode( ',', $origins ) ) );
        return $arr;
    }

    private function defaults() : array {
        return [
            'notify_emails' => get_bloginfo( 'admin_email' ),
            'from_name' => get_bloginfo( 'name' ),
            'from_email' => get_bloginfo( 'admin_email' ),
            'allowed_origins' => 'http://localhost:3000, https://analogent.ai',
            'enable_cors' => 1,
            'enable_logging' => 0,
            'notify_on_contact' => 1,
            'notify_on_application' => 1,
        ];
    }
}
