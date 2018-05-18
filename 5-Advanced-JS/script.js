//// Function constructor
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



// Primitives vs Objects
// Primitives:
var a = 23;
var b = a;
a = 46;
console.log(a);
console.log(b);











