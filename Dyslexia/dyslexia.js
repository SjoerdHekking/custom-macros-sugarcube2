Macro.add('dyslexia', {
	tags: null,
	handler  : function () {
		// Dyslexia by SjoerdHekking
		'use strict';

		let out = $(`<span class="macro-mess-up-words" />`)
        	.wiki(this.payload[0].contents)
          	.appendTo(this.output);

		// returns texts
		let getTextNodesIn = function(el) {
		    return $(el).find(":not(iframe,script)").addBack().contents().filter(function() {
		        return this.nodeType === 3;
		    });
		};

		// only allow scanning within these tags
		let textNodes = getTextNodesIn(out);

		let errorArray = [];

		let storeArg = this.args[0] || 10;
		let storeArg2 = this.args[1] || 3;
		let storeArg3 = this.args[2] || 50;

		if (storeArg) {
			storeArg = parseInt(storeArg);
			if (isNaN(storeArg) || storeArg < 0 || storeArg > 100) {
				errorArray.push("Check first argument. Invalid value.");
			}
		} 
		if (storeArg2) {
			storeArg2 = parseInt(storeArg2);
			if (isNaN(storeArg2) || storeArg2 < 2) {
				errorArray.push("Check second argument. Invalid value.");
			}
		} 
		if (storeArg3) {
			storeArg3 = parseInt(storeArg3);
			if (isNaN(storeArg3) || storeArg3 < 50) {
				errorArray.push("Check third argument. Invalid value.");
			}
		} 

		if (errorArray.length > 0) {
			let joinedArray = errorArray.join('\n')
			return this.error(joinedArray);
		}

		let wordsInTextNodes = [];
		for (let i = 0; i < textNodes.length; i++) {
			const node = textNodes[i];
			const wordsInNode = node.nodeValue.match(/\w+/g) || [];
		
			wordsInTextNodes[i] = wordsInNode.map((word, index) => ({
				length: word.length,
				position: node.nodeValue.indexOf(word, index === 0 ? 0 : wordsInNode[index - 1].length + wordsInNode[index - 1].index)
			}));
		}

		/**
		 * Messes up the words in text nodes according to the probability and word length delay set in the dyslexia macro.
		 */
		function messUpWords () {
			for (let i = 0; i < textNodes.length; i++) {
				let node = textNodes[i];

				for (let j = 0; j < wordsInTextNodes[i].length; j++) {
					
					if (Math.random() < (100 - storeArg) / 100 ) {
						continue;
					}

					let wordMeta = wordsInTextNodes[i][j];
					let word = node.nodeValue.slice(wordMeta.position, wordMeta.position + wordMeta.length);
					node.nodeValue = node.nodeValue.slice(0, wordMeta.position) + messUpWord(word) + node.nodeValue.slice(wordMeta.position + wordMeta.length);
				};
			};
		}

		/**
		 * Messes up a single word by swapping random letters in the "messy part" of the word (i.e. all letters except the first and last).
		 * @param {string} word - The word to mess up.
		 * @returns {string} The messed up word, or the original word if its length is less than the minimum word length specified in the dyslexia macro.
		 */
		function messUpWord (word) {
			if (word.length < storeArg2) return word;
			const middle = messUpMessyPart(word.slice(1, -1));
  			return `${word[0]}${middle}${word.slice(-1)}`;
		}

		/**
		 * Messes up the "messy part" of a word by swapping two random letters.
		 * @param {string} messyPart - The "messy part" of a word to mess up.
		 * @returns {string} The messed up "messy part", or the original "messy part" if its length is less than 2.
		 */
		function messUpMessyPart (messyPart) {
			if (messyPart.length < 2) return messyPart;

			let a, b;
			while (!(a < b)) {
				a = getRandomInt(0, messyPart.length - 1);
				b = getRandomInt(0, messyPart.length - 1);
			}

			function getRandomInt(min, max) {
				return Math.floor(Math.random() * (max - min + 1) + min);
			}

			return `${messyPart.slice(0, a)}${messyPart[b]}${messyPart.slice(a+1, b)}${messyPart[a]}${messyPart.slice(b+1)}`;
		}

		setInterval(messUpWords, storeArg3);
	}
});



