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
if (false) {
	const array1 = ["a", "b", "c"];
	const iterator1 = array1[Symbol.iterator]();
	for (const value of iterator1) {
		console.log(value);
	}

	const iterator2 = array1[Symbol.iterator]();
	[...iterator2].forEach((v) => console.log(v));

	const iterator3 = array1[Symbol.iterator]();
	for (const item of iterator3) {
		console.log(item);
	}

	const arr = ["wwa", "wwb", "wwc", "wwd", "wwe"];
	const arrIter = arr[Symbol.iterator]();
	console.log(arrIter.next().value); // a
	console.log(arrIter.next().value); // b
	console.log(arrIter.next().value); // c
	console.log(arrIter.next().value); // d
	console.log(arrIter.next().value); // e
}

// Array.prototype.at()
// The `at()` method is equivalent to the bracket notation when index is non-negative.
// For example, array[0] and array.at(0) both return the first item.
// However, when counting elements from the end of the array, you cannot use array[-1] like you may in Python or R,
// because all values inside the square brackets are treated literally as string properties, so you will end up reading array["-1"],
// which is just a normal string property instead of an array index.
if (false) {
	const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

	console.log("arr[-2], arr[-3]:", arr[-2], arr[-3]);
	console.log("arr['-2'],arr['-3']:", arr["-2"], arr["-3"]);
	console.log("arr.at(-1), arr.at(-2) :", arr.at(-1), arr.at(-2));
	console.log("arr.at('-1'), arr.at('-2') :", arr.at("-1"), arr.at("-2"));

	console.log(arr.slice(-3, -1));
	console.log(arr.slice(-4, -1));
	console.log(arr.slice(-4, arr.length));

	const arrayLike = {
		length: 2,
		0: "a",
		1: "b",
		2: "c", // ignored by at() since length is 2
	};

	console.log(Array.prototype.at.call(arrayLike, 0)); // "a"
	console.log(Array.prototype.at.call(arrayLike, 2)); // undefined
}

// Array.prototype.concat()
if (false) {
	const letters = ["a", "b", "c"];
	const numbers = [1, 2, 3];

	const alphaNumeric = letters.concat(numbers);
	console.log(alphaNumeric);

	//
	const num1 = [1, 2, 3];
	const num2 = [4, 5, 6];
	const num3 = [7, 8, 9];

	const numbers1 = num1.concat(num2, num3);

	console.log(numbers1); // results in [1, 2, 3, 4, 5, 6, 7, 8, 9]

	//
	const letters1 = ["a", "b", "c"];

	const alphaNumeric1 = letters1.concat(1, [2, 3], 4, [5, [6, 7]]);

	console.log(alphaNumeric1); // results in ['a', 'b', 'c', 1, 2, 3, 4, 5, [6, 7]]

	//
	const obj1 = { 0: 1, 1: 2, 2: 3, length: 3 };
	const obj2 = {
		0: 1,
		1: 2,
		2: 3,
		length: 3,
		[Symbol.isConcatSpreadable]: true,
	};
	console.log([0].concat(obj1, obj2)); // [ 0, { '0': 1, '1': 2, '2': 3, length: 3 }, 1, 2, 3 ]

	//
	console.log([1, , 3].concat([4, 5])); // [1, empty, 3, 4, 5]
	console.log([1, 2].concat([3, , 5])); // [1, 2, 3, empty, 5]

	console.log(Array.prototype.concat.call({}, 1, 2, 3)); // [{}, 1, 2, 3]
	console.log(Array.prototype.concat.call(1, 2, 3)); // [ [Number: 1], 2, 3 ]
	console.log(Array.prototype.concat.call("a", 1, 2, 3)); // [ [String: 'a'], 1, 2, 3 ]

	//
	const arrayLike = {
		[Symbol.isConcatSpreadable]: true,
		length: 2,
		0: 1,
		1: 2,
		2: 99, // ignored by concat() since length is 2
	};
	console.log(Array.prototype.concat.call(arrayLike, 3, 4)); // [1, 2, 3, 4]

	console.log(
		[0].concat([1], 2, 3).concat([4], 5, 6, 7, 8).concat(9).concat(10),
	);
}

// Array.prototype.copyWithin()
if (false) {
	const array1 = ["a", "b", "c", "d", "e", "f", "g", "h"];

	// Copy to index 0 the element at index 3
	console.log(array1.copyWithin(0, 3, 4)); // Expected output: Array ["d", "b", "c", "d", "e", ...]

	// Copy to index 1 all elements from index 3 to the end
	console.log(array1.copyWithin(1, 3)); // Expected output: Array ["d", "d", "e", "d", "e", ...]

	console.log(array1.copyWithin(0, 3, array1.length - 1));
	console.log([1, 2, 3, 4, 5, 6].copyWithin(2)); // [1, 2, 1, 2, 3, 4]; move all elements to the right by 2 positions

	console.log([1, 2, 3, 4, 5, 6].copyWithin(4));

	console.log([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].copyWithin(0, 3, 4)); // [4, 2, 3, 4, 5, ...]
	console.log([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].copyWithin(0, 3, 5)); // [4, 5, 3, 4, 5, ...]
	console.log([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].copyWithin(0, 2, 6)); // [3, 4, 5, 6, 5, ...]

	const arrayLike = {
		length: 5,
		3: 1,
	};
	console.log(Array.prototype.copyWithin.call(arrayLike, 0, 3)); // { '0': 1, '3': 1, length: 5 }
	console.log(Array.prototype.copyWithin.call(arrayLike, 3, 1)); // { '0': 1, length: 5 }
	// The '3' property is deleted because the copied source is an empty slot
}

// Array.prototype.entries()
if (false) {
	const array1 = ["a", "b", "c"];

	const iterator1 = array1.entries();

	console.log(iterator1.next().value); // Expected output: Array [0, "a"]
	console.log(iterator1.next().value); // Expected output: Array [1, "b"]
	// console.log(iterator1.next().value); // Expected output: Array [2, "c"]
	const some = iterator1.next();

	const a = ["a", "b", "c"];

	for (const [index, element] of a.entries()) {
		console.log(index, element);
	}

	const array = ["a", "b", "c"];
	const arrayEntries = array.entries();

	for (const element of arrayEntries) {
		console.log(element);
		// [0, 'a']
		// [1, 'b']
		// [2, 'c']
	}

	for (const element of [, "a"].entries()) {
		console.log(element);
		// [0, undefined]
		// [1, 'a']
	}

	const arrayLike = {
		length: 3,
		0: "a",
		1: "b",
		2: "c",
		3: "d", // ignored by entries() since length is 3
	};
	for (const entry of Array.prototype.entries.call(arrayLike)) {
		console.log(entry);
		// [ 0, 'a' ]
		// [ 1, 'b' ]
		// [ 2, 'c' ]
	}
}

// Array.prototype.every()
if (false) {
	const isBelowThreshold = (currentValue) => currentValue < 40;

	const array1 = [1, 30, 39, 29, 10, 13];

	let arr = array1.map((v) => (v * v).toString());

	console.log(array1.every(isBelowThreshold)); // Expected output: true
	console.log(array1.concat(40).every(isBelowThreshold)); // Expected output: false
	array1.every((v, i) => (console.log(i, v), true));

	array1.every(function (v, i) {
		console.log(i, v);
		console.log(this[i]);
		return true;
	}, arr);

	function isBigEnough(element, index, array) {
		return element >= 10;
	}
	const res1 = [12, 5, 8, 130, 44].every(isBigEnough); // false
	const res2 = [12, 54, 18, 130, 44].every(isBigEnough); // true

	console.log("🚀 ~ file: array.js:302 ~ res1,res2:", res1, res2);

	const isSubset = (one, two) => two.every((element) => one.includes(element));

	console.log(isSubset([1, 2, 3, 4, 5, 6, 7], [5, 7, 6])); // true
	console.log(isSubset([1, 2, 3, 4, 5, 6, 7], [5, 8, 7])); // false

	console.log([1, , 3].every((x) => x !== undefined)); // true
	console.log([2, , 2].every((x) => x === 2)); // true

	// ---------------
	// Modifying items
	// ---------------
	arr = [1, 2, 3, 4];
	arr.every((elem, index, arr) => {
		arr[index + 1]--;
		console.log(`[${arr}][${index}] -> ${elem}`);
		return elem < 2;
	});

	// Loop runs for 3 iterations, but would
	// have run 2 iterations without any modification
	//
	// 1st iteration: [1,1,3,4][0] -> 1
	// 2nd iteration: [1,1,2,4][1] -> 1
	// 3rd iteration: [1,1,2,3][2] -> 2

	// ---------------
	// Appending items
	// ---------------
	arr = [1, 2, 3];
	arr.every((elem, index, arr) => {
		arr.push("new");
		console.log(`[${arr}][${index}] -> ${elem}`);
		return elem < 4;
	});

	// Loop runs for 3 iterations, even after appending new items
	//
	// 1st iteration: [1, 2, 3, new][0] -> 1
	// 2nd iteration: [1, 2, 3, new, new][1] -> 2
	// 3rd iteration: [1, 2, 3, new, new, new][2] -> 3

	// ---------------
	// Deleting items
	// ---------------
	arr = [1, 2, 3, 4];
	arr.every((elem, index, arr) => {
		arr.pop();
		console.log(`[${arr}][${index}] -> ${elem}`);
		return elem < 4;
	});

	// Loop runs for 2 iterations only, as the remaining
	// items are `pop()`ed off
	//
	// 1st iteration: [1,2,3][0] -> 1
	// 2nd iteration: [1,2][1] -> 2
}

// Array.prototype.fill()
if (true) {
	const array1 = [1, 2, 3, 4, 5, 6];

	// Fill with 0 from position 2 until position 4
	console.log(array1.fill(0, 2, 4)); // Expected output: Array [1, 2, 0, 0]

	// Fill with 5 from position 1
	console.log(array1.fill(5, 1)); // Expected output: Array [1, 5, 5, 5]

	console.log(array1.fill(6)); // Expected output: Array [6, 6, 6, 6]

	console.log([1, 2, 3].fill(4)); // [4, 4, 4]
	console.log([1, 2, 3].fill(4, 1)); // [1, 4, 4]
	console.log([1, 2, 3].fill(4, 1, 2)); // [1, 4, 3]
	console.log([1, 2, 3].fill(4, 1, 1)); // [1, 2, 3]
	console.log([1, 2, 3].fill(4, 3, 3)); // [1, 2, 3]
	console.log([1, 2, 3].fill(4, -3, -2)); // [4, 2, 3]
	console.log([1, 2, 3].fill(4, NaN, NaN)); // [1, 2, 3]
	console.log([1, 2, 3].fill(4, 3, 5)); // [1, 2, 3]
	console.log(Array(3).fill(4)); // [4, 4, 4]

	// A single object, referenced by each slot of the array:
	const arr = Array(3).fill({}); // [{}, {}, {}]
	arr[0].hi = "hi"; // [{ hi: "hi" }, { hi: "hi" }, { hi: "hi" }]
	console.log("🚀 ~ file: array.js:387 ~ arr:", arr);

	function getStuff() {
		return Math.random() > 0.5 ? { foo: undefined } : { bar: null };
	}
	const arr1 = Array(10).fill(getStuff());

	console.log("🚀 ~ file: array.js:394 ~ arr1:", arr1);
	if ("foo" in arr1[5]) {
		arr1[5].foo = "some shit";
	} else {
		arr1[9].bar = "other shit";
	}
	console.log("🚀 ~ file: array.js:394 ~ arr1:", arr1);

	const arr2 = new Array(3);
	for (let i = 0; i < arr2.length; i++) {
		arr2[i] = new Array(4).fill(1); // Creating an array of size 4 and filled of 1
	}
	arr2[0][0] = 10;
	console.log(arr2[0][0]); // 10
	console.log(arr2[1][0]); // 1
	console.log(arr2[2][0]); // 1
}

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
