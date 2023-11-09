const obj = {}

obj[Symbol("a")] = "a"

obj[Symbol.for("b")] = "b"

obj["c"] = "c"
obj.d = "d"

console.log("🚀 ~ obj[Symbol('a')]:", obj[Symbol("a")])
console.log("🚀 ~ obj[Symbol.for('b')]:", obj[Symbol.for("b")])

for (const i in obj) {
  console.log(i)
  // "c" "d"
}

const sym = Symbol("foo")
// const obj = { [sym]: 1 };

Object.defineProperty(obj, sym, { value: 21 })

console.log("🚀 ~ obj[sym]:", obj[sym]) // 1
console.log("🚀 ~ obj[Object(sym)]:", obj[Object(sym)]) // still 1
