declare namespace jasmine {
	namespace util {
		function deepClone<T>(src: T, ...modifications: object[]): T;
	}
}
