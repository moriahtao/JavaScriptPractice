//var john = {
//	name: 'John',
//	lastName: 'Smith',
//	yearOfBirth: 1969,
//	isMarried: false,
//	family: ['Jane', 'Bob', 'Mark'],
//	calculationAge: function() {
//		return 2018 - this.yearOfBirth;
//	}
//}
//
//console.log(john.calculationAge());
//
//var age = john.calculationAge();
//john.age = age;
//console.log(john);


var years = [1965, 2008, 1992];
var ages = [];
for (let i = 0; i < years.length; i++) {
	ages.push(2018 - years[i]);
}
for (let i = 0; i < ages.length; i++) {
	console.log((ages[i] >= 18) + ' ' + ages[i]);
}

function printFullAge (yearsVector) {
	let agesVector = [];
	let fullAges = [];
	for (let i = 0; i < yearsVector.length; i++) {
		agesVector.push(2018 - yearsVector[i]);
	}
	for (let i = 0; i < agesVector.length; i++) {
		console.log((agesVector[i] >= 18) + ' ' + agesVector[i]);
		fullAges.push(agesVector[i] >= 18);
	}
	return fullAges;
}

var full_1 = printFullAge([1977, 1998, 2008]);
console.log(full_1);
var full_2 = printFullAge([1966, 1978, 1950]);
console.log(full_2);
