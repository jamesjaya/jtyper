const MAX_LENGTH = 200;

function removeDuplicates(charset = '') {
	const dict = [];
	
	for (let c of charset) {
		dict[c] = true;
	}

	return Object.keys(dict).join('');
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
	generateText(charset) {
		charset = removeDuplicates(charset);

		let text = '';
		while (text.length < MAX_LENGTH) {
			if (text.length > 0) text += ' ';

			const wordLength = getRandomInt(2, 4);
			let word = '';
			for (let i = 0; i < wordLength; i++) {
				const whichChar = getRandomInt(0, charset.length - 1);
				word += charset.charAt(whichChar);
			}

			text += word;
		}

		console.log(text);

		return text;
	}
};

