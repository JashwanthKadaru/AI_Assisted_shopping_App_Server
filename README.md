# Shopping_App_Server
Server repo of shopping app
# Features
1) Built using Express JS and Node JS. Additionally uses mongodb for database and mongoose for connecting app to database.
2) The server hosts REST API for client to interact and log user actions such as update cart, fetch product list, make purchase, etc.
3) The user purchase transaction method makes use mongoose transaction concepts to do several db separate operations as a single atomic transaction, that makes sure that the db is left in consistent state even in case of failure.
4) The models are declared in model folder, useful db functions in utilities folder, and router for each category of actions in routes folder, in separte file within the folders. 
5) Built in 4 days.

# Commands to run
1) create a folder named `server`. In it create folder named `shopping_app_server` and initialize git repo. After that, clone this repo into local git repo.
2) Open `VSCode terminal` / any `terminal` and navigate to the repo using `cd yourpath/server/shopping_app_server`. run `npm install` to install all the project dependencies.
3) Install mongodb, and create a database named `smartstore` and provide the path to your database connection to `mongoose.connect(..)` in `server.js` file. If your default settings match with mine then thereis no need to do this.
4) Once all the dependencies are properly installed, run `npm install nodemon -y` if not already installed.
5) Finally, run `nodemon start` to run the server in dev mode. This allows you to make changes to server and test them, while running it.
6) This will start a new process on your computer and runs the server on `locahost port 5123` by default. You can change the port by modifying the constant `PORT` in server.js
7) Feel free to use postman to test different routesa and also play around with client app by connecting it to server.

# Authored by
`Jashwanth Kadaru`
`IMT2021095`
