///////////////////////////////////////
// Lecture: Hoisting

















///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword
var john = {
	name: 'john',
	yearOfBirth: 1990,
	calculateAge: function() {
		console.log(this);
		console.log(2018 - this.yearOfBirth);
		innerfunction();
		function innerfunction() {
			console.log(this);
		}
	}
}

john.calculateAge();

var mike = {
	name: 'Mike',
	yearOfBirth: 1984
}
// method borrowing
// we don't need parenthesis because 
// we are not calling a function
// we simply treats a function as a variable
mike.calculateAge = john.calculateAge;
mike.calculateAge();







