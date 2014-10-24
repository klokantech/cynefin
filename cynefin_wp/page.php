<?php get_header(); ?>

<section>
<?php
	if ( have_posts() ) {
		while ( have_posts() ) {
			the_post();
?>
	<div class="container">


		<div class="paper">
			<div class="paper-base">
				<div class="paper-top"></div>
				<div class="paper-middle"></div>
			</div>
			<!-- .paper-base -->
			<div class="content">
				<h1><?php the_title(); ?></h1>
				<?php the_content(); ?>
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