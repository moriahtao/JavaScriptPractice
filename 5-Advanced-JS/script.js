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

///////////////////////////////////////////
//// Passing functions as arguments
//var years = [1990, 1965, 1937, 2005, 1998];
//
//// fn is a callback function
//// is function called from another function
//function arrayCalc(arr, fn) {
//	var arrRes = [];
//	for (var i = 0; i < arr.length; i++) {
//		arrRes.push(fn(arr[i]));
//	}
//	return arrRes;
//}
//
//function calculateAge(el) {
//	return 2018 - el;
//}
//
//function isAdult(el) {
//	return el > 18;
//}
//
//function maxHearRate(el) {
//	if (el >= 18 && el <= 81) {
//		return Math.round(206.9 - 0.67 * el);
//	} else {
//		return -1;
//	}
//}
//
//// we don't have () after calculateAge
//// because we are not calling it now
//// instead we call it later
//var ages = arrayCalc(years, calculateAge);
//var fullAges = arrayCalc(ages, isAdult);
//var rates = arrayCalc(ages, maxHearRate);
//
//console.log(ages); // [28, 53, 81, 13, 20]
//console.log(fullAges); // [true, true, true, false, true]
//console.log(rates); // [188, 171, 153, -1, 194]




///////////////////////////////////////////
//// Functions return functions
//// returns objects that happen to be functions
//function interviewQ(job) {
//	if (job === 'designer') {
//		// anonymous function here
//		return function(name) {
//			console.log(name + ', ' + 'Can you plz explain what UX is?');
//		}
//	} else if (job === 'teacher') {
//		return function(name) {
//			console.log(name + ', ' + 'What subject do you teach?');
//		}
//	} else {
//		return function(name) {
//			console.log('Hello, ' + name + 'what do you do?');
//		}
//	}
//}
//// just like store a function expression in a variable
//var teacherQ = interviewQ('teacher');
//teacherQ('John');
//
//var designerQ = interviewQ('designer');
//designerQ('Jane');
//
//// can use functions right away
//// don't need to store in a variable
//interviewQ('teacher')('Tim'); // Tim, What subject do you teach?


//////////////////////////////////////////
//// IIFE: Immediately
//function game() {
//	var score = Math.random * 10;
//	console.log(score >= 5);
//}
//
//game();
//
//// (function(){}) is to tell the parser that this is an expression instead of a declaration
//// because in JS, what inside a parenthesis cannot be a statement
//// after that invoke the function using parenthesis();
//(function() {
//	var score = Math.random * 10;
//	console.log(score >= 5);
//})();
//// outside the code, we cannot access score because of scope.
//// By using IIFE, we have more data privacy, we created a new scope which we want to hide from the outside scope
//
//(function(word) {
//	var score = Math.random * 10;
//	console.log((score >= 5) + word);
//})('Good Luck!');

/////////////////////////////////////////////////
//// Closure
//function retire(retirementAge) {
//	var a = 'years left until retirement'; 
//	return function(yearOfBirth) {
//		var age = 2018 - yearOfBirth;
//		console.log(retirementAge - age + a);
//	}
//}
//
//var retireUS = retire(66);
//retireUS(1993);
//retire(66)(1993);
//

////////////////////////////////////////////////
//// Bind, Call and Apply
//
//// Method Borrowing
//// 1. call()
//var john = {
//	name: 'john',
//	age: 26,
//	job: 'teacher',
//	presentation: function(style, timeOfDay) {
//		if (style == 'formal') {
//			console.log('Good ' + timeOfDay + '! Ladies and gentlemaen! I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
//		} else if (style == 'friendly') {
//			console.log('Hey! What\'s up? I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
//		}
//	}
//};
//
//// emily does not have presentation method for now
//var emily = {
//	name: 'Emily',
//	age: 35,
//	job: 'designer'
//};
//
//john.presentation('formal', 'morning'); //Good morning! Ladies and gentlemaen! I'm a teacher and I'm 26 years old.
//john.presentation.call(emily, 'friendly', 'afternoon'); //Hey! What's up? I'm a designer and I'm 35 years old. Have a nice afternoon.
//
//// 2. apply()
////john.presentation.apply(emily, ['friendly', 'afternoon']); // will work after the presentation function changed to accept array as input
//
//// 3. bind()
//// returns a function
//// bind() allows us to preset some arguments
//// this behavior is called carrying
//var johnFriendly = john.presentation.bind(john, 'friendly');
//johnFriendly('morning');// Hey! What's up? I'm a teacher and I'm 26 years old. Have a nice morning.

//var years = [1990, 1965, 1937, 2005, 1998];
//function arrayCalc(arr, fn) {
//	var arrRes = [];
//	for (var i = 0; i < arr.length; i++) {
//		arrRes.push(fn(arr[i]));
//	}
//	return arrRes;
//}
//
//function calculateAge(el) {
//	return 2018 - el;
//}
//
//function isAdult(limit, el) {
//	return el > limit;
//}
//
//// we don't have () after calculateAge
//// because we are not calling it now
//// instead we call it later
//var ages = arrayCalc(years, calculateAge);
//var fullAges = arrayCalc(ages, isAdult.bind(this, 20));
//
//console.log(ages); // [28, 53, 81, 13, 20]
//console.log(fullAges); // [true, true, true, false, true]


//function Gorilla() {
//	this.hasBanana = true;
//	this.eat = notifyEating;
//}
//
//var gorilla = new Gorilla();
//gorilla.eat(3);
//
//function notifyEating(num) {
//	if (this.hasBanana) {
//		console.log(`This gorilla is eating ${num} bananas!`);
//	}
//}


//function myMin(...arr) {
//	return arr.reduce((cur, min) => {
//		return cur < min ? cur : min;
//	});
//}
//
//console.log(myMin(3, -2, 4, 1, -99 , 4, 0));


//var a = [2,3, 8, 9,-1];
//console.log(Math.max(...a));


//let a = [2, 3];
//let b = [...a, ...a];
//console.log(b);
//a = [4, 5];
//console.log(b);

//let obj1 = { a: 0 , b: { c: 0}};
//  let obj2 = Object.assign({}, obj1);
//  console.log(JSON.stringify(obj2)); 

//let obj1 = { a: 0 , b: { c: 0}};
//let obj2 = Object.assign({}, obj1);
//obj2.b.c = 3;
//console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 3}}
//console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 3}}

var foo = 1;
function bar() {
	foo = 10;
	return;
	function foo() {}
	
}

bar();
console.log(foo);

var a = 1;
(function baz() {
	console.log(`a = ${a}`);	
})();


































