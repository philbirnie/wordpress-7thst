<?php

/**
 * Get page id from slug
 */
function get_id_by_slug($page_slug) {
	$page = get_page_by_path($page_slug);
	if ($page) {
		return $page->ID;
	} else {
		return null;
	}
}

/**
 * Get parent page's slug
 */
// Retrieve the page slug.
function get_post_slug($post_parent = false) {
    global $post; // WordPress global $post
    if ($post_parent) {
        $parent = get_post($post_parent, OBJECT); // get the post data.
        $slug = $parent->post_name; // get the post_name/slug
    } else {
        // If not a post_parent the post_name/slug for the
        // current page will already be accessible.
        $slug = $post->post_name;
    }
    return $slug;
}

// Same function as above but wrapped up in a new function for convenience.
function get_post_parent_slug() {
    global $post; // WordPress global $post
    // Once the current post data is loaded you can retrieve
    // the post_parent ID to retrieve that posts post_name/slug.
    return get_post_slug($post->post_parent);
}

/**
 * Returns a Google Maps URL
 */
function get_map_address_url($data) {
    $address    = (isset($data['address'])   ? urlencode($data['address']) . '+' : '');
    $address2   = (isset($data['address2'])  ? urlencode($data['address2']) . '+' : '');
    $city       = (isset($data['city'])      ? urlencode($data['city']) . '+' : '');
    $state      = (isset($data['state'])     ? urlencode($data['state']) . '+' : '');
    $zip_code   = (isset($data['zip_code'])  ? urlencode($data['zip_code']) : '');
    $data       = $address . $address2 . $city . $state . $zip_code;

    $url = 'https://www.google.com/maps/dir//'. $data;

    return $url;
}

/** 
 * Converts phone number (555) 555-5555 URL friendly 555-555-5555
 */
function get_url_tel($phone) {
    $tel = str_replace(') ', '-', $phone);
    $tel = str_replace('(', '', $tel);
    return $tel;
}

/**
 * Checks if image asset is portrait, landscape or square
 */
function get_image_layout($width, $height) {
    $result = 'square';

    if ($width > $height) {
        $result = 'landscape';
    } else if ($width < $height) {
        $result = 'portrait';
    }

    return $result;
}
