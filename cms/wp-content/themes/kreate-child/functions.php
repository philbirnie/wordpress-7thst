<?php

/*** Child Theme Function  ***/

function eltd_child_theme_enqueue_scripts() {
	wp_register_style( 'childstyle', get_stylesheet_directory_uri() . '/style.css' );
	wp_enqueue_style( 'childstyle' );

	wp_register_script( 'childscript', get_stylesheet_directory_uri() . '/scripts.js' );

	wp_enqueue_script( 'childscript' );

}
add_action( 'wp_enqueue_scripts', 'eltd_child_theme_enqueue_scripts', 11 );


/** Prevent TinyMCE from stripping custom attributes */
function ssw_override_tinymce_option( $init_array ) {
	$opts                                  = '*[*]';
	$init_array['valid_elements']          = $opts;
	$init_array['extended_valid_elements'] = $opts;
	return $init_array;
}
add_filter( 'tiny_mce_before_init', 'ssw_override_tinymce_option' );
