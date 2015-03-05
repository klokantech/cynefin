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
  #cws-my{display: none; margin: 40px 0;}
  #cws-my-error{display: none;}
  h1{margin-bottom: 0;}

  section .content{min-height: 600px !important;}
  section .paper-base{min-height: 800px !important;}

  .google-visualization-table-tr-head .gradient, 
  .google-visualization-table-tr-head-nonstrict .gradient, 
  .google-visualization-table-div-page .gradient{
    background: #d4c5a9 !important;  
  }
  .google-visualization-table-th, .google-visualization-table-td{
    border: 1px solid #d4c5a9 !important;
  }
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
          <h1><?php _e("Contributors", "cynefin"); ?></h1>
          <p class="filter">
            <a id="cws-filter-all" href="#" title=""><?php _e("All the time", "cynefin"); ?></a>
            <span class="sep">|</span>
            <a id="cws-filter-my" href="#" title=""><?php _e("My contributions", "cynefin"); ?></a>
            <span class="sep">|</span>
            <a id="cws-filter-county" href="#" title=""><?php _e("By county", "cynefin"); ?></a>
          </p>
          <select id="cws-filter-period">
            <option value="total" selected=""><?php _e("All period", "cynefin"); ?>:</option>
            <option value="month"><?php _e("Last month", "cynefin"); ?>:</option>
            <option value="week"><?php _e("Last week", "cynefin"); ?>:</option>
            <option value="day"><?php _e("Last day", "cynefin"); ?>:</option>
          </select>
          <div id="cws-widgets">
            <div id="cws-pie"></div>
            <div id="cws-table"></div>
          </div>
          <div id="cws-my">
            <p><b><?php _e("Score", "cynefin"); ?>:</b> <span id="cws-my-score"></span> points<br>
              <b><?php _e("Total contributions", "cynefin"); ?>?</b> <span id="cws-my-total"></span><br>
              <b><?php _e("Last month", "cynefin"); ?>:</b> <span id="cws-my-month"></span><br>
              <b><?php _e("Last week", "cynefin"); ?>:</b> <span id="cws-my-week"></span><br>
              <b><?php _e("Today", "cynefin"); ?>:</b> <span id="cws-my-day"></span></p>
          </div>
          <div id="cws-my-error">
            <p><?php _e("Please login to see results.", "cynefin"); ?> <a href="/<?php echo ICL_LANGUAGE_CODE; ?>/tithe-maps/"><?php _e("Tithe maps", "cynefin"); ?></a></p>
          </div>
          <div class="paper-btm"></div>
        </div>
        <div id="cws-map"></div>
      </div>
    </div>
  </div>
</section>
<script type="text/javascript" src="http://d3js.org/d3.v3.min.js"></script>
<script type="text/javascript" src="http://d3js.org/topojson.v1.min.js"></script>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script src="<?php bloginfo("template_url"); ?>/js/contributors.js" type="text/javascript"></script>
<script type="text/javascript">
  var basePath = '<?php bloginfo("template_url"); ?>';
  contributors(basePath);
</script>
<?php get_footer(); ?>