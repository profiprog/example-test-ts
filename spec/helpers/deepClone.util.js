
beforeAll(function () {

	function deepClone(src, map = new WeakMap()) {
		if (map.has(src)) return map.get(src);
		else if (Array.isArray(src)) return map.set(src, src.map(item => deepClone(item, map))).get(src);
	else if (typeof src === 'object' && src !== null) {
			let trg = {};
			for (let k in src) if (src.hasOwnProperty(k)) trg[k] = deepClone(src[k], map);
			return map.set(src, trg).get(src);
		}
		else return src;
	}

	function modifyClone(src) {
		let trg = deepClone(src);
		for (let i = 1; i < arguments.length; i++) {
			for (let k in arguments[i]) if (arguments[i].hasOwnProperty(k)) {
				let cursors = [ trg ], key = null;
				k.split('.').forEach(k => {
					let m;
				if (key !== null) {
					if (key === '*') {
						cursors = cursors.reduce((res, cur) => {
							if (Array.isArray(cur)) res.push.apply(res, cur);
					else for (let key in cur) if (cur.hasOwnProperty(key)) res.push(cur[key]);
						return res;
					}, []);
					}
					else cursors = cursors.map(cur => {
						if (cur.hasOwnProperty(key)) return cur[key];
				else if (m = key.match(/^(.*)\[\]$/)) {
						if (cur.hasOwnProperty(m[1])) return cur[m[1]];
						else return cur[m[1]] = [];
					}
					else return cur[key] = {};
				});
				}
				key = k;
			});
				cursors.forEach(cur => cur[key] = arguments[i][k]);
			}
		}
		return trg;
	}

	if (jasmine.util.deepClone) fail("jasmine.util.deepClone already exists");
	else jasmine.util.deepClone = modifyClone;
});
