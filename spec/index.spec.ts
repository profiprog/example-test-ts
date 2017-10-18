import { strgen, padding } from "../src/index"

describe("index.ts:", function () {

	it("strgen", function () {
		expect(strgen("*", 8)).toBe("********");
	});

	it("padding", function () {
		expect(padding("50€", 10)).toBe("       50€");
		expect(padding("Suma:", -10)).toBe("Suma:     ");
		//expect(padding("Suma:", 2)).toBe("Suma:");
	});
});
