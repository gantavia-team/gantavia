import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// import { BookingProvider } from "./context/BookingContext";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
// import Booking from "./pages/Booking";
// import Itinerary from "./pages/Itinerary";
// import UserDashboard from "./pages/UserDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Favourites from "./pages/Favourites";   
import MainLayout from "./layouts/MainLayouts";
import AuthPage from "./pages/AuthPage";
import PlanTrip from "./pages/PlanTrip";
function App() {
  return (
    <AuthProvider>
      {/* <BookingProvider> */}
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:id" element={<DestinationDetails />} />
            {/* <Route path="/booking/:id" element={<Booking />} />
            <Route path="/itinerary" element={<Itinerary />} />
            <Route path="/dashboard" element={<UserDashboard />} /> */}
            <Route path="/about" element={<About />} /> 
            <Route path="/contact" element={<Contact />} /> 
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/itinerary" element={<PlanTrip />} />
          </Route>
        </Routes>
      </Router>
      {/* </BookingProvider> */}
    </AuthProvider>
  );
}

export default App;