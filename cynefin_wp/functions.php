<?php

register_nav_menus( array(
	'main_menu' => 'Main Menu',
	'side_menu' => 'Sidebar Menu'
) );

$sidebar_settings = array(
	'name'          => __( 'Sidebar', 'cynefin' ),
	'id'            => 'right_sidebar',
	'description'   => '',
        'class'         => '',
	'before_widget' => '<div class="widget">',
	'after_widget'  => '</div>',
	'before_title'  => '<h2><span>',
	'after_title'   => '</span></h2>' );

register_sidebar( $sidebar_settings );