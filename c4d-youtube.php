<?php
/*
Plugin Name: C4D Youtube
Plugin URI: http://coffee4dev.com/
Description: Present your Youtube video with slider or grid
Author: Coffee4dev.com
Author URI: http://coffee4dev.com/
Text Domain: c4d-youtube
Version: 2.0.0
*/

define('C4DYOUTUBE_PLUGIN_URI', plugins_url('', __FILE__));

add_action('wp_enqueue_scripts', 'c4d_youtube_safely_add_stylesheet_to_frontsite');
add_shortcode('c4d-youtube', 'c4d_youtube_slider');
add_filter( 'plugin_row_meta', 'c4d_youtube_plugin_row_meta', 10, 2 );

function c4d_youtube_plugin_row_meta( $links, $file ) {
    if ( strpos( $file, basename(__FILE__) ) !== false ) {
        $new_links = array(
            'visit' => '<a href="http://coffee4dev.com">Visit Plugin Site</<a>',
            'forum' => '<a href="http://coffee4dev.com/forums/">Forum</<a>',
            'premium' => '<a href="http://coffee4dev.com">Premium Support</<a>'
        );
        
        $links = array_merge( $links, $new_links );
    }
    
    return $links;
}

function c4d_youtube_safely_add_stylesheet_to_frontsite( $page ) {
	if(!defined('C4DPLUGINMANAGER')) {
		wp_enqueue_style( 'c4d-youtube-frontsite-style', C4DYOUTUBE_PLUGIN_URI.'/assets/default.css' );
		wp_enqueue_script( 'c4d-youtube-frontsite-plugin-js', C4DYOUTUBE_PLUGIN_URI.'/assets/default.js', array( 'jquery' ), false, true ); 
	}
	wp_enqueue_style( 'fancybox', C4DYOUTUBE_PLUGIN_URI.'/libs/jquery.fancybox.min.css'); 
	wp_enqueue_script( 'fancybox', C4DYOUTUBE_PLUGIN_URI.'/libs/jquery.fancybox.min.js', array( 'jquery' ), false, true ); 
	wp_enqueue_style( 'owl-carousel', C4DYOUTUBE_PLUGIN_URI.'/libs/owl-carousel/owl.carousel.css' );
	wp_enqueue_style( 'owl-carousel-theme', C4DYOUTUBE_PLUGIN_URI.'/libs/owl-carousel/owl.theme.css' );
	wp_enqueue_script( 'owl-carousel-js', C4DYOUTUBE_PLUGIN_URI.'/libs/owl-carousel/owl.carousel.js', array( 'jquery' ), false, true ); 
    wp_localize_script( 'jquery', 'c4d_youtube',
            array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );
}

function c4d_youtube_slider($params){
	$params['type'] = isset($params['type']) ? $params['type'] : 'slider';
	
	$uid = 'c4d-youtube-'.uniqid();
	$html = '<script>(function($){
		$(document).ready(function(){
			c4dYoutube["'.$uid.'"] = '.json_encode($params).';
		});	
	})(jQuery);</script>';
	$html .= '<div id="'.$uid.'" class="c4d-youtube" data-type="'.$params['type'].'" data-api-key="'.$params['api-key'].'" data-id="'.$params['id'].'"></div>';
	return $html;
}
