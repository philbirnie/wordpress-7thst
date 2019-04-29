<?php
	/*
		Template Name: Blog: Burtonwood
	*/
?>
<?php get_header(); ?>
<?php $blog_type = 'standard'; ?>
<?php kreate_elated_get_title(); ?>
<?php get_template_part( 'slider' ); ?>
<div class="eltd-container">
	<?php do_action( 'kreate_elated_after_container_open' ); ?>
	<div class="eltd-container-inner" >

	<?php
	kreate_elated_get_blog_type( $blog_type );
	wp_reset_postdata();
	?>
	<?php kreate_elated_get_blog_before_content(); ?>

	</div>
	<?php do_action( 'kreate_elated_before_container_close' ); ?>
</div>
<?php get_footer(); ?>
