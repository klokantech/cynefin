<div class="column column-fixed">

	<?php dynamic_sidebar('right_sidebar'); ?>

	<div class="widget">
		<h2><span>Posts</span></h2>
		<?php
		$menu_args = array(
			'theme_location'  => 'side_menu',
			'container'       => '',
			'menu_class'      => 'menu',
			'echo'            => true,
			'fallback_cb'     => 'wp_page_menu',
			'items_wrap'      => '<ul id="%1$s" class="%2$s blog-categories">%3$s</ul>'
		);
		wp_nav_menu($menu_args);
		?>
	</div>

	<div id="widget-easy-twitter-feed-widget-kamn-2" class="widget">
		<div class="widget-easy-twitter-feed-widget-global-wrapper">
			<div class="widget-easy-twitter-feed-widget-container">

				<div class="row">
				  	<div class="col-lg-12">
						<h2><span>Twitter feed</span></h2>
					</div>
				</div>

				<script type="text/javascript" src="http://cynefinblog.archiveswales.org.uk/wp-content/plugins/easy-twitter-feed-widget/lib/js/widget-easy-twitter-feed-widget.js?ver=1.0"></script>

	          	<div class="widget-easy-twitter-feed-widget-row">
		          	<div class="widget-easy-twitter-feed-widget-col">
			          <div class="twitterwidget widget-easy-twitter-feed-widget-kamn-2" data-twttr-id="twttr-sandbox-0">
						<a class="twitter-timeline" width="340" height="250" href="https://twitter.com/twitterapi" data-widget-id="464334973470638081" data-screen-name="CynefinProject" data-show-replies="0" data-theme="light" data-link-color="" data-border-color="#FFFFFF" data-chrome="noheader nofooter  noscrollbar" data-tweet-limit="3">Tweets by @CynefinProject</a>
			          </div>
	          		</div>
	      		</div>

	      	</div> <!-- End .widget-global-wrapper -->
	    </div>

	</div>


</div>
<!-- .column -->