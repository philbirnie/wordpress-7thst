<?php
/**
 * Font Hinting
 *
 * @package    USA Tools
 * @subpackage USA Tools
 * @since      2019 Dec
 */

$ssw_font_files = [
	'montserrat-v14-latin-regular',
	'montserrat-v14-latin-700',
	'Brooklyn-Bold',
];

foreach ( $ssw_font_files as $ssw_font_file ) {
	$ssw_font_file_url = sprintf(
		'%s/%s.woff2',
		get_template_directory_uri() . '/assets/fonts',
		$ssw_font_file
	);

	?>
	<link
			rel="preload"
			as="font"
			type="font/woff2"
			href="<?php echo esc_url( $ssw_font_file_url ); ?>"
			crossorigin>
	<?php
}
