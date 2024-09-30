# Courses and Webinar

This is the demonstration of a fake webinar and course website using mock API server. 

## Features

- **Responsive Design**: Adapts to both desktop and mobile screens using Vuetify's grid system, flexbox and display breakpoints
- **Data Handling**: Fetches course and webinar data from a mock JSON file using Vue Query for optimized caching.
- **SEO Best Practices**: Uses semantic HTML elements, meta tags, and proper headings with third-party library, unHead.
- **Analytics Integration**: Google Tag Manager is used for tracking user interactions using vue-gatg
- **Sorting & Filtering**: Allows users to sort by date and filter by keyword
- **Performance Optimization**: Implements lazy loading, data loader and pagination to enhance performance.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or higher)
- [npm](https://www.npmjs.com/) 

### Clone the Repository

```bash
git clone https://github.com/AhmadAiman2013/yyc_events.git webinars-app
cd webinars-app
npm install
```
### Running the project locally

```bash
npm run dev
```
This will start the local development server and the  the project will be accessible at http://localhost:3000.

### Building for Production

```bash
npm run build
```
The static files will be generated and placed in the dist folder.

(Repeat for npm, pnpm, and bun with respective commands.)
