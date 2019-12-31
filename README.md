# Base Node

The base of a Node project with express and supporting a mongoose MongoDB database. It also comes with the following:

- mongoose model in `models`
- index route on `localhost:3000/`
- user login and more (delete by just deleting `routes/user` and `models/User.js`)
- async Handler to simplify express async function error handling
-

## Running the App

- `npm install`
- `npm run dev` for Dev Mode
- `npm run start` for Prod Mode

### Packages Used

- It restarts on changes to anything (nodemon)
- `export DEBUG=app` to see app debug statements (debug)
- Uses `config/default.json` to store server configuration (config)
