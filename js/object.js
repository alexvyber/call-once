// Object

// Object() constructor
if (false) {
	const value = "some";

	console.log("🚀 ~ new Object():", new Object());
	console.log("🚀 ~ Object(value):", Object(value));

	console.log("🚀 ~ Object():", Object());
	console.log("🚀 ~ Object(value):", Object(value));

	const o = new Object();
	o.foo = 42;

	console.log(o);
	// { foo: 42 }

	console.log("🚀 ~ new Object(undefined):", new Object(undefined));
	console.log("🚀 ~ new Object(null):", new Object(null));
}

// Object.prototype.constructor
if (false) {
	const o1 = {};
	console.log("🚀 ~ o1.constructor === Object:", o1.constructor === Object);

	const o2 = new Object();
	console.log("🚀 ~ o2.constructor === Object:", o2.constructor === Object);

	const a1 = [];
	console.log("🚀 ~ a1.constructor === Array:", a1.constructor === Array);

	const a2 = new Array();
	console.log("🚀 ~ a2.constructor === Array:", a2.constructor === Array);

	const n = 3;
	console.log("🚀 ~ n.constructor === Number:", n.constructor === Number);

	const s = "string";
	console.log("🚀 ~ s.constructor === String:", s.constructor === String);

	//
	const o = new TypeError(); // Inheritance: TypeError -> Error -> Object
	const proto = Object.getPrototypeOf;

	console.log(
		"🚀 ~ proto(o).constructor === TypeError:",
		proto(o).constructor === TypeError,
	);
	console.log(
		"🚀 ~ proto(proto(o)).constructor === Error:",
		proto(proto(o)).constructor === Error,
	);
	console.log(
		"🚀 ~ proto(proto(proto(o))).constructor === Object:",
		proto(proto(proto(o))).constructor === Object,
	);

	function Tree(name) {
		this.name = name;
	}
	const theTree = new Tree("Redwood");
	console.log(`theTree.constructor is ${theTree.constructor}`);

	const arr = [];
	console.log("🚀 ~ arr.constructor = String:", (arr.constructor = String));
	console.log("🚀 ~ arr.constructor === String:", arr.constructor === String);
	console.log("🚀 ~ arr instanceof String:", arr instanceof String);
	console.log("🚀 ~ arr instanceof Array:", arr instanceof Array);

	class Foo {}
	const foo = new Foo();
	foo.constructor = "bar";
	console.log("🚀 ~ foo.constructor === 'bar':", foo.constructor === "bar");

	Object.hasOwn(arr, "constructor"); // false
	Object.hasOwn(Object.getPrototypeOf(arr), "constructor"); // true

	arr.constructor = String;
	Object.hasOwn(arr, "constructor"); // true — the instance property shadows the one on its prototype
}

// Object.assign()
if (false) {
	const target = { a: 1, b: 2 };
	const source = { b: 4, c: 5 };

	const returnedTarget = Object.assign(target, source);

	console.log(target); // Expected output: Object { a: 1, b: 4, c: 5 }
	console.log(returnedTarget === target); // Expected output: true

	const obj = { a: 1 };
	const copy = Object.assign({}, obj);
	console.log(copy); // { a: 1 }

	const obj1 = { a: 0, b: { c: 0 } };
	const obj2 = Object.assign({}, obj1);
	console.log(obj2); // { a: 0, b: { c: 0 } }

	// Warning for Deep Clone
	// For deep cloning, we need to use alternatives like structuredClone(), because Object.assign() copies property values.
	// If the source value is a reference to an object, it only copies the reference value.
	obj1.a = 1;
	console.log(obj1); // { a: 1, b: { c: 0 } }
	console.log(obj2); // { a: 0, b: { c: 0 } }

	obj2.a = 2;
	console.log(obj1); // { a: 1, b: { c: 0 } }
	console.log(obj2); // { a: 2, b: { c: 0 } }

	obj2.b.c = 3;
	console.log(obj1); // { a: 1, b: { c: 3 } }
	console.log(obj2); // { a: 2, b: { c: 3 } }

	// Deep Clone
	const obj3 = { a: 0, b: { c: 0 } };
	const obj4 = structuredClone(obj3);
	obj3.a = 4;
	obj3.b.c = 4;
	console.log(obj4); // { a: 0, b: { c: 0 } }

	const o1 = { a: 1 };
	const o2 = { b: 2 };
	const o3 = { c: 3 };

	const objj = Object.assign(o1, o2, o3);
	console.log(objj); // { a: 1, b: 2, c: 3 }
	console.log(o1); // { a: 1, b: 2, c: 3 }, target object itself is changed.

	{
		const o1 = { a: 1, b: 1, c: 1 };
		const o2 = { b: 2, c: 2 };
		const o3 = { c: 3 };
		const obj = Object.assign({}, o1, o2, o3);
		console.log(obj); // { a: 1, b: 2, c: 3 }
	}
	{
		const o1 = { a: 1 };
		const o2 = { [Symbol("foo")]: 2 };

		const obj = Object.assign({}, o1, o2);
		console.log(obj); // { a : 1, [Symbol("foo")]: 2 } (cf. bug 1207182 on Firefox)
		Object.getOwnPropertySymbols(obj); // [Symbol(foo)]
	}
	{
		const obj = Object.create(
			// foo is on obj's prototype chain.
			{ foo: 1 },
			{
				bar: {
					value: 2, // bar is a non-enumerable property.
				},
				baz: {
					value: 3,
					enumerable: true, // baz is an own enumerable property.
				},
			},
		);

		const copy = Object.assign({}, obj);
		console.log(copy); // { baz: 3 }
	}
	{
		const v1 = "abc";
		const v2 = true;
		const v3 = 10;
		const v4 = Symbol("foo");

		const obj = Object.assign({}, v1, null, v2, undefined, v3, v4);
		// Primitives will be wrapped, null and undefined will be ignored.
		// Note, only string wrappers can have own enumerable properties.
		console.log(obj); // { "0": "a", "1": "b", "2": "c" }
	}
	{
		const target = Object.defineProperty({}, "foo", {
			value: 1,
			writable: false,
		}); // target.foo is a read-only property

		// Object.assign(target, { bar: 2 }, { foo2: 3, foo: 3, foo3: 3 }, { baz: 4 });
		// TypeError: "foo" is read-only
		// The Exception is thrown when assigning target.foo

		console.log(target.bar); // 2, the first source was copied successfully.
		console.log(target.foo2); // 3, the first property of the second source was copied successfully.
		console.log(target.foo); // 1, exception is thrown here.
		console.log(target.foo3); // undefined, assign method has finished, foo3 will not be copied.
		console.log(target.baz); // undefined, the third source will not be copied either.
	}
	{
		const obj = {
			foo: 1,
			get bar() {
				return 2;
			},
		};

		let copy = Object.assign({}, obj);
		console.log(copy);
		// { foo: 1, bar: 2 }
		// The value of copy.bar is obj.bar's getter's return value.

		// This is an assign function that copies full descriptors
		function completeAssign(target, ...sources) {
			sources.forEach((source) => {
				const descriptors = Object.keys(source).reduce((descriptors, key) => {
					descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
					return descriptors;
				}, {});

				// By default, Object.assign copies enumerable Symbols, too
				Object.getOwnPropertySymbols(source).forEach((sym) => {
					const descriptor = Object.getOwnPropertyDescriptor(source, sym);
					if (descriptor.enumerable) {
						descriptors[sym] = descriptor;
					}
				});

				Object.defineProperties(target, descriptors);
			});

			return target;
		}

		copy = completeAssign({}, obj);
		console.log(copy);
		// { foo:1, get bar() { return 2 } }
	}
}

// Object.create()
if (false) {
	{
		const person = {
			isHuman: false,

			printIntroduction: function () {
				console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
			},
		};

		const me = Object.create(person);

		me.name = "Matthew"; // "name" is a property set on "me", but not on "person"
		me.isHuman = true; // Inherited properties can be overwritten
		me.printIntroduction(); // Expected output: "My name is Matthew. Am I human? true"
	}
	{
		// Shape - superclass
		function Shape() {
			this.x = 0;
			this.y = 0;
		}

		// superclass method
		Shape.prototype.move = function (x, y) {
			this.x += x;
			this.y += y;
			console.info("Shape moved.");
		};

		// Rectangle - subclass
		function Rectangle() {
			Shape.call(this); // call super constructor.
		}

		// subclass extends superclass
		Rectangle.prototype = Object.create(Shape.prototype, {
			// If you don't set Rectangle.prototype.constructor to Rectangle,
			// it will take the prototype.constructor of Shape (parent).
			// To avoid that, we set the prototype.constructor to Rectangle (child).
			constructor: {
				value: Rectangle,
				enumerable: false,
				writable: true,
				configurable: true,
			},
		});

		const rect = new Rectangle();

		console.log("Is rect an instance of Rectangle?", rect instanceof Rectangle); // true
		console.log("Is rect an instance of Shape?", rect instanceof Shape); // true
		rect.move(1, 1); // Logs 'Shape moved.'
		console.log("🚀 ~ rect:", rect);
		rect.move(1, 1);
		console.log("🚀 ~ rect:", rect);
	}
	{
		let o = {};
		// Is equivalent to:
		o = Object.create(Object.prototype);

		o = Object.create(Object.prototype, {
			// foo is a regular data property
			foo: {
				writable: true,
				configurable: true,
				value: "hello",
			},

			// bar is an accessor property
			bar: {
				configurable: false,

				get() {
					return 10;
				},

				set(value) {
					console.log("Setting `o.bar` to", value);
				},
			},
		});

		// Create a new object whose prototype is a new, empty
		// object and add a single property 'p', with value 42.
		o = Object.create({}, { p: { value: 42 } });
	}
	{
		let o = Object.create(null);
		// Is equivalent to:
		o = { __proto__: null };
	}
	{
		function Constructor() {}
		let o = new Constructor();
		// Is equivalent to:
		o = Object.create(Constructor.prototype);
	}
}

// Object.is()
if (false) {
	console.log(Object.is("1", 1)); // Expected output: false
	console.log(Object.is(NaN, NaN)); // Expected output: true
	console.log(Object.is(-0, 0)); // Expected output: false

	const obj = {};

	console.log(Object.is(obj, {})); // Expected output: false

	// Case 1: Evaluation result is the same as using ===
	console.log("🚀 ~ Object.is(25, 25):", Object.is(25, 25));
	console.log("🚀 ~ Object.is('foo', 'foo'):", Object.is("foo", "foo"));
	console.log("🚀 ~ Object.is('foo', 'bar'):", Object.is("foo", "bar"));
	console.log("🚀 ~ Object.is(null, null):", Object.is(null, null));
	console.log(
		"🚀 ~ Object.is(undefined, undefined):",
		Object.is(undefined, undefined),
	);

	// Object.is(window, window); // true
	console.log("🚀 ~ Object.is([], []):", Object.is([], []));

	const foo = { a: 1 };
	const bar = { a: 1 };
	const sameFoo = foo;

	console.log("🚀 ~ Object.is(foo, foo):", Object.is(foo, foo));
	console.log("🚀 ~ Object.is(foo, bar):", Object.is(foo, bar));
	console.log("🚀 ~ Object.is(foo, sameFoo):", Object.is(foo, sameFoo));

	// Case 2: Signed zero
	console.log("🚀 ~ Object.is(0, -0):", Object.is(0, -0));
	console.log("🚀 ~ Object.is(+0, -0):", Object.is(+0, -0));
	console.log("🚀 ~ Object.is(-0, -0):", Object.is(-0, -0));
	console.log("🚀 ~ Object.is(+0, +0):", Object.is(+0, +0));
	console.log("🚀 ~ Object.is(+0, 0):", Object.is(+0, 0));

	// Case 3: NaN
	console.log("🚀 ~ Object.is(NaN, 0 / 0):", Object.is(NaN, 0 / 0));
	console.log("🚀 ~ Object.is(NaN, Number.NaN):", Object.is(NaN, Number.NaN));
}

// Object.groupBy()
if (false) {
	const inventory = [
		{ name: "asparagus", type: "vegetables", quantity: 5 },
		{ name: "bananas", type: "fruit", quantity: 0 },
		{ name: "goat", type: "meat", quantity: 23 },
		{ name: "cherries", type: "fruit", quantity: 5 },
		{ name: "fish", type: "meat", quantity: 22 },
	];

	// const result = Object.groupBy(inventory, ({ type }) => type);
	const result = Array.prototype.group;
	console.log("🚀 ~ result:", result);

	/* Result is:
{
  vegetables: [
    { name: 'asparagus', type: 'vegetables', quantity: 5 },
  ],
  fruit: [
    { name: "bananas", type: "fruit", quantity: 0 },
    { name: "cherries", type: "fruit", quantity: 5 }
  ],
  meat: [
    { name: "goat", type: "meat", quantity: 23 },
    { name: "fish", type: "meat", quantity: 22 }
  ]
}
*/
}

// Object.fromEntries()
if (false) {
	const entries = new Map([
		["foo", "bar"],
		["baz", 42],
		["some", () => 42],
	]);

	const obj = Object.fromEntries(entries);

	console.log(obj);
	// Expected output: Object { foo: "bar", baz: 42 }

	console.log("🚀 ~ obj.some():", obj.some());
	{
		const map = new Map([
			["foo", "bar"],
			["baz", 42],
		]);
		const obj = Object.fromEntries(map);
		console.log(obj); // { foo: "bar", baz: 42 }
	}
	{
		const arr = [
			["0", "a"],
			["1", "b"],
			["2", "c"],
		];
		const obj = Object.fromEntries(arr);
		console.log(obj); // { 0: "a", 1: "b", 2: "c" }
	}
	{
		const object1 = { a: 1, b: 2, c: 3 };

		const object2 = Object.fromEntries(
			Object.entries(object1).map(([key, val]) => [
				`${key}${key}`,
				Math.pow(val, 3),
			]),
		);

		console.log(object2);
		// { a: 2, b: 4, c: 6 }
	}
}

// Object.entries()
if (false) {
	const object1 = {
		a: "somestring",
		b: 42,
	};

	for (const [key, value] of Object.entries(object1)) {
		console.log(`${key}: ${value}`);
	}

	// Expected output:
	// "a: somestring"
	// "b: 42"

	const obj = { foo: "bar", baz: 42 };
	console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]

	const arrayLike = { 0: "a", 1: "b", 2: "c" };
	console.log(Object.entries(arrayLike)); // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]

	const randomKeyOrder = { 100: "a", 2: "b", 7: "c" };
	console.log(Object.entries(randomKeyOrder)); // [ ['2', 'b'], ['7', 'c'], ['100', 'a'] ]

	// getFoo is a non-enumerable property
	const myObj = Object.create(
		{},
		{
			getFoo: {
				value() {
					return this.foo;
				},
			},
		},
	);
	myObj.foo = "bar";
	console.log(Object.entries(myObj)); // [ ['foo', 'bar'] ]

	// Strings have indices as enumerable own properties
	console.log(Object.entries("fooooo")); // [ ['0', 'f'], ['1', 'o'], ['2', 'o'] ]

	// Other primitives have no own properties
	console.log(Object.entries(100)); // []
	{
		const obj = { foo: "bar", baz: 42 };
		const map = new Map(Object.entries(obj));
		console.log(map); // Map(2) {"foo" => "bar", "baz" => 42}
	}
	{
		// Using for...of loop
		const obj = { a: 5, b: 7, c: 9 };

		for (const [key, value] of Object.entries(obj)) {
			console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
		}

		// Using array methods
		Object.entries(obj).forEach(([key, value]) => {
			console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
		});
	}
}

// Object.values()
if (false) {
	const object1 = {
		a: "somestring",
		b: 42,
		c: false,
	};

	console.log(Object.values(object1)); // Expected output: Array ["somestring", 42, false]

	{
		const obj = { foo: "bar", baz: 42 };
		console.log(Object.values(obj)); // ['bar', 42]

		// Array-like object
		const arrayLikeObj1 = { 0: "a", 1: "b", 2: "c" };
		console.log(Object.values(arrayLikeObj1)); // ['a', 'b', 'c']

		// Array-like object with random key ordering
		// When using numeric keys, the values are returned in the keys' numerical order
		const arrayLikeObj2 = { 100: "a", 2: "b", 7: "c" };
		console.log(Object.values(arrayLikeObj2)); // ['b', 'c', 'a']

		// getFoo is a non-enumerable property
		const myObj = Object.create(
			{},
			{
				getFoo: {
					value() {
						return this.foo;
					},
				},
			},
		);
		myObj.foo = "bar";
		console.log(Object.values(myObj)); // ['bar']
	}
	{
		// Strings have indices as enumerable own properties
		console.log(Object.values("foo")); // ['f', 'o', 'o']

		// Other primitives have no own properties
		console.log(Object.values(100)); // []
	}
}

// Object.seal()
if (false) {
	const object1 = {
		property1: 42,
	};

	Object.seal(object1);
	object1.property1 = 33;
	console.log(object1.property1); // Expected output: 33

	// delete object1.property1; // Cannot delete when sealed
	console.log(object1.property1); // Expected output: 33

	{
		const obj = {
			prop() {},
			foo: "bar",
		};

		// New properties may be added, existing properties
		// may be changed or removed.
		obj.foo = "baz";
		obj.lumpy = "woof";
		delete obj.prop;

		const o = Object.seal(obj);

		o === obj; // true
		Object.isSealed(obj); // true

		// Changing property values on a sealed object
		// still works.
		obj.foo = "quux";
		try {
			// But you can't convert data properties to accessors,
			// or vice versa.
			Object.defineProperty(obj, "foo", {
				get() {
					return "g";
				},
			}); // throws a TypeError
		} catch (error) {
			console.error("🚀 ~ error:", error);
		}

		// Now any changes, other than to property values,
		// will fail.
		try {
			obj.quaxxor = "the friendly duck";
		} catch (error) {
			console.error("🚀 ~ error:", error);
		}
		// silently doesn't add the property
		// delete obj.foo;
		// silently doesn't delete the property

		// ...and in strict mode such attempts
		// will throw TypeErrors.
		function fail() {
			"use strict";
			delete obj.foo; // throws a TypeError
			obj.sparky = "arf"; // throws a TypeError
		}
		try {
			fail();
		} catch (error) {
			console.error("🚀 ~ error:", error);
		}

		try {
			// Attempted additions through
			// Object.defineProperty will also throw.
			Object.defineProperty(obj, "ohai", {
				value: 17,
			}); // throws a TypeError
			Object.defineProperty(obj, "foo", {
				value: "eit",
			}); // changes existing property value
		} catch (error) {
			console.error("🚀 ~ error:", error);
		}
	}
	{
		Object.seal(1); // TypeError: 1 is not an object (ES5 code)

		Object.seal(1);
		// 1                             (ES2015 code)
	}
}
