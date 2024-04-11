# [Project: "spa-card-testjob"](https://ledybacer.github.io/spa-card-testjob/)
**List of films with the word "love" in the title! 🎥**

This project is a single-page application (SPA) that demonstrates how to create a list of cards with images and information fetched from an endpoint. The application stores the fetched data in a store, allowing for easy access and manipulation.

## Features

- **Card List**: The application displays a list of cards, each containing an image and some information fetched from an endpoint.
- **Like Icon**: Each card has an icon that, when clicked, adds a like to the card. The icon changes color to indicate whether the card is liked.
- **Delete Icon**: Each card also has a delete icon that, when clicked, removes the card from the list.
- **Filter Button**: A filter button at the top of the page allows users to filter the list to show only liked cards.
- **Card Details Page**: Clicking on a card takes the user to a details page for that card. The details page includes a full text version of the card's content + some extra and a button to return to the list.

## Technologies Used:

- **[React](https://react.dev/)**: A JavaScript library for building user interfaces.
- **[Redux](https://redux.js.org/)**: A library for managing application state.
- **[Material UI](https://mui.com/material-ui/)**: A UI framework for React.
- **[TypeScript](https://www.typescriptlang.org/)**: A statically typed variant of JavaScript that enables error detection during development.
- **[Prettier](https://prettier.io/)**: A code formatter for JavaScript.

## Development

### Prerequisites

Before you begin, make sure you have the following tools installed:

- git (for cloning the repository)
- Node.js (to run the project)

### Installation

1. Clone the repository:
```
git clone https://github.com/LedyBacer/spa-card-testjob.git
```
2. Go to the project folder:
```
cd spa-card-testjob
```
3. Install dependencies:
```
npm install
```
4. Copy env file:
```
cp .env.example .env
```
5. Change backend URL and api key inside .env:
```
nano .env
```
6. Run the project:
```
npm run dev
```

After completing these steps, your project will be accessible at localhost in your web browser.

### Deployment

To deploy the project on a server, follow these steps:

1. Build the project for production:
```
npm run build
```

This will create a `build` folder with files optimized for production.

2. Deploy the contents of the build folder on your web server.

For deployment, you can use the services of any hosting provider that supports static sites. Examples include [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/), [GitHub Pages](https://pages.github.com/), and others.
