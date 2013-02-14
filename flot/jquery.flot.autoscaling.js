/*
Symmetric Auto-Scaling plugin for flot 
Copyright (c) 2013 Richard Townsend

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function ($) {

	var options = {};

	function init(plot) {

		var secondPass = false;

		plot.hooks.draw.push(function(plot, ctx) {
			if(secondPass) return;

			$.each(plot.getAxes(), function(axisName, axis) {
				var opts = axis.options;
				var autoScale;
				if (!opts) return;
				if (!opts['autoscale']) return;
				autoScale = opts.autoscale;
				if (!autoScale) return;

				minimum = axis.datamin;
				maximum = axis.datamax;
				largest = Math.max(Math.abs(maximum), Math.abs(minimum));
				axis.datamin = -largest;
				axis.datamax =  largest;
			})

			secondPass = true;
			plot.setupGrid();
			plot.draw();
		})

	}

    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'autoscale',
        version: '1.0'
    });

})(jQuery);