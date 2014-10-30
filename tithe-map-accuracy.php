<?php
/*
Template Name: Tithe maps accuracy
*/

get_header();
?>


<section class="application">
  <iframe id="app-frame" />
</section>

<script src="<?php bloginfo("template_url"); ?>/js/inittool.js"></script>
<script>
    initTool(4);
</script>
<style>
    body, .page, .application {position:absolute;top:0;bottom:0;left:0;right:0;}
    .application {top:120px;padding:0;}
    #app-frame {width:100%;height:100%;border:none;}
</style>

<?php get_footer(); ?>