# Incode - Project3C
# Mr. coffee

## Installation
This project needs to install node pakages and postgres database.
Install postgres database in your system before starting the project installation.
Navigate to the project folder using cmd line, Run the below cmd.

...
npm install
...

The above command will install all the required packages for the project. Once the npm pakages were installed properly. Update ".env" file using ".env template" file as reference and fill all the required details about the postgres DB.

Create database and tables using the below command

...
npm run database-migration
...

Insert sample data on the database using the below command

...
npm run database-seeding
...

Start the server by running the below cmd.

...
npm run dev
...

## Instructions
### 🚀 Project C
Context

 

After your successful work on its showcase site, the M.Coffee company would like to put your skills to the service of its internal organisation. They ask you to develop a schedule management website for its teams.

 

The company first asks you to create a small prototype, which it will present to its teams to assess whether such a website could be useful to them.

 

For this project, you will have to store data and display it in a browser. To do this, you will discover databases with MySQL and make a small web application.

 

The prototype will be very simple and will have only two pages: a page to create a schedule, and a page to display all existing schedules.

 

The M.Coffee company doesn't give you any visual constraints but asks you to make something visually clean and readable.




Guidelines  

 

To build this small web application, you will use the ExpressJS framework, based on NodeJS. 

 

Remember: NodeJS is the version of JavaScript that we used on the command line during the immersion week. (It's different from the "in-browser" JavaScript you used last week).

 

You will connect to the MySQL database from NodeJS, and interactions with the application (like adding new schedules and displaying them) will be done through the browser.

 

This project articulates several fundamentals, albeit in their simplest form. In order to approach the project serenely, I advise you to start with this introductory course.

 

You can watch here a tutorial that shows you how to create a small basic application in Express.

 

Finally, the official Express website is full of information.

 

As usual, look deeper into any point you don’t understand by leading your own research!





🚩 Step 1 : Build your database

 

The schedule data will be stored in a database: MySQL. We call MySQL a relational database because the data is formatted according to a very precise schema, defined before adding any data.

 

Creating a database therefore starts by elaborating the data schema, i.e. what data will be stored and in what form.

 

This step is crucial because it determines the right logic for your application. For this first project we have developed the data schema for you, but in the future that tasks will be yours.

 

So you need to create a MySQL database with Node.Js and connect to it (see here if you don't know how to do this) before creating your table.

 

For this project, you need a 'schedule' table.

 

Your 'schedule' table will be composed of the following fields: 

- a unique key (ID),

- a username,

- the day of the week (1 for Monday, 2 for Tuesday... 7 for Sunday),

- a start time

- and an end time (both TIME type).




🚩 Step 2 : Build the two routes

 

Create a route "/" that will retrieve the list of existing schedules from the database and display them.

 

Create a route "/new" which will implement two actions:

- on GET, a form to add a schedule will be displayed.

- on POST, the form data will be saved in the database. You will then redirect to the form.




🚩 Step 3 : Create the corresponding views

 

You need to implement two views: 

 

- the view that displays all schedules, which will simply be presented as < USER NAME - day start_time - end_time > For example: < MAUD - Tuesday 8:30-12:30 >

 

- the view that displays the form.

 

On each of your views, there will be a link to the other view.




Deliverables

 

In a folder named Project_03_First Name_Surname, you will make available to your tutor: 

- all the source files that make up your application.




Competencies to validate

 

- Build a database

- Manage and display the contents of a database

- Use server-side JavaScript with Node.js and Express 



### Acknowledgement

Task instructions - Incode Academy

Designed and developed - Mohamed Yaieeshu Muthalif