<?php
/**
 * Navigation Registration and Global Functions
 *
 * @package    Noxgear
 * @subpackage Noxgear
 * @since      2019 Sep
 */

/**
 * Register Navigation Menus
 */
function ssw_register_navigation_menus() {
	register_nav_menu( 'main', __( 'Main Navigation', 'ssw' ) );
	register_nav_menu( 'footer', __( 'Footer Navigation', 'ssw' ) );
	register_nav_menu( 'heel', __( 'Heel Navigation', 'ssw' ) );
}

add_action( 'init', 'ssw_register_navigation_menus' );
