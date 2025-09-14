<?php
namespace AnalogentAPI;

if ( ! defined( 'ABSPATH' ) ) { exit; }

class Email {
    private $settings; private $logger;
    public function __construct( Settings $settings, Logger $logger ) {
        $this->settings = $settings; $this->logger = $logger;
        add_filter( 'wp_mail_from', [ $this, 'mail_from' ] );
        add_filter( 'wp_mail_from_name', [ $this, 'mail_from_name' ] );
    }

    public function mail_from( $email ) { $set = $this->settings->get( 'from_email' ); return is_email( $set ) ? $set : $email; }
    public function mail_from_name( $name ) { $set = $this->settings->get( 'from_name' ); return $set ?: $name; }

    private function recipients() : string {
        $emails = $this->settings->get( 'notify_emails', get_bloginfo( 'admin_email' ) );
        return $emails ?: get_bloginfo( 'admin_email' );
    }

    public function send_contact_notification( int $post_id, array $data ) : void {
        if ( ! $this->settings->get( 'notify_on_contact', 1 ) ) return;
        $to = $this->recipients();
        $subject = sprintf( 'New Contact: %s', $data['name'] ?? '' );
        $body = '<h2>New Contact</h2>'
              . '<p><strong>Name:</strong> ' . esc_html( $data['name'] ?? '' ) . '</p>'
              . '<p><strong>Email:</strong> ' . esc_html( $data['email'] ?? '' ) . '</p>'
              . '<p><strong>Company:</strong> ' . esc_html( $data['company'] ?? '' ) . '</p>'
              . '<p><strong>Phone:</strong> ' . esc_html( $data['phone'] ?? '' ) . '</p>'
              . '<p><strong>Message:</strong><br />' . nl2br( esc_html( $data['message'] ?? '' ) ) . '</p>'
              . '<p><strong>Source:</strong> ' . esc_html( $data['source'] ?? '' ) . '</p>'
              . '<p>View in admin: <a href="' . esc_url( admin_url( 'post.php?post=' . $post_id . '&action=edit' ) ) . '">Open</a></p>';
        $headers = [ 'Content-Type: text/html; charset=UTF-8' ];
        $sent = wp_mail( $to, $subject, $body, $headers );
        if ( ! $sent ) { $this->logger->error( 'Failed to send contact email', [ 'post_id' => $post_id ] ); }
    }

    public function send_application_notification( int $post_id, array $data ) : void {
        if ( ! $this->settings->get( 'notify_on_application', 1 ) ) return;
        $to = $this->recipients();
        if ( ! empty( $data['job_id'] ) ) {
            $apply_email = get_post_meta( intval( $data['job_id'] ), 'analogent_job_apply_email', true );
            if ( is_email( $apply_email ) ) { $to = $apply_email; }
        }
        $subject = sprintf( 'New Application: %s %s', ($data['general'] ? '[General]' : ''), $data['name'] ?? '' );
        $job_label = $data['general'] ? 'General' : ( $data['job_slug'] ?: ( $data['job_id'] ?: 'Unknown' ) );
        $body = '<h2>New Application</h2>'
              . '<p><strong>Name:</strong> ' . esc_html( $data['name'] ?? '' ) . '</p>'
              . '<p><strong>Email:</strong> ' . esc_html( $data['email'] ?? '' ) . '</p>'
              . '<p><strong>Phone:</strong> ' . esc_html( $data['phone'] ?? '' ) . '</p>'
              . '<p><strong>LinkedIn:</strong> ' . esc_html( $data['linkedin'] ?? '' ) . '</p>'
              . '<p><strong>Job:</strong> ' . esc_html( $job_label ) . '</p>'
              . '<p><strong>Cover Letter:</strong><br />' . nl2br( esc_html( $data['cover_letter'] ?? '' ) ) . '</p>'
              . ( ! empty( $data['resume_url'] ) ? '<p><strong>Resume URL:</strong> <a href="' . esc_url( $data['resume_url'] ) . '">Download</a></p>' : '' )
              . '<p>View in admin: <a href="' . esc_url( admin_url( 'post.php?post=' . $post_id . '&action=edit' ) ) . '">Open</a></p>';
        $headers = [ 'Content-Type: text/html; charset=UTF-8' ];
        $attachments = [];
        if ( ! empty( $data['resume_id'] ) ) {
            $file = get_attached_file( intval( $data['resume_id'] ) );
            if ( $file && file_exists( $file ) ) { $attachments[] = $file; }
        }
        $sent = wp_mail( $to, $subject, $body, $headers, $attachments );
        if ( ! $sent ) { $this->logger->error( 'Failed to send application email', [ 'post_id' => $post_id ] ); }
    }
}
