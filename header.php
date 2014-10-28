<!DOCTYPE html>
<!--[if lt IE 8 ]><html lang="cs" class="ie7 no-js"> <![endif]-->
<!--[if lt IE 9 ]><html lang="cs" class="ie8 no-js"> <![endif]-->
<!--[if lt IE 10 ]><html lang="cs" class="ie9 no-js"> <![endif]-->
<!--[if (gt IE 10)|!(IE)]><!-->
<html class="responsive no-js">
<!--<![endif]-->
<head>
	<meta charset="utf-8">
	<!--[if IE]>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<![endif]-->
    <meta name="viewport" content="width=device-width">

	<title><?php bloginfo('name'); ?> | <?php is_front_page() ? bloginfo('description') : wp_title(''); ?></title>

	<link rel="stylesheet" href="<?php bloginfo("template_url"); ?>/assets/css/main.css" type="text/css" />

	<?php wp_head(); ?>

	<!--[if (lt IE 9) & (!IEMobile)]>
	<link rel="stylesheet" href="/css/main-ie.css" media="screen">
	<script src="/js/html5shiv.min"></script>
	<![endif]-->
</head>
<body <?php body_class( $class ); ?>>

	<div class="page">

		<header>
			<div class="inner">

				<?php
				$menu_args = array(
					'theme_location'  => 'main_menu',
					'container'       => 'nav',
					'menu_class'      => 'menu',
					'echo'            => true,
					'fallback_cb'     => 'wp_page_menu',
					'items_wrap'      => '<ul id="%1$s" class="%2$s navigation navigation-header">%3$s</ul>'
				);
				wp_nav_menu($menu_args);
				?>

				<hr>

				<div class="languages">
				<?php
					if (function_exists('icl_get_languages')) {
					    $languages = icl_get_languages('skip_missing=0&orderby=code');
					    if(!empty($languages)){
					    	$iterator = 0;
					        foreach($languages as $l){ ?>
					        	<a href="<?php echo $l["url"] ?>" <?php if($l["active"]) { echo 'class="active"';} ?> title="<?php echo $l["native_name"] ?>"><?php echo $l["native_name"] ?></a>
					        	<?php
					        	if($iterator === 0) {
					        		echo '<span class="sep">|</span>';
					        		$iterator++;
					        	}
					        }
					    }
				    } else { ?>
						<a href="#" title="Welsh">Welsh</a>
						<span class="sep">|</span>
						<a href="#" title="English" class="active">English</a>
				    <?php }
				?>
				</div>
				<!-- .languages -->

			</div>
			<!-- .inner -->

		</header>

		<hr>
