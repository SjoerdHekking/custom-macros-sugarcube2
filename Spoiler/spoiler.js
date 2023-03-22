Macro.add("spoiler", {
	tags: null,
	handler: function () {
		// Spoiler macro by SjoerdHekking
        // with the help of Cyrus Firheir
		"use strict";

		let errorArray = [];
		const storeArg = Math.min(10, Math.max(0, parseInt(this.args[0] ?? 4)));
		const storeArg2 = Math.min(10, Math.max(0, parseInt(this.args[1] ?? 2)));
		const storeArg3 = String(this.args[2] ?? "Click to reveal completely");
		
		if (isNaN(storeArg)) {
			errorArray.push("Check first argument. The spoiler macro used the default");
		}
		
		if (isNaN(storeArg2)) {
			errorArray.push("Check second argument. The spoiler macro used the default");
		}

		if (errorArray.length > 0) {
		  let joinedArray = errorArray.join("\n")
		  return this.error(joinedArray);
		}

		let out = $(`<span class="macro-spoiler" />`)
			.wiki(this.payload[0].contents)
			.appendTo(this.output);

		spoiler(out, {
			max: storeArg,
			partial: storeArg2,
			hintText: storeArg3
		});

		function spoiler(selector, options) {
			const elements = $(selector);
		
			elements.each(function(index, el) {
				el.dataset.spoilerState = "shrouded";
				el.style.transition = "filter 250ms";
		
				function applyBlur(radius) {
					el.style.filter = `blur(${radius}px)`;
				}
		
				applyBlur(options.max);
		
				el.addEventListener("mouseover", function () {
					el.style.cursor = "pointer";
					el.title = options.hintText;
					if (el.dataset.spoilerState === "shrouded") applyBlur(options.partial);
				});
		
				el.addEventListener("mouseout", function () {
					el.title = options.hintText;
					if (el.dataset.spoilerState === "shrouded") applyBlur(options.max);
				});
		
				el.addEventListener("click", function () {
					if (el.dataset.spoilerState === "shrouded") {
						el.dataset.spoilerState = "revealed";
						el.title = "";
						el.style.cursor = "auto";
						applyBlur(0);
					} else {
						el.dataset.spoilerState = "shrouded";
						el.title = options.hintText;
						el.style.cursor = "pointer";
						applyBlur(options.max);
					}
				});
			});
		}
	}
});