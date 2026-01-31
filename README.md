# 💰 SpendIO

A modern, full-stack web application for tracking personal expenses with powerful analytics and intuitive user interface.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)

## ✨ Features

### 🔐 Authentication & Security

- **Secure User Registration & Login** with JWT authentication
- **Password Encryption** using bcrypt for maximum security
- **Protected Routes** to ensure data privacy
- **Session Management** with automatic token refresh

### 💳 Transaction Management

- **Add, Edit & Delete Transactions** with ease
- **Transaction Filtering** by date range and payment method
- **Detailed Transaction History** with sortable columns
- **PDF Export** functionality for financial records

### 📊 Analytics & Visualization

- **Interactive Dashboard** with real-time data
- **Pie Charts** showing expense distribution by category
- **Payment Method Analysis** with color-coded visualization
- **Monthly/Yearly Statistics** for better financial insights
- **Total Balance Tracking** across all accounts

### 🎨 User Experience

- **Modern & Responsive Design** works on all devices
- **Dark Mode Support** for comfortable viewing
- **Smooth Animations** and transitions
- **Intuitive Navigation** with React Router
- **Real-time Updates** without page refresh

## 🚀 Tech Stack

### Frontend

- **React 19.2** - Modern UI library
- **Vite** - Lightning-fast build tool
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Recharts** - Beautiful data visualization
- **Lucide React** - Modern icon library
- **jsPDF** - PDF generation for exports

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Fast web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Secure authentication tokens
- **bcrypt.js** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
SpendIO/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── pages/           # React pages/routes
│   │   │   ├── Welcome.jsx  # Landing page
│   │   │   ├── Login.jsx    # Login page
│   │   │   ├── Register.jsx # Registration page
│   │   │   ├── Dashboard.jsx# Main dashboard
│   │   │   └── Profile.jsx  # User profile
│   │   ├── components/      # Reusable components
│   │   ├── assets/          # Images and static files
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   └── package.json
│
└── backend/                 # Node.js backend API
    ├── models/              # Mongoose models
    ├── routes/              # API routes
    ├── middleware/          # Custom middleware
    ├── config/              # Configuration files
    └── package.json
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn package manager

### 1. Clone the Repository

```bash
git clone https://github.com/Aelees0807/SpendIO.git
cd SpendIO
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

Start the backend server:

```bash
npm start
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory (if needed):

```env
VITE_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

The app will run on `http://localhost:5173`

## 🎯 Usage

1. **Register** a new account or **Login** with existing credentials
2. Navigate to the **Dashboard** to view your financial overview
3. **Add Transactions** by clicking the "Add Transaction" button
4. Filter transactions by **date range** or **payment method**
5. View **analytics** through interactive charts
6. **Export** your transactions to PDF for record-keeping
7. Update your **profile** information as needed

## 📸 Screenshots

<!-- Add screenshots of your application here -->

<<<<<<< HEAD
=======

>>>>>>> 0cd01c1983e45131aa2c76f915de41f77c8fea53
<img width="700" height="700" alt="image" src="https://github.com/user-attachments/assets/f4eb776d-b4fd-40a8-8bd5-a57469412cba" /> <img width="700" height="700" alt="localhost_5173_dashboard" src="https://github.com/user-attachments/assets/4e9ad5f9-b656-4758-9f7c-bfe5d3b9c435" />

## 🌟 Key Highlights

- ✅ **Secure Authentication** - Industry-standard JWT implementation
- ✅ **Real-time Analytics** - Instant insights into spending patterns
- ✅ **Responsive Design** - Works seamlessly on desktop and mobile
- ✅ **Data Export** - PDF generation for easy record-keeping
- ✅ **Modern UI/UX** - Clean, intuitive, and user-friendly interface
- ✅ **Fast Performance** - Optimized with Vite and React 19

## 🔮 Future Enhancements

- [ ] Google OAuth integration
- [ ] Budget setting and alerts
- [ ] Recurring transaction support
- [ ] Multi-currency support
- [ ] Email notifications
- [ ] Data backup and restore
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Create & Design By

**Aelees Bhuva**

- GitHub: [@Aelees0807](https://github.com/Aelees0807)
- LinkedIn: [Connect with me on LinkedIn](https://linkedin.com/in/aelees-bhuva)

⭐ **Star this repository** if you find it helpful!
