Macro.add('dyslexia', {
	tags: null,
	handler  : function () {
		// Dyslexia by SjoerdHekking
		'use strict';

		var out = $(`<span class="macro-mess-up-words" />`)
        	.wiki(this.payload[0].contents)
          	.appendTo(this.output);

		// returns texts
		var getTextNodesIn = function(el) {
		    return $(el).find(":not(iframe,script)").addBack().contents().filter(function() {
		        return this.nodeType === 3;
		    });
		};

		// only allow scanning within these tags
		var textNodes = getTextNodesIn(out);

		var errorArray = []; // Empty error array to address multiple problems

		var storeArg = this.args[0]; // Store args 1 for use outside of function
		var storeArg2 = this.args[1]; // Store args 2 for use outside of function
		var storeArg3 = this.args[2]; // Store args 3 for use outside of function

		var defaultChance = 10; // default time for shuffling chance in percentage
		var defaultSize = 3; // default size for length of words
		var defaultSpeed = 50; // default delay for dynamic changes

		if (storeArg) {
			if (typeof storeArg !== 'number') {
				storeArg = Number(storeArg);
			}
			if (Number.isNaN(storeArg)) {
				storeArg = defaultChance;
				errorArray.push("Check first argument. The dyslexia macro used the default.");
			}
			if (storeArg < 0) {
				storeArg = defaultChance;
				errorArray.push("Check first argument. Negative numbers are not allowed.");
			}
            if (storeArg > 100) {
				storeArg = defaultChance;
				errorArray.push("Check first argument. Numbers higher than 100 are not allowed.");
			}
		} else {
			storeArg = defaultChance;
		}

		if (storeArg2) {
			if (typeof storeArg2 !== 'number') {
				storeArg2 = Number(storeArg2);
			}
			if (Number.isNaN(storeArg2)) {
				storeArg2 = defaultSize;
				errorArray.push("Check second argument. The dyslexia macro used the default.");
			}
			if (storeArg2 < 2) {
				storeArg2 = defaultSize;
				errorArray.push("Check second argument. Minimum word size is 2.");
			}
		} else {
			storeArg2 = defaultSize;
		}

		if (storeArg3) {
			if (typeof storeArg3 !== 'number') {
				storeArg3 = Number(storeArg3);
			}
			if (Number.isNaN(storeArg3)) {
				storeArg3 = defaultSpeed;
				errorArray.push("Check third argument. The dyslexia macro used the default.");
			}
			if (storeArg3 < 50) {
				storeArg3 = defaultSize;
				errorArray.push("Check third argument. Minimum delay is 50.");
			}
		} else {
			storeArg3 = defaultSpeed;
		}

		if (errorArray.length > 0) {
		  var joinedArray = errorArray.join('\n')
		  return this.error(joinedArray);
		}

		function isLetter(char) {
			return /^[\d]$/.test(char);
		}

		var wordsInTextNodes = [];
		for (var i = 0; i < textNodes.length; i++) {
			var node = textNodes[i];

			var words = []

			var re = /\w+/g;
			var match;
			while ((match = re.exec(node.nodeValue)) != null) {

				var word = match[0];
				var position = match.index;

				words.push({
					length: word.length,
					position: position
				});
			}

			wordsInTextNodes[i] = words;
		};

		function messUpWords () {
			for (var i = 0; i < textNodes.length; i++) {

				var node = textNodes[i];

				for (var j = 0; j < wordsInTextNodes[i].length; j++) {
					
					if (Math.random() < (100 - storeArg) / 100 ) {
						continue;
					}

					var wordMeta = wordsInTextNodes[i][j];
					var word = node.nodeValue.slice(wordMeta.position, wordMeta.position + wordMeta.length);
					var before = node.nodeValue.slice(0, wordMeta.position);
					var after  = node.nodeValue.slice(wordMeta.position + wordMeta.length);

					node.nodeValue = before + messUpWord(word) + after;
				};
			};
		}

		function messUpWord (word) {
			if (word.length < storeArg2) {
				return word;
			}
			return word[0] + messUpMessyPart(word.slice(1, -1)) + word[word.length - 1];
		}

		function messUpMessyPart (messyPart) {
			if (messyPart.length < 2) {

				return messyPart;
			}
			var a, b;
			while (!(a < b)) {
				a = getRandomInt(0, messyPart.length - 1);
				b = getRandomInt(0, messyPart.length - 1);
			}

			return messyPart.slice(0, a) + messyPart[b] + messyPart.slice(a+1, b) + messyPart[a] + messyPart.slice(b+1);
		}

		// random random value between given min and max
		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}
		// set interval for dynamic DOM changes
		setInterval(messUpWords, storeArg3);
	}
});



