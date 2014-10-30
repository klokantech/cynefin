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

	<?php
	if (is_page_template("tithe-map.php")) { ?>
	   <style>
	    body { background-image: none; }
	    .page { background-image: none; }
	    #map {position:absolute; top:50px; left:0; bottom:0; right:0;}
	    .item-media {height:75px; line-height:73px; text-align:center; border:1px solid #706b65; background:#ddd; padding:2px;}
	    .item-media img {border:none;}
	    .item-county {
	      height:75px;overflow:hidden;
	      -webkit-transition:all .4s;
	      -moz-transition:all .4s;
	      -o-transition:all .4s;
	      transition:all .4s;
	    }
	    .item-county.filtered {height:0;padding-top:0;padding-bottom:0;opacity:0;}

	    .item-btn .item-media {height:auto;border:none;background:none;padding:none;}

	    .no-county-detail {width:174px;}
	    .no-county-detail .box-counties .box-content {right:9px;}
	    .no-county-detail #county-detail {display:none;}

	    .counties-list li:hover, .counties-list li.highlighted {background-color:#c0ced3;}

	    .form-map-zoom-in {top:185px;}
	    .form-map-zoom-out {top:230px;}

	    .ac-renderer {position:absolute;width:240px;background:#fff;border:1px solid #cdcdcd;font-size:12px;}
	    .ac-row {position:relative;padding:3px;padding-left:8px;cursor:pointer;border-bottom:1px solid #ddd;}
	    .ac-highlighted {font-weight:bold;}
	    .ac-active {background:#eee;}

	    .search-marker {width:10px;height:10px;background:#6b8c95;outline:2px solid #fff;margin:-5px -5px;}
	    </style>
	<?php } ?>
</head>
<body <?php body_class( $class ); ?>>

	<div class="page">
		<?php
			if(is_page_template("tithe-map.php")) {
				echo '<div id="map"></div>';
			}
		?>
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
						function fixHomeUrl($url) {
							return str_replace("/home/", "/", $url);
						}
					    $languages = icl_get_languages('skip_missing=0&orderby=code');
					    if(!empty($languages)){
					    	$iterator = 0;
					        foreach($languages as $l){ ?>
					        	<a href="<?php echo fixHomeUrl($l["url"]) ?>" <?php if($l["active"]) { echo 'class="active"';} ?> title="<?php echo $l["native_name"] ?>"><?php echo $l["native_name"] ?></a>
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
			<?php if(
				is_page_template("tithe-map-accuracy.php")
				|| is_page_template("tithe-map-georeference.php")
				|| is_page_template("tithe-map-thismap.php")
				|| is_page_template("tithe-map-transcribe.php")
				|| is_page_template("tithe-map-visualize.php")
			) { ?>
	        <div class="panel">
	          <nav>
	            <ul class="navigation navigation-panel">
	              <li id="link-transcribe">
	                <a href="/tithe-maps/transcribe" title="Transcribe">Transcribe</a>
	              </li>
	              <li id="link-georeference">
	                <a href="/tithe-maps/georeference" title="Georeference">Georeference</a>
	              </li>
	              <li id="link-visualize">
	                <a href="/tithe-maps/visualize" title="Visualize">Visualize</a>
	              </li>
	              <li id="link-accuracy" class="active">
	                <a href="/tithe-maps/accuracy" title="Accuracy">Accuracy</a>
	              </li>
	              <li id="link-this-map">
	                <a href="/tithe-maps/this-map" title="This map">This map</a>
	              </li>
	            </ul>
	            <!-- .navigation -->
	          </nav>
	          <p id="map-title"></p>
        	</div>
        	<?php } ?>


		</header>

		<hr>
