# Firefly: An Active Record Pattern for Firestore

This is simple library written in Node.js that applies the active record pattern to Firebase's Firestore database. It has the following features:

 - Simple CRUD for single documents, including `create`, `update`, `delete`, and `save`, which checks for an ID and runs `update` if there is one, `create` if there is not.
 - Querying using `filter`, `where`, and `whereKeyExists`.
 - Grabbing all records using `all`
 - Fetching single records using `get` with a document key.
 - Saving in bulk using `saveMany`
 - Finding a single record using a key and a value with `find`.

## Stack
This will be a web application and also an API, using the following:

 - Node.js 21+ as the runtime
 - Testing with Jest
 - Access to Firestore using the `firebase-admin` package.

## Code Style
This project uses JavaScript with the following styles:

 - All models will be classes with singular naming (i.e. `User` for the `users` table)
 - All code files will be lower case with underscores.
 - Markdown files will be lower case with hyphens.
 - All application logic will go in the `lib` directory. Copilot should NEVER generate the code for logic. Only COMMENTS as to what should go where.
 - All database-related stuff will go in the `db` directory (models, schema, SQLite files)
 - All configuration will be done with environment variables, using a `.env` file.
 - Do not export a class directly, use module method instead to create the instance you need (aka "factory")

## Testing
All tests will be run with Jest. In addition:

 - One assertion per test, _no_ exceptions
 - Tests should arrange the test data in `before` blocks
 - `describe` blocks should use full sentences.
 - The word "should" will be avoided in test names. A test either passes or fail, it `is`, `is not`, `does`, or `does not`. There is no try.
 - Tests will be nested, with the outer `describe` block indicating the main test feature, and the first inner `describe` block being the "happy path" - which is what happens when everything works as expected. The rest of the nested blocks will be devoted to "sad path" tests, with bad data, null values, and any other unexpected settings we can think of.