<?php
namespace AnalogentAPI;

if ( ! defined( 'ABSPATH' ) ) { exit; }

function arr_get( array $a, string $k, $d = null ) { return $a[$k] ?? $d; }
