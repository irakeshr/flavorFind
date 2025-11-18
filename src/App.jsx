import { Routes, Route } from 'react-router-dom';
 
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import WriteReviewPage from './pages/WriteReviewPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import RestaurantDetailPage from './pages/RestaurantDetailPage';
import Footer from './component/layout/Footer';
import Header from './component/layout/Header';
import Restaurants from './pages/Restaurants';
 

function App() {
  return (
    
      <> 
      <Header/>
      <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurants/:restaurantId" element={<RestaurantDetailPage />} />
          <Route path="/restaurants/:restaurantId/write-review" element={<WriteReviewPage />} />
          
          {/* Protected Routes (user must be logged in) */}
          {/* We'll wrap these in a <PrivateRoute> component */}
          <Route path="/profile" element={<ProfilePage />} />
  
        </Routes>
        <Footer/>
      </>  
       
       
    
  );
}

export default App;