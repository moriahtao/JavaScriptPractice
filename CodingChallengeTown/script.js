////ES5
//function driversLicense5(passedTest) {
//	if(passedTest) {
//		console.log(firstName);
//		var firstName = 'john';
//		var yearOfBirth = 1993;
//	}
//	console.log(firstName + ' was born in ' + yearOfBirth);
//};
//
//driversLicense5(true);
//
////ES6
//function driversLicense6(passedTest) {
//	let firstName;
//	const yearOfBirth = 1993;
//	
//	if(passedTest) {
//		firstName = 'john';
//	}
//	console.log( firstName + ' was born in ' + yearOfBirth);
//
//};
//
//driversLicense6(true);
//
//let i = 23;
//for(let i = 0; i < 5; i++) {
//	console.log(i);
//}
//console.log(i);


//////////////////////////////////////////
//// Blocks and IIFEs
//
//// ES6
//{
//	const a = 1;
//	let b = 2;
//	var c = 3;
//}
////console.log(a + b);
//console.log(c);
//// ES5
//(function(){
//	var d = 3;
//})();
//console.log(d);

/////////////////////////////////////////////
//// Strings
//let firstName = 'John';
//let lastName = 'Smith';
//const yearOfBirth = 1990;
//function calcAge(year) {
//	return 2016 - year;
//};
//// ES5
//console.log('This is ' + firstName + lastName + '. He was born in  ' + yearOfBirth + '. Today, he is ' + calcAge(yearOfBirth) + ' years old.');
//// ES6 template literals using `` back tick
//console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today he is ${calcAge(yearOfBirth)} years old.`);
//
//const n = `${firstName} ${lastName}`;
//console.log(n.startsWith('J'));
//console.log(n.endsWith('h'));
//console.log(n.includes('ith'));
//console.log(`${firstName} `.repeat(5));
//
//const years = [1990, 1992, 1965, 1970];
//// ES5
//var ages5 = years.map(function(cur) {
//	return 2018 - cur;
//})
//console.log(ages5); // [28, 26, 53, 48]

////////////////////////////////////////////
//// Arrow functions
//// ES6
//let ages6 = years.map(el => 2018 - el);
//console.log(ages6); // [28, 26, 53, 48]
//ages6 = years.map((el, idx) => `Age element ${idx} is ${2018 - el}`);
//console.log(ages6);
//
//ages = years.map((el, idx) => {
//	const now = new Date().getFullYear();
//	const age = now - el;
//	return `Age element ${idx} is ${age}`;
//});
//console.log(ages6);

///////////////////////////////////////////
//// Arrow functions 2: Lexical 'this' keyword
//
//// ES5	
//var box5 = {
//	color: 'green',
//	position: 1,
//	clickMe: function() {
//		
//		var self = this;
//		document.querySelector('.green').addEventListener('click', function() {
//			console.log(self);
//			var str = 'This is box number ' + self.position + ' and it is ' + self.color;
//			alert(str);
//		});
//	}
//};
//box5.clickMe();

//// ES6	
//const box6 = {
//	color: 'green',
//	position: 1,
//	clickMe: function() {
//		document.querySelector('.green').addEventListener('click', () => { // share the surrounding this keyword
//			console.log(this);
//			var str = 'This is box number ' + this.position + ' and it is ' + this.color;
//			alert(str);
//		});
//	}
//}; 
//box6.clickMe();

//// ES6	
//const box66 = {
//	color: 'green',
//	position: 1,
//	clickMe: () => {
//		document.querySelector('.green').addEventListener('click', () => {
//			console.log(this);
//			var str = 'This is box number ' + this.position + ' and it is ' + this.color;
//			alert(str);
//		});
//	}
//}; 
//box66.clickMe();
//
//function Person(name) {
//	this.name = name;
//};
//
//
////ES5
//Person.prototype.myFriends5 = function (friends) {
//	// here we have access to 'this' variable
//	var arr = friends.map(function(el) {
//		// here we do not have access to 'this' variable
//		return this.name + ' is friends with ' + el;
//	});
//	console.log(arr);
//}
//
//var friends = ['bob', 'jane', 'mark'];
//new Person('john').myFriends5(friends);
//
//// but if we create a copy of the function using bind and preset the 'this' variable of that function as the outside, we can have access to the outside 'this' variable.
//Person.prototype.myFriends55 = function (friends) {
//	// here we have access to 'this' variable as the current obj
//	var arr = friends.map(function(el) {
//		// here we do not have access to 'this' variable as the current obj
//		return this.name + ' is friends with ' + el;
//	}.bind(this));
//	console.log(arr);
//}
//
//new Person('john').myFriends55(friends);
//
////ES6
//Person.prototype.myFriends6 = function (friends) {
//	// here we have access to 'this' variable as the current
//	var arr = friends.map(el => 
//		// here we also have access to 'this' variable as the current object
//		`${this.name} is friends with ${el}`
//	);
//	console.log(arr);
//};
//new Person('john').myFriends6(friends);


////////////////////////////////////////////
//// Destructuring
//// ES5
//var john = ['John', 26];
//var name = john[0];
//var age = john[1];
//
//// ES6
//const [nameForJohn, yearOfJohn] = ['John', 26];
//console.log(nameForJohn);
//console.log(yearOfJohn);
//
//const obj = {
//	firstName: 'john',
//	lastName: 'Gates'
//};
//const {firstName, lastName} = obj;
//console.log(firstName);
//console.log(lastName);
//const {firstName: a, lastName: b} = obj;
//console.log(a);
//console.log(b);
//
//function calcAgeRetirement(year) {
//	const ageInput = new Date().getFullYear() - year;
//	return [ageInput, 65 - ageInput];
//};
//
//const[currentAge, yearsToRetire] = calcAgeRetirement(1970);
//console.log(currentAge);
//console.log(yearsToRetire);

/////////////////////////////////////////////
//// Array
//const boxes = document.querySelectorAll('.box');
//// ES5
////var boxesArray5 = Array.prototype.slice.call(boxes);
////boxesArray5.forEach(function(cur) {
////	cur.style.backgroundColor = 'dodgerblue';
////});
//
//// ES6
//// Array.from transform nodelist to array
//const boxesArray6 = Array.from(boxes);
//boxesArray6.forEach((cur) => {
//	cur.style.backgroundColor = 'dodgerblue';
//});
//
//for(const cur of boxesArray6) {
//	if (cur.className.includes('blue')) {
//		continue;
//	}
//	cur.textContent = 'I changed to blue';
//}
//
//// ES5
//var ages = [12, 7, 9, 13, 21, 7, 19];
//var full = ages.map(function(cur) {
//	return cur > 18;
//});
//console.log(full);
//// return the first element matches
//console.log(ages[full.indexOf(true)]);
//
//// ES6
//console.log(ages.findIndex(cur => cur >= 18));

//////////////////////////////////////////////
//// Spread Operator
//function addFourNumebers(a, b, c, d) {
//	return a + b + c + d;
//};
//
//var sum1 = addFourNumebers(1, 2, 3, 4);
//console.log(sum1);
//
//// ES5
//var ages = [1, 2, 3, 4];
//var sum2 = addFourNumebers.apply(null, ages);
//console.log(sum2);
//
//// ES6
//const sum3 = addFourNumebers(...ages);
//console.log(sum3);
//
//// use ... for joining two arrays
//const familySmith = ['John', 'Ted', 'Baker'];
//const familyJon = ['Emily', 'Emma', 'Ben'];
//const bigFamily = [...familySmith, 'Lily', ...familyJon];
//console.log(bigFamily);
//
////...also works for nodelist
//const h = document.querySelector('h1');
//const boxes = document.querySelectorAll('.box');
//const all = [h, ...boxes];


////////////////////////////////////////////////////
//// Rest parameters
//// ES5
//function isFullAge5(limit) {
//	console.log(arguments);
//	var newArray = Array.prototype.slice.call(arguments, 1);
//	newArray.forEach(function(cur) {
//		console.log((2018 - cur) > 18);
//	});
//	
//};
//
//isFullAge5(4, 1990, 1991, 2000);
//
//// ES6
//// transform individuals to array
//function isFullAge6(limit, ...years) {
//	years.forEach(function(cur) {
//		console.log(cur);
//	});
//};
//isFullAge6(1990, 1998, 1997);

///////////////////////////////////////////////////
// Default Parameter
//// ES5
//function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
//	lastName === undefined ? lastName = 'Empty' : lastName = lastName;
//	
//	nationality === undefined ? nationality = 'America' : nationality = nationality;
//	
//	this.firstName = firstName;
//	this.yearOfBirth = yearOfBirth;
//	this.lastName = lastName;
//	this.nationality = nationality;
//};
//
//var john = new SmithPerson('john', 'smith');
//console.log(john);
//
//// ES6
//function SmithPerson(firstName, yearOfBirth, lastName = 'Empty', nationality = 'America') {
//	this.firstName = firstName;
//	this.yearOfBirth = yearOfBirth;
//	this.lastName = lastName;
//	this.nationality = nationality;
//};
//
//let jon = new SmithPerson('jon', 'snow');
//console.log(jon);
//
////////////////////////////////////////////////////
//// Maps
//const question = new Map();
//question.set('question', 'What is the official name of the latest major JS version?');
//question.set(1, 'ES5');
//question.set(2, 'ES6');
//question.set(3, 'ES2015');
//question.set(4, 'ES7');
//question.set('correct', 3);
//question.set(false, 'wrong answer');
//question.set(true, 'correct answer');
//
//console.log(question.get('question'));
//console.log(question.size);
////question.delete(4);
//console.log(question);
//console.log(question.has(4));
////question.clear();
//question.forEach((value, key) => {
//	console.log(`This is ${key}, and it is set to ${value}`);
//});
//for(let [key, value] of question.entries()) {
//	if (typeof(key) === 'number') {
//		console.log(`answer ${key}: ${value}`);
//	}
//}
//
//const ans = parseInt(prompt('write the correct answer'));
//console.log(question.get(ans === question.get('correct')));

////////////////////////////////////////////////////
//// Classes
//// ES5
//
//var Person5 = function(name, yearOfBirth, job) {
//	this.name = name;
//	this.yearOfBirth = yearOfBirth;
//	this.job = job;
//};
//
//Person5.prototype.calculateAge = function() {
//	var age = new Date().getFullYear - this.yearOfBirth;
//	console.log(age);
//};
//var john5 = new Person5('john', 1995, 'designer');
//
//// ES6
//class Person6 {
//	constructor (name, yearOfBirth, job) {
//		this.name = name;
//		this.yearOfBirth = yearOfBirth;
//		this.job = job;
//	}
//	
//	// no comma or ;
//	calcAge() {
//		var age = new Date().getFullYear - this.yearOfBirth;
//		console.log(age); 
//	}
//}
//
//const john6 = new Person6('john', 1995, 'designer');

//////////////////////////////////////////////////////
//// Classes with subclasses
//var Person5 = function(name, yearOfBirth, job) {
//	this.name = name;
//	this.yearOfBirth = yearOfBirth;
//	this.job = job;
//};
//
//Person5.prototype.calculateAge = function() {
//	var age = new Date().getFullYear() - this.yearOfBirth;
//	console.log(age);
//};
//var john5 = new Person5('john', 1995, 'designer');
//
//var Athlete5 = function(name, yearOfBirth, job, OlympicGames, medals) {
//	Person5.call(this, name, yearOfBirth, job);
//	this.OlympicGame = OlympicGames;
//	this.medals = medals;
//};
//
//// we want the prototype of athlete to be the prototype of person so that they become connected
//Athlete5.prototype = Object.create(Person5.prototype);
//// add Athlete5 its won prototype property needs to be added after the connection between Person5 and Athlete5
//Athlete5.prototype.wonMedal = function() {
//	this.medals++;
//	console.log(this.medals);
//}
//var lewis5 = new Athlete5('lewis', 1999, 'athelete', 'Soul', 3);
//
//lewis5.calculateAge();
//
//// ES6
//class Person6 {
//	constructor (name, yearOfBirth, job) {
//		this.name = name;
//		this.yearOfBirth = yearOfBirth;
//		this.job = job;
//	}
//	
//	// no comma or ;
//	calcAge() {
//		let age = new Date().getFullYear() - this.yearOfBirth;
//		console.log(age); 
//	}
//}
//const john6 = new Person6('john', 1995, 'designer');
//
//class Athlete6 extends Person6 {
//	constructor(name, yearOfBirth, job, OlympicGame, medals) {
//		super(name, yearOfBirth, job);
//		this.OlympicGame = OlympicGame;
//		this.medals = medals;
//	}
//	
//	wonMedal() {
//		this.medals++;
//		console.log(this.medals);
//	}
//}
//
//const johnAthlete6 = new Athlete6('john', 1999, 'athlete', 'Soul', 3);
//johnAthlete6.calcAge();
//














