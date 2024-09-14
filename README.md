# Zidyia Library

## Overview
Zidyia Library is a web application designed to manage library resources, document requests, and user profiles. It utilizes the MERN stack (MongoDB, Express.js, React.js, Node.js) for its backend and frontend development.

## Features

### User Management
- Users can register using their personal information including Full Name, ID, Password, Student ID, and Email/Mobile.
- Users have profiles featuring Profile Picture, Bio, and Location.
  
### Document Requests
- Users can request information or resources from libraries.
- Users select a library from a drop-down menu and fill in a form with predefined fields.
- Requests are submitted for verification.

### Document Upload
- Users can upload research papers or other documents.
- Users select the owning library, upload the document, and submit it for verification.

### Admin Dashboard
- Admin can view analytics and data including the number of Issued Documents, Pending Requests, Approved Requests, Rejected Requests, Pending Documents, Approved Documents, and Rejected Documents.
- Super Admin can create a Tenant by providing Library name, Location, and Tenant admin email.
- Once created, the Tenant admin receives an email with an auto-generated password to access the Admin Dashboard.
- Super Admin can create a verifier subscription by providing Organization name, Location, Organization admin email, and Subscription Expiry date.
- Once created, subscribers receive an email with an auto-generated password to access the Verifier Platform.

## Installation
1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd zidyia-library`
3. Install backend dependencies: `npm install`
4. Install frontend dependencies: `cd client && npm install`
5. Start the development server:
   - For backend: `npm start`
   - For frontend: `npm start`
6. Access the application at `http://localhost:5000`

## API Integration
Students are tasked with implementing API integration to transmit data in a format similar to the Zendy Search Library API. Dummy resources and data from the database should be utilized to demonstrate the functionality.

## Technology Stack
- MongoDB
- Express.js
- React.js
- Node.js

