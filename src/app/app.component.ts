import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
	})

export class AppComponent implements OnInit {

lUsers: any[] = [];
columnsToDisplay = ['firstName', 'lastName', 'gender', 'dateOfBirth'];

// --------------------------------------------------------------------------

ngOnInit() {

this.addUser('Dana',    'Cox',      'M',  'Jan  5, 1988');
this.addUser('John',    'Deighan',  'M',  'Feb 12, 1953');
this.addUser('Lewis',   'Foster',   'M',  'Aug  3, 1983');
this.addUser('Arathi',  'Prasad',   'F',  'Sep 23, 1973');
} // ngOnInit()

// --------------------------------------------------------------------------

addUser(fName, lName, gen, dob) {

this.lUsers.push({
	firstName: fName,
	lastName: lName,
	gender: gen,
	dateOfBirth: dob
	});
} // addUser()

// --------------------------------------------------------------------------

getUsers() {

return this.lUsers;
} // getUsers()

// --------------------------------------------------------------------------

} // class AppComponent
