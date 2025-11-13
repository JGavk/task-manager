READ ME

This is a task manager project using Javascript+Express for server that is allocated in the backend Branch, this code uses also a
startup command with the database 
As this is a demo I wont take much onto security for the env keys

# Task Management App - Demo
TERMINAL 1

cd backend
npm install
node src/start.js

the command above will start the server and the database will allocate the .env that I also uploaded for the moment here, I guess I'll add
the env too

DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASS=admin123
DB_DIALECT=postgres

JWT_SECRET=hkViplhqWCZKYGveI8y0memT4Nf49/VMyDSpKNFo73nHIUi6FXkDUkwvHLXISTeE

this is the env for our backend, the jwt token is used in the user autentification

for the frontend you will need the next commands for when you get to master branch and clone the front

TERMINAL 2

cd frontend
npm install
npm run dev
