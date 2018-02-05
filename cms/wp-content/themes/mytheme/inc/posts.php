<?php

/*
|--------------------------------------------------------------------------
| Add Body Classes for Page Templates
|--------------------------------------------------------------------------
|
|
*/

/**
 * Writes current page to body class
 *
 * @param [array] $classes
 * @return void
 */
function body_class_section($classes) {
    global $wpdb, $post;

    $parent = null;
    $current_page_id = null;
   
    if (is_page()) {
        if ($post->post_parent) {
            $ancestors = get_post_ancestors($current_page_id);
            $parent  = end($ancestors);
        } else {
            $parent = $post->ID;
        }
        $post_data = get_post($parent, ARRAY_A);
        $classes[] = 'page-' . $post_data['post_name'];
    }
    return $classes;
}
add_filter('body_class', 'body_class_section');

/**
 * Returns content with formatting
 */
function get_the_content_with_formatting() {
	ob_start();
	the_content();
	$the_content = ob_get_contents();
	ob_end_clean();
	return $the_content;
}
