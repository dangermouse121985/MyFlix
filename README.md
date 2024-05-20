# myFlix Server-Side Component

This repository contains the server-side code for the myFlix web application. The application provides users with access to information about movies, directors, and genres, and allows them to sign up, update their personal information, and create a list of their favorite movies.

## Table of Contents

- [Objective](#objective)
- [Context](#context)
- [The 5 W's](#the-5-ws)
- [Design Criteria](#design-criteria)
  - [User Stories](#user-stories)
  - [Feature Requirements](#feature-requirements)
  - [Essential Features](#essential-features)
  - [Optional Features](#optional-features)
- [Technical Requirements](#technical-requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Objective

To build the server-side component of a “movies” web application. The application will provide users with access to information about different movies, directors, and genres. Users will be able to sign up, update their personal information, and create a list of their favorite movies.

## Context

In today's tech landscape, JavaScript developers must be proficient in both frontend and backend development. This project focuses on creating a REST API for the myFlix application, interacting with a database to store movie data. The complete tech stack used is the MERN (MongoDB, Express, React, Node.js) stack. This server-side component will eventually be paired with a client-side interface built using React.

## The 5 W's

- **Who**: Frontend developers who will use the server-side code to build the client-side application. End users will be movie enthusiasts who want to access movie information.
- **What**: The complete server-side of the web application, including the server, business logic, and database layers. It will feature a REST API built using Node.js, Express, and MongoDB.
- **When**: The server-side component will be used whenever users interact with the myFlix application to access movie information or update their profiles.
- **Where**: The application will be hosted online, making it accessible from any device.
- **Why**: To provide movie enthusiasts with information about movies, directors, and genres, and to demonstrate full-stack JavaScript development skills.

## Design Criteria

### User Stories

- As a user, I want to receive information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.
- As a user, I want to create a profile to save data about my favorite movies.

### Feature Requirements

#### Essential Features

- Return a list of ALL movies to the user.
- Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title.
- Return data about a genre (description) by name/title (e.g., “Thriller”).
- Return data about a director (bio, birth year, death year) by name.
- Allow new users to register.
- Allow users to update their user info (username, password, email, date of birth).
- Allow users to add a movie to their list of favorites.
- Allow users to remove a movie from their list of favorites.
- Allow existing users to deregister.

#### Optional Features

- Allow users to see which actors star in which movies.
- Allow users to view information about different actors.
- Allow users to view more information about different movies, such as the release date and the movie rating.
- Allow users to create a “To Watch” list in addition to their “Favorite Movies” list.

## Technical Requirements

- The API is a Node.js and Express application.
- The API uses REST architecture, with URL endpoints corresponding to the data operations listed above.
- The database is built using MongoDB.
- The business logic is modeled with Mongoose.
- The API provides movie information in JSON format.
- The API includes user authentication and authorization code.
- The API includes data validation logic.
- The API meets data security regulations.
- The API is deployed to Herkou.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/myFlix-server.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd myFlix-server
   ```

3. **Install the dependencies:**
   ```bash
   npm install
   ```

## Usage

To start the project, run:

```bash
npm start
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License.
