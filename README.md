# Infinite Scroll

Infinite Scroll to seamlessly load more content as user scroll down the page.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Running the Development Server](#running-the-development-server)
  - [Building for Production](#building-for-production)
  - [Running Tests](#running-tests)
- [Final notes](#final-notes)


## Install Dependencies

```bash
npm install
```

## Usage

### Running the Development Server

```bash
npm run dev
```
Vite uses port 5173 by default. Open http://localhost:5173/ in your browser to view the application.

### Building for Production

Create production build:

```bash
npm run build
```
The build artifacts will be stored in the `dist/` directory. You can deploy this folder to your preferred hosting service.

### Running Tests

Run the test suite using Vitest:

```bash
npm run test
```
This command will execute all tests and display the results in the terminal.

## Final Notes

While the current implementation fulfills the project requirements, there are areas for potential improvement:

- **State Persistence:** Currently, favorites are persisted using `localStorage`. Utilizing React's `useSyncExternalStore` could offer a more efficient and scalable state management solution.

- **Test Coverage:** Some tests could be more thoroughly refined to cover additional edge cases and ensure greater reliability.

- **UI Enhancements:** To better handle long alt texts and align with design specifications, the CSS ellipsis effect is used. Exploring alternative solutions, such as tooltips or expandable text, could enhance the user experience.

- **API Request Handling:** The pexelsAPI requests currently use string concatenation for URLs. Leveraging URL or URLSearchParams objects could improve maintainability of API calls.
