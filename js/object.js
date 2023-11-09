// Object

// Object() constructor
if (false) {
  const value = "some"

  console.log("🚀 ~ new Object():", new Object())
  console.log("🚀 ~ Object(value):", Object(value))

  console.log("🚀 ~ Object():", Object())
  console.log("🚀 ~ Object(value):", Object(value))

  const o = new Object()
  o.foo = 42

  console.log(o)
  // { foo: 42 }

  console.log("🚀 ~ new Object(undefined):", new Object(undefined))
  console.log("🚀 ~ new Object(null):", new Object(null))
}

// Object.prototype.constructor
if (false) {
  const o1 = {}
  console.log("🚀 ~ o1.constructor === Object:", o1.constructor === Object)

  const o2 = new Object()
  console.log("🚀 ~ o2.constructor === Object:", o2.constructor === Object)

  const a1 = []
  console.log("🚀 ~ a1.constructor === Array:", a1.constructor === Array)

  const a2 = new Array()
  console.log("🚀 ~ a2.constructor === Array:", a2.constructor === Array)

  const n = 3
  console.log("🚀 ~ n.constructor === Number:", n.constructor === Number)

  const s = "string"
  console.log("🚀 ~ s.constructor === String:", s.constructor === String)

  //
  const o = new TypeError() // Inheritance: TypeError -> Error -> Object
  const proto = Object.getPrototypeOf

  console.log("🚀 ~ proto(o).constructor === TypeError:", proto(o).constructor === TypeError)
  console.log("🚀 ~ proto(proto(o)).constructor === Error:", proto(proto(o)).constructor === Error)
  console.log("🚀 ~ proto(proto(proto(o))).constructor === Object:", proto(proto(proto(o))).constructor === Object)

  function Tree(name) {
    this.name = name
  }
  const theTree = new Tree("Redwood")
  console.log(`theTree.constructor is ${theTree.constructor}`)

  const arr = []
  console.log("🚀 ~ arr.constructor = String:", (arr.constructor = String))
  console.log("🚀 ~ arr.constructor === String:", arr.constructor === String)
  console.log("🚀 ~ arr instanceof String:", arr instanceof String)
  console.log("🚀 ~ arr instanceof Array:", arr instanceof Array)

  class Foo {}
  const foo = new Foo()
  foo.constructor = "bar"
  console.log("🚀 ~ foo.constructor === 'bar':", foo.constructor === "bar")

  Object.hasOwn(arr, "constructor") // false
  Object.hasOwn(Object.getPrototypeOf(arr), "constructor") // true

  arr.constructor = String
  Object.hasOwn(arr, "constructor") // true — the instance property shadows the one on its prototype
}

// Object.assign()
if (false) {
  const target = { a: 1, b: 2 }
  const source = { b: 4, c: 5 }

  const returnedTarget = Object.assign(target, source)

  console.log(target) // Expected output: Object { a: 1, b: 4, c: 5 }
  console.log(returnedTarget === target) // Expected output: true

  const obj = { a: 1 }
  const copy = Object.assign({}, obj)
  console.log(copy) // { a: 1 }

  const obj1 = { a: 0, b: { c: 0 } }
  const obj2 = Object.assign({}, obj1)
  console.log(obj2) // { a: 0, b: { c: 0 } }

  // Warning for Deep Clone
  // For deep cloning, we need to use alternatives like structuredClone(), because Object.assign() copies property values.
  // If the source value is a reference to an object, it only copies the reference value.
  obj1.a = 1
  console.log(obj1) // { a: 1, b: { c: 0 } }
  console.log(obj2) // { a: 0, b: { c: 0 } }

  obj2.a = 2
  console.log(obj1) // { a: 1, b: { c: 0 } }
  console.log(obj2) // { a: 2, b: { c: 0 } }

  obj2.b.c = 3
  console.log(obj1) // { a: 1, b: { c: 3 } }
  console.log(obj2) // { a: 2, b: { c: 3 } }

  // Deep Clone
  const obj3 = { a: 0, b: { c: 0 } }
  const obj4 = structuredClone(obj3)
  obj3.a = 4
  obj3.b.c = 4
  console.log(obj4) // { a: 0, b: { c: 0 } }

  const o1 = { a: 1 }
  const o2 = { b: 2 }
  const o3 = { c: 3 }

  const objj = Object.assign(o1, o2, o3)
  console.log(objj) // { a: 1, b: 2, c: 3 }
  console.log(o1) // { a: 1, b: 2, c: 3 }, target object itself is changed.

  {
    const o1 = { a: 1, b: 1, c: 1 }
    const o2 = { b: 2, c: 2 }
    const o3 = { c: 3 }
    const obj = Object.assign({}, o1, o2, o3)
    console.log(obj) // { a: 1, b: 2, c: 3 }
  }
  {
    const o1 = { a: 1 }
    const o2 = { [Symbol("foo")]: 2 }

    const obj = Object.assign({}, o1, o2)
    console.log(obj) // { a : 1, [Symbol("foo")]: 2 } (cf. bug 1207182 on Firefox)
    Object.getOwnPropertySymbols(obj) // [Symbol(foo)]
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
      }
    )

    const copy = Object.assign({}, obj)
    console.log(copy) // { baz: 3 }
  }
  {
    const v1 = "abc"
    const v2 = true
    const v3 = 10
    const v4 = Symbol("foo")

    const obj = Object.assign({}, v1, null, v2, undefined, v3, v4)
    // Primitives will be wrapped, null and undefined will be ignored.
    // Note, only string wrappers can have own enumerable properties.
    console.log(obj) // { "0": "a", "1": "b", "2": "c" }
  }
  {
    const target = Object.defineProperty({}, "foo", {
      value: 1,
      writable: false,
    }) // target.foo is a read-only property

    // Object.assign(target, { bar: 2 }, { foo2: 3, foo: 3, foo3: 3 }, { baz: 4 });
    // TypeError: "foo" is read-only
    // The Exception is thrown when assigning target.foo

    console.log(target.bar) // 2, the first source was copied successfully.
    console.log(target.foo2) // 3, the first property of the second source was copied successfully.
    console.log(target.foo) // 1, exception is thrown here.
    console.log(target.foo3) // undefined, assign method has finished, foo3 will not be copied.
    console.log(target.baz) // undefined, the third source will not be copied either.
  }
  {
    const obj = {
      foo: 1,
      get bar() {
        return 2
      },
    }

    let copy = Object.assign({}, obj)
    console.log(copy)
    // { foo: 1, bar: 2 }
    // The value of copy.bar is obj.bar's getter's return value.

    // This is an assign function that copies full descriptors
    function completeAssign(target, ...sources) {
      sources.forEach(source => {
        const descriptors = Object.keys(source).reduce((descriptors, key) => {
          descriptors[key] = Object.getOwnPropertyDescriptor(source, key)
          return descriptors
        }, {})

        // By default, Object.assign copies enumerable Symbols, too
        Object.getOwnPropertySymbols(source).forEach(sym => {
          const descriptor = Object.getOwnPropertyDescriptor(source, sym)
          if (descriptor.enumerable) {
            descriptors[sym] = descriptor
          }
        })

        Object.defineProperties(target, descriptors)
      })

      return target
    }

    copy = completeAssign({}, obj)
    console.log(copy)
    // { foo:1, get bar() { return 2 } }
  }
}

// Object.create()
if (false) {
  {
    const person = {
      isHuman: false,

      printIntroduction: function () {
        console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`)
      },
    }

    const me = Object.create(person)

    me.name = "Matthew" // "name" is a property set on "me", but not on "person"
    me.isHuman = true // Inherited properties can be overwritten
    me.printIntroduction() // Expected output: "My name is Matthew. Am I human? true"
  }
  {
    // Shape - superclass
    function Shape() {
      this.x = 0
      this.y = 0
    }

    // superclass method
    Shape.prototype.move = function (x, y) {
      this.x += x
      this.y += y
      console.info("Shape moved.")
    }

    // Rectangle - subclass
    function Rectangle() {
      Shape.call(this) // call super constructor.
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
    })

    const rect = new Rectangle()

    console.log("Is rect an instance of Rectangle?", rect instanceof Rectangle) // true
    console.log("Is rect an instance of Shape?", rect instanceof Shape) // true
    rect.move(1, 1) // Logs 'Shape moved.'
    console.log("🚀 ~ rect:", rect)
    rect.move(1, 1)
    console.log("🚀 ~ rect:", rect)
  }
  {
    let o = {}
    // Is equivalent to:
    o = Object.create(Object.prototype)

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
          return 10
        },

        set(value) {
          console.log("Setting `o.bar` to", value)
        },
      },
    })

    // Create a new object whose prototype is a new, empty
    // object and add a single property 'p', with value 42.
    o = Object.create({}, { p: { value: 42 } })
  }
  {
    let o = Object.create(null)
    // Is equivalent to:
    o = { __proto__: null }
  }
  {
    function Constructor() {}
    let o = new Constructor()
    // Is equivalent to:
    o = Object.create(Constructor.prototype)
  }
}

// Object.is()
if (false) {
  console.log(Object.is("1", 1)) // Expected output: false
  console.log(Object.is(NaN, NaN)) // Expected output: true
  console.log(Object.is(-0, 0)) // Expected output: false

  const obj = {}

  console.log(Object.is(obj, {})) // Expected output: false

  // Case 1: Evaluation result is the same as using ===
  console.log("🚀 ~ Object.is(25, 25):", Object.is(25, 25))
  console.log("🚀 ~ Object.is('foo', 'foo'):", Object.is("foo", "foo"))
  console.log("🚀 ~ Object.is('foo', 'bar'):", Object.is("foo", "bar"))
  console.log("🚀 ~ Object.is(null, null):", Object.is(null, null))
  console.log("🚀 ~ Object.is(undefined, undefined):", Object.is(undefined, undefined))

  // Object.is(window, window); // true
  console.log("🚀 ~ Object.is([], []):", Object.is([], []))

  const foo = { a: 1 }
  const bar = { a: 1 }
  const sameFoo = foo

  console.log("🚀 ~ Object.is(foo, foo):", Object.is(foo, foo))
  console.log("🚀 ~ Object.is(foo, bar):", Object.is(foo, bar))
  console.log("🚀 ~ Object.is(foo, sameFoo):", Object.is(foo, sameFoo))

  // Case 2: Signed zero
  console.log("🚀 ~ Object.is(0, -0):", Object.is(0, -0))
  console.log("🚀 ~ Object.is(+0, -0):", Object.is(+0, -0))
  console.log("🚀 ~ Object.is(-0, -0):", Object.is(-0, -0))
  console.log("🚀 ~ Object.is(+0, +0):", Object.is(+0, +0))
  console.log("🚀 ~ Object.is(+0, 0):", Object.is(+0, 0))

  // Case 3: NaN
  console.log("🚀 ~ Object.is(NaN, 0 / 0):", Object.is(NaN, 0 / 0))
  console.log("🚀 ~ Object.is(NaN, Number.NaN):", Object.is(NaN, Number.NaN))
}

// Object.groupBy()
if (false) {
  const inventory = [
    { name: "asparagus", type: "vegetables", quantity: 5 },
    { name: "bananas", type: "fruit", quantity: 0 },
    { name: "goat", type: "meat", quantity: 23 },
    { name: "cherries", type: "fruit", quantity: 5 },
    { name: "fish", type: "meat", quantity: 22 },
  ]

  // const result = Object.groupBy(inventory, ({ type }) => type);
  const result = Array.prototype.group
  console.log("🚀 ~ result:", result)

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
  ])

  const obj = Object.fromEntries(entries)

  console.log(obj)
  // Expected output: Object { foo: "bar", baz: 42 }

  console.log("🚀 ~ obj.some():", obj.some())
  {
    const map = new Map([
      ["foo", "bar"],
      ["baz", 42],
    ])
    const obj = Object.fromEntries(map)
    console.log(obj) // { foo: "bar", baz: 42 }
  }
  {
    const arr = [
      ["0", "a"],
      ["1", "b"],
      ["2", "c"],
    ]
    const obj = Object.fromEntries(arr)
    console.log(obj) // { 0: "a", 1: "b", 2: "c" }
  }
  {
    const object1 = { a: 1, b: 2, c: 3 }

    const object2 = Object.fromEntries(Object.entries(object1).map(([key, val]) => [`${key}${key}`, Math.pow(val, 3)]))

    console.log(object2)
    // { a: 2, b: 4, c: 6 }
  }
}

// Object.entries()
if (false) {
  const object1 = {
    a: "somestring",
    b: 42,
  }

  for (const [key, value] of Object.entries(object1)) {
    console.log(`${key}: ${value}`)
  }

  // Expected output:
  // "a: somestring"
  // "b: 42"

  const obj = { foo: "bar", baz: 42 }
  console.log(Object.entries(obj)) // [ ['foo', 'bar'], ['baz', 42] ]

  const arrayLike = { 0: "a", 1: "b", 2: "c" }
  console.log(Object.entries(arrayLike)) // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]

  const randomKeyOrder = { 100: "a", 2: "b", 7: "c" }
  console.log(Object.entries(randomKeyOrder)) // [ ['2', 'b'], ['7', 'c'], ['100', 'a'] ]

  // getFoo is a non-enumerable property
  const myObj = Object.create(
    {},
    {
      getFoo: {
        value() {
          return this.foo
        },
      },
    }
  )
  myObj.foo = "bar"
  console.log(Object.entries(myObj)) // [ ['foo', 'bar'] ]

  // Strings have indices as enumerable own properties
  console.log(Object.entries("fooooo")) // [ ['0', 'f'], ['1', 'o'], ['2', 'o'] ]

  // Other primitives have no own properties
  console.log(Object.entries(100)) // []
  {
    const obj = { foo: "bar", baz: 42 }
    const map = new Map(Object.entries(obj))
    console.log(map) // Map(2) {"foo" => "bar", "baz" => 42}
  }
  {
    // Using for...of loop
    const obj = { a: 5, b: 7, c: 9 }

    for (const [key, value] of Object.entries(obj)) {
      console.log(`${key} ${value}`) // "a 5", "b 7", "c 9"
    }

    // Using array methods
    Object.entries(obj).forEach(([key, value]) => {
      console.log(`${key} ${value}`) // "a 5", "b 7", "c 9"
    })
  }
}

// Object.values()
if (false) {
  const object1 = {
    a: "somestring",
    b: 42,
    c: false,
  }

  console.log(Object.values(object1)) // Expected output: Array ["somestring", 42, false]

  {
    const obj = { foo: "bar", baz: 42 }
    console.log(Object.values(obj)) // ['bar', 42]

    // Array-like object
    const arrayLikeObj1 = { 0: "a", 1: "b", 2: "c" }
    console.log(Object.values(arrayLikeObj1)) // ['a', 'b', 'c']

    // Array-like object with random key ordering
    // When using numeric keys, the values are returned in the keys' numerical order
    const arrayLikeObj2 = { 100: "a", 2: "b", 7: "c" }
    console.log(Object.values(arrayLikeObj2)) // ['b', 'c', 'a']

    // getFoo is a non-enumerable property
    const myObj = Object.create(
      {},
      {
        getFoo: {
          value() {
            return this.foo
          },
        },
      }
    )
    myObj.foo = "bar"
    console.log(Object.values(myObj)) // ['bar']
  }
  {
    // Strings have indices as enumerable own properties
    console.log(Object.values("foo")) // ['f', 'o', 'o']

    // Other primitives have no own properties
    console.log(Object.values(100)) // []
  }
}

// Object.seal()
if (false) {
  const object1 = {
    property1: 42,
  }

  Object.seal(object1)
  object1.property1 = 33
  console.log(object1.property1) // Expected output: 33

  // delete object1.property1; // Cannot delete when sealed
  console.log(object1.property1) // Expected output: 33

  {
    const obj = {
      prop() {},
      foo: "bar",
    }

    // New properties may be added, existing properties
    // may be changed or removed.
    obj.foo = "baz"
    obj.lumpy = "woof"
    delete obj.prop

    const o = Object.seal(obj)

    o === obj // true
    Object.isSealed(obj) // true

    // Changing property values on a sealed object
    // still works.
    obj.foo = "quux"
    try {
      // But you can't convert data properties to accessors,
      // or vice versa.
      Object.defineProperty(obj, "foo", {
        get() {
          return "g"
        },
      }) // throws a TypeError
    } catch (error) {
      console.error("🚀 ~ error:", error)
    }

    // Now any changes, other than to property values,
    // will fail.
    try {
      obj.quaxxor = "the friendly duck"
    } catch (error) {
      console.error("🚀 ~ error:", error)
    }
    // silently doesn't add the property
    // delete obj.foo;
    // silently doesn't delete the property

    // ...and in strict mode such attempts
    // will throw TypeErrors.
    function fail() {
      "use strict"
      delete obj.foo // throws a TypeError
      obj.sparky = "arf" // throws a TypeError
    }
    try {
      fail()
    } catch (error) {
      console.error("🚀 ~ error:", error)
    }

    try {
      // Attempted additions through
      // Object.defineProperty will also throw.
      Object.defineProperty(obj, "ohai", {
        value: 17,
      }) // throws a TypeError
      Object.defineProperty(obj, "foo", {
        value: "eit",
      }) // changes existing property value
    } catch (error) {
      console.error("🚀 ~ error:", error)
    }
  }
  {
    Object.seal(1) // TypeError: 1 is not an object (ES5 code)
    Object.seal(1) // 1 -- (ES2015 code)
  }
}

// Object.keys()
if (false) {
  const object1 = {
    a: "somestring",
    b: 42,
    c: false,
  }

  console.log(Object.keys(object1))
  // Expected output: Array ["a", "b", "c"]

  // Simple array
  const arr = ["a", "b", "c"]
  console.log(Object.keys(arr)) // ['0', '1', '2']

  // Array-like object
  const obj = { 0: "a", 1: "b", 2: "c" }
  console.log(Object.keys(obj)) // ['0', '1', '2']

  // Array-like object with random key ordering
  const anObj = { 100: "a", 2: "b", 7: "c" }
  console.log(Object.keys(anObj)) // ['2', '7', '100']

  // getFoo is a non-enumerable property
  const myObj = Object.create(
    {},
    {
      getFoo: {
        value() {
          return this.foo
        },
      },
    }
  )
  myObj.foo = 1
  console.log(Object.keys(myObj)) // ['foo']

  // Strings have indices as enumerable own properties
  console.log(Object.keys("foo")) // ['0', '1', '2']

  // Other primitives have no own properties
  console.log(Object.keys(100)) // []
}

// Object.preventExtensions()
if (false) {
  const object1 = {}

  Object.preventExtensions(object1)

  try {
    Object.defineProperty(object1, "property1", {
      value: 42,
    })
  } catch (e) {
    console.log(e.message)
    // Expected output: TypeError: Cannot define property property1, object is not extensible
  }

  {
    const obj = {}
    const obj2 = Object.preventExtensions(obj)
    obj === obj2 // true

    // Objects are extensible by default.
    const empty = {}
    Object.isExtensible(empty) // true

    // They can be made un-extensible
    Object.preventExtensions(empty)
    Object.isExtensible(empty) // false

    // Object.defineProperty throws when adding
    // a new property to a non-extensible object.
    const nonExtensible = { removable: true }
    Object.preventExtensions(nonExtensible)

    try {
      Object.defineProperty(nonExtensible, "new", {
        value: 8675309,
      }) // throws a TypeError
    } catch (error) {
      console.log("error:", error.message)
    }

    // In strict mode, attempting to add new properties
    // to a non-extensible object throws a TypeError.
    function fail() {
      "use strict"
      // throws a TypeError
      nonExtensible.newProperty = "FAIL"
    }

    try {
      fail()
    } catch (error) {
      console.log("error:", error.message)
    }

    try {
      const fixed = Object.preventExtensions({})
      // fixed.__proto__ = { oh: "hai" }; // throws a 'TypeError'.
      fixed.prototype = { oh: "hai" } //  throws a 'TypeError'.
    } catch (error) {
      console.error("🚀 ~ error:", error.message)
    }
  }

  {
    Object.preventExtensions(1)
    // TypeError: 1 is not an object (ES5 code)
    // 1 (ES2015 code)

    console.log("🚀 ~ Object.preventExtensions(1):", Object.preventExtensions(1))
  }
}

// Object.defineProperties()
if (false) {
  const object1 = {}

  Object.defineProperties(object1, {
    property1: {
      value: 42,
      writable: true,
    },
    property2: {},
  })

  console.log("🚀 ~ object1.property1:", object1.property1) // Expected output: 42
  object1.property1 = 69
  console.log("🚀 ~ object1.property1:", object1.property1)

  try {
    const obj = {}

    Object.defineProperties(obj, {
      one: {
        value() {
          return Math.random()
        },
        writable: false,
        enumerable: true,
      },
    })

    console.log("🚀 ~ Object.keys(obj):", Object.keys(obj))

    obj.one = () => "other"
  } catch (error) {
    console.error("🚀 ~ error:", error.message)
  }
}

// Object.defineProperty()
if (false) {
  try {
    const object1 = {}

    Object.defineProperty(object1, "property1", {
      value: 42,
      writable: false,
    })

    object1.property1 = 77 // Throws an error in strict mode
    console.log(object1.property1) // Expected output: 42
  } catch (error) {
    console.log("🚀 ~ error:", error.message)
  }
  {
    const obj = {}
    // 1. Using a null prototype: no inherited properties
    const descriptor = Object.create(null)
    descriptor.value = "static"

    // not enumerable, not configurable, not writable as defaults
    Object.defineProperty(obj, "key", descriptor)
    console.log("🚀 ~ obj:", obj)

    // 2. Being explicit by using a throw-away object literal with all attributes present
    Object.defineProperty(obj, "key2", {
      enumerable: false,
      configurable: false,
      writable: false,
      value: "static",
    })
    console.log("🚀 ~ obj:", obj)

    // 3. Recycling same object
    function withValue(value) {
      const d =
        withValue.d ||
        (withValue.d = {
          enumerable: false,
          writable: false,
          configurable: false,
          value,
        })

      // avoiding duplicate operation for assigning value
      if (d.value !== value) d.value = value

      return d
    }
    // and
    const more = Object.defineProperty(obj, "key", withValue("static"))
    console.log("🚀 ~ more:", more)

    // if freeze is available, prevents adding or
    // removing the object prototype properties
    // (value, get, set, enumerable, writable, configurable)
    const res = (Object.freeze || Object)(Object.prototype)
    console.log("🚀 ~ res:", res)
  }
  {
    const o = {} // Creates a new object

    // Example of an object property added
    // with defineProperty with a data property descriptor
    const res = Object.defineProperty(o, "a", {
      value: 37,
      writable: true,
      enumerable: true,
      configurable: true,
    })
    console.log("🚀 ~ res:", res)
    // 'a' property exists in the o object and its value is 37
  }
  {
    const o = {} // Creates a new object
    // Example of an object property added
    // with defineProperty with an accessor property descriptor
    let bValue = 38
    console.log("🚀 ~ bValue:", bValue)
    Object.defineProperty(o, "b", {
      get() {
        return bValue
      },
      set(newValue) {
        bValue = newValue
      },
      enumerable: true,
      configurable: true,
    })
    o.b // 38
    console.log("🚀 ~ o.b:", o.b)
    o.b = 49
    console.log("🚀 ~ o.b:", o.b)
    console.log("🚀 ~ bValue:", bValue)
    // 'b' property exists in the o object and its value is 38
    // The value of o.b is now always identical to bValue,
    // unless o.b is redefined
  }
  try {
    const o = {} // Creates a new object

    // You cannot try to mix both:
    Object.defineProperty(o, "conflict", {
      value: 0x9f91102,
      get() {
        return 0xdeadbeef
      },
    })
    // throws a TypeError: value appears
    // only in data descriptors,
    // get appears only in accessor descriptors
  } catch (error) {
    console.error("🚀 ~ error:", error.message)
  }

  try {
    const o = {} // Creates a new object

    Object.defineProperty(o, "a", {
      value: 37,
      writable: false,
    })

    console.log(o.a) // 37
    o.a = 25 // No error thrown
    // (it would throw in strict mode,
    // even if the value had been the same)
    console.log(o.a) // 37; the assignment didn't work
  } catch (error) {
    console.error("🚀 ~ error:", error.message)
  }
  try {
    // strict mode
    ;(() => {
      "use strict"
      const o = {}
      Object.defineProperty(o, "b", {
        value: 2,
        writable: false,
      })
      o.b = 3 // throws TypeError: "b" is read-only
      return o.b // returns 2 without the line above
    })()
  } catch (error) {
    console.error("🚀 ~ error:", error.message)
  }
  {
    const o = {}
    Object.defineProperty(o, "a", {
      value: 1,
      enumerable: true,
    })
    Object.defineProperty(o, "b", {
      value: 2,
      enumerable: false,
    })
    Object.defineProperty(o, "c", {
      value: 3,
    }) // enumerable defaults to false
    o.d = 4 // enumerable defaults to true when creating a property by setting it
    Object.defineProperty(o, Symbol.for("e"), {
      value: 5,
      enumerable: true,
    })
    Object.defineProperty(o, Symbol.for("f"), {
      value: 6,
      enumerable: false,
    })

    for (const i in o) {
      console.log(i)
    }
    // Logs 'a' and 'd' (always in that order)

    Object.keys(o) // ['a', 'd']

    // biome-ignore format: should not be formatted
    console.log("🚀 ~ o.propertyIsEnumerable('a') :", o.propertyIsEnumerable('a') ) // true
    // biome-ignore format: should not be formatted
    console.log("🚀 ~ o.propertyIsEnumerable('b') :", o.propertyIsEnumerable('b') ) // false
    // biome-ignore format: should not be formatted
    console.log("🚀 ~ o.propertyIsEnumerable('c') :", o.propertyIsEnumerable('c') ) // false
    // biome-ignore format: should not be formatted
    console.log("🚀 ~ o.propertyIsEnumerable('d') :", o.propertyIsEnumerable('d') ) // true
    // biome-ignore format: should not be formatted
    console.log("🚀 ~ o.propertyIsEnumerable(Symbol.for('e')) :", o.propertyIsEnumerable(Symbol.for('e')) ) // true
    // biome-ignore format: should not be formatted
    console.log("🚀 ~ o.propertyIsEnumerable(Symbol.for('f')) :", o.propertyIsEnumerable(Symbol.for('f')) ) // false

    const p = { ...o }
    console.log("🚀 ~ p.a:", p.a) // 1
    console.log("🚀 ~ p.b:", p.b) // undefined
    console.log("🚀 ~ p.c:", p.c) // undefined
    console.log("🚀 ~ p.d:", p.d) // 4
    console.log("🚀 ~ p[Symbol.for('e')]:", p[Symbol.for("e")]) // 5
    console.log("🚀 ~ p[Symbol.for('f')]:", p[Symbol.for("f")]) // undefined
  }
  try {
    const o = {}
    Object.defineProperty(o, "a", {
      get() {
        return 1
      },
      configurable: false,
    })

    Object.defineProperty(o, "a", {
      configurable: true,
    }) // throws a TypeError
    Object.defineProperty(o, "a", {
      enumerable: true,
    }) // throws a TypeError
    Object.defineProperty(o, "a", {
      set() {},
    }) // throws a TypeError (set was undefined previously)
    Object.defineProperty(o, "a", {
      get() {
        return 1
      },
    }) // throws a TypeError
    // (even though the new get does exactly the same thing)
    Object.defineProperty(o, "a", {
      value: 12,
    }) // throws a TypeError
    // ('value' can be changed when 'configurable' is false, but only when the prop.erty is a writable data property)

    console.log(o.a) // 1
    delete o.a // Nothing happens; throws an error in strict mode
    console.log(o.a) // 1
  } catch (error) {
    console.error("🚀 ~ error:", error.message)
  }
  try {
    const o = {}
    Object.defineProperty(o, "b", {
      writable: true,
      configurable: false,
    })
    console.log(o.b) // undefined
    Object.defineProperty(o, "b", {
      value: 1,
    }) // Even when configurable is false, because the object is writable, we may still replace the value
    console.log(o.b) // 1
    o.b = 2 // We can change the value with assignment operators as well
    console.log(o.b) // 2
    // Toggle the property's writability
    Object.defineProperty(o, "b", {
      writable: false,
    })
    Object.defineProperty(o, "b", {
      value: 1,
    }) // TypeError: because the property is neither writable nor configurable, it cannot be modified
    // At this point, there's no way to further modify 'b'
    // or restore its writability
  } catch (error) {
    console.log("🚀 ~ error:", error.message)
  }
  try {
    const o = {}
    Object.defineProperty(o, "b", {
      writable: false,
      configurable: true,
    })
    Object.defineProperty(o, "b", {
      value: 1,
    }) // We can replace the value with defineProperty
    console.log(o.b) // 1
    o.b = 2 // throws TypeError in strict mode: cannot change a non-writable property's value with assignment
  } catch (error) {
    console.log("🚀 ~ error:", error.message)
  }
  {
    function Archiver() {
      let temperature = null
      const archive = []

      Object.defineProperty(this, "temperature", {
        get() {
          console.log("get!")
          return temperature
        },
        set(value) {
          temperature = value
          archive.push({ val: temperature })
        },
      })

      this.getArchive = () => archive
    }

    const arc = new Archiver()
    arc.temperature // 'get!'
    arc.temperature = 11
    arc.temperature = 13
    arc.temperature = 37
    arc.getArchive() // [{ val: 11 }, { val: 13 }]
    console.log("🚀 ~ arc.getArchive():", arc.getArchive())
  }
  {
    const pattern = {
      get() {
        return "I always return this string, whatever you have assigned"
      },
      set() {
        this.myname = "this is my name string"
      },
    }

    function TestDefineSetAndGet() {
      Object.defineProperty(this, "myproperty", pattern)
    }

    const instance = new TestDefineSetAndGet()
    instance.myproperty = "test"

    console.log(instance.myproperty) // I always return this string, whatever you have assigned
    console.log(instance.myname) // this is my name string
  }
  {
    function MyClass() {}

    let value
    Object.defineProperty(MyClass.prototype, "x", {
      get() {
        return value
      },
      set(x) {
        value = x
      },
    })

    const a = new MyClass()
    const b = new MyClass()
    a.x = 1
    console.log(b.x) // 1
  }
  {
    function MyClass() {}

    Object.defineProperty(MyClass.prototype, "x", {
      get() {
        return this.storedX
      },
      set(x) {
        this.storedX = x
      },
    })

    const a = new MyClass()
    const b = new MyClass()
    a.x = 1
    console.log(b.x) // undefined
  }
  {
    function MyClass() {}

    MyClass.prototype.x = 1
    Object.defineProperty(MyClass.prototype, "y", {
      writable: false,
      value: 1,
    })

    const a = new MyClass()
    a.x = 2
    console.log(a.x) // 2
    console.log(MyClass.prototype.x) // 1
    try {
      a.y = 2 // Ignored, throws in strict mode
      console.log(a.y) // 1
      console.log(MyClass.prototype.y) // 1
    } catch (error) {
      console.error("🚀 ~ error:", error.message)
    }
  }
}

// Object.prototype.valueOf()
if (false) {
  {
    function MyNumberType(n) {
      this.number = n
    }

    MyNumberType.prototype.valueOf = function () {
      return this.number
    }

    const object1 = new MyNumberType(4)

    console.log(object1 + 3)
    // Expected output: 7
  }
  {
    class MyNumber {
      constructor(number) {
        this.number = number
      }
      static {
        this.prototype.valueOf = function () {
          return this.number * 3
        }
      }
    }
    const object1 = new MyNumber(3)
    console.log("🚀 ~ object1:", object1 + 3)
  }
  {
    class MyNumber {
      constructor(arg) {
        this.arg = arg
      }
      static {
        this.prototype.valueOf = function () {
          return Math.random()
        }
      }
    }

    const object1 = new MyNumber(3)
    console.log("🚀 ~ object1:", object1 + new Date())
  }
  {
    class Box {
      #value
      constructor(value) {
        this.#value = value
      }
      valueOf() {
        return this.#value
      }
    }

    const box = new Box(123)
    console.log(box + 456) // 579
    console.log(box == 123) // true
  }
  {
    console.log("🚀 ~ +new Date():", +new Date()) // the current timestamp; same as new Date().getTime()
    console.log("🚀 ~ +{}:", +{}) // NaN (toString() returns "[object Object]")
    console.log("🚀 ~ +[]:", +[]) // 0 (toString() returns an empty string list)
    console.log("🚀 ~ +[1]:", +[1]) // 1 (toString() returns "1")
    console.log("🚀 ~ +[1, 2]:", +[1, 2]) // NaN (toString() returns "1,2")
    console.log("🚀 ~ +new Set([1]):", +new Set([1])) // NaN (toString() returns "[object Set]")
    console.log("🚀 ~ +{ valueOf: () => 42 }:", +{ valueOf: () => 42 }) // 42
  }
}

// Object.prototype.toString()
if (false) {
  function Dog(name) {
    this.name = name
  }

  const dog1 = new Dog("Gabby")

  Dog.prototype.toString = function dogToString() {
    return `${this.name}!`
  }

  console.log(dog1.toString())
  // Expected output: "Gabby"

  const arr = [1, 2, 3]

  console.log("🚀 ~ arr.toString():", arr.toString()) // "1,2,3"

  console.log("🚀 ~ Object.prototype.toString.call(arr):", Object.prototype.toString.call(arr)) // "[object Array]"
  {
    class Dog {
      constructor(name, breed, color, sex) {
        this.name = name
        this.breed = breed
        this.color = color
        this.sex = sex
      }
    }

    const theDog = new Dog("Gabby", "Lab", "chocolate", "female")

    console.log("🚀 ~ theDog.toString():", theDog.toString()) // "[object Object]"
    console.log("🚀 ~ `${theDog}`:", `${theDog}`) // "[object Object]"
  }
  {
    class Dog {
      constructor(name, breed, color, sex) {
        this.name = name
        this.breed = breed
        this.color = color
        this.sex = sex
      }
      toString() {
        return `Dog ${this.name} is a ${this.sex} ${this.color} ${this.breed}`
      }
    }

    const theDog = new Dog("Gabby", "Lab", "chocolate", "female")

    console.log("🚀 ~ `${theDog}`:", `${theDog}`) // "Dog Gabby is a female chocolate Lab"
  }
  {
    const toString = Object.prototype.toString

    toString.call(new Date()) // [object Date]
    toString.call(new String()) // [object String]
    // Math has its Symbol.toStringTag
    toString.call(Math) // [object Math]

    toString.call(undefined) // [object Undefined]
    toString.call(null) // [object Null]

    const myDate = new Date()
    Object.prototype.toString.call(myDate) // [object Date]

    myDate[Symbol.toStringTag] = "myDate"
    Object.prototype.toString.call(myDate) // [object myDate]

    Date.prototype[Symbol.toStringTag] = "prototype polluted"
    Object.prototype.toString.call(new Date()) // [object prototype polluted]
  }
}

// Object.prototype.toLocaleString()
if (false) {
  const date1 = new Date(Date.UTC(2012, 11, 20, 3, 0, 0))

  console.log(date1.toLocaleString("ar-EG"))
  // Expected output: "٢٠‏/١٢‏/٢٠١٢ ٤:٠٠:٠٠ ص"

  const number1 = 123456.789

  console.log(number1.toLocaleString("de-DE"))
  // Expected output: "123.456,789"

  console.log(number1.toLocaleString("ru-RU"))
  // 123 456,789
}

// Object.freeze()
if (false) {
  {
    const obj = {
      prop: 42,
    }

    Object.freeze(obj)

    try {
      obj.prop = 33
      // Throws an error in strict mode
    } catch (error) {
      console.log("🚀 ~ error:", error.message)
    }

    console.log(obj.prop)
    // Expected output: 42
  }
  try {
    Object.freeze(new Uint8Array(0)) // No elements
    // Uint8Array []

    Object.freeze(new Uint8Array(1)) // Has elements
    // TypeError: Cannot freeze array buffer views with elements

    Object.freeze(new DataView(new ArrayBuffer(32))) // No elements
    // DataView {}

    Object.freeze(new Float64Array(new ArrayBuffer(64), 63, 0)) // No elements
    // Float64Array []

    Object.freeze(new Float64Array(new ArrayBuffer(64), 32, 2)) // Has elements
    // TypeError: Cannot freeze array buffer views with elements
  } catch (error) {
    console.log("🚀 ~ error:", error.message)
  }

  try {
    const obj = {
      prop() {},
      foo: "bar",
    }

    // Before freezing: new properties may be added,
    // and existing properties may be changed or removed
    obj.foo = "baz"
    obj.lumpy = "woof"
    delete obj.prop

    // Freeze.
    const o = Object.freeze(obj)

    // The return value is just the same object we passed in.
    o === obj // true

    // The object has become frozen.
    Object.isFrozen(obj) // === true

    // Now any changes will fail
    obj.foo = "quux" // silently does nothing

    // silently doesn't add the property
    obj.quaxxor = "the friendly duck"

    // In strict mode such attempts will throw TypeErrors
    function fail() {
      "use strict"
      obj.foo = "sparky" // throws a TypeError
      delete obj.foo // throws a TypeError
      delete obj.quaxxor // returns true since attribute 'quaxxor' was never added
      obj.sparky = "arf" // throws a TypeError
    }

    fail()

    // Attempted changes through Object.defineProperty;
    // both statements below throw a TypeError.
    Object.defineProperty(obj, "ohai", { value: 17 })
    Object.defineProperty(obj, "foo", { value: "eit" })

    // It's also impossible to change the prototype
    // both statements below will throw a TypeError.
    Object.setPrototypeOf(obj, { x: 20 })
    obj.__proto__ = { x: 20 }
  } catch (error) {
    console.log("🚀 ~ error:", error.message)
  }

  try {
    const a = [0]
    Object.freeze(a) // The array cannot be modified now.

    a[0] = 1 // fails silently

    // In strict mode such attempt will throw a TypeError
    function fail() {
      "use strict"
      a[0] = 1
    }

    fail()

    // Attempted to push
    a.push(2) // throws a TypeError
  } catch (error) {
    console.log("🚀 ~ error:", error.message)
  }
  {
    const obj1 = {
      internal: {},
    }

    Object.freeze(obj1)
    obj1.internal.a = "aValue"

    obj1.internal.a // 'aValue'
  }
  {
    const employee = {
      name: "Mayank",
      designation: "Developer",
      address: {
        street: "Rohini",
        city: "Delhi",
      },
    }

    Object.freeze(employee)

    // employee.name = "Dummy"; // fails silently in non-strict mode
    employee.address.city = "Noida" // attributes of child object can be modified

    console.log(employee.address.city) // "Noida"
  }
  {
    function deepFreeze(object) {
      // Retrieve the property names defined on object
      const propNames = Reflect.ownKeys(object)

      // Freeze properties before freezing self
      for (const name of propNames) {
        const value = object[name]

        if ((value && typeof value === "object") || typeof value === "function") {
          deepFreeze(value)
        }
      }

      return Object.freeze(object)
    }

    const obj2 = {
      internal: {
        a: null,
      },
    }

    deepFreeze(obj2)

    try {
      obj2.internal.a = "anotherValue" // fails silently in non-strict mode
    } catch (error) {
      console.log("🚀 ~ error:", error.message)
    }

    console.log("🚀 ~ obj2.internal.a:", obj2.internal.a) // null
  }
}

// Object.fromEntries()
if (false) {
  {
    const entries = new Map([
      ["foo", "bar"],
      ["baz", 42],
      ["buz", _ => _],
    ])

    const obj = Object.fromEntries(entries)

    console.log(obj)
    // Expected output: Object { foo: "bar", baz: 42 }
  }
  {
    const map = new Map([
      ["foo", "bar"],
      ["baz", 42],
      ["buz", _ => _],
    ])

    const obj = Object.fromEntries(map)
    console.log(obj) // { foo: "bar", baz: 42 }
  }
  {
    const arr = [
      ["0", "a"],
      ["1", "b"],
      ["2", "c"],
      ["length", 3],
    ]
    const obj = Object.fromEntries(arr)
    console.log(obj) // { 0: "a", 1: "b", 2: "c" }

    console.log(Array.from(obj))
  }
  {
    const object1 = { a: 1, b: 2, c: 3 }

    const object2 = Object.fromEntries(Object.entries(object1).map(([key, val]) => [key, val * 2]))

    console.log(object2)
    // { a: 2, b: 4, c: 6 }
  }
}

// Object.hasOwn()
if (false) {
  const object1 = {
    prop: "exists",
  }

  console.log(Object.hasOwn(object1, "prop"))
  // Expected output: true

  console.log(Object.hasOwn(object1, "toString"))
  // Expected output: false

  console.log(Object.hasOwn(object1, "undeclaredPropertyValue"))
  // Expected output: false

  {
    const example = {}
    Object.hasOwn(example, "prop") // false - 'prop' has not been defined

    example.prop = "exists"
    Object.hasOwn(example, "prop") // true - 'prop' has been defined

    example.prop = null
    Object.hasOwn(example, "prop") // true - own property exists with value of null

    example.prop = undefined
    Object.hasOwn(example, "prop") // true - own property exists with value of undefined
  }
  {
    const example = {}
    example.prop = "exists"

    // `hasOwn` will only return true for direct properties:
    Object.hasOwn(example, "prop") // true
    Object.hasOwn(example, "toString") // false
    Object.hasOwn(example, "hasOwnProperty") // false

    // The `in` operator will return true for direct or inherited properties:

    console.log("🚀 ~ 'prop' in example:", "prop" in example) // true
    console.log("🚀 ~ 'toString' in example:", "toString" in example) // true
    console.log("🚀 ~ 'hasOwnProperty' in example:", "hasOwnProperty" in example) // true
  }
  if (false) {
    const example = { foo: true, bar: true }
    for (const name of Object.keys(example)) {
      console.log("🚀 ~ name:", name)
    }
  }
  {
    const example = { foo: true, bar: true }
    for (const name in example) {
      if (Object.hasOwn(example, name)) {
        // console.log("🚀 ~ name:", name);
      }

      console.log("🚀 ~ name:", name)
    }
  }
  {
    const fruits = ["Apple", "Banana", "Watermelon", "Orange"]

    console.log("🚀 ~ Object.hasOwn(fruits, 3):", Object.hasOwn(fruits, 3)) // true ('Orange')
    console.log("🚀 ~ Object.hasOwn(fruits, 4):", Object.hasOwn(fruits, 4)) // false - not defined
  }
  {
    const foo = Object.create(null)
    foo.prop = "exists"
    if (Object.hasOwn(foo, "prop")) {
      console.log(foo.prop) // true - works irrespective of how the object is created.
    }
  }
}

// Object.prototype.hasOwnProperty()
if (false) {
  {
    const object1 = {}
    object1.property1 = 42

    console.log(object1.hasOwnProperty("property1"))
    // Expected output: true

    console.log(object1.hasOwnProperty("toString"))
    // Expected output: false

    console.log(object1.hasOwnProperty("hasOwnProperty"))
    // Expected output: false
  }

  {
    const fruits = ["Apple", "Banana", "Watermelon", "Orange"]
    fruits.hasOwnProperty(3) // true ('Orange')
    fruits.hasOwnProperty(4) // false - not defined
  }

  {
    const example = {}
    example.hasOwnProperty("prop") // false

    example.prop = "exists"
    example.hasOwnProperty("prop") // true - 'prop' has been defined

    example.prop = null
    example.hasOwnProperty("prop") // true - own property exists with value of null

    example.prop = undefined
    example.hasOwnProperty("prop") // true - own property exists with value of undefined
  }

  {
    const example = {}
    example.prop = "exists"

    // `hasOwnProperty` will only return true for direct properties:
    example.hasOwnProperty("prop") // true
    example.hasOwnProperty("toString") // false
    example.hasOwnProperty("hasOwnProperty") // false

    // The `in` operator will return true for direct or inherited properties:
    "prop" in example // true
    "toString" in example // true
    "hasOwnProperty" in example // true
  }

  {
    const buz = {
      fog: "stack",
    }

    for (const name in buz) {
      if (buz.hasOwnProperty(name)) {
        console.log(`this is fog (${name}) for sure. Value: ${buz[name]}`)
      } else {
        console.log(name) // toString or something else
      }
    }
  }

  {
    const foo = {
      hasOwnProperty() {
        return false
      },
      bar: "Here be dragons",
    }

    foo.hasOwnProperty("bar") // re-implementation always returns false
  }

  {
    const foo = { bar: "Here be dragons" }

    // Use Object.hasOwn() method - recommended
    Object.hasOwn(foo, "bar") // true

    // Use the hasOwnProperty property from the Object prototype
    Object.prototype.hasOwnProperty.call(foo, "bar") // true

    // Use another Object's hasOwnProperty
    // and call it with 'this' set to foo
    ;({}).hasOwnProperty.call(foo, "bar") // true
  }
}

// Object.getPrototypeOf()
if (false) {
  {
    const prototype1 = {}
    const object1 = Object.create(prototype1)

    console.log(Object.getPrototypeOf(object1) === prototype1)
    // Expected output: true
  }

  {
    const proto = {}
    const obj = Object.create(proto)
    Object.getPrototypeOf(obj) === proto // true
  }

  {
    Object.getPrototypeOf("foo")
    // TypeError: 'foo' is not an object (ES5 code)
    Object.getPrototypeOf("foo")
    // String.prototype                  (ES2015 code)

    console.log("🚀 ~ Object.getPrototypeOf('foo'):", Object.getPrototypeOf("foo") === String.prototype)
  }
}

// Object.isExtensible()
if (false) {
  {
    const object1 = {}

    console.log(Object.isExtensible(object1)) // Expected output: true

    Object.preventExtensions(object1)

    console.log(Object.isExtensible(object1)) // Expected output: false
  }

  {
    // New objects are extensible.
    const empty = {}

    console.log("🚀 ~ Object.isExtensible(empty):", Object.isExtensible(empty)) // true

    // They can be made un-extensible
    Object.preventExtensions(empty)
    console.log("🚀 ~ Object.isExtensible(empty):", Object.isExtensible(empty)) // false

    // Sealed objects are by definition non-extensible.
    const sealed = Object.seal({})
    console.log("🚀 ~ Object.isExtensible(sealed):", Object.isExtensible(sealed)) // false

    // Frozen objects are also by definition non-extensible.
    const frozen = Object.freeze({})
    console.log("🚀 ~ Object.isExtensible(frozen):", Object.isExtensible(frozen)) // false
  }

  {
    Object.isExtensible(1) // TypeError: 1 is not an object (ES5 code)

    console.log("🚀 ~ Object.isExtensible(1):", Object.isExtensible(1)) // false (ES2015 code)
  }
}

// Object.isFrozen()
if (false) {
  {
    const object1 = {
      property1: 42,
    }

    console.log(Object.isFrozen(object1))
    // Expected output: false

    Object.freeze(object1)

    console.log(Object.isFrozen(object1))
    // Expected output: true
  }

  try {
    // A new object is extensible, so it is not frozen.
    Object.isFrozen({}) // false

    // An empty object which is not extensible
    // is vacuously frozen.
    const vacuouslyFrozen = Object.preventExtensions({})
    Object.isFrozen(vacuouslyFrozen) // true

    // A new object with one property is also extensible,
    // ergo not frozen.
    const oneProp = { p: 42 }
    Object.isFrozen(oneProp) // false

    // Preventing extensions to the object still doesn't
    // make it frozen, because the property is still
    // configurable (and writable).
    Object.preventExtensions(oneProp)
    Object.isFrozen(oneProp) // false

    // Deleting that property makes the object vacuously frozen.
    delete oneProp.p
    Object.isFrozen(oneProp) // true

    // A non-extensible object with a non-writable
    // but still configurable property is not frozen.
    const nonWritable = { e: "plep" }
    Object.preventExtensions(nonWritable)
    Object.defineProperty(nonWritable, "e", {
      writable: false,
    }) // make non-writable
    Object.isFrozen(nonWritable) // false

    // Changing that property to non-configurable
    // then makes the object frozen.
    Object.defineProperty(nonWritable, "e", {
      configurable: false,
    }) // make non-configurable
    Object.isFrozen(nonWritable) // true

    // A non-extensible object with a non-configurable
    // but still writable property also isn't frozen.
    const nonConfigurable = { release: "the kraken!" }
    Object.preventExtensions(nonConfigurable)
    Object.defineProperty(nonConfigurable, "release", {
      configurable: false,
    })
    Object.isFrozen(nonConfigurable) // false

    // Changing that property to non-writable
    // then makes the object frozen.
    Object.defineProperty(nonConfigurable, "release", {
      writable: false,
    })
    Object.isFrozen(nonConfigurable) // true

    // A non-extensible object with a configurable
    // accessor property isn't frozen.
    const accessor = {
      get food() {
        return "yum"
      },
    }
    Object.preventExtensions(accessor)
    Object.isFrozen(accessor) // false

    // When we make that property non-configurable it becomes frozen.
    Object.defineProperty(accessor, "food", {
      configurable: false,
    })
    Object.isFrozen(accessor) // true

    // But the easiest way for an object to be frozen
    // is if Object.freeze has been called on it.
    const frozen = { 1: 81 }
    Object.isFrozen(frozen) // false
    Object.freeze(frozen)
    Object.isFrozen(frozen) // true

    // By definition, a frozen object is non-extensible.
    Object.isExtensible(frozen) // false

    // Also by definition, a frozen object is sealed.
    Object.isSealed(frozen) // true
  } catch (error) {
    console.log("🚀 ~ error:", error.message)
  }
  {
    Object.isFrozen(1)
    // TypeError: 1 is not an object (ES5 code)

    Object.isFrozen(1)
    // true                          (ES2015 code)
  }
}

// Object.prototype.isPrototypeOf()
if (false) {
  {
    function Foo() {}
    function Bar() {}

    Bar.prototype = Object.create(Foo.prototype)

    const bar = new Bar()

    console.log(Foo.prototype.isPrototypeOf(bar))
    // Expected output: true
    console.log(Bar.prototype.isPrototypeOf(bar))
    // Expected output: true
  }

  {
    class Foo {}
    class Bar extends Foo {}
    class Baz extends Bar {}

    const foo = new Foo()
    const bar = new Bar()
    const baz = new Baz()

    // prototype chains:
    // foo: Foo --> Object
    // bar: Bar --> Foo --> Object
    // baz: Baz --> Bar --> Foo --> Object
    console.log(Baz.prototype.isPrototypeOf(baz)) // true
    console.log(Baz.prototype.isPrototypeOf(bar)) // false
    console.log(Baz.prototype.isPrototypeOf(foo)) // false
    console.log(Bar.prototype.isPrototypeOf(baz)) // true
    console.log(Bar.prototype.isPrototypeOf(foo)) // false
    console.log(Foo.prototype.isPrototypeOf(baz)) // true
    console.log(Foo.prototype.isPrototypeOf(bar)) // true
    console.log(Object.prototype.isPrototypeOf(baz)) // true
  }

  {
    class Foo {
      #value = "foo"
      static getValue(x) {
        return x.#value
      }
      static isFoo(x) {
        return #value in x
      }
    }

    const baz = { __proto__: Foo.prototype }

    if (Foo.isFoo(baz)) {
      // Doesn't run, because baz is not a Foo
      console.log(Foo.getValue(baz))
    }
  }
}

// Object.isSealed()
if (false) {
  {
    const object1 = {
      property1: 42,
    }

    console.log(Object.isSealed(object1))
    // Expected output: false

    Object.seal(object1)

    console.log(Object.isSealed(object1))
    // Expected output: true
  }

  {
    // Objects aren't sealed by default.
    const empty = {}
    Object.isSealed(empty) // false

    // If you make an empty object non-extensible,
    // it is vacuously sealed.
    Object.preventExtensions(empty)
    Object.isSealed(empty) // true

    // The same is not true of a non-empty object,
    // unless its properties are all non-configurable.
    const hasProp = { fee: "fie foe fum" }
    Object.preventExtensions(hasProp)
    Object.isSealed(hasProp) // false

    // But make them all non-configurable
    // and the object becomes sealed.
    Object.defineProperty(hasProp, "fee", {
      configurable: false,
    })
    Object.isSealed(hasProp) // true

    // The easiest way to seal an object, of course,
    // is Object.seal.
    const sealed = {}
    Object.seal(sealed)
    Object.isSealed(sealed) // true

    // A sealed object is, by definition, non-extensible.
    Object.isExtensible(sealed) // false

    // A sealed object might be frozen,
    // but it doesn't have to be.
    Object.isFrozen(sealed) // true
    // (all properties also non-writable)

    const s2 = Object.seal({ p: 3 })
    Object.isFrozen(s2) // false
    // ('p' is still writable)

    const s3 = Object.seal({
      get p() {
        return 0
      },
    })
    Object.isFrozen(s3) // true
    // (only configurability matters for accessor properties)
  }

  {
    Object.isSealed(1)
    // TypeError: 1 is not an object (ES5 code)

    Object.isSealed(1)
    // true                          (ES2015 code)
  }
}

// Object.prototype.propertyIsEnumerable()
if (false) {
  {
    const object1 = {}
    const array1 = []
    object1.property1 = 42
    array1[0] = 42

    console.log(object1.propertyIsEnumerable("property1"))
    // Expected output: true

    console.log(array1.propertyIsEnumerable(0))
    // Expected output: true

    console.log(array1.propertyIsEnumerable("length"))
    // Expected output: false
  }

  {
    const o = {}
    const a = []
    o.prop = "is enumerable"
    a[0] = "is enumerable"

    o.propertyIsEnumerable("prop") // true
    a.propertyIsEnumerable(0) // true
  }

  {
    const a = ["is enumerable"]

    a.propertyIsEnumerable(0) // true
    a.propertyIsEnumerable("length") // false

    Math.propertyIsEnumerable("random") // false
    // globalThis.propertyIsEnumerable("Math"); // false
  }

  {
    const o1 = {
      enumerableInherited: "is enumerable",
    }
    Object.defineProperty(o1, "nonEnumerableInherited", {
      value: "is non-enumerable",
      enumerable: false,
    })

    const o2 = {
      // o1 is the prototype of o2
      __proto__: o1,
      enumerableOwn: "is enumerable",
    }

    Object.defineProperty(o2, "nonEnumerableOwn", {
      value: "is non-enumerable",
      enumerable: false,
    })

    console.log("🚀 ~ o2.propertyIsEnumerable('enumerableInherited'):", o2.propertyIsEnumerable("enumerableInherited")) // false
    console.log(
      "🚀 ~ o2.propertyIsEnumerable('nonEnumerableInherited'):",
      o2.propertyIsEnumerable("nonEnumerableInherited")
    ) // false
    console.log("🚀 ~ o2.propertyIsEnumerable('enumerableOwn'):", o2.propertyIsEnumerable("enumerableOwn")) // true
    console.log("🚀 ~ o2.propertyIsEnumerable('nonEnumerableOwn'):", o2.propertyIsEnumerable("nonEnumerableOwn")) // false
  }

  {
    const sym = Symbol("enumerable")
    const sym2 = Symbol("non-enumerable")
    const o = {
      [sym]: "is enumerable",
    }
    Object.defineProperty(o, sym2, {
      value: "is non-enumerable",
      enumerable: false,
    })

    console.log("🚀 ~ o.propertyIsEnumerable(sym):", o.propertyIsEnumerable(sym)) // true
    console.log("🚀 ~ o.propertyIsEnumerable(sym2):", o.propertyIsEnumerable(sym2)) // false
  }

  {
    const o = {
      __proto__: null,
      enumerableOwn: "is enumerable",
    }

    // console.log("🚀 ~ o.propertyIsEnumerable('enumerableOwn'):", o.propertyIsEnumerable("enumerableOwn")); // TypeError: o.propertyIsEnumerable is not a function
    console.log(
      "🚀 ~ Object.prototype.propertyIsEnumerable.call(o, 'enumerableOwn'):",
      Object.prototype.propertyIsEnumerable.call(o, "enumerableOwn")
    ) // true
  }

  {
    const o = {
      __proto__: null,
      enumerableOwn: "is enumerable",
    }

    console.log(
      "🚀 ~ Object.getOwnPropertyDescriptor(o, 'enumerableOwn')?.enumerable:",
      Object.getOwnPropertyDescriptor(o, "enumerableOwn")?.enumerable
    ) // true
    console.log(
      "🚀 ~ Object.getOwnPropertyDescriptor(o, 'nonExistent')?.enumerable:",
      Object.getOwnPropertyDescriptor(o, "nonExistent")?.enumerable
    ) // undefined
  }
}
