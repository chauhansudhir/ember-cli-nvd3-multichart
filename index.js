/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-nvd3-multichart',
  included: function(app) {
    this._super.included(app);
    var options = app.options['ember-cli-nvd3-multichart'];
    app.import(app.bowerDirectory + '/d3/d3.min.js');
    app.import(app.bowerDirectory + '/nvd3/build/nv.d3.min.js');
    app.import(app.bowerDirectory + '/nvd3/build/nv.d3.min.css');
  }
};
