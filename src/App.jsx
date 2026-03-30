import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// import { BookingProvider } from "./context/BookingContext";

import MainLayout from "./layouts/MainLayouts";

// Pages
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetails from "./pages/DestinationDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Favourites from "./pages/Favourites";
import AuthPage from "./pages/AuthPage";
import PlanTrip from "./pages/PlanTrip";

// Axios Setup (VERY IMPORTANT)
import axios from "axios";

// 👉 Base URL setup (backend connection)
axios.defaults.baseURL = "http://localhost:5000";

function App() {
  return (
    <AuthProvider>
      {/* <BookingProvider> */}
      <Router>
        <Routes>
          
          {/* Layout Wrapper */}
          <Route element={<MainLayout />}>

            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Destinations */}
            <Route path="/destinations" element={<Destinations />} />

            {/* Dynamic Route */}
            <Route path="/destinations/:id" element={<DestinationDetails />} />

            {/* Other Pages */}
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