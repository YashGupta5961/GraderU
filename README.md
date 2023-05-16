# GraderU

GraderU is a website that utilizes grade distribution data gathered from FOIA requests at the University of Illinois. It provides insights into the grade distributions for classes offered at UIUC, allowing users to explore and analyze the data through various filters. In addition, it offers authentication features, student reviews, class FAQs, and a GPA calculator based on the grade distribution data.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Usage](#usage)
- [Known Issues and Future Development](#known-issues-and-future-development)
- [Contributing](#contributing)
- [Feedback and Bug Reporting](#feedback-and-bug-reporting)
- [Resources](#resources)

## Features

- Display grade distributions for classes at UIUC, filtered by class, year, semester, and professor.
- User authentication system with account creation, login, email verification, and password reset.
- Leave reviews for classes, specific to professor, semester, and year.
- Class FAQs created by verified professors.
- GPA calculator that predicts expected GPA based on selected classes and user-defined percentiles.

## Technologies

- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB
- Hosting: Heroku
- Email Service: SendGrid
- Continuous Integration/Continuous Deployment (CI/CD): GitLab CI/CD, Heroku deployment

## Usage

To access GraderU, visit [www.graderu.herokuapp.com](https://www.graderu.herokuapp.com). Please note that the website may not be responsive and is optimized for standard desktop viewports.

## Known Issues and Future Development

- The website is not currently responsive and is optimized for standard desktop viewports. Future development should focus on making the website mobile-friendly.
- Future plans include implementing a teacher account verification system to allow verified professors to respond to reviews and FAQs.
- Automation of the data update process is desired to streamline the process of pulling and processing newly published grade distribution data.

## Contributing

Currently, there are no specific contribution guidelines as the project is transitioning from private to open-source. Please stay tuned for future updates regarding contribution guidelines.

## Feedback and Bug Reporting

If you have any feedback, suggestions, or encounter any issues with GraderU, please report them on the GitHub repository's [issue tracker](https://github.com/your-username/graderu/issues).

## Resources

- Grade distribution data source: [Professor Wade's GPA Datasets](https://github.com/wadefagen/datasets/tree/master/gpa)
