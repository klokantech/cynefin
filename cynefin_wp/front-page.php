<?php get_header(); ?>

<section>
<?php
if ( have_posts() ) {
	while ( have_posts() ) { the_post(); ?>
	<div class="container">

		<div class="intro">
			<p>
				<a href="<?php bloginfo("url"); ?>" class="sprite-logo-large">Cynefin</a>
			</p>

			<p>
				<a href="/tithe-maps/georeference" class="btn btn-large btn-noise">Get started</a>
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
								<strong>352</strong>
								Total Volunteers
							</p>

						</div>
						<!-- .column -->

						<div class="column">

							<p>
								<strong>289345</strong>
								Records Transcribed
							</p>

						</div>
						<!-- .column -->

						<div class="column">

							<p>
								<strong>167</strong>
								Maps
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
							<a href="/" class="thumb">
								<img src="<?php bloginfo("template_url"); ?>/assets/img/video-placeholder.png" alt="Watch video">
							</a>
						</p>

						<p>Learn how use the project online tools to help us rediscover, enrich and preserve our shared heritage.</p>

					</div>
					<!-- .column -->

				</div>
				<!-- .columns-2 -->

				<div class="partners">

					<a href="/" title="">
						<img src="<?php bloginfo("template_url"); ?>/assets/img/partner-1.png" alt="">
					</a>

					<a href="/" title="">
						<img src="<?php bloginfo("template_url"); ?>/assets/img/partner-2.png" alt="">
					</a>

					<a href="/" title="">
						<img src="<?php bloginfo("template_url"); ?>/assets/img/partner-3.png" alt="">
					</a>

					<a href="/" title="">
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

<?php get_footer(); ?>