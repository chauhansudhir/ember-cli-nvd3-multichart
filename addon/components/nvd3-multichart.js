import Ember from 'ember';
//import layout from '../templates/components/nvd3-multichart';
const {run, on, observer, computed} = Ember;
export default Ember.Component.extend({
  //layout: layout,
  classNames: ['nvd3-multichart'],

  datum: null,

  /**
   * if custom format required for axis ticks. method will be called in targetContext
   */
  customTickFormatFn: null,

  /**
   * chart options
   * transitionDuration: 300,
   * useInteractiveGuideline: true,
   */
  options: null,
  /**
   * chart margins fron all corners
   * defaults: {top: 30, right: 60, bottom: 50, left: 70}
   */
  margin: null,
  // chart height
  // need to set component height and width using css as well
  height: 500,

  // chart width
  // need to set component height and width using css as well
  width: 500,

  /*
   * category10:  d3.scale.category10 - construct an ordinal scale with ten categorical colors.
   * category20:  d3.scale.category20 - construct an ordinal scale with twenty categorical colors.
   * category20b: d3.scale.category20b - construct an ordinal scale with twenty categorical colors.
   * category20c: d3.scale.category20c - construct an ordinal scale with twenty categorical colors.
   * default : category10
  */
  colorScale: null,

  /*
   * color takes priority on colorScale
   * color: ["#FF0000","#00FF00","#0000FF"]
   */
  colors: null,

  /**
   * method to share chart object with the callee to do customization
   */
  chartContextFn: Ember.K,

  reDrawChart: on('init', observer('datum', 'datum.[]', function() {
    run.scheduleOnce('render', this, this.nvChartDraw);
  })),

  colorScaleRange: computed("colorScale", function() {
    let scales =  {
      category10:  d3.scale.category10().range(),
      category20:  d3.scale.category20().range(),
      category20b: d3.scale.category20b().range(),
      category20c: d3.scale.category20c().range(),
    };
    let scale = scales[this.get("colorScale")];
    Ember.assert("Check for color scale", !scale);
    return  scale || d3.scale.category20().range();
  }),

  chartOptions: computed("options", function() {
    let options = this._extendObject(
      {
        transitionDuration: 300,
        useInteractiveGuideline: true,
        colors: this.get('colors') || undefined,
        height: this.get("height") || 800
      },
      this.get("options"));
      return options;
  }),

  chartMargin: computed("margin", function() {
    return this._extendObject(
        {top: 30, right: 60, bottom: 50, left: 70},
        this.get("margin"));
  }),

  /**
   * useful to call dynamic context
   */
  _currentTargetContext: computed(function() {
    return this.get("targetContext") || this;
  }),

  nvChartDraw() {
    nv.addGraph(() => {
      let selector = "#" + this.get('elementId');
      Ember.$(selector).html("");

      let svg = d3.select(selector).append("svg");
      let options = this.get("chartOptions");
      let context = this.get("_currentTargetContext");
      let customTickFormatFn = this.get("customTickFormatFn");

      let chart = nv.models.multiChart()
          .options(options)
          .margin(this.get("chartMargin"));

      if(!this.get("colors")) {
        chart.color(this.get("colorScaleRange"));
      }

      if(customTickFormatFn) {
        run(() => customTickFormatFn.call(context, chart));
      }
      else {
        chart.xAxis.tickFormat(d3.format(',f'));
        chart.yAxis1.tickFormat(d3.format(',.1f'));
      }
      svg
          .datum(this.get('datum'))
          .transition().duration(500).call(chart);

      run(() => this.get('chartContextFn').call(context, chart, svg, this, selector));

      nv.utils.windowResize(chart.update);

      return chart;
    });
  },
  /**
   * override default values with the user probided values,
   * TODO:: find better way to extend both object with objB properties precedence
   */
  _extendObject(objA, objB) {
    objA = objA || {};
    objB = objB || {};
    return Ember.$.extend(objA, objB);
  }
});
