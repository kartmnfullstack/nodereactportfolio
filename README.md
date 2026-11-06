Node + React

A clean, responsive, and secure full-stack Kanban board application built for tracking and updating tasks.
🔗 Live Portfolio: karthickfreelancing.com
💼 Developer: Karthick

🚀 Features

• Full-Stack MERN Architecture: Scalable React frontend, Node backend, and MongoDB database.
• RESTful API: Clean, structured API endpoints for handling task transactions and user data.
• Secure Authentication: Protected API endpoints and frontend routes secured using JSON Web Tokens (JWT) with custom authorization middleware.
• Tailwind CSS Styling: Modern, interactive board view and clean form layouts built with Tailwind CSS.
• Robust Testing: Unit and integration test suites implemented for both frontend and backend services.
• Fully Responsive: Fluid layouts designed to work seamlessly across mobile, tablet, and desktop devices.
• Environment Management: Safe production-ready configuration using dotenv.


🚀 Upcoming Features

• Drag and Drop
• Dashboard completion
• Pages completion


🛠️ Tech Stack

Frontend: React, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Testing: Jest / Vitetest / Mocha / Chai 

⚙️ Getting Started

Follow these steps to set up the project locally.

🛠️ Prerequisites

Ensure you have the following installed on your machine:
• Node.js (v18.0.0 or higher)
• npm or yarn
• MongoDB (Local instance or MongoDB Atlas account)

📦 Installation

    1. Clone the repository:
        bash
        git clone https://github.com/kartmnfullstack/nodereactportfolio.git
        cd ReactPortfolio
    
    2. Set up the Backend:
        bash
        cd backend
        npm install

    3. Create a .env file in the backend/ directory based on the .env file and fill in your credentials:
        PORT=your_port_number
        MONGODB_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret_key

    4. Set up the Frontend:
        bash
        cd ../frontend
        npm install


🏃 Running the Application

        1. Start the Backend Server:
            bash
            cd backend
            npm run dev
        Note: The server typically runs on http://localhost:5000

        2. Start the Frontend Development Server:
            bash
            cd frontend
            npm run dev
        Note: The client typically runs on http://localhost:5173 or http://localhost:3000


📡 API Endpoints

        Below are some example endpoints available in this application:

        Method	Endpoint	            Description
        GET	    /api/gettasks	        Fetch all tasks
        PUT	    /api/updatetask/	    Update existing task
        POST	/api/register	        Register a new user

📝 License

Distributed under the MIT License. See the LICENSE file for more details.