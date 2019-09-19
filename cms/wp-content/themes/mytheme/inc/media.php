<?php

/*
|--------------------------------------------------------------------------
| Media
|--------------------------------------------------------------------------
|
|
*/

/** Global JPEG compression settings */
add_filter('jpeg_quality', function($arg){ return 85; });

if ( function_exists( 'add_theme_support' ) ) {
	add_theme_support( 'post-thumbnails' ); // The important part
}


/** Fly Image sizes */
if ( function_exists( 'fly_add_image_size' ) ) {
	// Hero
	// fly_add_image_size( 'hero_mobile', 1024, 400, true );
	// fly_add_image_size( 'hero_mobile_2x', 2048, 800, true );
	// fly_add_image_size( 'hero', 1920, 675, true );
	// fly_add_image_size( 'hero_2x', 3840, 1350, true );
}


/** Modify Sizes */
//update_option( 'large_w', 1200);

// if ( function_exists( 'add_image_size' ) ) {
// 	add_image_size( 'story_thumb', 275, 155, array('right', 'center'));
// }

/**
 * Gets SVG Icon HTML
 *
 * @param string $svg_id SVG Slug.
 * @param string $title  Fallback Title.
 * @param string $class  Optional Class.
 *
 * @return string
 */
function ssw_get_icon( $svg_id, $title = '', $class = '' ): string {
	$icon = '<svg class="c-icon ' . $class . '" pointer-events="none">
		<title>' . $title . '</title>
		<use xlink:href="#' . $svg_id . '"></use>
	</svg>';

	return $icon;
}

/**
 * Get The Icon
 *
 * @param string $svg_id SVG Id.
 * @param string $title  Fallback Title.
 * @param string $class  Optional Class Name.
 */
function ssw_the_icon( $svg_id, $title = '', $class = '' ) {
	// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
	echo ssw_get_icon( $svg_id, $title, $class );
	//phpcs:enable
}
