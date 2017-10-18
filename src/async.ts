

export function sleep(delay: number): Promise<void> {
	return new Promise<void>(resolve => {
		setTimeout(resolve, delay);
	});
}

export interface Call {
	time: number;
	args: any[];
}

export class ReduceCalls {

	static minDelay = 1000;
	static maxDelay = 1500;

	public calls: Call[] = [];
	private timer: any;

	constructor (private callTarget: (instance: ReduceCalls) => any) {}

	public call(...args: any[]) {
		let time = new Date().getTime();
		this.calls.push({ time, args });

		let result = time - this.calls[0].time > ReduceCalls.minDelay;
		if (result) this.timeout();
		else this.schedule(ReduceCalls.maxDelay);
		return result;
	}

	private schedule(delay?: number) {
		if (this.timer) clearTimeout(this.timer);
		if (delay) this.timer = setTimeout(this.timeout.bind(this), delay);
		else this.timer = undefined;
	}

	private timeout() {
		this.callTarget(this);
		this.calls.length = 0;
		this.schedule();
	}
}
