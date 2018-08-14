class Element {
    constructor(name, builtYear) {
        this.name = name;
        this.builtYear = builtYear;
    }
    
    calcAge() {
        let age = new Date().getFullYear() - this.builtYear;
        //console.log(age); 
		return age;
    }
}

class Park extends Element {
	constructor(name, builtYear, numOfTrees, area) {
		super(name, builtYear);
		this.numOfTrees = numOfTrees;
		this.area = area;		
	}
	
	printDensity() {
		let density = this.numOfTrees / this.area;
		//console.log(density);
		console.log(`${this.name} Park has a tree density of ${density} trees per square km.`);
	}
	
}

let green = new Park('Green', 1980, 2000, 2);
let national = new Park('National', 1940, 3000, 4);
let oak = new Park('Oak', 1965, 200, 0.5);


class Street extends Element {
	constructor(name, builtYear, length, size) {
		super(name, builtYear);
		this.length = length;
		this.size = this.getClassification(size);
	}
	
	getClassification(s = 'normal') {
		return s;
	}
	
	printStreetInfo() {
		console.log(`${this.name}, built in ${this.builtYear}, is a ${this.size} street.`);
	}
}

let ocean = new Street('Ocean Avenue', 1999, 2, 'big');
let evergreen = new Street('Evergreen Street', 2008, 4, 'small');
let four = new Street('4th Street', 2015, 1.6);
let sunset = new Street('Sunset Boulevard', 1982, 2.2, 'huge');

class Town {
	constructor(parks, streets) {
		this.parks = parks;
		this.streets = streets;
	}
	
	printParkReport() {
		console.log('----PARKS REPORT----');
		this.printAverageParkAge();
		this.printParkDensity();
		this.printMoreThan100();
	}
	
	printStreetReport() {
		console.log('----STREETS REPORT----');
		this.printStreetLength();
		this.printEachStreetInfo();
	}
	
	print() {
		this.printParkReport();
		this.printStreetReport();
	}
	
	printParkDensity() {
		for (let i of this.parks) {
			i.printDensity();
		}
	}
	
	printAverageParkAge() {
		let sum = 0, avg = 0;
		for (let i of this.parks) {
			sum += i.calcAge();
		}
		// Note: array has length attribute, not size
		avg = sum / this.parks.length;
		console.log(`Our ${this.parks.length} parks have an average age of ${avg} years.`);
	}
	
	printMoreThan100() {
		let names = '', ct = 0, verb;
		
		for (let i of this.parks) {
			if (i.numOfTrees > 1000) {
				ct > 0 ? names += `and ${i.name} Park ` : names += i.name + ' Park ';
				ct++;
			} 
		}
		
		if (ct >= 1) {
			verb = ct === 1 ?  'has' : 'have';
			console.log(`${names}${verb} more than 1000 trees`);
		} 
	}
	
	printEachStreetInfo() {
		this.streets.forEach((cur) => {
			cur.printStreetInfo();
		});
	}
	
	calcStreetAvgLength() {
		return this.calcStreetTotalLength() / this.streets.length;
	}
	
	calcStreetTotalLength() {
		let sum = 0;
		this.streets.forEach((cur) => {
			sum +=cur.length;
		});
		return sum;
	}
	
	printStreetLength() {
		console.log(`Our ${this.streets.length} streets have a total length of ${this.calcStreetTotalLength()} km, with an average of ${this.calcStreetAvgLength()} km.`)
	}
}

let smallTown = new Town([green, national, oak], [ocean, evergreen, four, sunset]);
smallTown.print();

