/// <reference path="./helpers/deepClone.util.d.ts" />
/// <reference path="./helpers/toBePoint.matcher.d.ts" />

describe("jasmine:", function () {

	it("deepClone:", function () {
		let a: any =  {a:1},
			b = jasmine.util.deepClone(a, {b:2});

		expect(a.a).toBe(1);
		expect(a.b).toBeUndefined();
		expect(b.a).toBe(1);
		expect(b.b).toBe(2);

		b.a = 3;

		expect(a.a).toBe(1);
		expect(a.b).toBeUndefined();
		expect(b.a).toBe(3);
		expect(b.b).toBe(2);
	});//*/






	it("tobePoint:", function () {
		let point = { x : 3, y: 4 };
		expect(point).toBePoint({ x: 3, y: 4 });
		expect(point).toBePoint({ x: 3, y: 4.00000000000001 });

		expect({x: 3, y: 0.00000000000001 }).toBePoint({ x: 3, y: 0.00000000000001 });
		expect({x: 3, y: 0.00000000000001 }).not.toBePoint({ x: 3, y: 0.000000000000012 });
		expect({x: 3, y: 0.00000000000001000000000000001 }).toBePoint({ x: 3, y: 0.00000000000001 });

		expect({x: 3, y: 100000000000000 }).toBePoint({ x: 3, y: 100000000000000 });
		expect({x: 3, y: 100000000000000 }).not.toBePoint({ x: 3, y: 1000000000000001 });
		expect({x: 3, y: 100000000000000 }).toBePoint({ x: 3, y: 100000000000000.1 });
	});//*/

});