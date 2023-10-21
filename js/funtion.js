// Function
if (false) {
	const res = new Function(
		"const lol = arguments[0] ? parseInt(arguments[0]) : 0; const z = 420 * lol ; return 69 + z",
	);

	console.log("🚀 ~ res:", res);
	console.log("🚀 ~ res.length:", res.length);
	console.log("🚀 ~ res():", res());
	console.log("🚀 ~ res(2):", res(2));

	const sum = new Function("a", "b", "return a + b");
	console.log(sum(2, 6)); // Expected output: 8
	console.log(sum(2, 16));

	// `function anonymous(${args.join(",")}
	// ) {
	// ${functionBody}
	// }`;

	// Create a global property with `var`
	// var x = 10;

	// function createFunction1() {
	// 	const x = 20;
	// 	return new Function("return x;"); // this `x` refers to global `x`
	// }

	// function createFunction2() {
	// 	const x = 20;
	// 	function f() {
	// 		return x; // this `x` refers to the local `x` above
	// 	}
	// 	return f;
	// }

	// const f1 = createFunction1();
	// console.log(f1()); // 10

	// const f2 = createFunction2();
	// console.log(f2()); // 20

	const recursiveFn = new Function(
		"count",
		`(function recursiveFn(count) {
		if (count < 0) {
		  return;
		}
		console.log('qq-', count);
		recursiveFn(count - 1);
	  })(count);`,
	);

	recursiveFn(10);

	// The function constructor can take in multiple statements separated by a semicolon. Function expressions require a return statement with the function's name

	// Observe that new Function is called. This is so we can call the function we created directly afterwards
	const sumOfArray = new Function(
		"const sumArray = (arr) => arr.reduce((previousValue, currentValue) => previousValue + currentValue); return sumArray",
	)();

	// call the function
	console.log("🚀 ~ sumOfArray([1, 2, 3, 4]):", sumOfArray([1, 2, 3, 4])); // 10

	const construct = new Function(
		"const sumArr = (arr) => arr.reduce((p,c)=> p +c); return sumArr",
	);
	const arrSum = construct();
	console.log("🚀 ~ arrSum([1, 2, 3, 4]):", arrSum([1, 2, 3, 4]));

	// If you don't call new Function at the point of creation, you can use the Function.call() method to call it
	const findLargestNumber = new Function(
		"function findLargestNumber (arr) { return Math.max(...arr) }; return findLargestNumber",
	);

	// call the function
	findLargestNumber.call({}).call({}, [2, 4, 1, 8, 5]); // 8

	// Function declarations do not require a return statement
	const sayHello = new Function(
		"return function (name) { return `Hello, ${name}` }",
	)();

	// call the function
	sayHello("world"); // Hello, world
}

// Function.prototype.arguments
if (false) {
	// (function f() {
	// 	if (Object.hasOwn(f, "arguments")) {
	// 		console.log(
	// 			"arguments is an own property with descriptor",
	// 			Object.getOwnPropertyDescriptor(f, "arguments"),
	// 		);
	// 	} else {
	// 		console.log(
	// 			"f doesn't have an own property named arguments. Trying to get f.[[Prototype]].arguments",
	// 		);
	// 		console.log(
	// 			Object.getOwnPropertyDescriptor(
	// 				Object.getPrototypeOf(f),
	// 				"arguments",
	// 			).get.call(f),
	// 		);
	// 	}
	// })();
	// In Chrome:
	// arguments is an own property with descriptor {value: Arguments(0), writable: false, enumerable: false, configurable: false}
	// In Firefox:
	// f doesn't have an own property named arguments. Trying to get f.[[Prototype]].arguments
	// Arguments { … }
	// function f(n) {
	// 	g(n - 1);
	// }
	// function g(n) {
	// 	console.log(`before: ${g.arguments[0]}`);
	// 	if (n > 0) {
	// 		f(n);
	// 	}
	// 	console.log(`after: ${g.arguments[0]}`);
	// }
	// f(2);
	// console.log(`returned: ${g.arguments}`);
	// Logs:
	// before: 1
	// before: 0
	// after: 0
	// after: 1
	// returned: null
}

if (false) {
	// (function f() {
	// 	if (Object.hasOwn(f, "caller")) {
	// 		console.log(
	// 			"caller is an own property with descriptor",
	// 			Object.getOwnPropertyDescriptor(f, "caller"),
	// 		);
	// 	} else {
	// 		console.log(
	// 			"f doesn't have an own property named caller. Trying to get f.[[Prototype]].caller",
	// 		);
	// 		console.log(
	// 			Object.getOwnPropertyDescriptor(
	// 				Object.getPrototypeOf(f),
	// 				"caller",
	// 			).get.call(f),
	// 		);
	// 	}
	// })();
	// In Chrome:
	// caller is an own property with descriptor {value: null, writable: false, enumerable: false, configurable: false}
	// In Firefox:
	// f doesn't have an own property named caller. Trying to get f.[[Prototype]].caller
	// null
	// function myFunc() {
	// 	if (myFunc.caller === null) {
	// 		return "The function was called from the top!";
	// 	} else {
	// 		return `This function's caller was ${myFunc.caller}`;
	// 	}
	// }
	// myFunc();
	// function f(n) {
	// 	g(n - 1);
	// }
	// function g(n) {
	// 	if (n > 0) {
	// 		f(n);
	// 	} else {
	// 		stop();
	// 	}
	// }
	// f(2);
}

// Function: length
if (false) {
	function func1() {}

	function func2(a, b) {}

	console.log(func1.length);
	// Expected output: 0

	console.log(func2.length);
	// Expected output: 2

	console.log("🚀 ~ func1 == 0: false", func1 == 0); // false

	console.log(Function.length); // 1

	console.log("🚀 ~ (() => {}).length:", (() => {}).length);
	console.log("🚀 ~ ((a) => {}).length:", ((a) => {}).length);
	console.log("🚀 ~ ((a, b) => {}).length:", ((a, b) => {}).length);
	console.log("🚀 ~ ((...args) => {}).length:", ((...args) => {}).length);
	console.log(
		"🚀 ~ ((a, b = 1, c) => {}).length:",
		((a, b = 1, c) => {}).length,
	);
	// 1, only parameters before the first one with
	// a default value are counted
}

// Function: name
if (true) {
	const func1 = function () {};

	const object = {
		func2: function () {},
	};

	console.log(func1.name);
	// Expected output: "func1"

	console.log(object.func2.name);
	// Expected output: "func2"

	function someFunction() {}

	// someFunction.name = "otherFunction"; // TypeError: Cannot assign to read only property 'name' of function 'function someFunction() {}'
	console.log(someFunction.name); // someFunction

	// // -- someModule.js --
	// export default function () {}
	// // -- main.js --
	// import someModule from "./someModule.js";
	// someModule.name; // "default"

	console.log("🚀 ~ new Function().name:", new Function().name);

	someFunction = function someFunctionName() {};
	someFunction.name; // "someFunctionName"
	console.log("🚀 ~ someFunction.name:", someFunction.name);

	console.log("🚀 ~ function () {}.name === '':", function () {}.name === "");
	console.log("🚀 ~ (() => {}).name === '':", (() => {}).name === "");

	const [f = () => {}] = [];
	console.log("🚀 ~ f.name:", f.name);

	const { ff = () => {} } = {};
	console.log("🚀 ~ ff.name:", ff.name);

	const { someMethod: m = () => {} } = {};
	m.name; // "m"

	function foo(f = () => {}) {
		console.log(f.name);
	}
	foo(); // "f"

	class Foo {
		static someMethod = () => {};
	}
	Foo.someMethod.name; // someMethod

	const oo = {
		foo() {},
	};
	oo.foo.name; // "foo";

	function fooo() {}
	fooo.bind({}).name; // "bound foo"
	console.log("🚀 ~ fooo.bind({}).name:", fooo.bind({}).name);

	const o = {
		get foo() {},
		set foo(x) {},
	};

	const descriptor = Object.getOwnPropertyDescriptor(o, "foo");
	descriptor.get.name; // "get foo"
	console.log("🚀 ~ descriptor.get.name:", descriptor.get.name);
	descriptor.set.name; // "set foo";
	console.log("🚀 ~ descriptor.set.name:", descriptor.set.name);

	class Fooo {}
	console.log("🚀 ~ Fooo.name:", Fooo.name);

	const sym1 = Symbol("foo");
	const sym2 = Symbol();

	const ooo = {
		[sym1]() {},
		[sym2]() {},
	};

	// ooo[sym1].name; // "[foo]"
	console.log("🚀 ~ ooo[sym1].name:", ooo[sym1].name);
	// ooo[sym2].name; // "[]"
	console.log("🚀 ~ ooo[sym2].name:", ooo[sym2].name);

	class FooBar {
		#field = () => {};
		#method() {}
		getNames() {
			console.log(this.#field.name);
			console.log(this.#method.name);
		}
	}

	new FooBar().getNames();
	// "#field"
	// "#method"

	function FooFoo() {} // Or: class FooFoo {}

	const fooInstance = new FooFoo();
	console.log(fooInstance.constructor.name); // "FooFoo"

	class FooBaz {
		constructor() {}
		static name() {}
	}

	const fooBazInstance = new FooBaz();
	console.log(fooBazInstance.constructor.name); // ƒ name() {}

	class FooBarBaz {
		static name = 123;
	}
	console.log(new FooBarBaz().constructor.name); // 123

	class BarBar {
		static name = 123;
	}
	BarBar.name = "Hello";
	console.log(BarBar.name); // "Hello" if class BarBar has a static "name" property, but "BarBar" if not.
}
