<?php

/*
|--------------------------------------------------------------------------
| Scripts
|--------------------------------------------------------------------------
|
|
*/

function setup_scripts() {
	wp_register_script( 'main', get_template_directory_uri() . '/assets/scripts/toolkit.js',
		array( 'jquery' ), '1.0.1', true );


	/** Allows us to access window.wp.X where X is an array element. */
	wp_localize_script( 'main', 'wp', array() );
	wp_enqueue_script( 'main' );
}

add_action( 'wp_enqueue_scripts', 'setup_scripts' );


function setup_styles() {
	wp_register_style( 'main', get_template_directory_uri() . '/assets/styles/toolkit.css',
		array(), '1.0.1' );


	wp_enqueue_style( 'main' );
}

add_action( 'wp_enqueue_scripts', 'setup_styles' );


/**
 * Remove jQuery Migrate
 */
function removeJqueryMigrate(&$scripts){
    if (!is_admin()) {
        $scripts->remove('jquery');
        $scripts->add('jquery', false, array('jquery-core'), '1.10.2');
    }
}

add_filter( 'wp_default_scripts', 'removeJqueryMigrate' );
