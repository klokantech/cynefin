<?php get_header(); ?>

<section>
  <?php
  if (have_posts()) {
    while (have_posts()) {
      the_post();
      ?>
      <div class="container">
        <div class="intro">
          <p>
            <a href="<?php bloginfo("url"); ?>" class="sprite-logo-large"><?php bloginfo("name"); ?></a>
          </p>
          <p>
            <a href="<?php echo (ICL_LANGUAGE_CODE == "cy" ? '/cy/cymerwch-ran/' : '/en/take-part/') ?>" class="btn btn-large btn-noise"><?php _e("Get started", "cynefin"); ?></a>
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
                  <a href="<?php echo (ICL_LANGUAGE_CODE == "cy" ? '/cy/y-prosiect/am-y-mapiau-degwm/' : '/en/sample-page-2/about-tithe-maps/') ?>">
                    <strong id="stats_maps">&nbsp;</strong>
                    <?php _e("Maps", "cynefin"); ?>
                  </a>
                </div>
                <!-- .column -->
                <div class="column">
                  <a href="<?php echo (ICL_LANGUAGE_CODE == "cy" ? '/cy/cymerwch-ran/' : '/en/take-part/') ?>">
                    <strong id="stats_total_volunteers">&nbsp;</strong>
                    <?php _e("Total Volunteers", "cynefin"); ?>
                  </a>
                </div>
                <!-- .column -->
                <div class="column">
                  <a href="<?php echo (ICL_LANGUAGE_CODE == "cy" ? '/cy/cymerwch-ran/' : '/en/take-part/') ?>">
                    <strong id="stats_records_transed">&nbsp;</strong>
                    <?php _e("Records Transcribed", "cynefin"); ?>
                  </a>
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
                <p>
                  <b><?php _e("Follow us on", "cynefin"); ?></b> &nbsp;
                  <a href="https://twitter.com/cynefinproject" target="_blank" style="font-family:'icons';color:#55ACEE;font-size:20px;text-decoration:none;vertical-align:text-bottom;">&#xe621;</a>
                  <a href="https://www.facebook.com/cynefinproject/" target="_blank" style="font-family:'icons';color:#3B5998;font-size:20px;text-decoration:none;vertical-align:text-bottom;">&#xe620;</a>
                </p>
                <h2><?php _e("Newsletter signup", "cynefin"); ?></h2>
                <!-- Begin MailChimp Signup Form -->
                <div id="mc_embed_signup">
                  <form action="//wales.us11.list-manage.com/subscribe/post?u=0bd7432dc29f2351e63d68328&amp;id=f99ec3ceba" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                    <div id="mc_embed_signup_scroll">
                      <input style="width:125px; padding: 4px 0 4px 4px;border-radius: 5px;border: 1px solid #989898;" type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="<?php _e("email address", "cynefin"); ?>" required>
                      <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                      <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_0bd7432dc29f2351e63d68328_f99ec3ceba" tabindex="-1" value=""></div>
                      <input style="margin-top: -3px;" type="submit" value="<?php _e("Subscribe", "cynefin"); ?>" name="subscribe" id="mc-embedded-subscribe" class="btn btn-small">
                    </div>
                  </form>
                </div>
                <!-- End MailChimp Signup Form -->
                <br>

                <h2><?php _e("Video introduction", "cynefin"); ?></h2>
                <p>
                  <a href="#" class="thumb" id="popup-btn">
                    <img src="<?php bloginfo("template_url"); ?>/assets/img/video-placeholder.png" alt="<?php _e("Watch video", "cynefin"); ?>">
                  </a>
                </p>
                <br>
                <div id="topc">
                  <h1><a href="/<?php echo ICL_LANGUAGE_CODE; ?>/contributors/"><?php _e("Top contributors", "cynefin"); ?></a></h1>
                  <h2><?php _e("Previous day", "cynefin"); ?></h2>
                  <div id="topc-day"></div>
                  <br>
                  <h2><?php _e("All the time", "cynefin"); ?></h2>
                  <div id="topc-all"></div>
                </div>
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
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script src="<?php bloginfo("template_url"); ?>/js/home.js" type="text/javascript"></script>
<script>
  google.load('visualization', '1', {'packages': ['table'], 'callback': function() {
      new Home();
    }});
</script>

<?php get_footer(); ?>
