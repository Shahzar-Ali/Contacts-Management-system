<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<h1>Contacts Management System - Node.js & Express</h1>

<h2>Overview</h2>
<p>Welcome to the Contacts Management System (CMS), a backend application built with Node.js, Express.js, and MongoDB. This system allows users to securely manage their personal contacts. Users can perform CRUD operations on their contacts, with registration and login endpoints being public. The application uses JWT-based authentication to secure private endpoints, bcrypt for password hashing, and includes middleware for error handling and token validation.</p>

<h2>Features</h2>
<ul>
    <li><strong>Public Endpoints</strong>: Registration and login functionalities are accessible without authentication.</li>
    <li><strong>Private Endpoints</strong>: Contact management operations and current user retrieval are secured with JWT authentication.</li>
    <li><strong>User Privacy</strong>: Each user can only manage their own contacts.</li>
    <li><strong>Password Security</strong>: User passwords are hashed using bcrypt for enhanced security.</li>
    <li><strong>Error Handling Middleware</strong>: Centralized error handling for consistent error responses.</li>
    <li><strong>Token Validation Middleware</strong>: Ensures secure access to private endpoints by validating JWT tokens.</li>
</ul>

<h2>Tech Stack</h2>
<ul>
    <li><strong>Node.js</strong>: JavaScript runtime for building scalable applications.</li>
    <li><strong>Express.js</strong>: Web framework for Node.js to simplify API development.</li>
    <li><strong>MongoDB</strong>: NoSQL database for storing contact information.</li>
    <li><strong>Mongoose</strong>: ODM library for MongoDB and Node.js.</li>
    <li><strong>JWT (JSON Web Tokens)</strong>: For secure user authentication and authorization.</li>
    <li><strong>bcrypt</strong>: For hashing and securing user passwords.</li>
</ul>

<h2>Getting Started</h2>

<h3>Prerequisites</h3>
<ul>
    <li>Node.js (v14 or higher)</li>
    <li>MongoDB (local installation or MongoDB Atlas)</li>
    <li>Postman or similar API testing tool (optional, for testing endpoints)</li>
</ul>

<h3>Installation</h3>
<ol>
    <li><strong>Clone the Repository</strong>
        <pre><code>git clone https://github.com/Shahzar-Ali/Contacts-Management-system.git</code></pre>
    </li>
    <li><strong>Navigate to the Project Directory</strong>
        <pre><code>cd Contacts-Management-system</code></pre>
    </li>
    <li><strong>Install Dependencies</strong>
        <pre><code>npm install</code></pre>
    </li>
    <li><strong>Set Up Environment Variables</strong>
        <p>Create a <code>.env</code> file in the root directory and add the following environment variables:</p>
        <pre><code>PORT=5001
CONNECTION_STRING=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret</code></pre>
        <ul>
            <li><code>PORT</code>: The port number on which the server will run.</li>
            <li><code>CONNECTION_STRING</code>: Your MongoDB connection string (e.g., <code>mongodb://localhost:27017/contacts_db</code> or your MongoDB Atlas connection string).</li>
            <li><code>ACCESS_TOKEN_SECRET</code>: A secret key used to sign JWT tokens.</li>
        </ul>
    </li>
    <li><strong>Start the Server</strong>
        <pre><code>npm start</code></pre>
        <p>The server will be running at <a href="http://localhost:5001">http://localhost:5001</a>.</p>
    </li>
</ol>

<h2>API Endpoints</h2>

<h3>Public Endpoints</h3>
<ul>
    <li><strong>Register</strong>: <code>POST /api/user/register</code>
        <p><strong>Request Body</strong>:
        <pre><code>{
  "username": "user"       
  "email": "user@example.com",
  "password": "yourpassword"
}</code></pre></p>
        <p><strong>Description</strong>: Registers a new user. Passwords are hashed using bcrypt before storing them in the database.</p>
    </li>
    <li><strong>Login</strong>: <code>POST /api/user/login</code>
        <p><strong>Request Body</strong>:
        <pre><code>{
  "email": "user@example.com",
  "password": "yourpassword"
}</code></pre></p>
        <p><strong>Response</strong>:
        <pre><code>{
  "accessToken": "&lt;JWT_token&gt;"
}</code></pre></p>
        <p><strong>Description</strong>: Authenticates a user. The provided password is compared with the hashed password stored in the database. On successful authentication, a JWT token is returned.</p>
    </li>
</ul>

<h3>Private Endpoints</h3>
<p>All private endpoints require a valid JWT token in the <code>Authorization</code> header (<code>Bearer &lt;token&gt;</code>).</p>
<ul>
    <li><strong>Current User</strong>: <code>GET /api/user/current</code>
        <p><strong>Headers</strong>: <code>Authorization: Bearer &lt;token&gt;</code></p>
        <p><strong>Description</strong>: Retrieves the details of the currently authenticated user. The request must include a valid JWT token, which is validated by the <code>validateToken</code> middleware.</p>
    </li>
    <li><strong>Create Contact</strong>: <code>POST /api/contact</code>
        <p><strong>Headers</strong>: <code>Authorization: Bearer &lt;token&gt;</code></p>
        <p><strong>Request Body</strong>:
        <pre><code>{
  "name": "Contact Name",
  "email": "contact@example.com",
  "phone": "123-456-7890"
}</code></pre></p>
        <p><strong>Description</strong>: Creates a new contact for the authenticated user.</p>
    </li>
    <li><strong>Get All Contacts</strong>: <code>GET /api/contact</code>
        <p><strong>Headers</strong>: <code>Authorization: Bearer &lt;token&gt;</code></p>
        <p><strong>Description</strong>: Retrieves all contacts for the authenticated user.</p>
    </li>
    <li><strong>Get Contact by ID</strong>: <code>GET /api/contact/:id</code>
        <p><strong>Headers</strong>: <code>Authorization: Bearer &lt;token&gt;</code></p>
        <p><strong>Description</strong>: Retrieves a specific contact by ID for the authenticated user.</p>
    </li>
    <li><strong>Update Contact</strong>: <code>PUT /api/contact/:id</code>
        <p><strong>Headers</strong>: <code>Authorization: Bearer &lt;token&gt;</code></p>
        <p><strong>Request Body</strong>:
        <pre><code>{
  "name": "Updated Name",
  "email": "updated@example.com",
  "phone": "987-654-3210"
}</code></pre></p>
        <p><strong>Description</strong>: Updates a specific contact by ID for the authenticated user.</p>
    </li>
    <li><strong>Delete Contact</strong>: <code>DELETE /api/contact/:id</code>
        <p><strong>Headers</strong>: <code>Authorization: Bearer &lt;token&gt;</code></p>
        <p><strong>Description</strong>: Deletes a specific contact by ID for the authenticated user.</p>
    </li>
</ul>

<h2>Middleware</h2>

<h3>Error Handling Middleware</h3>
<p>The application includes centralized error handling middleware that catches and responds to errors in a consistent format. This middleware ensures that all errors are properly handled and a user-friendly response is provided.</p>

<h3>Token Validation Middleware</h3>
<p>The token validation middleware checks the presence and validity of the JWT in the <code>Authorization</code> header. It ensures that only authenticated users can access private endpoints. Unauthorized requests are blocked and receive an appropriate error response.</p>

<h2>Contributing</h2>
<p>We welcome contributions to improve this Contacts Management System. If you’d like to contribute, please follow these steps:</p>
<ol>
    <li><strong>Fork the Repository</strong>: Click the <a href="https://github.com/Shahzar-Ali/Contacts-Management-system/fork">Fork</a> button on the top-right of this page to create a copy of this repository under your own GitHub account.</li>
    <li><strong>Create a New Branch</strong>: Create a new branch for your feature or fix. Use a descriptive name for your branch, such as <code>feature/add-search-functionality</code> or <code>bugfix/fix-login-issue</code>.
       <pre><code>git checkout -b your-branch-name</code></pre>
    </li>
    <li><strong>Make Changes and Commit</strong>: Make your changes and commit them with a clear and descriptive message about what you’ve done.
        <pre><code>git commit -am 'Add detailed description of changes'</code></pre>
    </li>
    <li><strong>Push to the Branch</strong>: Push your changes to your forked repository on GitHub.
        <pre><code>git push origin your-branch-name</code></pre>
    </li>
    <li><strong>Create a Pull Request</strong>: Go to the <a href="https://github.com/Shahzar-Ali/Contacts-Management-system/pulls">Pull Requests</a> tab on this repository and click <strong>New Pull Request</strong>. Select your branch and submit your pull request for review.</li>
</ol>
<p>Make sure to provide a clear description of your changes and any relevant information. We’ll review your pull request and provide feedback as needed.</p>


<h2>License</h2>
<p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>

<h2>Acknowledgments</h2>
<ul>
    <li><a href="https://expressjs.com/">Express.js</a></li>
    <li><a href="https://mongoosejs.com/">Mongoose</a></li>
    <li><a href="https://www.mongodb.com/">MongoDB</a></li>
    <li><a href="https://jwt.io/">JWT</a></li>
    <li><a href="https://www.npmjs.com/package/bcrypt">bcrypt</a></li>
</ul>

<h2>Contact</h2>
<p>For any questions or feedback, please contact me on <a href="https://www.linkedin.com/in/shahzar-ali-a3767b265" target="_blank">LinkedIn</a>.</p>

</body>
</html>
