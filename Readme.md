
# CollabDocs

CollabDocs is a collaborative document editing platform inspired by Google Docs. Built using the MERN stack (MongoDB, Express.js, React, and Node.js), it provides real-time collaboration features, allowing multiple users to edit documents simultaneously with live updates.

## Features

- **Real-Time Collaboration:** Multiple users can edit documents simultaneously with changes reflected in real-time.
- **User Authentication:** Secure user authentication and authorization using JWT.
- **Document Management:** Create, edit, and manage documents with an intuitive interface.
- **Rich Text Editing:** Full-featured rich text editor with formatting options.
- **Commenting System:** Users can comment on documents for collaborative discussions.
- **Document Sharing:** Share documents with other users via unique links.
- **Version Control:** Track changes and view document history.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend:** React.js with Redux for state management, and Material-UI for responsive and modern UI components.
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
   git clone https://github.com/YourUsername/CollabDocs.git
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

4. Create a `.env` file in the server directory and add your MongoDB connection string and JWT secret:

   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
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

3. Open your browser and navigate to `http://localhost:3000` to start using CollabDocs.

