<?php
/*
Plugin Name: Analogent API
Description: Provides REST API endpoints and admin tools for Analogent frontend (contact, jobs, applications).
Version: 1.0.0
Author: Windsurf Engineering
Text Domain: analogent-api
*/

if ( ! defined( 'ABSPATH' ) ) { exit; }

// Constants
if ( ! defined( 'ANALOGENT_API_VERSION' ) ) {
    define( 'ANALOGENT_API_VERSION', '1.0.0' );
    define( 'ANALOGENT_API_PATH', plugin_dir_path( __FILE__ ) );
    define( 'ANALOGENT_API_URL', plugin_dir_url( __FILE__ ) );
    define( 'ANALOGENT_API_BASENAME', plugin_basename( __FILE__ ) );
    define( 'ANALOGENT_API_TEXTDOMAIN', 'analogent-api' );
}

require_once ANALOGENT_API_PATH . 'includes/class-analogent-api.php';

function analogent_api() {
    return \AnalogentAPI\Plugin::instance();
}

add_action( 'plugins_loaded', function () {
    load_plugin_textdomain( ANALOGENT_API_TEXTDOMAIN, false, dirname( ANALOGENT_API_BASENAME ) . '/languages' );
    analogent_api();
} );

register_activation_hook( __FILE__, function () {
    // Ensure post types are registered on activation for rewrites
    require_once ANALOGENT_API_PATH . 'includes/class-post-types.php';
    \AnalogentAPI\Post_Types::register_all();
    flush_rewrite_rules();
} );

register_deactivation_hook( __FILE__, function () {
    flush_rewrite_rules();
} );
