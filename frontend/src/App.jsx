// src/App.jsx
// import  from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Header from "./components/Header";
import Products from "./pages/Products";
import Category from "./pages/Category";
import CategoryProducts from "./pages/CategoryProducts";
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/allproducts"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category"
            element={
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/:Category"
            element={
              <ProtectedRoute>
                <CategoryProducts />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
