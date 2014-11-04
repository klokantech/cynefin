		</div>
		<!-- .page -->
		<script src="<?php bloginfo("template_url"); ?>/assets/js/app.js"></script>
		<?php
		if (is_page_template("tithe-map.php")) { ?>
			<script src="<?php bloginfo("template_url"); ?>/js/tithe-maps.js"></script>
			<script>jQuery(document).ready(function() {new TitheMaps();});</script>
		<?php } elseif(!is_front_page()) { ?>
			<script src="<?php bloginfo("template_url"); ?>/js/app.js"></script>
		<?php }
		?>
	 	<?php wp_footer(); ?>
	 	<script>
	 		<?php echo 'var LANG = "' . ICL_LANGUAGE_CODE . '";'; ?>
	 	</script>
	</body>
</html>