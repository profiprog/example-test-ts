import { strgen } from "../src/index"

describe("index.ts:", function () {
	it("strgen", function () {
		expect(strgen("*", 8)).toBe("********");
	})
});
