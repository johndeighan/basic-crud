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
(i.e. version 2+), so that includes the Angular component
TypeScript files and any referenced HTML and CSS files.
The data will be stored in an Angular service, so the
only changes required to fetch the data from a remote
server should be to the file implementing the service.

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

1. Material Design for styling, specifically Material Design
	Lite (<https://getmdl.io/>). At first, we will simply
	import the library and add attributes to the standard
	HTML elements. Later, we will implement light weight
	components to avoid having to remember the attribute names
	and to promote uniformity in the interface.

2. Falcor will be used to implement the data source,
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
you decide to create this project from scratch, you should be sure
to execute these commands to install needed packages locally in
the project:

- `npm install falcor --save`
- `npm install @types/falcor --save`
- `npm install falcor-local-datasource --save`

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

Adding a service implementing a falcor Model
============================================

To create a new service, which we will use to supply data to the
views, i.e. Angular components, execute the command (from inside your
project's folder):

	ng generate service falcor-model

