/*jshint node:true*/
module.exports = {
  description: 'Add D3 and nvg chart packages in bower dependencies'
  afterInstall: function() {
    return RSVP.all([
      this.addBowerPackageToProject('d3', "3.5.16"),
      this.addBowerPackageToProject('nvd3', '1.8.2'),
    ]);
  }
};
