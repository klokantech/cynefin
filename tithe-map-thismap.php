<?php
/*
Template Name: Tithe maps this map
*/

get_header();
?>


<section class="application">
  <iframe id="app-frame"></iframe>
</section>

<script src="<?php bloginfo("template_url"); ?>/js/inittool.js"></script>
<script>
jQuery(document).ready(function() {
	initTool(5);
});
</script>
<style>
	body, .page, .application {position:absolute;top:0;bottom:0;left:0;right:0;background-image:none;}
	.application {top:120px;padding:0;}
	#app-frame {width:100%;height:100%;border:none;}
</style>


<?php get_footer(); ?>