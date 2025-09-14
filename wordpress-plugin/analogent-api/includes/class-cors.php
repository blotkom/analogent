<?php
namespace AnalogentAPI;

if ( ! defined( 'ABSPATH' ) ) { exit; }

class CORS {
    private $settings; private $logger;
    public function __construct( Settings $settings, Logger $logger ) {
        $this->settings = $settings; $this->logger = $logger;
        add_filter( 'rest_pre_serve_request', [ $this, 'rest_send_cors_headers' ], 10, 4 );
    }

    public function rest_send_cors_headers( $served, $result, $request, $server ) {
        if ( ! $this->settings->get( 'enable_cors', 1 ) ) return $served;
        $origin = $this->get_origin();
        $allowed = $this->settings->get_allowed_origins();
        if ( $origin && $this->is_allowed( $origin, $allowed ) ) {
            header( 'Access-Control-Allow-Origin: ' . $origin );
            header( 'Vary: Origin' );
            header( 'Access-Control-Allow-Credentials: true' );
        }
        header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
        header( 'Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce' );
        return $served;
    }

    private function get_origin() : string {
        if ( isset( $_SERVER['HTTP_ORIGIN'] ) ) return esc_url_raw( $_SERVER['HTTP_ORIGIN'] );
        if ( isset( $_SERVER['HTTP_REFERER'] ) ) {
            $ref = esc_url_raw( $_SERVER['HTTP_REFERER'] );
            $parts = wp_parse_url( $ref );
            if ( ! empty( $parts['scheme'] ) && ! empty( $parts['host'] ) ) {
                $port = isset( $parts['port'] ) ? ':' . $parts['port'] : '';
                return $parts['scheme'] . '://' . $parts['host'] . $port;
            }
        }
        return '';
    }

    private function is_allowed( string $origin, array $allowed ) : bool {
        foreach ( $allowed as $a ) {
            if ( rtrim( $a, '/' ) === rtrim( $origin, '/' ) ) return true;
        }
        return false;
    }
}
