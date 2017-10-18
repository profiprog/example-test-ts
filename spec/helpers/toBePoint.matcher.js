
beforeEach(function() {

	jasmine.addMatchers({
		toBePoint: function (utils, customEqualityTesters) {
			return {
				compare: function (actual, expected) {
					let message = [];
					for (let k in expected) if (expected.hasOwnProperty(k)) if (!utils.equals(actual[k], expected[k], customEqualityTesters)) {
						message.push("actual."+k+"="+actual[k]+" does not match expected."+k+"="+expected[k]);
					}
					return message.length ? { pass: false, message: message.join('\n') } : { pass: true };
				}
			};
		}
	});

	jasmine.addCustomEqualityTester(function (first, second) {
		if (typeof first === 'number' && typeof second === 'number' && first && second && Math.sign(first) === Math.sign(second) && first !== second) {
			let firstPow = Math.ceil(Math.log10(Math.abs(first))),
				secondPow = Math.ceil(Math.log10(Math.abs(second)));
			if (firstPow === secondPow) {
				let pow = Math.pow(10, 14 - firstPow);
				return Math.round(first * pow) === Math.round(second * pow);
			}
		}
	});

});
