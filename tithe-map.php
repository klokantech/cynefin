<?php
/*
Template Name: Tithe maps
*/

get_header();
?>


     <section class="application">
        <div id="application-panel" class="application-counties no-county-detail">
          <div class="columns-2">
            <div class="column column-thin">
              <div class="box box-counties">
                <div class="box-title box-inner">
                  <?php _e("Counties", "cynefin"); ?>
                </div>
                <!-- .box-title -->
                <div class="box-content box-content-scroll box-inner">
                  <ul id="counties-list" class="counties-list">
                    <li data-collection-id="86808972" data-center="51.7032,-2.9443" data-name="Monmouth"><a href="#" title=""><?php _e("Monmouth", "cynefin"); ?></a></li>
                    <li data-collection-id="22340810" data-center="51.5975,-3.6118" data-name="Glamorgan"><a href="#" title=""><?php _e("Glamorgan", "cynefin"); ?></a></li>
                    <li data-collection-id="25638567" data-center="51.8968,-4.1858" data-name="Carmarthen"><a href="#" title=""><?php _e("Carmarthen", "cynefin"); ?></a></li>
                    <li data-collection-id="51277134" data-center="51.8527,-4.8862" data-name="Pembroke"><a href="#" title=""><?php _e("Pembroke", "cynefin"); ?></a></li>
                    <li data-collection-id="93404486" data-center="52.2547,-4.0814" data-name="Cardigan"><a href="#" title=""><?php _e("Cardigan", "cynefin"); ?></a></li>
                    <li data-collection-id="28936324" data-center="51.9747,-3.4689" data-name="Brecknock"><a href="#" title=""><?php _e("Brecknock", "cynefin"); ?></a></li>
                    <li data-collection-id="83511215" data-center="52.2749,-3.2986" data-name="Radnor"><a href="#" title=""><?php _e("Radnor", "cynefin"); ?></a></li>
                    <li data-collection-id="19043053" data-center="52.6097,-3.4003" data-name="Montgomery"><a href="#" title=""><?php _e("Montgomery", "cynefin"); ?></a></li>
                    <li data-collection-id="57872648" data-center="53.0759,-3.4085" data-name="Denbigh"><a href="#" title=""><?php _e("Denbigh", "cynefin"); ?></a></li>
                    <li data-collection-id="90106729" data-center="53.2208,-3.2108" data-name="Flint"><a href="#" title=""><?php _e("Flint", "cynefin"); ?></a></li>
                    <li data-collection-id="54574891" data-center="52.8260,-3.8123" data-name="Merioneth"><a href="#" title=""><?php _e("Merioneth", "cynefin"); ?></a></li>
                    <li data-collection-id="61170405" data-center="53.0577,-4.1666" data-name="Caernarfon"><a href="#" title=""><?php _e("Caernarfon", "cynefin"); ?></a></li>
                    <li data-collection-id="96702243" data-center="53.2866,-4.3671" data-name="Anglesey"><a href="#" title=""><?php _e("Anglesey", "cynefin"); ?></a></li>
                  </ul>
                  <div class="partners partners-vertical">
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
                <!-- .box-content -->
              </div>
              <!-- .box-inner -->
            </div>
            <!-- .column -->
            <div id="county-detail" class="column column-wide">
              <div class="box box-county">
                <div class="box-title box-inner">
                  <a href="#" id="county-detail-hide"><span class="icon-chevron-left"></span></a>
                  <span id="county-detail-name"><?php _e("Montgomery", "cynefin"); ?></span>
                  <a href="/<?php echo ICL_LANGUAGE_CODE; ?>/contributors/" title="<?php _e("Contributors", "cynefin"); ?>" id="county-detail-contrib-link">O</a>
                  <form action="./" method="post" class="form form-filter">
                    <fieldset>
                      <div class="control-group">
                        <div class="control-field">
                          <span class="control-addon control-addon-small">
                            <input id="map-filter" type="text" class="control-input" placeholder="<?php _e("Filter", "cynefin"); ?>">
                            <span class="control-addon-item">
                              <span id="map-filter-clear" class="icon-remove"></span>
                            </span>
                          </span>
                        </div>
                        <!-- .control-field -->
                      </div>
                      <!-- .control-group -->
                    </fieldset>
                  </form>
                </div>
                <!-- .box-title -->
                <div id="map-list" class="box-content box-content-scroll box-inner">
                  <p class="filter">
                    <a id="map-filter-all" href="#" title="" class="active"><?php _e("All", "cynefin"); ?>&nbsp;(<span id="map-count-all"></span>)</a>
                    <span class="sep">|</span>
                    <span id="map-filter-scanned-block"> <!-- wrap for hiding -->
                      <a id="map-filter-scanned" href="#" title=""><?php _e("Scanned", "cynefin"); ?>&nbsp;(<span id="map-count-scanned"></span>)</a>
                      <span class="sep">|</span>
                    </span>
                    <a id="map-filter-notgeorefed" href="#" title=""><?php _e("Not georeferenced", "cynefin"); ?>&nbsp;(<span id="map-count-notgeorefed"></span>)</a>
                    <span class="sep" style="display:none;">|</span>
                    <a id="map-filter-nottransed" href="#" title="" style="display:none;"><?php _e("Not transcribed", "cynefin"); ?>&nbsp;(<span id="map-count-nottransed"></span>)</a>
                    <span class="sep">|</span>
                    <a id="map-filter-notfin" href="#" title=""><?php _e("Not finished", "cynefin"); ?>&nbsp;(<span id="map-count-notfin"></span>)</a>
                  </p>
                  <div class="progress">
                    <div class="bar">
                      <div id="progress-maps-reviewed-bar" class="bar-segment" style="width: 30%;">
                      </div>
                      <div id="progress-maps-edited-bar" class="bar-segment" style="width: 50%;">
                        <div id="progress-maps-reviewed" class="bar-label maps">30</div>
                      </div>
                      <div id="progress-maps-rest-bar" class="bar-segment" style="width: 20%;">
                        <div id="progress-maps-edited" class="bar-label maps">80</div>
                      </div>
                    </div>
                    <div id="progress-maps-total" class="bar-count maps">100</div>
                  </div>
                  <div class="progress">
                    <div class="bar">
                      <div id="progress-sheets-reviewed-bar" class="bar-segment" style="width: 30%;">
                      </div>
                      <div id="progress-sheets-edited-bar" class="bar-segment" style="width: 50%;">
                        <div id="progress-sheets-reviewed" class="bar-label sheets">30</div>
                      </div>
                      <div id="progress-sheets-rest-bar" class="bar-segment" style="width: 20%;">
                        <div id="progress-sheets-edited" class="bar-label sheets">80</div>
                      </div>
                    </div>
                    <div id="progress-sheets-total" class="bar-count sheets">100</div>
                  </div>


                  <div class="item item-btns">
                    <div class="floating-btn">
                      <a href="/<?php echo ICL_LANGUAGE_CODE; ?>/tithe-maps/transcribe/" title="" id="transcribe-random" class="btn"><?php _e("Transcribe", "cynefin"); ?></a>
                      <p><? printf(__('Already %s records', 'cynefin'), '<span id="stats-label-count"></span>'); ?></p>
                    </div>
                    <div class="floating-btn">
                      <a href="/<?php echo ICL_LANGUAGE_CODE; ?>/tithe-maps/georeference/" title="" id="georeference-random" class="btn"><?php _e("Georeference", "cynefin"); ?></a>
                      <p><? printf(__('Already %s points', 'cynefin'), '<span id="stats-gcp-count"></span>'); ?></p>
                    </div>
                  </div>
                  <div id="item-template">
                    <div class="item item-county">
                      <div class="item-media">
                        <!--thumbnail_url <img src="$thumbnail_url$/100,100,400,240/!200,120/0/native.jpg" alt="$title$" width="100" height="60"> thumbnail_url-->
                        <!--no_thumbnail <img src="<?php bloginfo("template_url"); ?>/assets/img/placeholder.png" alt="$title$" width="100" height="60"> no_thumbnail-->
                      </div>
                      <div class="item-content">
                        <h2>$title$</h2>
                        <!--
                        <p>
                          Records Transcribed - 247<br>
                          Records Paired - 30
                        </p>
                        -->
                        <div class="item-content-actions">
                          <!--transcription_url <a href="/<?php echo ICL_LANGUAGE_CODE; ?>/tithe-maps/transcribe/#$link_hash$" title=""><?php _e("Transcribe", "cynefin"); ?></a> transcription_url-->
                          <!--georeference_url <a href="/<?php echo ICL_LANGUAGE_CODE; ?>/tithe-maps/georeference/#$link_hash$" title=""><?php _e("Georeference", "cynefin"); ?></a> georeference_url-->
                          <!--visualize_url <a href="/<?php echo ICL_LANGUAGE_CODE; ?>/tithe-maps/visualize/#$link_hash$" title=""><?php _e("Visualize", "cynefin"); ?></a> visualize_url-->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- .box-content -->
              </div>
              <!-- .box -->
            </div>
            <!-- .column -->
          </div>
          <!-- .columns-2 -->
        </div>
        <!-- .application-sidebar -->
        <form class="form form-search-map form-small"><!-- form-search-map-collapsed -->
          <fieldset>
            <div class="control-group">
              <div class="control-field">
                <span class="control-appended">
                  <input id="nominatim-input" type="text" placeholder="<?php _e("Find a place on map", "cynefin"); ?>" class="control-input control-appended-input">
                  <span class="control-appended-btn">
                    <button type="submit"><span class="icon-search"></span></button>
                  </span>
                </span>
              </div>
            </div>
          </fieldset>
        </form>

        <!-- TODO class names -->

        <form class="form form-search-map form-search-map-collapsed form-small form-map-zoom-in">
          <fieldset>
            <div class="control-group">
              <div class="control-field">
                <span class="control-appended">
                  <span class="control-appended-btn">
                    <button id="map-zoom-in" type="submit"><span class="icon-plus"></span></button>
                  </span>
                </span>
              </div>
            </div>
          </fieldset>
        </form>

        <form class="form form-search-map form-search-map-collapsed form-small form-map-zoom-out">
          <fieldset>
            <div class="control-group">
              <div class="control-field">
                <span class="control-appended">
                  <span class="control-appended-btn">
                    <button id="map-zoom-out" type="submit"><span class="icon-minus"></span></button>
                  </span>
                </span>
              </div>
            </div>
          </fieldset>
        </form>

        <div style="position:absolute;bottom:25px;right:5px;">
          <a href="#" title="" id="howto-btn" class="btn" style="font-size:13px;text-transform:none;">
            <?php _e("How to navigate the tithe maps", "cynefin"); ?>
          </a>
        </div>
        <div id="howto-popup" style="display:none;background:#ede9dc;position:absolute;right:5px;bottom:25px;width:500px;padding:10px;">
          <span id="howto-popup-close" class="icon-remove" style="position:absolute;top:3px;right:3px;cursor:pointer;"></span>
          <p><?php _e("Start by selecting a county from the list on the left hand side.", "cynefin"); ?></p>
          <p><?php _e("After a few seconds a list of all the parishes in that county will appear.", "cynefin"); ?></p>
          <p><?php _e("Select the parish you’d like to view by clicking <b>transcribe</b>.", "cynefin"); ?></p>
          <p><?php _e("The tithe map and apportionment documents for that parish will then appear on your screen.", "cynefin"); ?></p>
          <p><?php _e("Please note that some maps may be missing from the website at this time. We are in the process of digitising all the maps, and they will be uploaded to the website over the coming months.", "cynefin"); ?></p>
        </div>
      </section>


<?php get_footer(); ?>
