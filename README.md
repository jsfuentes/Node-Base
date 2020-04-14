# Base Node

The base of a Node project with express, express-session, and a mongoose MongoDB database. It also comes with the following:

- mongoose model in `models`
- index route on `localhost:3000/`
- user login and more (delete by just deleting `routes/user` and `models/User.js`)
- async Handler to simplify express async function error handling
- grant setup for easy Google and other 3rd party authentication

## Running the App

- `yarn`
- `yarn dev` for Dev Mode
- `yarn start` for Prod Mode

### Packages Used

- It restarts on changes to anything (nodemon)
- `export DEBUG=app` to see app debug statements (debug)
- Uses `config/default.json` to store server configuration (config)
- Store session data in cookies backed with mongo (express-session connect-mongo)
- Log route access (morgan)
