// Declaration
class Rectangle {
  constructor(height, width) {
    this.height = height
    this.width = width
  }
}

// Expression; the class is anonymous but assigned to a variable
const RectangleTwo = class {
  constructor(height, width) {
    this.height = height
    this.width = width
  }
}

// Expression; the class has its own name
const RectangleThree = class Rectangle {
  constructor(height, width) {
    this.height = height
    this.width = width
  }
}

//

class RectangleMore {
  constructor(height, width) {
    this.height = height
    this.width = width
  }

  // Getter
  get area() {
    return this.calcArea()
  }

  // Method
  calcArea() {
    return this.height * this.width
  }

  *getSides() {
    yield this.height
    yield this.width
    yield this.height
    yield this.width
  }
}

const square = new RectangleMore(10, 10)

console.log(square.area) // 100
console.log([...square.getSides()]) // [10, 10, 10, 10]
console.log(square.getSides().next())

//

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  static displayName = "Point"

  static distance(a, b) {
    const dx = a.x - b.x
    const dy = a.y - b.y

    return Math.hypot(dx, dy)
  }
}

const p1 = new Point(5, 5)
const p2 = new Point(10, 10)

p1.displayName // undefined
p1.distance // undefined
p2.displayName // undefined
p2.distance // undefined

console.log(Point.displayName) // "Point"
console.log(Point.distance(p1, p2)) // 7.0710678118654755

//

class RectangleOther {
  height = 0
  width
  constructor(height, width) {
    this.height = height
    this.width = width
  }
}

class RectanglePrivate {
  #height = 0
  #width
  constructor(height, width) {
    this.#height = height
    this.#width = width
  }
}

// inheritance

class Animal {
  constructor(name) {
    this.name = name
  }

  speak() {
    console.log(`${this.name} makes a noise.`)
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name) // call the super class constructor and pass in the name parameter
  }

  speak() {
    console.log(`${this.name} barks.`)
  }
}

const d = new Dog("Mitzie")
d.speak() // Mitzie barks.

class Cat {
  constructor(name) {
    this.name = name
  }

  speak() {
    console.log(`${this.name} makes a noise.`)
  }
}

class Lion extends Cat {
  speak() {
    super.speak()
    console.log(`${this.name} roars.`)
  }
}

const l = new Lion("Fuzzy")
l.speak()
// Fuzzy makes a noise.
// Fuzzy roars.

//.

class AnimalMore {
  speak() {
    return this
  }
  static eat() {
    return this
  }
}

const obj = new AnimalMore()
console.log(obj.speak().speak().speak().speak().speak()) // the AnimalMore object

const speak = obj.speak
speak() // undefined

AnimalMore.eat() // class AnimalMore
const eat = AnimalMore.eat
eat() // undefined
