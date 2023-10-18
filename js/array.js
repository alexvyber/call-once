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
if (false) {
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

// Array.prototype.filter()
if (false) {
	let words = [
		"spray",
		"limit",
		"elite",
		"exuberant",
		"destruction",
		"present",
	];

	const result = words.filter((word) => word.length > 6);

	console.log(result); // Expected output: Array ["exuberant", "destruction", "present"]

	//
	const array = [
		-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 17, 19, 23, 29,
	];

	function isPrime(num) {
		for (let i = 2; num > i; i++) {
			if (num % i === 0) {
				return false;
			}
		}
		return num > 1;
	}

	console.log(array.filter(isPrime)); // [2, 3, 5, 7, 11, 13]

	//
	const arr = [
		{ id: 15 },
		{ id: -1 },
		{ id: 0 },
		{ id: 3 },
		{ id: 12.2 },
		{},
		{ id: null },
		{ id: NaN },
		{ id: "undefined" },
	];

	let invalidEntries = 0;

	function filterByID(item) {
		if (Number.isFinite(item.id) && item.id !== 0) {
			return true;
		}
		invalidEntries++;
		return false;
	}

	const arrByID = arr.filter(filterByID);

	console.log("Filtered Array\n", arrByID);
	// Filtered Array
	// [{ id: 15 }, { id: -1 }, { id: 3 }, { id: 12.2 }]

	console.log("Number of Invalid Entries =", invalidEntries);
	// Number of Invalid Entries = 5

	const fruits = ["apple", "banana", "grapes", "mango", "orange"];

	/**
	 * Filter array items based on search criteria (query)
	 */
	function filterItems(arr, query) {
		return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
	}

	console.log(filterItems(fruits, "ap")); // ['apple', 'grapes']
	console.log(filterItems(fruits, "an")); // ['banana', 'mango', 'orange']
	console.log(filterItems(fruits, "or"));

	//
	const arrayLike = {
		length: 5,
		0: "a",
		1: "b",
		2: "c",
		3: "a",
		4: "f",
		5: "a", // ignored by filter() since length is 5
	};
	console.log(Array.prototype.filter.call(arrayLike, (x) => x <= "b")); // [ 'a', 'b', 'a' ]

	// Modifying each word
	words = ["spray", "limit", "exuberant", "destruction", "elite", "present"];

	const modifiedWords = words.filter((word, index, arr) => {
		arr[index + 1] += " extra";
		return word.length < 6;
	});
	console.log("🚀 ~ file: array.js:502 ~ words:", words);
	console.log(modifiedWords);
	// Notice there are three words below length 6, but since they've been modified one is returned
	// ["spray"]

	// Appending new words
	words = ["spray", "limit", "exuberant", "destruction", "elite", "present"];

	const appendedWords = words.filter((word, index, arr) => {
		arr.push("new");
		return word.length < 6;
	});
	console.log("🚀 ~ file: array.js:514 ~ words:", words);

	console.log(appendedWords);
	// Only three fits the condition even though the `words` itself now has a lot more words with character length less than 6
	// ["spray" ,"limit" ,"elite"]

	// Deleting words
	words = [
		"spray",
		"limit",
		"exuberant",
		"some",
		"destruction",
		"elite",
		// "present",
	];
	const deleteWords = words.filter((word, index, arr) => {
		arr.pop();
		return word.length < 6;
	});

	console.log("🚀 ~ file: array.js:527 ~ words:", words);
	console.log(deleteWords);
	// Notice 'elite' is not even obtained as it's been popped off 'words' before filter can even get there
	// ["spray" ,"limit"]

	//
	let letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

	const res = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(function (
		item,
		index,
		arr,
	) {
		if (this[index]) {
			this[index] = `${index}-${this[index]}`;
		}

		return item % 2 === 0;
	}, letters);

	console.log("🚀 ~ file: array.js:548 ~ res ~ res:", res);
	console.log("🚀 ~ file: array.js:547 ~ letters:", letters);
}

// Array.prototype.find()
if (false) {
	const array1 = [5, 12, 8, 130, 44];
	const found = array1.find((element) => element > 10);
	console.log(found); // Expected output: 12

	let inventory = [
		{ name: "apples", quantity: 2 },
		{ name: "bananas", quantity: 0 },
		{ name: "cherries", quantity: 5 },
	];

	function isCherries(fruit) {
		return fruit.name === "cherries";
	}

	console.log(inventory.find(isCherries));
	// { name: 'cherries', quantity: 5 }

	inventory = [
		{ name: "apples", quantity: 2 },
		{ name: "bananas", quantity: 0 },
		{ name: "cherries", quantity: 5 },
	];

	const result = inventory.find(({ name }) => name === "cherries");

	console.log(result);
	// { name: 'cherries', quantity: 5 }

	function isPrime(element, index, array) {
		let start = 2;
		while (start <= Math.sqrt(element)) {
			if (element % start++ < 1) {
				return false;
			}
		}
		return element > 1;
	}

	console.log([1, -5, 4, 6, 8, 12].find(isPrime)); // undefined, not found
	console.log([1, -5, 4, 5, 8, 12].find(isPrime)); // 5

	const array = [0, 1, , , , 5, 6];

	// Shows all indexes, not just those with assigned values
	const result1 = array.find((value, index) => {
		console.log("Visited index", index, "with value", value);
		if (index === 0) return null;
		if (index === 1) return undefined;
		if (index === 2) return 0;
		if (index === 4) return "";
	});
	console.log("🚀 ~ file: array.js:613 ~ result1 ~ result1:", result1);

	// Shows all indexes, including deleted
	array.find((value, index) => {
		// Delete element 5 on first iteration
		if (index === 0) {
			console.log("Deleting array[5] with value", array[5]);
			delete array[5];
		}

		// Element 5 is still visited even though deleted
		console.log(
			"🚀 ~ file: array.js:629 ~ array.find ~ 'Visited index', index, 'with value', value:",
			"Visited index",
			index,
			"with value",
			value,
		);
	});
	// Deleting array[5] with value 5
	// Visited index 0 with value 0
	// Visited index 1 with value 1
	// Visited index 2 with value undefined
	// Visited index 3 with value undefined
	// Visited index 4 with value undefined
	// Visited index 5 with value undefined
	// Visited index 6 with value 6

	const arrayLike = {
		length: 4,
		"-2": 0.1, // ignored by find() since -2 < 0
		"-1": 0.1, // ignored by find() since -1 < 0
		0: 2,
		1: Math.random() > 0.5 ? 5.5 : 5,
		2: 4,
		3: 6,
		4: 420.69, // ignored by filter() since length is 5
	};
	console.log(
		Array.prototype.find.call(arrayLike, (x) => !Number.isInteger(x)),
	);
	// 7.3
}

// Array.prototype.findIndex()
if (false) {
	const array1 = [5, 12, 8, 130, 44];
	const isLargeNumber = (element) => element > 13;
	console.log(array1.findIndex(isLargeNumber)); // Expected output: 3

	function isPrime(element) {
		if (element % 2 === 0 || element < 2) {
			return false;
		}
		for (let factor = 3; factor <= Math.sqrt(element); factor += 2) {
			if (element % factor === 0) {
				return false;
			}
		}
		return true;
	}

	console.log([4, 6, 8, 9, 12].findIndex(isPrime)); // -1, not found
	console.log([4, 6, 7, 9, 12].findIndex(isPrime)); // 2 (array[2] is 7)

	console.log([1, , , , 3].findIndex((x) => x === undefined)); // 1

	const arrayLike = {
		length: 3,
		"-2": 0.1, // ignored by findIndex() since -2 < 0
		"-1": 0.1, // ignored by findIndex() since -1 < 0
		0: 2,
		1: 7.3,
		2: 4,
	};
	console.log(
		Array.prototype.findIndex.call(
			Math.random() > 0.5
				? Object.assign(
						{ ...arrayLike },
						{ "-3": 0.1, 1: 1, 3: 5.5, length: 4 },
				  )
				: arrayLike,
			function (x) {
				console.log(this);
				return !Number.isInteger(x);
			},
			// null,
			Object.assign({ ...arrayLike }, { "-3": 0.1, 1: 1, 3: 5.5, length: 4 }),
		),
	); // 1
}

// Array.prototype.findLast()
if (false) {
	const array1 = [5, 12, 50, 130, 44];

	const found = array1.findLast((element) => element > 45);

	console.log(found);
	// Expected output: 130

	const arrayLike = {
		length: 3,
		0: 2,
		1: 7.3,
		2: 44,
		3: 3, // ignored by findLast() since length is 3
	};
	console.log(
		Array.prototype.findLast.call(arrayLike, (x) => Number.isInteger(x)),
	); // 44
}

// Array.prototype.findLastIndex()
if (false) {
	const array1 = [5, 12, 50, 130, 44];

	const isLargeNumber = (element) => element > 45;

	console.log(array1.findLastIndex(isLargeNumber));
	// Expected output: 3
	// Index of element with value: 130

	function isPrime(element) {
		if (element % 2 === 0 || element < 2) {
			return false;
		}
		for (let factor = 3; factor <= Math.sqrt(element); factor += 2) {
			if (element % factor === 0) {
				return false;
			}
		}
		return true;
	}

	console.log([4, 6, 8, 12].findLastIndex(isPrime)); // -1, not found
	console.log([4, 5, 7, 8, 9, 11, 12, 19].findLastIndex(isPrime)); // 7

	console.log([1, , 3].findLastIndex((x) => x === undefined)); // 1

	const arrayLike = {
		length: 3,
		0: 2,
		1: 7.3,
		2: 4,
		3: 3, // ignored by findLastIndex() since length is 3
	};
	console.log(
		Array.prototype.findLastIndex.call(arrayLike, (x) => Number.isInteger(x)),
	); // 2
}

// Array.prototype.flat()
if (false) {
	const arr1 = [0, 1, 2, [3, 4]];

	console.log(arr1.flat());
	// expected output: Array [0, 1, 2, 3, 4]

	const arr2 = [0, 1, [2, [3, [4, 5]]]];

	console.log(arr2.flat());
	// expected output: Array [0, 1, 2, Array [3, Array [4, 5]]]

	console.log(arr2.flat(2));
	// expected output: Array [0, 1, 2, 3, Array [4, 5]]

	console.log(arr2.flat(Infinity));
	// expected output: Array [0, 1, 2, 3, 4, 5]

	console.log("🚀 ~ file: array.js:776 ~ arr2:", arr2);

	const arr5 = [1, 2, , 4, 5];
	console.log(arr5.flat()); // [1, 2, 4, 5]

	const array = [1, , 3, ["a", , "c"]];
	console.log(array.flat()); // [ 1, 3, "a", "c" ]

	const array2 = [1, , , , , 3, ["a", , , , , , ["d", , , , , "e"]]];
	console.log(array2.flat()); // [ 1, 3, "a", ["d", empty, "e"] ]
	console.log(array2.flat(2)); // [ 1, 3, "a", "d", "e"]

	const arrayLike = {
		length: 3,
		0: [1, 2],
		// Array-like objects aren't flattened
		1: { length: 2, 0: 3, 1: 4 },
		2: [5, [6, [7, [8, [9]]]]],
		3: 3, // ignored by flat() since length is 3
	};
	console.log(Array.prototype.flat.call(arrayLike, 3));
	// [ 1, 2, { '0': 3, '1': 4, length: 2 }, 5 ]
}

// Array.prototype.flatMap()
if (false) {
	const arr1 = [1, 2, 1];

	const result = arr1.flatMap((num) => (num === 2 ? [2, 2] : 1));

	console.log(result);
	// Expected output: Array [1, 2, 2, 1]

	const arr = [1, 2, 3, 4];

	arr.flatMap((x) => [x, x * 2]);
	// is equivalent to
	const n = arr.length;
	const acc = new Array(n * 2);
	for (let i = 0; i < n; i++) {
		const x = arr[i];
		acc[i * 2] = x;
		acc[i * 2 + 1] = x * 2;
	}
	// [1, 2, 2, 4, 3, 6, 4, 8]

	const arr2 = ["it's Sunny in", "", "California"];

	const res2 = arr2.map((x) => x.split(" "));
	console.log("🚀 ~ file: array.js:833 ~ res2:", res2);
	// [["it's","Sunny","in"],[""],["California"]]

	const res3 = arr2.flatMap((x) => x.split(" "));
	console.log("🚀 ~ file: array.js:837 ~ res3:", res3);
	// ["it's","Sunny","in", "", "California"]

	const arrayLike = {
		length: 3,
		0: 1,
		1: 2,
		2: 3,
		3: 4, // ignored by flatMap() since length is 3
	};
	console.log(Array.prototype.flatMap.call(arrayLike, (x) => [x, x * 2]));
	// [1, 2, 2, 4, 3, 6]

	// Array-like objects returned from the callback won't be flattened
	console.log(
		Array.prototype.flatMap.call(arrayLike, (x) => ({
			length: 1,
			0: x,
		})),
	);
	// [ { '0': 1, length: 1 }, { '0': 2, length: 1 }, { '0': 3, length: 1 } ]
}

// Array.prototype.forEach()
if (false) {
	const array1 = ["a", "b", "c"];

	array1.forEach((element) => console.log(element));

	// Expected output: "a"
	// Expected output: "b"
	// Expected output: "c"

	const ratings = [5, 4, 5];
	let sum = 0;

	const sumFunction = async (a, b) => a + b;

	ratings.forEach(async (rating) => {
		sum = await sumFunction(sum, rating);
	});

	console.log(sum);
	// Naively expected output: 14
	// Actual output: 0

	const arraySparse = [1, 3, /* empty */ , 7];
	let numCallbackRuns = 0;

	arraySparse.forEach((element) => {
		console.log({ element });
		numCallbackRuns++;
	});

	console.log({ numCallbackRuns });

	const items = ["item1", "item2", "item3"];
	const copyItems = [];

	// before
	for (let i = 0; i < items.length; i++) {
		copyItems.push(items[i]);
	}

	// after
	items.forEach((item) => {
		copyItems.push(item);
	});

	const logArrayElements = (element, index /*, array */) => {
		console.log(`a[${index}] = ${element}`);
	};

	// Notice that index 2 is skipped, since there is no item at
	// that position in the array.
	[2, 5, , 9].forEach(logArrayElements);
	// Logs:
	// a[0] = 2
	// a[1] = 5
	// a[3] = 9

	console.table([2, 5, , 9]);

	class Counter {
		constructor() {
			this.sum = 0;
			this.count = 0;
		}

		sumUp(array) {
			// Only function expressions will have its own this binding
			array.forEach(function countEntry(entry) {
				this.sum += entry;
				++this.count;
			}, this);
		}
	}

	const obj = new Counter();
	obj.sumUp([2, 5, 9]);
	console.log(obj.count); // 3
	console.log(obj.sum); // 16

	const copy = (obj) => {
		const copy = Object.create(Object.getPrototypeOf(obj));
		const propNames = Object.getOwnPropertyNames(obj);

		propNames.forEach((name) => {
			const desc = Object.getOwnPropertyDescriptor(obj, name);
			Object.defineProperty(copy, name, desc);
		});

		return copy;
	};

	const obj1 = { a: 1, b: 2 };
	const obj2 = copy(obj1); // obj2 looks like obj1 now

	console.log("🚀 ~ file: array.js:959 ~ obj1 === obj2:", obj1 === obj2);
	console.log("🚀 ~ file: array.js:959 ~ obj1, obj2:", obj1, obj2);

	const words = ["one", "two", "three", "four"];
	words.forEach((word) => {
		console.log(word);
		if (word === "two") {
			words.shift(); //'one' will delete from array
		}
	}); // one // two // four

	console.log(words); // ['two', 'three', 'four']

	const flatten = (arr) => {
		const result = [];
		arr.forEach((item) => {
			if (Array.isArray(item)) {
				result.push(...flatten(item));
			} else {
				result.push(item);
			}
		});
		return result;
	};

	// Usage
	const nested = [1, 2, 3, [4, 5, [6, 7], 8, 9]];
	console.log(flatten(nested)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

	const arrayLike = {
		length: 3,
		0: 2,
		1: 3,
		2: 4,
		3: 5, // ignored by forEach() since length is 3
	};
	Array.prototype.forEach.call(arrayLike, (x) => console.log(x));
	// 2
	// 3
	// 4
}

// Array.from()
if (false) {
	console.log(Array.from("foo"));
	// Expected output: Array ["f", "o", "o"]

	console.log(Array.from([1, 2, 3], (x) => x + x));
	// Expected output: Array [2, 4, 6]

	const map = new Map([
		[1, 2],
		[2, 4],
		[4, 8],
	]);
	Array.from(map);
	// [[1, 2], [2, 4], [4, 8]]

	const mapper = new Map([
		["1", "a"],
		["2", "b"],
	]);
	Array.from(mapper.values());
	// ['a', 'b'];

	Array.from(mapper.keys());
	// ['1', '2'];

	//
	// Create an array based on a property of DOM Elements
	// const images = document.querySelectorAll("img");
	// const sources = Array.from(images, (image) => image.src);
	// const insecureSources = sources.filter((link) => link.startsWith("http://"));

	function f() {
		return Array.from(arguments);
	}

	console.log("🚀 ~ file: array.js:1037 ~ f(1, 2, 3):", f(1, 2, 3));

	// [ 1, 2, 3 ]

	// Using an arrow function as the map function to
	// manipulate the elements
	Array.from([1, 2, 3], (x) => x + x);
	// [2, 4, 6]

	// Generate a sequence of numbers
	// Since the array is initialized with `undefined` on each position,
	// the value of `v` below will be `undefined`
	Array.from({ length: 5 }, (v, i) => i);
	// [0, 1, 2, 3, 4]

	// Sequence generator function (commonly referred to as "range", e.g. Clojure, PHP, etc.)
	const range = (start, stop, step) =>
		Array.from(
			{ length: (stop - start) / step + 1 },
			(_, i) => start + i * step,
		);

	// Generate numbers range 0..4

	console.log("🚀 ~ file: array.js:1060 ~ range(0, 4, 1):", range(0, 4, 1));
	// [0, 1, 2, 3, 4]

	// Generate numbers range 1..10 with step of 2

	console.log("🚀 ~ file: array.js:1065 ~ range(1, 10, 2):", range(1, 10, 2));
	// [1, 3, 5, 7, 9]

	console.log(
		"🚀 ~ file: array.js:1069 ~ range(1_000_000, 20_000, 6_000_000):",
		range(1_000_000, 6_000_000, 20_000),
	);

	const letters = range("A".charCodeAt(0), "Z".charCodeAt(0), 1).map((x) => [
		String.fromCharCode(x),
		String.fromCharCode(x).toLowerCase(),
	]);
	console.log("🚀 ~ file: array.js:1076 ~ letters:", letters);
	// ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

	function NotArray(len) {
		console.log("NotArray called with length", len);
	}

	// Iterable
	console.log(Array.from.call(NotArray, new Set(["foo", "bar", "baz"])));
	// NotArray called with length undefined
	// NotArray { '0': 'foo', '1': 'bar', '2': 'baz', length: 3 }

	// Array-like
	console.log(Array.from.call(NotArray, { length: 1, 0: "foo" }));
	// NotArray called with length 1
	// NotArray { '0': 'foo', length: 1 }

	console.log(Array.from.call({}, { length: 1, 0: "foo" })); // [ 'foo' ]
	console.log(Array.from.call(null, { length: 1, 0: "foo" })); // [ 'foo' ]
	console.log(Array.from.call(undefined, { length: 1, 0: "foo" })); // [ 'foo' ]
}

// Array.fromAsync()
if (false) {
	const asyncIterable = (async function* () {
		for (let i = 0; i < 5; i++) {
			console.log(i);
			await new Promise((resolve) => setTimeout(resolve, 100 * i));
			yield i;
		}
	})();

	if (Math.random() > 0.5) {
		Array.fromAsync(asyncIterable).then((array) => console.log(array));
	} else {
		const res = await Array.fromAsync(asyncIterable);
		console.log("🚀 ~ file: array.js:1115 ~ res:", res);
	}

	Array.fromAsync(
		new Map([
			[1, 2],
			[3, 4],
		]),
	).then((array) => console.log(array));
	// [[1, 2], [3, 4]]

	Array.fromAsync(
		new Set([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]),
	).then((array) => console.log(array));
	// [1, 2, 3]

	Array.fromAsync({
		length: 3,
		0: Promise.resolve(1),
		1: Promise.resolve(2),
		2: Promise.resolve(3),
	}).then((array) => console.log(array));
	// [1, 2, 3]

	function delayedValue(v) {
		return new Promise((resolve) => setTimeout(() => resolve(v), 100));
	}

	Array.fromAsync(
		[delayedValue(1), delayedValue(2), delayedValue(3)],
		(element) => delayedValue(element * 2),
	).then((array) => console.log(array));
	// [2, 4, 6]

	function* makeAsyncIterable() {
		for (let i = 0; i < 5; i++) {
			yield new Promise((resolve) => setTimeout(resolve, 100));
		}
	}

	(async () => {
		console.time("Array.fromAsync() time");
		await Array.fromAsync(makeAsyncIterable());
		console.timeEnd("Array.fromAsync() time");
		// Array.fromAsync() time: 503.610ms

		console.time("Promise.all() time");
		await Promise.all(makeAsyncIterable());
		console.timeEnd("Promise.all() time");
		// Promise.all() time: 101.728ms
	})();

	function* generatorWithRejectedPromises() {
		try {
			yield 0;
			yield Promise.reject(3);
		} finally {
			console.log("called finally");
		}
	}

	(async () => {
		try {
			await Array.fromAsync(generatorWithRejectedPromises());
		} catch (e) {
			console.log("caught", e);
		}
	})();
	// caught 3
	// No "called finally" message

	(async () => {
		const arr = [];
		try {
			for (const val of generatorWithRejectedPromises()) {
				arr.push(await val);
			}
		} catch (e) {
			console.log("caught", e);
		}
	})();
	// called finally
	// caught 3
}

// Array.prototype.includes()
if (false) {
	const array1 = [1, 2, 3];

	console.log(array1.includes(2)); // Expected output: true
	const pets = ["cat", "dog", "bat"];
	console.log(pets.includes("cat")); // Expected output: true
	console.log(pets.includes("at")); // Expected output: false

	[1, 2, 3].includes(2); // true
	[1, 2, 3].includes(4); // false
	[1, 2, 3].includes(3, 3); // false
	[1, 2, 3].includes(3, -1); // true
	[1, 2, NaN].includes(NaN); // true
	["1", "2", "3"].includes(3); // false

	let arr = ["a", "b", "c"];

	arr.includes("c", 3); // false
	arr.includes("c", 100); // false

	// array length is 3
	// fromIndex is -100
	// computed index is 3 + (-100) = -97

	arr.includes("a", -100); // true
	arr.includes("b", -100); // true
	arr.includes("c", -100); // true
	arr.includes("a", -2); // false

	console.log([1, , 3].includes(undefined)); // true

	const arrayLike = {
		length: 3,
		0: 2,
		1: 3,
		2: 4,
		3: 1, // ignored by includes() since length is 3
	};

	console.log(Array.prototype.includes.call(arrayLike, 2)); // true
	console.log(Array.prototype.includes.call(arrayLike, 1)); // false
}

// Array.prototype.indexOf()
if (false) {
	const beasts = ["ant", "bison", "camel", "duck", "bison"];

	console.log(beasts.indexOf("bison")); // Expected output: 1

	// Start from index 2
	console.log(beasts.indexOf("bison", 2)); // Expected output: 4

	console.log(beasts.indexOf("giraffe")); // Expected output: -1

	const array = [2, 9, 9];
	const res1 = array.indexOf(2); // 0
	const res2 = array.indexOf(7); // -1
	const res3 = array.indexOf(9, 2); // 2
	const res4 = array.indexOf(2, -1); // -1
	const res5 = array.indexOf(2, -3); // 0

	console.log(
		"🚀 ~ file: array.js:1263 ~ res1,res2,res3,res4,res5:",
		res1,
		res2,
		res3,
		res4,
		res5,
	);

	const array1 = [NaN];
	console.log("🚀 ~ array1.indexOf(NaN):", array1.indexOf(NaN));

	// Finding all the occurrences of an element
	const indices = [];
	const array2 = ["a", "b", "a", "c", "a", "d", "a", "f", "a"];
	const element = "a";
	let idx = array2.indexOf(element);
	while (idx !== -1) {
		indices.push(idx);
		idx = array2.indexOf(element, idx + 1);
	}
	console.log(indices);
	// [0, 2, 4]

	// Finding if an element exists in the array or not and updating the array
	function updateVegetablesCollection(veggies, veggie) {
		if (veggies.indexOf(veggie) === -1) {
			veggies.push(veggie);
			console.log(`New veggies collection is: ${veggies}`);
		} else {
			console.log(`${veggie} already exists in the veggies collection.`);
		}
	}

	const veggies = ["potato", "tomato", "chillies", "green-pepper"];

	updateVegetablesCollection(veggies, "spinach"); // New veggies collection is: potato,tomato,chillies,green-pepper,spinach
	updateVegetablesCollection(veggies, "spinach"); // spinach already exists in the veggies collection.

	// You cannot use indexOf() to search for empty slots in sparse arrays.
	console.log([1, , , , , 3].indexOf(undefined)); // -1
	console.log([1, , , undefined, , 3].indexOf(undefined)); // 3

	const arrayLike = {
		length: 3,
		0: 2,
		1: 3,
		2: 4,
		3: 5, // ignored by indexOf() since length is 3
	};

	console.log(Array.prototype.indexOf.call(arrayLike, 2)); // 0
	console.log(Array.prototype.indexOf.call(arrayLike, 5)); // -1
}

// Array.isArray()
if (false) {
	console.log(Array.isArray([1, 3, 5])); // Expected output: true
	console.log(Array.isArray("[]")); // Expected output: false
	console.log(Array.isArray(new Array(5))); // Expected output: true
	console.log(Array.isArray(new Int16Array([15, 33]))); // Expected output: false

	// all following calls return true

	Array.isArray([]);
	console.log("🚀 ~ Array.isArray([]):", Array.isArray([]));
	Array.isArray([1]);
	console.log("🚀 ~ Array.isArray([1]):", Array.isArray([1]));
	Array.isArray(new Array());
	console.log("🚀 ~ Array.isArray(new Array()):", Array.isArray(new Array()));
	Array.isArray(new Array("a", "b", "c", "d"));
	console.log(
		"🚀 ~ Array.isArray(new Array('a', 'b', 'c', 'd')):",
		Array.isArray(new Array("a", "b", "c", "d")),
	);
	Array.isArray(new Array(3));
	console.log("🚀 ~ Array.isArray(new Array(3)):", Array.isArray(new Array(3)));
	// Little known fact: Array.prototype itself is an array:
	Array.isArray(Array.prototype);
	Array.isArray(Array);
	console.log("🚀 ~ Array.isArray(Array):", Array.isArray(Array));
	console.log(
		"🚀 ~ Array.isArray(Array.prototype):",
		Array.isArray(Array.prototype),
	);

	// all following calls return false
	Array.isArray();
	console.log("🚀 ~ Array.isArray():", Array.isArray());
	Array.isArray({});
	console.log("🚀 ~ Array.isArray({}):", Array.isArray({}));
	Array.isArray(null);
	console.log("🚀 ~ Array.isArray(null):", Array.isArray(null));
	Array.isArray(undefined);
	console.log("🚀 ~ Array.isArray(undefined):", Array.isArray(undefined));
	Array.isArray(17);
	console.log("🚀 ~ Array.isArray(17):", Array.isArray(17));
	Array.isArray("Array");
	console.log("🚀 ~ Array.isArray('Array'):", Array.isArray("Array"));
	Array.isArray(true);
	console.log("🚀 ~ Array.isArray(true):", Array.isArray(true));
	Array.isArray(false);
	console.log("🚀 ~ Array.isArray(false):", Array.isArray(false));
	Array.isArray(new Uint8Array(32));
	console.log(
		"🚀 ~ Array.isArray(new Uint8Array(32)):",
		Array.isArray(new Uint8Array(32)),
	);
	// This is not an array, because it was not created using the
	// array literal syntax or the Array constructor
	Array.isArray({ __proto__: Array.prototype });
	console.log(
		"🚀 ~ Array.isArray({ __proto__: Array.prototype }):",
		Array.isArray({ __proto__: Array.prototype }),
	);

	const iframe = document.createElement("iframe");
	document.body.appendChild(iframe);
	const xArray = window.frames[window.frames.length - 1].Array;
	const arr = new xArray(1, 2, 3); // [1, 2, 3]

	// instanceof vs. Array.isArray()
	// When checking for Array instance, Array.isArray() is preferred over instanceof because it works across realms.
	// Correctly checking for Array
	Array.isArray(arr); // true
	// The prototype of arr is xArray.prototype, which is a
	// different object from Array.prototype
	arr instanceof Array; // false
}

// Array.prototype.join()
if (false) {
	const elements = ["Fire", "Air", "Water"];

	console.log(elements.join()); // Expected output: "Fire,Air,Water"
	console.log(elements.join("")); // Expected output: "FireAirWater"
	console.log(elements.join("-")); // Expected output: "Fire-Air-Water"

	const matrix = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
	];

	console.log(matrix.join()); // 1,2,3,4,5,6,7,8,9
	console.log(matrix.join(";")); // 1,2,3;4,5,6;7,8,9

	const arr = [];
	arr.push(1, [3, arr, 4], 2);
	console.log(arr.join(";")); // 1;3,,4;2

	const a = ["Wind", "Water", "Fire"];
	a.join(); // 'Wind,Water,Fire'
	a.join(", "); // 'Wind, Water, Fire'
	a.join(" + "); // 'Wind + Water + Fire'
	a.join(""); // 'WindWaterFire'

	console.log([1, , 3].join()); // '1,,3'
	console.log([1, undefined, 3].join()); // '1,,3'

	const arrayLike = {
		length: 3,
		0: 2,
		1: 3,
		2: 4,
		3: 5, // ignored by join() since length is 3
	};
	console.log(Array.prototype.join.call(arrayLike));
	// 2,3,4
	console.log(Array.prototype.join.call(arrayLike, "."));
	// 2.3.4
}

// Array.prototype.keys()
if (false) {
	const array1 = ["a", "b", "c"];
	const iterator = array1.keys();

	for (const key of iterator) {
		console.log(key);
	}

	// Expected output: 0
	// Expected output: 1
	// Expected output: 2

	const arr = ["a", , "c"];

	const sparseKeys = Object.keys(arr);
	console.log(sparseKeys); // ['0', '2']

	const denseKeys = [...arr.keys()];
	console.log(denseKeys); // [0, 1, 2]

	const arrayLike = {
		length: 3,
	};

	for (const entry of Array.prototype.keys.call(arrayLike)) {
		console.log(entry);
	}
	// 0
	// 1
	// 2
}

// Array.prototype.lastIndexOf()
if (false) {
	const animals = ["Dodo", "Tiger", "Penguin", "Dodo"];

	console.log(animals.lastIndexOf("Dodo")); // Expected output: 3
	console.log(animals.lastIndexOf("Tiger")); // Expected output: 1

	const numbers = [2, 5, 9, 2];
	numbers.lastIndexOf(2); // 3
	numbers.lastIndexOf(7); // -1
	numbers.lastIndexOf(2, 3); // 3
	numbers.lastIndexOf(2, 2); // 0
	numbers.lastIndexOf(2, -2); // 0
	numbers.lastIndexOf(2, -1); // 3

	let array = [NaN];
	array.lastIndexOf(NaN); // -1

	// Finding all the occurrences of an element
	// The following example uses lastIndexOf to find all the indices of an element in a given array,
	// using push() to add them to another array as they are found.
	const indices = [];
	array = ["a", "b", "a", "c", "a", "d"];
	const element = "a";
	let idx = array.lastIndexOf(element);

	while (idx !== -1) {
		indices.push(idx);
		idx = idx > 0 ? array.lastIndexOf(element, idx - 1) : -1;
	}

	console.log(indices);
	// [4, 2, 0]

	console.log([1, , 3].lastIndexOf(undefined)); // -1
	console.log([1, , undefined, , , , , , , 3].lastIndexOf(undefined)); // -1

	const arrayLike = {
		length: 3,
		0: 2,
		1: 3,
		2: 2,
		3: 5, // ignored by lastIndexOf() since length is 3
	};
	console.log(Array.prototype.lastIndexOf.call(arrayLike, 2)); // 2
	console.log(Array.prototype.lastIndexOf.call(arrayLike, 5)); // -1
}

// Array.prototype.map()
if (false) {
	const numbers = [1, 4, 9];
	const roots = numbers.map((num) => Math.sqrt(num));
	console.log("🚀 ~ roots:", roots);
	const roots1 = numbers.map(Math.sqrt);
	console.log("🚀 ~ roots1:", roots1);
	// roots is now     [1, 2, 3]
	// numbers is still [1, 4, 9]

	const cart = [5, 15, 25];
	let total = 0;
	const withTax = cart.map((cost) => {
		total += cost;
		return cost * 1.2;
	});
	console.log(withTax); // [6, 18, 30]
	console.log(total); // 45

	const arrayLike = {
		length: 3,
		0: 2,
		1: 3,
		2: 4,
		3: 5, // ignored by map() since length is 3
	};
	console.log(Array.prototype.map.call(arrayLike, (x) => x ** 2));
	// [ 4, 9, 16 ]

	// 	Using map() generically on a NodeList
	// This example shows how to iterate through a collection of objects collected by querySelectorAll.
	// This is because querySelectorAll returns a NodeList (which is a collection of objects).

	// In this case, we return all the selected options' values on the screen:
	// const elems = document.querySelectorAll("select option:checked");
	// const values = Array.prototype.map.call(elems, ({ value }) => value);

	console.log(
		[1, , 3].map((x, index) => {
			console.log(`Visit ${index}`);
			return x * 2;
		}),
	);

	["1", "2", "3"].map(parseInt);
	// parseInt(string, radix) -> map(parseInt(value, index))
	/* first iteration  (index is 0): */ parseInt("1", 0); // 1
	/* second iteration (index is 1): */ parseInt("2", 1); // NaN
	/* third iteration  (index is 2): */ parseInt("3", 2); // NaN

	const returnInt = (element) => parseInt(element, 10);

	["1", "2", "3"].map(returnInt); // [1, 2, 3]
	// Actual result is an array of numbers (as expected)

	// Same as above, but using the concise arrow function syntax
	["1", "2", "3"].map((str) => parseInt(str)); // [1, 2, 3]

	// A simpler way to achieve the above, while avoiding the "gotcha":
	["1", "2", "3"].map(Number); // [1, 2, 3]

	// But unlike parseInt(), Number() will also return a float or (resolved) exponential notation:
	["1.1", "2.2e2", "3e300"].map(Number); // [1.1, 220, 3e+300]

	// For comparison, if we use parseInt() on the array above:
	["1.1", "2.2e2", "3e300"].map((str) => parseInt(str)); // [1, 2, 3]

	const strings = ["10", "10", "10"];
	const numbers1 = strings.map(parseInt);

	console.log(numbers1);
	// Actual result of [10, NaN, 2] may be unexpected based on the above description.

	const numbers2 = [1, 2, 3, 4];
	const filteredNumbers = numbers2.map((num, index) => {
		if (index < 3) {
			return num;
		}
	});

	// index goes from 0, so the filterNumbers are 1,2,3 and undefined.
	// filteredNumbers is [1, 2, 3, undefined]
	// numbers is still [1, 2, 3, 4]
}

// Array.of()
if (false) {
	console.log(Array.of("foo", 2, "bar", true)); // Expected output: Array ["foo", 2, "bar", true]
	console.log(Array.of()); // Expected output: Array []

	Array.of(7); // [7]
	Array(7); // array of 7 empty slots

	Array.of(1, 2, 3); // [1, 2, 3]
	Array(1, 2, 3); // [1, 2, 3]

	function NotArray(len) {
		console.log("NotArray called with length", len);
	}

	console.log(Array.of.call(NotArray, 1, 2, 3));
	// NotArray called with length 3
	// NotArray { '0': 1, '1': 2, '2': 3, length: 3 }

	console.log(Array.of.call(Object)); // [Number: 0] { length: 0 }

	console.log(Array.of.call({}, 1)); // [ 1 ]
}

// Array.prototype.pop()
if (false) {
	const plants = ["broccoli", "cauliflower", "cabbage", "kale", "tomato"];

	console.log(plants.pop()); // Expected output: "tomato"
	console.log(plants); // Expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]
	plants.pop();
	console.log(plants); // Expected output: Array ["broccoli", "cauliflower", "cabbage"]

	const arrayLike = {
		length: 3,
		unrelated: "foo",
		2: 4,
	};
	console.log(Array.prototype.pop.call(arrayLike));
	// 4
	console.log(arrayLike);
	// { length: 2, unrelated: 'foo' }
	console.log(Array.prototype.pop.call(arrayLike));
	console.log(arrayLike);

	console.log(Array.prototype.pop.call(arrayLike));
	console.log(arrayLike);

	console.log(Array.prototype.pop.call(arrayLike));
	console.log(arrayLike);

	const plainObj = {};
	// There's no length property, so the length is 0
	Array.prototype.pop.call(plainObj);
	console.log(plainObj);
	// { length: 0 }

	// Using an object in an array-like fashion
	// push and pop are intentionally generic, and we can use that to our advantage — as the following example shows.

	// Note that in this example, we don't create an array to store a collection of objects.
	// Instead, we store the collection on the object itself and use call on Array.prototype.push and Array.prototype.pop
	// to trick those methods into thinking we're dealing with an array.

	const collection = {
		length: 0,
		addElements(...elements) {
			// obj.length will be incremented automatically
			// every time an element is added.

			// Returning what push returns; that is
			// the new value of length property.
			return Array.prototype.push.call(this, ...elements);
		},
		removeElement() {
			// obj.length will be decremented automatically
			// every time an element is removed.

			// Returning what pop returns; that is
			// the removed element.
			return Array.prototype.pop.call(this);
		},
	};

	collection.addElements(10, 20, 30);
	console.log("🚀 ~ collection:", collection);
	console.log(collection.length); // 3
	collection.removeElement();
	console.log("🚀 ~ collection:", collection);
	console.log(collection.length); // 2

	collection.removeElement();
	console.log("🚀 ~ collection:", collection);

	const l = collection.addElements(100, 200, 300);
	console.log(collection.length); // 2
	console.log("🚀 ~ l:", l);
}

// Array.prototype.push()
if (true) {
	const animals = ["pigs", "goats", "sheep"];

	const count = animals.push("cows");
	console.log(count); // Expected output: 4
	console.log(animals); // Expected output: Array ["pigs", "goats", "sheep", "cows"]

	animals.push("chickens", "cats", "dogs");
	console.log(animals); // Expected output: Array ["pigs", "goats", "sheep", "cows", "chickens", "cats", "dogs"]

	const arrayLike = {
		length: 3,
		unrelated: "foo",
		2: 4,
	};

	Array.prototype.push.call(arrayLike, 1, 2);
	console.log(arrayLike);
	// { '2': 4, '3': 1, '4': 2, length: 5, unrelated: 'foo' }

	const plainObj = {};

	// There's no length property, so the length is 0
	Array.prototype.push.call(plainObj, 1, 2);
	console.log(plainObj);
	// { '0': 1, '1': 2, length: 2 }

	const obj = {
		length: 0,

		addElem(elem) {
			// obj.length is automatically incremented
			// every time an element is added.
			Array.prototype.push.call(this, elem);
		},
	};

	// Let's add some empty objects just to illustrate.
	obj.addElem({});
	obj.addElem({});
	console.log(obj.length); // 2
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
