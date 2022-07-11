Macro.add('spoiler', {
	tags: null,
	handler: function () {
		// Spoiler macro by SjoerdHekking
        // with the help of Cyrus Firheir
		'use strict';

		var errorArray = []; // Empty error array to address multiple problems
		var defaultBlur = 4; // default blur initial
		var defaultMax = 2; // default second blur - hover over
		var defaultHintText = 'Click to reveal completely'; // default hint text
		
		var storeArg = this.args[0];
		var storeArg2 = this.args[1];		
		var storeArg3 = (this.args[2] != null ? this.args[2] : defaultHintText).toString();

		if (storeArg) {
			if (typeof storeArg !== 'number') {
				storeArg = Number(storeArg);
			}
			if (Number.isNaN(storeArg)) {
				storeArg = defaultBlur;
				errorArray.push("Check first argument. The spoiler macro used the default");
			}
			if (storeArg < 0) {
				storeArg = defaultBlur;
				errorArray.push("Check first argument. Minimum is 0.");
			}
			if (storeArg > 10) {
				storeArg = defaultBlur;
				errorArray.push("Check first argument. Maximum is 10.");
			}
		} else {
			storeArg = defaultBlur;
		}

		if (storeArg2) {
			if (typeof storeArg2 !== 'number') {
				storeArg2 = Number(storeArg2);
			}
			if (Number.isNaN(storeArg2)) {
				storeArg2 = defaultMax;
				errorArray.push("Check second argument. The spoiler macro used the default");
			}
			if (storeArg2 < 0) {
				storeArg2 = defaultMax;
				errorArray.push("Check second argument. Minimum is 0.");
			}
			if (storeArg2 > 10) {
				storeArg2 = defaultMax;
				errorArray.push("Check second argument. Maxmium is 10.");
			}
		} else {
			storeArg2 = defaultMax;
		}

		if (errorArray.length > 0) {
		  var joinedArray = errorArray.join('\n')
		  return this.error(joinedArray);
		}

		var out = $(`<span class="macro-spoiler" />`)
			.wiki(this.payload[0].contents)
			.appendTo(this.output);

		spoilerAlert(out, {
			max: storeArg,
			partial: storeArg2,
			hintText: storeArg3
		});
	}
});

window.spoilerAlert = function (selector, opts) {
	var elements = $(selector);
	var defaults = {
		max: 4,
		partial: 2,
		hintText: 'Click to reveal completely'
	};

	Object.keys(defaults).forEach(function(key) {
		if (typeof opts[key] === "undefined") {
			opts[key] = defaults[key];
		}
	});

	var maxBlur = opts.max;
	var partialBlur = opts.partial;
	var hintText = opts.hintText;

	var processElement = function (index) {
		var el = elements.get(index);
		el['data-spoiler-state'] = 'shrouded';

		el.style.webkitTransition = '-webkit-filter 250ms';
		el.style.transition = 'filter 250ms';

		var applyBlur = function (radius) {
			el.style.filter = 'blur(' + radius + 'px)';
			el.style.webkitFilter = 'blur(' + radius + 'px)';
		}

		applyBlur(maxBlur);

		el.addEventListener('mouseover', function (e) {
			el.style.cursor = 'pointer';
			el.title = hintText;
			if (el['data-spoiler-state'] === 'shrouded') applyBlur(partialBlur);
		})

		el.addEventListener('mouseout', function (e) {
			el.title = hintText;
			if (el['data-spoiler-state'] === 'shrouded') applyBlur(maxBlur);
		})

		el.addEventListener('click', function (e) {
			switch (el['data-spoiler-state']) {
				case 'shrouded':
					el['data-spoiler-state'] = 'revealed';
					el.title = '';
					el.style.cursor = 'auto';
					applyBlur(0);
					break;
				default:
					el['data-spoiler-state'] = 'shrouded';
					el.title = hintText;
					el.style.cursor = 'pointer';
					applyBlur(maxBlur);
			}
		})
	}

	for (var i = 0; i !== elements.length; i++) processElement(i);
}