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

