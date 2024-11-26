# Frontend for User Authentication and Booking System

This is the React-based frontend for the User Authentication and Booking System. The frontend provides user-friendly interfaces for authentication, profile management, booking services, and admin functionalities. It integrates with the backend using Axios for API requests.

---

## Features

- **Authentication**: Sign up, log in, and manage sessions with JWT tokens stored in `localStorage`.
- **Booking System**: Interface for users to book services and view details.
- **Review System**: Users can view and interact with reviews.
- **Admin Dashboard**: Admin interface for managing bookings and user data.
- **Responsive Design**: Header, Footer, and main components are styled for usability.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (for dependency management)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gouravsharma730/carServiceFrontend.git
   cd carServiceFrontend

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:

Create a .env file in the root directory.

4. Start the application:
   ```bash
   npm start
   ```

##Project Structure##

```bash
├── public/                 # Public files
├── src/
│   ├── components/         # React components for various pages
│   │   ├── Landing.js      # Landing page
│   │   ├── Signup.js       # Signup page
│   │   ├── Login.js        # Login page
│   │   ├── HomePage.js     # Home page
│   │   ├── AllReviews.js   # Reviews page
│   │   ├── AdminDashboard.js # Admin dashboard
│   │   ├── ForgetPassword.js # Forget password page
│   │   ├── ResetPassword.js  # Reset password page
│   │   ├── BookingForm.js  # Booking form
│   │   ├── Header.js       # Header component
│   │   └── Footer.js       # Footer component
│   ├── App.js              # Main application file
│   └── index.js            # Entry point
├── .env                    # Environment variables
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
```

##Key Functionalities##

**1. Axios Configuration:**

Axios interceptors are configured to include JWT tokens in headers for API requests:
```bash
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**2. Routing:**

The app uses react-router-dom for navigation between pages:
/: Landing page
/signup: Sign-up form
/login: Login form
/home: User home page
/reviews: View all reviews
/AdminDashboard: Admin dashboard
/forgetpassword: Forgot password page
/resetpassword: Reset password page
/newBooking: Booking form

**3. Components:**

Header: Persistent navigation bar.
Footer: Footer for the application.
Landing, Signup, Login, etc.: Pages corresponding to routes

##Available Scripts##

In the project directory, you can run:

npm start: Runs the app in the development mode at http://localhost:3000.

##Notes##

* Ensure the backend server is running at the specified REACT_APP_BACKEND_URL for API integration.
* For production, update the REACT_APP_BACKEND_URL in the .env file to match the live backend URL.




