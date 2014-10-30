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
                  Counties
                </div>
                <!-- .box-title -->
                <div class="box-content box-content-scroll box-inner">
                  <ul id="counties-list" class="counties-list">
                    <li data-collection-id="86808972" data-center="51.7032,-2.9443"><a href="#" title="">Monmouth</a></li>
                    <li data-collection-id="22340810" data-center="51.5975,-3.6118"><a href="#" title="">Glamorgan</a></li>
                    <li data-collection-id="25638567" data-center="51.8968,-4.1858"><a href="#" title="">Carmarthen</a></li>
                    <li data-collection-id="51277134" data-center="51.8527,-4.8862"><a href="#" title="">Pembroke</a></li>
                    <li data-collection-id="93404486" data-center="52.2547,-4.0814"><a href="#" title="">Cardigan</a></li>
                    <li data-collection-id="28936324" data-center="51.9747,-3.4689"><a href="#" title="">Brecknock</a></li>
                    <li data-collection-id="83511215" data-center="52.2749,-3.2986"><a href="#" title="">Radnor</a></li>
                    <li data-collection-id="19043053" data-center="52.6097,-3.4003"><a href="#" title="">Montgomery</a></li>
                    <li data-collection-id="57872648" data-center="53.0759,-3.4085"><a href="#" title="">Denbigh</a></li>
                    <li data-collection-id="90106729" data-center="53.2208,-3.2108"><a href="#" title="">Flint</a></li>
                    <li data-collection-id="54574891" data-center="52.8260,-3.8123"><a href="#" title="">Merioneth</a></li>
                    <li data-collection-id="61170405" data-center="53.0577,-4.1666"><a href="#" title="">Caernarfon</a></li>
                    <li data-collection-id="96702243" data-center="53.2866,-4.3671"><a href="#" title="">Anglesey</a></li>
                  </ul>
                  <div class="partners partners-vertical">
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
                <!-- .box-content -->
              </div>
              <!-- .box-inner -->
            </div>
            <!-- .column -->
            <div id="county-detail" class="column column-wide">
              <div class="box box-county">
                <div class="box-title box-inner">
                  <a href="#" id="county-detail-hide"><span class="icon-chevron-left"></span></a>
                  <span id="county-detail-name">Montgomery</span>
                  <form action="./" method="post" class="form form-filter">
                    <fieldset>
                      <div class="control-group">
                        <div class="control-field">
                          <span class="control-addon control-addon-small">
                            <input id="map-filter" type="text" class="control-input" placeholder="Filter">
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
                    <a id="map-filter-all" href="#" title="" class="active">All&nbsp;(<span id="map-count-all"></span>)</a>
                    <span class="sep">|</span>
                    <span id="map-filter-scanned-block"> <!-- wrap for hiding -->
                      <a id="map-filter-scanned" href="#" title="">Scanned&nbsp;(<span id="map-count-scanned"></span>)</a>
                      <span class="sep">|</span>
                    </span>
                    <a id="map-filter-notgeorefed" href="#" title="">Not&nbsp;georeferenced&nbsp;(<span id="map-count-notgeorefed"></span>)</a>
                    <span class="sep" style="display:none;">|</span>
                    <a id="map-filter-nottransed" href="#" title="" style="display:none;">Not&nbsp;transcribed&nbsp;(<span id="map-count-nottransed"></span>)</a>
                    <span class="sep">|</span>
                    <a id="map-filter-notfin" href="#" title="">Not&nbsp;finished&nbsp;(<span id="map-count-notfin"></span>)</a>
                  </p>
                  <div class="gadget progressbar">
                    <div class="metrics-container">
                      <div class="metrics">
                        <div class="metrics-pipeline">
                          <h2 class="total">
                            <span id="progress-total-count" class="count">3221</span>
                            <span class="label">maps</span>
                          </h2>
                          <ul class="pipeline">
                            <li id="progress-visual" class="group" title="Georeferenced">
                              <div class="state">
                                <span id="progress-percent" class="percent">45%</span>
                                <span class="label">Georeferenced</span>
                              </div>
                              <ul>
                                <li class="tooltip" style="width: 100%;" title="">
                                  <div class="color" style="background-color: #e95925"></div>
                                  <div class="status">
                                    <span id="progress-count" class="count">1462</span>
                                    <span class="label">maps</span>
                                  </div>
                                </li>
                              </ul>
                            </li>
                            <li id="progress-not-visual" class="group" title="Awaiting">
                              <div class="state">
                                <span id="progress-not-percent" class="percent">55%</span>
                                <span class="label">Awaiting</span>
                              </div>
                              <ul>
                                <li class="tooltip" style="width: 100%;" title="">
                                  <div class="color" style="background-color: #d7caad"></div>
                                  <div class="status">
                                    <span id="progress-not-count" class="count">1759</span>
                                    <span class="label">maps</span>
                                  </div>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="clearfix"></div>
                    </div>
                    <div class="note">The progress bar is updated live.</div>
                  </div>
                  <div class="item item-btn">
                    <div class="item-media">
                      <a href="/tithe-maps/transcribe" title="" id="transcribe-random" class="btn">Transcribe</a>
                    </div>
                    <div class="item-content">
                      <p>
                        Documents Total <span id="stats-docs-total"></span><br />
                        Documents Transcribed <span id="stats-docs-transed"><span>
                      </p>
                    </div>
                  </div>
                  <div class="item item-btn">
                    <div class="item-media">
                      <a href="/tithe-maps/georeference" title="" id="georeference-random" class="btn">Georeference</a>
                    </div>
                    <div class="item-content">
                      <p>
                        Maps Total <span id="stats-maps-total"></span><br />
                        Maps Georeferenced <span id="stats-maps-georefed"><span>
                      </p>
                    </div>
                  </div>
                  <br>
                  <div id="item-template">
                    <div class="item item-county">
                      <div class="item-media">
                        <!--thumbnail_url <img src="$thumbnail_url$/full/!105,75/0/native.jpg" alt="$title$"> thumbnail_url-->
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
                          <!--transcription_url <a href="/tithe-maps/transcribe#$link_hash$" title="">Transcribe</a> transcription_url-->
                          <!--georeference_url <a href="/tithe-maps/georeference#$link_hash$" title="">Georeference</a> georeference_url-->
                          <!--visualize_url <a href="/tithe-maps/visualize#$link_hash$" title="">Visualize</a> visualize_url-->
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
                  <input id="nominatim-input" type="text" placeholder="Find a place on map" class="control-input control-appended-input">
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
      </section>


<?php get_footer(); ?>