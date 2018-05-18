//// //////////////////////////////////
//Function constructor
//var Person = function(name, yearOfBirth, job) {
//	this.name = name;
//	this.yearOfBirth = yearOfBirth;
//	this.job = job;
//};
//// attach methods to the constructor functions' prototype property
//Person.prototype.calculateAge = function() {
//		console.log(2018 - this.yearOfBirth);
//};
//// attach properties to the constructor functions' prototype property
//Person.prototype.lastName = 'Smith';
//var john = new Person('John', 1990, 'teacher');
//john.calculateAge(); 



// Object.create
//var personProto = {
//	calculateAge: function() {
//		console.log(2016 - this.yearOfBirth);
//	}
//}
//
//// not an idel way to fill name, yearOfBirth and job
//// after creating the object
//var john = Object.create(personProto);
//john.name = 'John';
//john.yearOfBirth = 1990;
//john.job = 'teacher';
//
//// Object.create accepts second parameter:
//var jane = Object.create(personProto, {
//	name: { value: 'Jane' },
//	yearOfBirth: { value: 1988 },
//	job: { value: 'designer' }
//})



//// Primitives vs Objects
//// Primitives:
//var a = 23;
//var b = a;
//a = 46;
//console.log(a);
//console.log(b);
//
//var obj1 = {
//	name: 'John',
//	age: 26
//}
//var obj2 = obj1;
//obj1.age = 30;
//console.log(obj1.age);
//console.log(obj2.age);


//// Functions
//var age = 27;
//var obj = {
//	name: 'Meng',
//	city: 'Boston'
//};
//function change(a, b) {
//	a = 30;
//	b.city = 'New York';
//};
//
//change(age, obj);
//console.log(age);
//console.log(obj.city);
//

/////////////////////////////////////////
// Passing functions as arguments
var years = [1990, 1965, 1937, 2005, 1998];

// fn is a callback function
// is function called from another function
function arrayCalc(arr, fn) {
	var arrRes = [];
	for (var i = 0; i < arr.length; i++) {
		arrRes.push(fn(arr[i]));
	}
	return arrRes;
}

function calculateAge(el) {
	return 2018 - el;
}

function isAdult(el) {
	return el > 18;
}

function maxHearRate(el) {
	if (el >= 18 && el <= 81) {
		return Math.round(206.9 - 0.67 * el);
	} else {
		return -1;
	}
}

// we don't have () after calculateAge
// because we are not calling it now
// instead we call it later
var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isAdult);
var rates = arrayCalc(ages, maxHearRate);

console.log(ages); // [28, 53, 81, 13, 20]
console.log(fullAges); // [true, true, true, false, true]
console.log(rates); // [188, 171, 153, -1, 194]

















