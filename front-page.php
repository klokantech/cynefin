<?php get_header(); ?>

<section>
<?php
if ( have_posts() ) {
	while ( have_posts() ) { the_post(); ?>
	<div class="container">

		<div class="intro">
			<p>
				<a href="<?php bloginfo("url"); ?>" class="sprite-logo-large"><?php bloginfo("name"); ?></a>
			</p>

			<p>
				<a href="/<?php echo ICL_LANGUAGE_CODE; ?>/tithe-maps" class="btn btn-large btn-noise"><?php _e("Get started", "cynefin"); ?></a>
			</p>


		</div>

		<div class="paper">
			<div class="paper-base">
				<div class="paper-top"></div>
				<div class="paper-middle"></div>
			</div>
			<!-- .paper-base -->
			<div class="content">

				<div class="statistics">

					<div class="columns-3">

						<div class="column">

							<p>
								<strong id="stats_total_volunteers">&nbsp;</strong>
								<?php _e("Total Volunteers", "cynefin"); ?>
							</p>

						</div>
						<!-- .column -->

						<div class="column">

							<p>
								<strong id="stats_records_transed">&nbsp;</strong>
								<?php _e("Records Transcribed", "cynefin"); ?>
							</p>

						</div>
						<!-- .column -->

						<div class="column">

							<p>
								<strong id="stats_maps">&nbsp;</strong>
								<?php _e("Maps", "cynefin"); ?>
							</p>

						</div>
						<!-- .column -->

					</div>
					<!-- .columns-3 -->

				</div>
				<!-- .statistics -->

				<div class="columns-2">

					<div class="column column-wide">
						<?php the_content(); ?>
					</div>
					<!-- .column -->

					<div class="column column-thin">

						<h2>Video tutorial</h2>

						<p>
							<a href="#" class="thumb" id="popup-btn">
								<img src="<?php bloginfo("template_url"); ?>/assets/img/video-placeholder.png" alt="<?php _e("Watch video", "cynefin"); ?>">
							</a>
						</p>

						<p><?php _e("Learn how use the project online tools to help us rediscover, enrich and preserve our shared heritage.", "cynefin"); ?></p>

					</div>
					<!-- .column -->

				</div>
				<!-- .columns-2 -->

				<div class="partners">

					<a href="http://www.archiveswales.org.uk/" title="">
						<img src="<?php bloginfo("template_url"); ?>/assets/img/partner-1.png" alt="">
					</a>

					<a href="http://www.hlf.org.uk/" title="">
						<img src="<?php bloginfo("template_url"); ?>/assets/img/partner-2.png" alt="">
					</a>

					<a href="http://www.llgc.org.uk/" title="">
						<img src="<?php bloginfo("template_url"); ?>/assets/img/partner-3.png" alt="">
					</a>

					<a href="http://wales.gov.uk/" title="">
						<img src="<?php bloginfo("template_url"); ?>/assets/img/partner-4.png" alt="">
					</a>

				</div>
				<!-- .partners -->


			</div>
			<!-- .content -->
			<div class="paper-btm"></div>
		</div>
		<!-- .paper -->
	</div>
	<!-- .container -->
<?php
	}
}
?>
</section>
<!-- .content -->

<script src="<?php bloginfo("template_url"); ?>/js/home.js" type="text/javascript"></script>
<script>
new Home();
</script>

<?php get_footer(); ?>