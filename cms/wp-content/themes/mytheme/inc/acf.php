<?php
/**
 * Advanced Custom Fields
 *
 * @package    Noxgear
 * @subpackage Noxgear
 * @since      2019 Sep
 */

/** Fields */

/** Groups */

/** Global Options */
function ssw_add_global_options_page() {
	if ( function_exists( 'acf_add_options_page' ) ) {
		acf_add_options_page(
			[
				'page_title' => __( 'Global Options', 'ssw' ),
				'menu_title' => __( 'Global Options', 'ssw' ),
				'menu_slug'  => 'global-options',
				'position'   => 22,
			]
		);
	}
}

add_action( '_admin_menu', 'ssw_add_global_options_page' );
