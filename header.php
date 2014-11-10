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
	    #county-detail-name {position:relative;top:5px;}
	    .form-search-map button span {top:3px;}
	    .item-media {width:100px; height:60px; text-align:center; border:1px solid #706b65; background:#ddd;}
	    .item-media img {border:none;}
	    .item-county {
	      overflow:hidden;
	      -webkit-transition:all .4s;
	      -moz-transition:all .4s;
	      -o-transition:all .4s;
	      transition:all .4s;
	      cursor:default !important;
	      padding: 10px 20px;
	    }
	    .item-county.filtered {height:0;padding-top:0;padding-bottom:0;opacity:0;}

	    .item-btn .item-media {height:auto;border:none;background:none;padding:none;}
	    .item-media img:hover {opacity:1;}

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

	    .progress{
	      width: 400px;
	      padding: 20px 0 20px 20px;
	      height: 50px;
	      font-size: 12px;
	      line-height: 12px;
	    }
	    .bar{width: 80%;height: 42px;float: left;}
	    .bar-segment{
	      float: left;
	      background-color: #d4c5a9;
	      height: 15px;
	      display: block;
	    }
	    .bar-segment:first-child{background-color: #da4d00;}
	    .bar-segment:nth-child(2){background-color: #41768a;}
	    .bar-segment:first-child:before, .bar-segment:nth-child(2):before{
	      position: absolute;
	      margin-top: -15px;
	      padding-right: 10px;
	    }
	    .bar-segment:first-child:before{content: '<?php _e("Reviewed", "cynefin"); ?>';}
	    .bar-segment:nth-child(2):before{content: '<?php _e("Edited", "cynefin"); ?>';}
	    .bar-label{
	      position: absolute;
	      font-size: 14px;
	      margin-top: 15px;
	      padding-top: 4px;
	    }
	    .bar-count{
	      position: relative;
	      width: 16%;
	      float: right;
	      font-size: 28px;
	      padding: 15px 2%;
	      margin-top: -15px;
	      z-index: 10;
	    }
	    .bar-count:after, .bar-label:after{position: absolute;margin-top: 20px;left: 0;}
	    .maps:after, .sheets:after, .bar:before, .bar-count, .bar-segment:first-child:before, .bar-segment:nth-child(2):before{background-color: #ffffff;}
	    .bar-count:after{padding-left: 10px; padding-bottom: 16px;}
	    .maps:after {content: " <?php _e("maps", "cynefin"); ?>";}
	    .sheets:after {content: " <?php _e("sheets", "cynefin"); ?>";}
	    .bar-count:after{font-size: 12px;}
	    .bar-label:after{margin-top: 12px; font-size: 10px;}

	    .item-btns {text-align:center;padding-top:0;}
	    .floating-btn {display:inline-block;width:110px;margin:0 12px;}
	    .floating-btn .btn {font-size:13px;padding:5px 0;display:block;text-transform:none;}
	    .floating-btn .btn.disabled {background:#555 !important;cursor:default;}
	    .floating-btn p {font-size:11px;width:220px;margin-left:-55px;}

	    .map-attribution {position:absolute;right:0;bottom:0;font-size:10px;color:#333;background:rgba(255,255,255,0.3);line-height:10px;padding:4px;}
	    </style>
	<?php } ?>
</head>
<body <?php body_class( $class ); ?>>

	<div class="page">
		<?php
			if(is_page_template("tithe-map.php")) {
    ?>
    <div id="map"></div>
    <div class="map-attribution">
      <? printf(__('Made by %s.', 'cynefin'), '<a href="http://www.klokantech.com/">Klokan Technologies</a>'); ?>
      <? printf(__('Parish Boundary Mapping &copy; %s.', 'cynefin'), '<a href="http://www.port.ac.uk/research/gbhgis/">' . __('University of Portsmouth', 'cynefin') . '</a>'); ?>
    </div>
    <?php
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
	                <a href="/<?php echo ICL_LANGUAGE_CODE; ?>/tithe-maps/transcribe" title="<?php _e("Transcribe", "cynefin"); ?>"><?php _e("Transcribe", "cynefin"); ?></a>
	              </li>
	              <li id="link-georeference">
	                <a href="/<?php echo ICL_LANGUAGE_CODE; ?>/tithe-maps/georeference" title="<?php _e("Georeference", "cynefin"); ?>"><?php _e("Georeference", "cynefin"); ?></a>
	              </li>
	              <li id="link-visualize">
	                <a href="/<?php echo ICL_LANGUAGE_CODE; ?>/tithe-maps/visualize" title="<?php _e("Visualize", "cynefin"); ?>"><?php _e("Visualize", "cynefin"); ?></a>
	              </li>
	              <li id="link-accuracy" class="active">
	                <a href="/<?php echo ICL_LANGUAGE_CODE; ?>/tithe-maps/accuracy" title="<?php _e("Accuracy", "cynefin"); ?>"><?php _e("Accuracy", "cynefin"); ?></a>
	              </li>
	              <li id="link-this-map">
	                <a href="/<?php echo ICL_LANGUAGE_CODE; ?>/tithe-maps/this-map" title="<?php _e("This map", "cynefin"); ?>"><?php _e("This map", "cynefin"); ?></a>
	              </li>
	              <li id="link-next-random">
	                <a href="/<?php echo ICL_LANGUAGE_CODE; ?>/tithe-maps/transcribe" title="<?php _e("Next random", "cynefin"); ?>"><?php _e("Next random", "cynefin"); ?></a>
	              </li>
	            </ul>
	            <!-- .navigation -->
	          </nav>
	          <p id="map-title"><?php if(is_page_template("tithe-map-transcribe.php")) { _e("Sheet from", "cynefin"); } ?>&nbsp;</p>
        	</div>
        	<?php } ?>


		</header>

		<hr>
