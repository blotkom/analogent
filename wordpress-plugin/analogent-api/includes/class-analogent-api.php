<?php
namespace AnalogentAPI;

if ( ! defined( 'ABSPATH' ) ) { exit; }

class Plugin {
    private static $instance;

    /** @var Settings */
    public $settings;
    /** @var Logger */
    public $logger;
    /** @var Email */
    public $email;

    public static function instance() : Plugin {
        if ( ! self::$instance ) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        require_once ANALOGENT_API_PATH . 'includes/class-logger.php';
        require_once ANALOGENT_API_PATH . 'includes/class-settings.php';
        require_once ANALOGENT_API_PATH . 'includes/helpers.php';
        require_once ANALOGENT_API_PATH . 'includes/class-post-types.php';
        require_once ANALOGENT_API_PATH . 'includes/class-email.php';
        require_once ANALOGENT_API_PATH . 'includes/class-cors.php';
        require_once ANALOGENT_API_PATH . 'includes/class-rest.php';

        $this->settings = new Settings();
        $this->logger   = new Logger( $this->settings );
        $this->email    = new Email( $this->settings, $this->logger );

        add_action( 'init', [ '\\AnalogentAPI\\Post_Types', 'register_all' ] );

        new CORS( $this->settings, $this->logger );
        new REST( $this->settings, $this->email, $this->logger );
    }
}
