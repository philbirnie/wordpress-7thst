<?php
/**
 * Functions
 *
 * @package 7th Street Web Starter
 * @subpackage 7th Street Web Starter
 * @since 2019 Mar
 */

/**
 * Core Theme Functions and Configuration.
 *
 * @note Please keep in Alphabetical order; if one file is required before another, please explain why.
 */
require_once 'inc/acf.php';
require_once 'inc/admin.php';
require_once 'inc/forms.php';
require_once 'inc/media.php';
require_once 'inc/navigation.php';
require_once 'inc/posts.php';
require_once 'inc/scripts.php';
require_once 'inc/utilities.php';

/** Enables Automatic Updates */
add_filter( 'automatic_updates_is_vcs_checkout', '__return_false', 1 );


/** Theme Support */
add_theme_support( 'title-tag' );
