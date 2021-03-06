/**
 * @fileoverview Tests for the setVisibility function.
 * @author sergeyslepian@gmail.com
 */

var VisibilityTestCase = TestCase("visibility");

VisibilityTestCase.prototype.setUp = function() {
  document.body.innerHTML = "<div id='graph'></div>";
};

VisibilityTestCase.prototype.tearDown = function() {
};

/**
 * Does a bunch of the shared busywork of setting up a graph and changing its visibility.
 * @param {boolean} startingVisibility The starting visibility of all series on the graph
 * @param {*[]} setVisibilityArgs An array of arguments to be passed directly to setVisibility()
 * @returns {string} The output of Util.getLegend() called after the visibility is set
 */
VisibilityTestCase.prototype.getVisibleSeries = function(startingVisibility, setVisibilityArgs) {
  var opts = {
    width: 480,
    height: 320,
    labels: ['x', 'A', 'B', 'C', 'D', 'E'],
    legend: 'always',
    visibility: []
  };

  // set the starting visibility
  var numSeries = opts.labels.length - 1;
  for(var i = 0; i < numSeries; i++) {
    opts.visibility[i] = startingVisibility;
  }

  var data = [];
  for (var j = 0; j < 10; j++) {
    data.push([j, 1, 2, 3, 4, 5]);
  }

  var graph = document.getElementById("graph");
  var g = new Dygraph(graph, data, opts);

  g.setVisibility.apply(g, setVisibilityArgs);

  return Util.getLegend();
};

VisibilityTestCase.prototype.testDefaultCases = function() {
  assertEquals(' A  B  C  D  E', this.getVisibleSeries(true, [[], true]));
  assertEquals('', this.getVisibleSeries(false, [[], true]));
};

VisibilityTestCase.prototype.testSingleSeriesHide = function() {
  assertEquals(' A  C  D  E', this.getVisibleSeries(true, [1, false]));
};

VisibilityTestCase.prototype.testSingleSeriesShow = function() {
  assertEquals(' E', this.getVisibleSeries(false, [4, true]));
};

VisibilityTestCase.prototype.testMultiSeriesHide = function() {
  assertEquals(' A  E', this.getVisibleSeries(true, [[1,2,3], false]));
};

VisibilityTestCase.prototype.testMultiSeriesShow = function() {
  assertEquals(' B  D', this.getVisibleSeries(false, [[1,3], true]));
};