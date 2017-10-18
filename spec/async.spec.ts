import { ReduceCalls, sleep } from "../src/async";

describe("async.ts:", function () {

	beforeAll(function () {
		ReduceCalls.minDelay = 100;
		ReduceCalls.maxDelay = 150;
	});

	it("ReduceCalls: two calls before minDelay", async function () {
		let target = jasmine.createSpy("target");

		let tested = new ReduceCalls(target);
		tested.call(1);
		tested.call(2);

		expect(target).not.toHaveBeenCalled();

		target.and.callFake((e: ReduceCalls) => {
			expect(e.calls.length).toBe(2);
			expect(e.calls[0].args[0]).toBe(1);
			expect(e.calls[1].args[0]).toBe(2);
		});
		await sleep(ReduceCalls.maxDelay + Math.floor((ReduceCalls.maxDelay - ReduceCalls.minDelay) / 2));

		expect(target).toHaveBeenCalledTimes(1);
	});


	it("ReduceCalls: two calls before minDelay", async function () {
		let target = jasmine.createSpy("target");

		let tested = new ReduceCalls(target);
		tested.call(1);
		expect(target).toHaveBeenCalledTimes(0);

		await sleep(ReduceCalls.minDelay + Math.floor((ReduceCalls.maxDelay - ReduceCalls.minDelay) / 2));
		expect(target).toHaveBeenCalledTimes(0);

		target.and.callFake((e: ReduceCalls) => {
			expect(e.calls.length).toBe(2);
			expect(e.calls[0].args[0]).toBe(1);
			expect(e.calls[1].args[0]).toBe(2);
		});

		tested.call(2);
		expect(target).toHaveBeenCalledTimes(1);

		await sleep(ReduceCalls.maxDelay + Math.floor((ReduceCalls.maxDelay - ReduceCalls.minDelay) / 2));

		expect(target).toHaveBeenCalledTimes(1);
	});

});
