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
      var STATS_NAME_LABEL = '<?php _e("Name", "cynefin"); ?>';
      var STATS_TEAM_LABEL = '<?php _e("Team", "cynefin"); ?>';
      var STATS_SCORE_LABEL = '<?php _e("Score", "cynefin"); ?>';
	 	</script>
<?php
  if(is_page_template("tithe-map-georeference.php")){
    $videoId = (ICL_LANGUAGE_CODE == "cy" ? 'nJ7Y36YwttE' : '-cNmx3MbSEo');
  }else if(is_page_template("tithe-map-transcribe.php")){
    $videoId = (ICL_LANGUAGE_CODE == "cy" ? 'TmDIuXo00ys' : '_NMTleL57P8');
  }else if(is_front_page()) {
    $videoId = (ICL_LANGUAGE_CODE == "cy" ? 'WjO3wovNnGs' : 'qomRXu-1dWg');
  }
  if(isset($videoId)){
  ?>
<!-- video -->
<div id="popup-bg">
  <div id="popup">
    <div id="popup-video"></div>
  </div>
</div>

<script type="text/javascript">
  document.getElementById('popup-bg').onclick = bindPopup;
  document.getElementById('popup-btn').onclick = bindPopup;

  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var autoplay = false;
  var player;
  function bindPopup() {
    var popBg = document.getElementById('popup-bg');
    if (popBg.className === 'active') {
      popBg.className = '';
      if (player) player.stopVideo();
    } else {
      popBg.className = 'active';
      if (player) {
        player.seekTo(0);
        player.playVideo();
      }
    }
    return false;
  };
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('popup-video', {
      width: '640',
      height: '480',
      videoId: '<?php echo $videoId; ?>',
      playerVars: {'showinfo': 0, 'rel': 0, 'controls': 2},
      events: {
        'onReady': function(e) {if (autoplay) bindPopup();},
        'onStateChange': function(e) {if (e.data === 0) bindPopup();}
      }
    });
  };
  <?php if (!is_front_page()) { // do not autoplay on front page
          $md5Id = 'v' + md5($videoId); // to "remove" bad characters
  ?>
  if (document.cookie.indexOf('<?php echo $md5Id; ?>') < 0) {
          var date = new Date(); date.setTime(date.getTime()+(365*24*60*60*1000));
          document.cookie = '<?php echo $md5Id; ?>=1; expires='+date.toGMTString()+'; path=/';
          autoplay = true;
  }
  <?php } ?>
</script>
<!-- endvideo -->
        <?php } ?>
	</body>
</html>
