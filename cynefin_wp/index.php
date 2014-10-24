<?php get_header(); ?>

<section>

	<div class="container">

		<div class="intro">
		<p>
			<a href="<?php bloginfo("url"); ?>" class="sprite-logo-large">Cynefin</a>
		</p>

		</div>
		<div class="columns-2 break-lg aside-on-right">

			<div class="column column-fluid">

				<div class="paper">
					<div class="paper-base">
						<div class="paper-top"></div>
						<div class="paper-middle"></div>
					</div>
					<!-- .paper-base -->
					<div class="content">

						<?php
						if ( have_posts() ) {
							while ( have_posts() ) { the_post(); ?>
								<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
									<div class="post-head">
										<h2 class="post-title"><a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>" rel="bookmark"><?php the_title(); ?></a></h2>
										<div class="meta">
										<span class="sep">Posted on </span>
										<a href="<?php the_permalink(); ?>"><time class="entry-date" datetime="<?php echo get_the_date("U"); ?>" pubdate=""><?php echo get_the_date(); ?></time></a>
										<span class="by-author"> <span class="sep"> by </span> <span class="author vcard"><?php the_author_posts_link(); ?></span></span>		• <a href="<?php comments_link(); ?>" title="<?php the_title(); ?>"><span class="leave-reply"><?php comments_number( '0 comment', '1 comment', '% comments' ); ?></span></a>
										</div>

									</div>

									<div class="entry">

										<?php the_content(); ?>

										<div class="clear"></div>

										<div class="meta2">
											 Category: <?php the_category(' '); ?>
										</div>

									</div><!--/.entry-->

								</div>
							<?php }
						}
						?>

						<?php echo paginate_links(); ?>



					</div>
					<!-- .content -->
					<div class="paper-btm"></div>
				</div>
				<!-- .paper -->

			</div>
			<!-- .column -->


			<?php get_sidebar(); ?>


		</div>
		<!-- .columns-2 -->
	</div>
	<!-- .container -->

</section>
<!-- .content -->

<?php get_footer(); ?>