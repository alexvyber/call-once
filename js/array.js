const arrayLength = 10;
const [element1, element2, element3, elementN] = Array.from({
	length: arrayLength,
});

// Constructor
if (false) {
	new Array();
	new Array(element1);
	new Array(element1, element2);
	new Array(element1, element2, /* …, */ elementN);
	new Array(arrayLength);

	Array();
	Array(element1);
	Array(element1, element2);
	Array(element1, element2, /* …, */ elementN);
	Array(arrayLength);
}

if (false) {
	const arr1 = new Array(3);
	arr1[2] = "string";
	console.log("🚀 ~ file: array.js:19 ~ arr1:", arr1);

	console.log(
		"🚀 ~ file: array.js:22 ~ 0 in arr1 || '0' in arr1:",
		0 in arr1 || "0" in arr1,
	);
	console.log(
		"🚀 ~ file: array.js:24 ~ 1 in arr1 || '1' in arr1:",
		1 in arr1 || "1" in arr1,
	);
	console.log(
		"🚀 ~ file: array.js:24 ~ 2 in arr1 || '2' in arr1:",
		2 in arr1 || "2" in arr1,
	);

	console.log("🚀 ~ file: array.js:19 ~ 2 in arr1:", 2 in arr1);
	console.log("🚀 ~ file: array.js:21 ~ '2' in arr1:", "2" in arr1);

	const arr2 = Array.from({ length: arrayLength });
	console.log("🚀 ~ file: array.js:19 ~ arr2:", arr2);
	console.log("🚀 ~ file: array.js:20 ~ 0 in arr2:", 0 in arr2);

	const arr3 = new Array("10");
	console.log("🚀 ~ file: array.js:34 ~ arr3[0]:", arr3[0]);
}

// Array[@@species]

if (false) {
	class Array1 extends Array {
		static get [Symbol.species]() {
			return this;
		}
	}

	const a = new Array1(1, 2, 3, 4, 5);
	const mapped = a.map((x) => x * x);

	console.log("🚀 ~ file: array.js:50 ~ mapped:", mapped);

	console.log(mapped instanceof Array1);
	// Expected output: false

	console.log(mapped instanceof Array);
	// Expected output: true
}

// Array.length
if (false) {
	const arr = [1, 2];
	console.log(arr);
	// [ 1, 2 ]

	arr.length = 5; // set array length to 5 while currently 2.
	console.log(arr);
	// [ 1, 2, <3 empty items> ]

	arr.forEach((element) => console.log(element));
	// 1
	// 2

	const numbers = [1, 2, 3, 4, 5];
	Object.defineProperty(numbers, "length", { writable: false });
	numbers[5] = 6; // TypeError: Cannot assign to read only property 'length' of object '[object Array]'
	numbers.push(5); // TypeError: Cannot assign to read only property 'length' of object '[object Array]'
}

// Array.prototype[@@iterator]()
if (true) {
	const array1 = ["a", "b", "c"];
	const iterator1 = array1[Symbol.iterator]();
	for (const value of iterator1) {
		console.log(value);
	}

	const iterator2 = array1[Symbol.iterator]();
	const arr = [...iterator2].forEach((v) => console.log(v));
}

// console.log("🚀 ~ file: array.js:40 ~ Array.length:", Array.length)
// Array() constructor
// Array.from()
// Array.fromAsync()
// Array.isArray()
// Array.of()
// Array[@@species]
// Array.prototype[@@unscopables]
// Array.prototype[@@iterator]()
// Array.prototype.at()
// Array.prototype.concat()
// Array.prototype.copyWithin()
// Array.prototype.entries()
// Array.prototype.every()
// Array.prototype.fill()
// Array.prototype.filter()
// Array.prototype.find()
// Array.prototype.findIndex()
// Array.prototype.findLast()
// Array.prototype.findLastIndex()
// Array.prototype.flat()
// Array.prototype.flatMap()
// Array.prototype.forEach()
// Array.prototype.includes()
// Array.prototype.indexOf()
// Array.prototype.join()
// Array.prototype.keys()
// Array.prototype.lastIndexOf()
// Array.prototype.map()
// Array.prototype.pop()
// Array.prototype.push()
// Array.prototype.reduce()
// Array.prototype.reduceRight()
// Array.prototype.reverse()
// Array.prototype.shift()
// Array.prototype.slice()
// Array.prototype.some()
// Array.prototype.sort()
// Array.prototype.splice()
// Array.prototype.toLocaleString()
// Array.prototype.toReversed()
// Array.prototype.toSorted()
// Array.prototype.toSpliced()
// Array.prototype.toString()
// Array.prototype.unshift()
// Array.prototype.values()
// Array.prototype.with()
