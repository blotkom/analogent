<?php
namespace AnalogentAPI;

if ( ! defined( 'ABSPATH' ) ) { exit; }

class Logger {
    private $settings;
    private $file;

    public function __construct( Settings $settings ) {
        $this->settings = $settings;
        $upload = wp_get_upload_dir();
        $dir = trailingslashit( $upload['basedir'] ) . 'analogent-api';
        if ( ! file_exists( $dir ) ) {
            wp_mkdir_p( $dir );
        }
        $this->file = trailingslashit( $dir ) . 'log.txt';
    }

    public function enabled() : bool { return (bool) $this->settings->get( 'enable_logging', 0 ); }

    public function info( string $msg, array $context = [] ) : void { $this->write( 'INFO', $msg, $context ); }
    public function error( string $msg, array $context = [] ) : void { $this->write( 'ERROR', $msg, $context ); }
    public function debug( string $msg, array $context = [] ) : void { $this->write( 'DEBUG', $msg, $context ); }

    private function write( string $level, string $msg, array $context ) : void {
        if ( ! $this->enabled() ) return;
        $line = sprintf( '[%s] [%s] %s %s', gmdate( 'c' ), $level, $msg, $context ? wp_json_encode( $context ) : '' );
        // Use error_log with message type 3 to append to file
        if ( is_writable( dirname( $this->file ) ) || ! file_exists( $this->file ) ) {
            error_log( $line . PHP_EOL, 3, $this->file );
        } else {
            error_log( $line );
        }
    }
}
