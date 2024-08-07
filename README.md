# Football Live Scoreboard

This repository contains an application for a **Football Live Scoreboard** using WebSocket technology, implemented with the help of the **socket.io** library.

## Overview

The application allows users to operate and view live football scores in real-time. It features two main interfaces:
- **Match Operator Interface**: For managing and updating the live scores.
- **Customer Interface**: For viewers to see the live scores.

## Features

- Real-time score updates using WebSocket.
- Separate interfaces for operators and viewers.
- User-friendly design with Bootstrap for styling.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/footballscoreboardapp.git
    ```

2. Navigate to the project directory:
    ```bash
    cd footballscoreboardapp
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

1. Start the server:
    ```bash
    npm start
    ```

2. Open your web browser and navigate to the following URLs based on your role:

    - **Match Operator**: [http://localhost:5173/prematchboard](http://localhost:5173/prematchboard)
    - **Viewer**: [http://localhost:5173/customer](http://localhost:5173/customer)

## Usage

- **Match Operator Interface**: Update the scores live by sending requests to [http://localhost:5173/prematchboard](http://localhost:5173/prematchboard).
- **Customer Interface**: View the live scores in real-time at [http://localhost:5173/customer](http://localhost:5173/customer).

## Screenshots

### Match Operator Interface
![Match Operator Interface](./assets/screenshot2.png)

### Customer Interface
![Customer Interface](./assets/screenshot1.png)

## Dependencies

The project uses the following dependencies:

- **express**: Fast, unopinionated, minimalist web framework for Node.js
- **body-parser**: Node.js body parsing middleware
- **bootstrap**: Front-end component library for developing with HTML, CSS, and JS
- **nodemon**: Tool that helps develop Node.js applications by automatically restarting the node application when file changes are detected
- **socket.io**: Enables real-time bidirectional event-based communication

## Project Structure

- **public/**: Contains static files served by the server.
- **src/**: Contains React components and Redux slices.
- **server.js**: The main server file that sets up Express and socket.io.

## Author

**Harsha Vignyan Ayaluri**

## License

This project is licensed under the ISC License.

---
