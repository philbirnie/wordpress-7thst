<?php

/*
|--------------------------------------------------------------------------
| Hands on Functions
|--------------------------------------------------------------------------
|
|
*/

require_once 'inc/navigation.php';
require_once 'inc/scripts.php';
require_once 'inc/admin.php';
require_once 'inc/forms.php';
require_once 'inc/media.php';
require_once 'inc/posts.php';
require_once 'inc/utilities.php';

/** Include Advanced Custom Field Settings */
// require_once( 'inc/acf/acf.php' );


/*
|--------------------------------------------------------------------------
| Add Options Page ACF
|--------------------------------------------------------------------------
*/

if ( function_exists( 'acf_add_options_page' ) ) {

    acf_add_options_page(array(
        'page_title'    => 'Custom Options',
        'menu_title'    => 'Custom Options',
        'menu_slug'     => 'custom-options',
        'capability'    => 'edit_posts',
        'position'      => 24,
        'redirect'      => false
    ));

}

/*
|--------------------------------------------------------------------------
| Theme Support
|--------------------------------------------------------------------------
|
|
*/

add_theme_support( 'title-tag' );
