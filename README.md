Basic CRUD Interface
====================

Summary
-------

This project implements a basic CRUD interface for a
set of Users with the following properties:

- firstName
- middleName
- lastName
- suffix
- dateOfBirth
- gender
- phoneNumber
- streetAddress
- city
- state
- zipCode

One of the major goals of this project is to have all
data (i.e. the set of users) be stored in a local
JavaScript object, develop the entire interface,
then at a later time move the data to remote storage
such as a SQL database or NoSQL database **without the
need to modify the files implementing the interface**.

In this project, the interface is implemented in Angular
(i.e. version 2+), so files that should **not** need to be
modified include the Angular component
TypeScript files and any referenced HTML and CSS files.
The data will be fetched from an Angular service, so the
only changes required to fetch the data from a remote
server should be to the file implementing this service.

Via the interface, you should be able to:

1. Fetch and display a list of users, given begin and end
	indexes
2. Fetch and display information for a specific user,
	given a user's id number
3. Add a new user
4. Modify a given user's information
5. Delete a user

Each user will be assigned a unique id number when added.
Although we will use unique integers, it should be possible
to use any number or character string as a unique identifier,
e.g. a GUID.
We assume that users are kept in an ordered list, even if
not explicitly, so that we can ask for the first 10 users,
the second 10 users, etc.

Furthermore, we will be utilizing these technologies:

1. Material Design for styling.

2. The interface should be useable not only on computer
	screens, but also on a tablet or smart phone. Here
	Material Design Lite will also provide this functionality.
	During development, you should test the interface
	on all 3 types of devices.

3. Falcor will be used to implement the data source,
	including a library named falcor-local-datasource
	to enable keeping the data local for this project.

This README file will consist of a series of sections, each
describing a logical step in the development process. We
hope that this file can then function as a tutorial for
developing similar CRUD interfaces.

Setup
-----

If you plan to use this project for development, you will need
to be sure that the following are installed:

1. Git (<https://git-scm.com/>)
2. Node.js (<https://nodejs.org/>)
3. Typescript: `npm install -g typescript`
4. Angular CLI: `npm install -g @angular/cli`

> NOTE: To initially create this project, I used the command
>       `ng new basic-crud`. When I tried to fire up the web site
>       using `ng serve`, I got the message "Error: Cannot find module
>       '@angular-devkit/core'". However, after installing that
>       package with `npm install @angular-devkit/core --save`
>       I was able to fire up the web site.

You may simply clone this project and proceed from there, but if
you decide to create this project from scratch, you should
create the project using the `ng new <project-name>` command, then
execute these commands to install needed packages locally in
the project:

- `npm install @angular/material @angular/cdk @angular/animations hammerjs --save
- `npm install falcor falcor-local-datasource @types/falcor --save`

I, personally, dislike Angular's indentation scheme and much prefer
using TAB characters for indentation. So, I "fix up" the following
files:

	src/index.html
	src/main.ts
	src/test.ts
	src/app/app.module.ts
	src/app/app.component.ts
	src/app/app.component.html
	src/app/app.component.spec.ts

You should get in the habit of firing up the web site and testing it
in a browser often, e.g. after modifying the above files. The sooner
you detect a problem, the more likely you'll be able to quickly find
and fix it.

Angular CLI makes it easy for you to create new objects, including
services, classes, components, etc. However, files will be created
using Angular's formatting style, and if you don't like that, you
will have to modify the template files used to create those source
files. Here are some files that I prefer to edit before using Angular
CLI to create new objects:

	node_modules/@schematics/angular/service/files/__path__/__name@dasherize__.service.ts
	node_modules/@schematics/angular/service/files/__path__/__name@dasherize__.service.spec.ts

The location of these files might change - Google has no approved
procedure for editing these templates yet. But as of Angular CLI
1.6.7, this is where the templates are located (you can find your
version of Angular CLI via the command `ng -v`). You can find similar
templates for other Angular CLI objects by replacing 'service' in the
paths above with, e.g. 'component'.

A quick test of your setup
--------------------------

At this point you should be able to fire up the server and view the
web site. Before you do, however, make one additional change. Modify
the `src/app/app.component.html` file and test the web server. Change
that file to have these contents:

	<div style="text-align:center">
		<h1>
			Welcome to Basic CRUD!
		</h1>
	</div>

After saving that file, if you execute the command `ng serve` and
point your web browser to `http://localhost:4200` you should see the
following:

![basic CRUD](BasicCrud.png)

Using Material Design
---------------------

In order to utilize the Material Design components, you will
need to make the following changes to some of the source files:

1. In src/app/app.module.ts:

	- add `import {BrowserAnimationsModule} from '@angular/platform-browser/animations';`
	- add `import {MatButtonModule, MatTableModule} from '@angular/material';`
	- add BrowserAnimationsModule, MatButtonModule and MatTableModule to the list of imports
	- if you want to use any other 'Mat' modules, import them as above

2. In src/styles.css:

	- add `@import "~@angular/material/prebuilt-themes/indigo-pink.css";`

3. In src/main.ts:

	- add `import 'hammerjs';`

4. In src/index.html:

	- add `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`

After you make the above changes, your web site should look almost the same,
except that the font used will now be a sans-serif font:

![basic CRUD](BasicCrud2.png)

Displaying a list of users
==========================

Before we even implement the data model, we'll display a hard coded list
of users, which will illustrate the use of Material Design Lite and
show what the interface will look like. To do that we will use the Material Design
mat-table component. Modify the following files as shown:

File `src/app/app.component.css`

	.limit-width {
		max-width: 640px;
		margin-left: auto;
		margin-right: auto;
		}

File `src/app/app.component.ts`

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

File `src/app/app.component.html`

	<div class="mat-elevation-z8">

		<mat-table [dataSource]="getUsers()" class="limit-width">

			<!-- First Name Column -->
			<ng-container matColumnDef="firstName">
				<mat-header-cell *matHeaderCellDef> First Name </mat-header-cell>
				<mat-cell *matCellDef="let user"> {{user.firstName}} </mat-cell>
			</ng-container>

			<!-- Last Name Column -->
			<ng-container matColumnDef="lastName">
				<mat-header-cell *matHeaderCellDef> Last Name </mat-header-cell>
				<mat-cell *matCellDef="let user"> {{user.lastName}} </mat-cell>
			</ng-container>

			<!-- Gender Column -->
			<ng-container matColumnDef="gender">
				<mat-header-cell *matHeaderCellDef> Gender </mat-header-cell>
				<mat-cell *matCellDef="let user"> {{user.gender}} </mat-cell>
			</ng-container>

			<!-- Date of Birth Column -->
			<ng-container matColumnDef="dateOfBirth">
				<mat-header-cell *matHeaderCellDef> Date of Birth </mat-header-cell>
				<mat-cell *matCellDef="let user"> {{user.dateOfBirth}} </mat-cell>
			</ng-container>

			<mat-header-row *matHeaderRowDef="columnsToDisplay"></mat-header-row>
			<mat-row *matRowDef="let myRowData; columns: columnsToDisplay"></mat-row>

		</mat-table>

	</div>




Adding a service implementing a falcor Model
============================================

To create a new service, which we will use to supply data to the
views, i.e. Angular components, execute the command (from inside your
project's folder):

	ng generate service falcor-model

You should find that the following 2 files were created:

	src/app/falcor-model.service.spec.ts
	src/app/falcor-model.service.ts

