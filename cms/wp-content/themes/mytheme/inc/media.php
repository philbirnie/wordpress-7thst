<?php
/**
 * Media
 *
 * @package    Seventh Street Web
 * @subpackage Seventh Street Web
 * @since      2019 Dec
 */

/**
 * Global Compression Settings
 */
add_filter(
	'jpeg_quality',
	function () {
		return 85;
	}
);

if ( function_exists( 'add_theme_support' ) ) {
	add_theme_support( 'post-thumbnails' );
}

/**
 * Increases Threshold on maximum size of image
 *
 * @return int
 */
function ssw_increase_threshold() {
	return 3000;
}

/** Increase scaling size */
add_filter( 'big_image_size_threshold', 'ssw_increase_threshold', 10, 0 );


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
	$icon = '<svg class="c-icon ' . $class . '" pointer-events="none" focusable="false">
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
