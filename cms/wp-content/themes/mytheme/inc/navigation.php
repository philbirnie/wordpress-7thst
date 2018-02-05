<?php
/*
|--------------------------------------------------------------------------
| Navigation
|--------------------------------------------------------------------------
|
|
*/

function register_navigation_menus() {
	register_nav_menu( 'main', __( 'Main Navigation' ) );
	register_nav_menu( 'utility', __( 'Utility Navigation' ) );
	register_nav_menu( 'footer', __( 'Footer Navigation' ) );
}
add_action( 'init', 'register_navigation_menus' );
