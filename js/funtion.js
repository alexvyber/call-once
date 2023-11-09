// Function
if (false) {
  const res = new Function("const lol = arguments[0] ? parseInt(arguments[0]) : 0; const z = 420 * lol ; return 69 + z")

  console.log("🚀 ~ res:", res)
  console.log("🚀 ~ res.length:", res.length)
  console.log("🚀 ~ res():", res())
  console.log("🚀 ~ res(2):", res(2))

  const sum = new Function("a", "b", "return a + b")
  console.log(sum(2, 6)) // Expected output: 8
  console.log(sum(2, 16))

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
	  })(count);`
  )

  recursiveFn(10)

  // The function constructor can take in multiple statements separated by a semicolon. Function expressions require a return statement with the function's name

  // Observe that new Function is called. This is so we can call the function we created directly afterwards
  const sumOfArray = new Function(
    "const sumArray = (arr) => arr.reduce((previousValue, currentValue) => previousValue + currentValue); return sumArray"
  )()

  // call the function
  console.log("🚀 ~ sumOfArray([1, 2, 3, 4]):", sumOfArray([1, 2, 3, 4])) // 10

  const construct = new Function("const sumArr = (arr) => arr.reduce((p,c)=> p +c); return sumArr")
  const arrSum = construct()
  console.log("🚀 ~ arrSum([1, 2, 3, 4]):", arrSum([1, 2, 3, 4]))

  // If you don't call new Function at the point of creation, you can use the Function.call() method to call it
  const findLargestNumber = new Function(
    "function findLargestNumber (arr) { return Math.max(...arr) }; return findLargestNumber"
  )

  // call the function
  findLargestNumber.call({}).call({}, [2, 4, 1, 8, 5]) // 8

  // Function declarations do not require a return statement
  const sayHello = new Function("return function (name) { return `Hello, ${name}` }")()

  // call the function
  sayHello("world") // Hello, world
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

  console.log(func1.length)
  // Expected output: 0

  console.log(func2.length)
  // Expected output: 2

  console.log("🚀 ~ func1 == 0: false", func1 == 0) // false

  console.log(Function.length) // 1

  console.log("🚀 ~ (() => {}).length:", (() => {}).length)
  console.log("🚀 ~ ((a) => {}).length:", (a => {}).length)
  console.log("🚀 ~ ((a, b) => {}).length:", ((a, b) => {}).length)
  console.log("🚀 ~ ((...args) => {}).length:", ((...args) => {}).length)
  console.log("🚀 ~ ((a, b = 1, c) => {}).length:", ((a, b = 1, c) => {}).length)
  // 1, only parameters before the first one with
  // a default value are counted
}

// Function: name
if (false) {
  const func1 = function () {}

  const object = {
    func2: function () {},
  }

  console.log(func1.name)
  // Expected output: "func1"

  console.log(object.func2.name)
  // Expected output: "func2"

  function someFunction() {}

  // someFunction.name = "otherFunction"; // TypeError: Cannot assign to read only property 'name' of function 'function someFunction() {}'
  console.log(someFunction.name) // someFunction

  // // -- someModule.js --
  // export default function () {}
  // // -- main.js --
  // import someModule from "./someModule.js";
  // someModule.name; // "default"

  console.log("🚀 ~ new Function().name:", new Function().name)

  someFunction = function someFunctionName() {}
  someFunction.name // "someFunctionName"
  console.log("🚀 ~ someFunction.name:", someFunction.name)

  console.log("🚀 ~ function () {}.name === '':", function () {}.name === "")
  console.log("🚀 ~ (() => {}).name === '':", (() => {}).name === "")

  const [f = () => {}] = []
  console.log("🚀 ~ f.name:", f.name)

  const { ff = () => {} } = {}
  console.log("🚀 ~ ff.name:", ff.name)

  const { someMethod: m = () => {} } = {}
  m.name // "m"

  function foo(f = () => {}) {
    console.log(f.name)
  }
  foo() // "f"

  class Foo {
    static someMethod = () => {}
  }
  Foo.someMethod.name // someMethod

  const oo = {
    foo() {},
  }
  oo.foo.name // "foo";

  function fooo() {}
  fooo.bind({}).name // "bound foo"
  console.log("🚀 ~ fooo.bind({}).name:", fooo.bind({}).name)

  const o = {
    get foo() {},
    set foo(x) {},
  }

  const descriptor = Object.getOwnPropertyDescriptor(o, "foo")
  descriptor.get.name // "get foo"
  console.log("🚀 ~ descriptor.get.name:", descriptor.get.name)
  descriptor.set.name // "set foo";
  console.log("🚀 ~ descriptor.set.name:", descriptor.set.name)

  class Fooo {}
  console.log("🚀 ~ Fooo.name:", Fooo.name)

  const sym1 = Symbol("foo")
  const sym2 = Symbol()

  const ooo = {
    [sym1]() {},
    [sym2]() {},
  }

  // ooo[sym1].name; // "[foo]"
  console.log("🚀 ~ ooo[sym1].name:", ooo[sym1].name)
  // ooo[sym2].name; // "[]"
  console.log("🚀 ~ ooo[sym2].name:", ooo[sym2].name)

  class FooBar {
    #field = () => {}
    #method() {}
    getNames() {
      console.log(this.#field.name)
      console.log(this.#method.name)
    }
  }

  new FooBar().getNames()
  // "#field"
  // "#method"

  function FooFoo() {} // Or: class FooFoo {}

  const fooInstance = new FooFoo()
  console.log(fooInstance.constructor.name) // "FooFoo"

  class FooBaz {
    constructor() {}
    static name() {}
  }

  const fooBazInstance = new FooBaz()
  console.log(fooBazInstance.constructor.name) // ƒ name() {}

  class FooBarBaz {
    static name = 123
  }
  console.log(new FooBarBaz().constructor.name) // 123

  class BarBar {
    static name = 123
  }
  BarBar.name = "Hello"
  console.log(BarBar.name) // "Hello" if class BarBar has a static "name" property, but "BarBar" if not.
}

// Function: prototype
if (false) {
  function Ctor() {}
  const inst = new Ctor()
  console.log(Object.getPrototypeOf(inst) === Ctor.prototype) // true

  const method = { foo() {} }.foo
  const arrowFunction = () => {}
  async function asyncFunction() {}
  const asGenFN = async function* asyncGeneratorFunction() {}

  class Class {}
  function fn() {}

  function Ctor1() {}
  Ctor1.prototype = 3
  console.log(Object.getPrototypeOf(new Ctor1()) === Object.prototype) // true

  function Ctor2() {}
  const p1 = new Ctor2()
  const p2 = new Ctor2()
  const p3 = new Ctor2()

  Ctor2.prototype.prop = 1

  console.log(p1.prop) // 1
  console.log(p2.prop) // 1
  console.log(p3.prop) // 1

  //
  class Dog {
    constructor(name) {
      this.name = name
    }
  }
  Dog.prototype.species = "dog"
  console.log(new Dog("Jack").species) // "dog"

  //
  class Dog1 {
    static {
      Dog1.prototype.species = "dog"
    }

    constructor(name) {
      this.name = name
    }
  }

  console.log(new Dog1("Jack").species) // "dog"
}

// Function.prototype[@@hasInstance]()
if (false) {
  class Foo {}
  const foo = new Foo()

  console.log("🚀 ~ foo instanceof Foo:", foo instanceof Foo)
  console.log("🚀 ~ Foo[Symbol.hasInstance](foo):", Foo[Symbol.hasInstance](foo))

  console.log(foo instanceof Foo === Foo[Symbol.hasInstance](foo)) // true

  class Bar {
    static [Symbol.hasInstance](_value) {
      // A custom implementation
      return false
    }
  }

  const bar = new Bar()
  console.log(bar instanceof Bar) // false
  console.log(Function.prototype[Symbol.hasInstance].call(Bar, bar)) // true
}

// Function.prototype.apply()
if (false) {
  const numbers = [5, 6, 2, 3, 7]
  const letters = Array.from({ length: 25 }, (_, i) => String.fromCharCode(i + 97))

  numbers.slice(numbers[numbers.length - 1], numbers.length)
  console.log(
    "🚀 ~ numbers.slice(numbers[numbers.length - 1], numbers.length):",
    numbers.slice(numbers[numbers.length - 1], numbers.length)
  )

  const res1 = Array.prototype.slice.apply(letters, [1, 3])
  console.log("🚀 ~ res1:", res1)

  const res2 = Array.prototype.slice.apply(numbers, [1, 3])
  console.log("🚀 ~ res2:", res2)

  let max = Math.max.apply(null, numbers)
  console.log(max) // Expected output: 7

  let min = Math.min.apply(null, numbers)
  console.log(min) // Expected output: 2

  // TODO: test perf
  const array = ["a", "b"]
  const elements = [0, 1, 2]

  Array.prototype.push.apply(array, elements)
  console.info(array) // ["a", "b", 0, 1, 2]

  //
  const array1 = ["a", "b"]
  const elements1 = [0, 1, 2]
  array1.push(...elements1)
  console.info(array1) // ["a", "b", 0, 1, 2]

  //
  // min/max number in an array
  const numbers3 = [5, 6, 2, 3, 7]

  // using Math.min/Math.max apply
  max = Math.max.apply(null, numbers3)
  // This about equal to Math.max(numbers3[0], …)
  // or Math.max(5, 6, …)

  min = Math.min.apply(null, numbers3)

  // vs. simple loop based algorithm
  max = -Infinity
  min = +Infinity

  for (let i = 0; i < numbers3.length; i++) {
    if (numbers3[i] > max) {
      max = numbers3[i]
    }
    if (numbers3[i] < min) {
      min = numbers3[i]
    }
  }

  console.log("🚀 ~ max:", max)
  console.log("🚀 ~ min:", min)

  function minOfArray(arr) {
    let min = Infinity
    const QUANTUM = 32768

    for (let i = 0; i < arr.length; i += QUANTUM) {
      const submin = Math.min.apply(null, arr.slice(i, Math.min(i + QUANTUM, arr.length)))
      min = Math.min(submin, min)
    }

    return min
  }

  const min1 = minOfArray([5, 6, 2, 3, 7, -111])
  console.log("🚀 ~ min1:", min1)
}

// Function.prototype.bind()
if (false) {
  const module = {
    x: 420,
    getX: function () {
      return this.x
    },
  }

  const unboundGetX = module.getX
  // console.log(unboundGetX()); // The function gets invoked at the global scope
  // Expected output: undefined

  const boundGetX = unboundGetX.bind(module)
  console.log(boundGetX())
  // Expected output: 42
  ;("use strict") // prevent `this` from being boxed into the wrapper object

  function log(...args) {
    console.log(this, ...args)
  }
  const boundLog = log.bind("this value", 1, 2)
  const boundLog2 = boundLog.bind("new this value", 3, 4)
  const boundLog3 = boundLog2.bind("new this value again", 5, 6)
  boundLog3(69, 420) // "this value", 1, 2, 3, 4, 5, 6

  class Base {
    constructor(...args) {
      console.log("🚀 ~ new.target:", new.target)
      console.log("🚀 ~ this:", this)
      console.log(new.target === Base)
      console.log(args)
    }
  }

  const BoundBase = Base.bind(null, 1, 2)

  new BoundBase(3, 4) // true, [1, 2, 3, 4]

  // class Derived extends class {}.bind(null) {} // TypeError: Class extends value does not have valid prototype property undefined

  class Base1 {}
  const BoundBase1 = Base1.bind(null, 1, 2)
  console.log(new Base1() instanceof BoundBase1) // true
  ;(function () {
    // Top-level 'this' is bound to 'globalThis' in scripts.
    this.x = 9
    const module1 = {
      x: 81,
      getX() {
        return this.x
      },
      // construct() {
      // 	this.getX = this.getX.bind(this);
      // },
    }

    const m2 = {
      x: 6561,
    }

    // The 'this' parameter of 'getX' is bound to 'module1'.
    console.log(module1.getX()) // 81

    const retrieveX1 = module1.getX
    // The 'this' parameter of 'retrieveX1' is bound to 'globalThis' in non-strict mode.
    // console.log(retrieveX1()); // 9

    // Create a new function 'boundGetX1' with the 'this' parameter bound to 'module1'.
    const boundGetX1 = retrieveX1.bind(module1)
    console.log(boundGetX1()) // 81

    const boundGetX2 = retrieveX1.bind(m2)
    console.log("🚀 ~ boundGetX2():", boundGetX2())
  }).bind({ this: {} })()

  class LateBloomer {
    constructor() {
      this.petalCount = Math.floor(Math.random() * 12) + 1
    }
    bloom() {
      // Declare bloom after a delay of 1 second
      setTimeout(this.declare.bind(this), 1000)
    }
    bloomArrow() {
      // Declare bloom after a delay of 2 second
      setTimeout(() => this.declare(), 2000)
    }
    declare() {
      console.log(`I am a beautiful flower with ${this.petalCount} petals!`)
    }
  }

  const flower = new LateBloomer()
  flower.bloom()
  flower.bloomArrow()
  // After 1 second, calls 'flower.declare()'

  function Point(x, y) {
    this.x = x
    this.y = y
  }

  Point.prototype.toString = function () {
    return `${this.x},${this.y}`
  }

  const p = new Point(1, 2)
  p.toString()
  // '1,2'

  // The thisArg's value doesn't matter because it's ignored
  const YAxisPoint = Point.bind(null, 0 /*x*/)

  const axisPoint = new YAxisPoint(5)
  axisPoint.toString() // '0,5'

  axisPoint instanceof Point // true
  axisPoint instanceof YAxisPoint // true
  new YAxisPoint(17, 42) instanceof Point // true

  class Base2 {
    static baseProp = "base"
  }

  class Derived extends Base2 {
    static derivedProp = "derived"
  }

  const BoundDerived = Derived.bind(null)
  console.log(BoundDerived.baseProp) // "base"
  console.log(BoundDerived.derivedProp) // undefined
  console.log(new BoundDerived() instanceof Derived) // true

  // Same as "slice" in the previous example
  const unboundSlice = Array.prototype.slice
  const slice = Function.prototype.call.bind(unboundSlice)

  // ...

  slice([1, 2, 3, 4, 5], 0, 1)
  console.log("🚀 ~ slice([1, 2, 3, 4, 5], 0, 1):", slice([1, 2, 3, 4, 5], 0, 1))
  console.log("🚀 ~ slice([1,2,3,4,5], 2,4):", slice([1, 2, 3, 4, 5], 2, 4))
}

// Function.prototype.call()
if (false) {
  function Product(name, price) {
    this.name = name
    this.price = price
  }

  function Food(name, price) {
    Product.call(this, name, price)
    this.category = "food"
  }

  console.log(new Food("cheese", 5).name)
  // Expected output: "cheese"

  function greet() {
    console.log(this.animal, "typically sleep between", this.sleepDuration)
  }

  const obj = {
    animal: "cats",
    sleepDuration: "12 and 16 hours",
  }

  greet.call(obj) // cats typically sleep between 12 and 16 hours

  globalThis.globProp = "Wisen"

  function display() {
    console.log(`globProp value is ${this.globProp}`)
  }

  // display.call(); // Logs "globProp value is Wisen"

  // Same as "slice" in the previous example
  const unboundSlice = Array.prototype.slice
  const slice = Function.prototype.call.bind(unboundSlice)

  const res = slice([1, 2, 3, 4, 5, 6], 0, 2)
  console.log("🚀 ~ res:", res)
}

// Function.prototype.toString()
if (false) {
  function sum(a, b) {
    return a + b
  }

  console.log(sum.toString())
  // Expected output: "function sum(a, b) {
  //                     return a + b;
  //                   }"

  console.log(Math.abs.toString())
  // Expected output: "function abs() { [native code] }"

  function test(fn) {
    console.log(fn.toString())
  }

  function f() {}
  class A {
    a() {}
  }
  function* g() {}

  test(f) // "function f() {}"
  test(A) // "class A { a() {} }"
  test(g) // "function* g() {}"
  test(a => a) // "(a) => a"
  test({ a() {} }.a) // "a() {}"
  test({ *a() {} }.a) // "*a() {}"
  test({ [0]() {} }[0]) // "[0]() {}"
  test(Object.getOwnPropertyDescriptor({ get a() {} }, "a").get) // "get a() {}"
  test(Object.getOwnPropertyDescriptor({ set a(x) {} }, "a").set) // "set a(x) {}"
  test(Function.prototype.toString) // "function toString() { [native code] }"
  test(function f() {}.bind(0)) // "function () { [native code] }"
  test(Function("a", "b")) // function anonymous(a\n) {\nb\n}
}
