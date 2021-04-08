# AutoComplete Movie Search

This purpose of this application is to provide fast auto-complete functionality when searching for a movie among the top 1000 ranked films on IMDB.
In order to achieve fast auto-complete results when querying a large data set, a prefix trie data structure is used to store the titles.
Additionally, to avoid excessive api requests, debouncing is implemented to wait 300ms after user input before sending a request the backend service.


## Getting Started via Docker

If you are running docker on your local machine:
1. cd to the primary directory with the docker-compose.yml file.
2. Use the command 'docker-compose up -d'.
3. Visit http://localhost:3000 in your browser once both the frontend and backend images are running.

### Getting Started without Docker

1. Ensure you are running node and npm globally on your machine. Project built with v14.1.
2. cd to autocomplete/autocomplete/frontend/ directory and use command 'npm i' to install frontend dependencies.
3. cd up one level to autocomplete/autocomplete/ and use the command 'npm i' to install backend dependencies.
4. Use command 'npm start' to start both the frontend and backend services.
5. Visit http://localhost:3000 in your browser once both the frontend and backend images are running.

### Testing

1. For api endpoint tests use command 'npm test' when in autocomplete/autocomplete/ directory.
2. For frontend rendering tests use command 'npm test' when in autocomplete/autocomplete/frontend/ directory.
