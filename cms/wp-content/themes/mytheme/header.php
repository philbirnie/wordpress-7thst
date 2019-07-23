<?php
/**
 * The template for displaying the header
 *
 * @package WordPress
 * @subpackage My Theme
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="shortcut icon" type="image/x-icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon.ico">
    <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/assets/images/apple-touch-icon.png">

    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?> data-sprites="<?php echo get_template_directory_uri(); ?>/assets/images/sprites.svg?ver=<?php echo esc_attr( wp_get_theme()->get( 'Version' ) ); ?>">

    <?php get_template_part('partials/materials/modules/head'); ?>


    <div class="c-page">

        <main class="c-main">
