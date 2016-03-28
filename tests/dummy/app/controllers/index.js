import Ember from 'ember';
import {
  stream_layers
} from "../utils/stream-layers";

export default Ember.Controller.extend({
  datum: Ember.computed(function() {
    var testdata = stream_layers(9, 10+Math.random() * 100, 0.1).map(function(data, i) {
        return {
            key: 'Stream' + i,
            values: data.map(function(a){a.y = a.y * (i <= 1 ? -1 : 1); return a;})
        };
    });

   testdata[0].type = "area";
   testdata[0].yAxis = 1;
   testdata[1].type = "area";
   testdata[1].yAxis = 1;
   testdata[2].type = "line";
   testdata[2].yAxis = 1;
   testdata[3].type = "line";
   testdata[3].yAxis = 1;
   testdata[4].type = "scatter";
   testdata[4].yAxis = 1;
   testdata[5].type = "scatter";
   testdata[5].yAxis = 1;
   testdata[6].type = "bar";
   testdata[6].yAxis = 1;
   testdata[7].type = "bar";
   testdata[7].yAxis = 1;
   testdata[8].type = "bar";
   testdata[8].yAxis = 1;

   return testdata;
 }),

 datum1: Ember.computed(function() {
   var testdata = stream_layers(3, 10+Math.random() * 100, 0.1).map(function(data, i) {
       return {
           key: 'Stream' + i,
           values: data.map(function(a){a.y = a.y * i; return a;})
       };
   });

  testdata[0].type = "line";
  testdata[0].yAxis = 1;

  testdata[1].type = "line";
  testdata[1].yAxis = 1;

  testdata[2].values = [
    {x: 1, y: 0.1},
    {x: 5, y: 0.1},
    {x: 8, y: 0.1},
    {x: 14, y: 0.1}
  ];

  testdata[2].type = "scatter";
  testdata[2].yAxis = 1;
  return testdata;
 })
});
