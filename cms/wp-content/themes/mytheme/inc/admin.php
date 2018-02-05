<?php

add_action( 'after_setup_theme', 'remove_admin_bar' );

function remove_admin_bar() {
    global $current_user;
    wp_get_current_user();
	
    if ( ! current_user_can( 'administrator' ) && ! is_admin() || $current_user->user_login == '7thstreetweb') {
		show_admin_bar( false );
	}
}

/**
 * Registers an editor stylesheet for the theme.
 */
function mytheme_add_editor_styles() {
  add_editor_style( 'assets/styles/mytheme-editor-styles.css' );
}

add_action( 'admin_init', 'mytheme_add_editor_styles' );

/**
 * Move Yoast to bottom
 */
function yoasttobottom() {
	return 'low';
}
add_filter( 'wpseo_metabox_prio', 'yoasttobottom');
