
# CollabDocs

CollabDocs is a collaborative document editing platform inspired by Google Docs. Built using the MERN stack (MongoDB, Express.js, React, and Node.js), it provides real-time collaboration features, allowing multiple users to edit documents simultaneously with live updates.

## Features

- **Real-Time Collaboration:** Multiple users can edit documents simultaneously with changes reflected in real-time.
- **User Authentication:** Secure user authentication and authorization using JWT.
- **Document Management:** Create, edit, and manage documents with an intuitive interface.
- **Rich Text Editing:** Full-featured rich text editor with formatting options.
- **Document Sharing:** Share documents with other users via unique links.
- **Version Control:** Track changes and view document history.


## Tech Stack

- **Frontend:** React.js with Redux for state management, and Tailwind css used for Designing the web Application.
- **Backend:** Node.js with Express.js to handle API requests, and Socket.io for real-time communication.
- **Database:** MongoDB for storing user and document data.
- **Authentication:** JSON Web Tokens (JWT) for secure user authentication.

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB instance running

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AnubhavBaranwal/CollabDocs.git
   cd CollabDocs
   ```

2. Install server dependencies:

   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:

   ```bash
   cd ../client
   npm install
   ```


### Running the Application

1. Start the backend server:

   ```bash
   cd server
   npm start
   ```

2. Start the frontend development server:

   ```bash
   cd ../client
   npm start
   ```

3. Open your browser and navigate to `http://localhost:5173` to start using CollabDocs.

