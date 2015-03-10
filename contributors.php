<?php
/*
  Template Name: Contributors
 */

get_header();
?>

<style>
  #cws-map path {stroke-width: 1px; stroke: white; fill: #d4c5a9; cursor: pointer;}
  #cws-map path:hover,  #cws-map path.highlighted {fill: #ff660f;}
  div.tooltip {
    position: absolute;
    background-color: white;
    border: 1px solid black;
    color: black;
    font-weight: bold;
    padding: 4px 8px;
    display: none;
  }
  #cws-pie{margin-left: -50px;}
  #cws-map, #cws-content{width: 50%;float: left;}
  #cws-map{text-align: right; padding-top: 30px;}
  #cws-content{}
  #cws-filter-period{height: 16px; padding: 3px 6px; font-size: 12px;}
  #cws-my{display: none; margin: 20px 0;}
  #cws-my-error{display: none;}
  #cws-text{clear: both;}
  h1{margin-bottom: 0;}

  .progress{
    width: 500px;
    padding: 10px 0 10px 0;
    height: 50px;
    font-size: 12px;
    line-height: 12px;
  }
  .bar{width: 80%;height: 42px;float: left;}
  .bar-segment{
    float: left;
    background-color: #d4c5a9;
    height: 15px;
    display: block;
  }
  .bar-segment:first-child{background-color: #da4d00;}
  .bar-segment:first-child:before, .bar-segment:nth-child(2):before{
    position: absolute;
    margin-top: -15px;
    padding-right: 10px;
  }
  .bar-label{
    position: absolute;
    font-size: 10px;
    margin-top: 15px;
    padding-top: 4px;
  }
  #progress-my{position: absolute;}
  #progress-my .bar-label{margin-top: -18px;}
  #progress-labels .bar-label{border-left: 1px solid #000; padding-left: 5px;}
</style>

<section>
  <div class="container">
    <div class="paper">
      <div class="paper-base">
        <div class="paper-top"></div>
        <div class="paper-middle"></div>
      </div>
      <div class="content">
        <div id="cws-content">
          <h1><?php the_title(); ?></h1>
          <p class="filter">
            Filter:
            <a id="cws-filter-all" href="#" title="" class="active"><?php _e('Whole project', 'cynefin'); ?></a>
            <span class="sep">|</span>
            <a id="cws-filter-my" href="#" title=""><?php _e('My contributions', 'cynefin'); ?></a>
            <span class="sep">|</span>
            <a id="cws-filter-county" href="#" title=""><?php _e('By county', 'cynefin'); ?></a>
          </p>
          <select id="cws-filter-period">
            <option value="total" selected=""><?php _e('All period', 'cynefin'); ?></option>
            <option value="month"><?php _e('Last month', 'cynefin'); ?></option>
            <option value="week"><?php _e('Last week', 'cynefin'); ?></option>
            <option value="day"><?php _e('Last day', 'cynefin'); ?></option>
          </select>
          <div id="cws-widgets">
            <div id="cws-pie"></div>
            <div id="cws-table"></div>
          </div>
          <div id="cws-my">
            <h2><?php _e('My level', 'cynefin'); ?></h2>
            <div class="progress" id="progress-my">
              <div class="bar">
                <div id="cws-my-bar-sgm1" class="bar-segment" style="width: 30%;">
                  <div class="bar-label"></div>
                </div>
                <div id="cws-my-bar-sgm2" class="bar-segment" style="width: 70%;">
                  <div id="cws-my-bar-score" class="bar-label"></div>
                </div>
              </div>
            </div>
            <div class="progress" id="progress-labels">
              <div class="bar">
                <div class="bar-segment" style="width: 20%;">
                  <div class="bar-label maps">Tenant</div>
                </div>
                <div class="bar-segment" style="width: 20%;">
                  <div class="bar-label maps">Landowner</div>
                </div>
                <div class="bar-segment" style="width: 20%;">
                  <div class="bar-label maps">Valuer</div>
                </div>
                <div class="bar-segment" style="width: 20%;">
                  <div class="bar-label maps">Surveyor</div>
                </div>
                <div class="bar-segment" style="width: 20%;">
                  <div class="bar-label maps">Commissioner</div>
                </div>
              </div>
            </div>
            <p><?php _e('Make', 'cynefin'); ?> <b><span id="cws-nextscore"></span> <?php _e('points', 'cynefin'); ?></b> <?php _e('to reach next level', 'cynefin'); ?>!</p>
            <h2><?php _e('In numbers', 'cynefin'); ?></h2>
            <p><?php _e('Score', 'cynefin'); ?>: <span id="cws-my-score"></span> points<br>
              <?php _e('Total contributions', 'cynefin'); ?>: <span id="cws-my-total"></span><br>
              <?php _e('Last month', 'cynefin'); ?>: <span id="cws-my-month"></span><br>
              <?php _e('Last week', 'cynefin'); ?>: <span id="cws-my-week"></span><br>
              <?php _e('Today', 'cynefin'); ?>: <span id="cws-my-day"></span></p>
          </div>
          <div id="cws-my-error">
            <p><?php _e('Please login to see results.', 'cynefin'); ?> <a href="/<?php echo ICL_LANGUAGE_CODE; ?>/tithe-maps/"><?php _e('Tithe maps', 'cynefin'); ?></a></p>
          </div>
        </div>
        <div id="cws-map"></div>
        <div id="cws-text">
          <?php the_content(); ?>
        </div>
      </div>
      <div class="paper-btm"></div>
    </div>
  </div>
</section>
<script type="text/javascript" src="http://d3js.org/d3.v3.min.js"></script>
<script type="text/javascript" src="http://d3js.org/topojson.v1.min.js"></script>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script src="<?php bloginfo('template_url'); ?>/js/contributors.js" type="text/javascript"></script>
<script type="text/javascript">
  var basePath = '<?php bloginfo('template_url'); ?>';
  new Contributors(basePath);
</script>
<?php get_footer(); ?>