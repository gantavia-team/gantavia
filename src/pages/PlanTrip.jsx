import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import placesData from "../data/places";

import {
  calculateDays,
  estimateBudget,
  getHotels,
  getActivities,
  generateTimeline,
} from "../utils/tripUtils";

const PlanTrip = () => {
  const location = useLocation();

  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    travelers: 1,
    budget: "medium",
    travelType: "relaxation",
  });

  const [tripPlan, setTripPlan] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ EXISTING STATES
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);

  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // ✅ NEW STATES
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [contactMode, setContactMode] = useState("");

  // ✅ AUTO-FILL
  useEffect(() => {
    if (location.state) {
      setSelectedDestination(location.state);

      setFormData((prev) => ({
        ...prev,
        destination: location.state.name || "",
      }));
    }
  }, [location.state]);

  // ================= WEATHER =================
  const fetchWeather = async (city) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=18f18fbce711a5a02679b777c67c77f3&units=metric`
      );
      setWeather(res.data);
    } catch {
      setWeather(null);
    }
  };

  const getMapURL = (city) =>
    `https://www.google.com/maps?q=${city}&output=embed`;

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const days = calculateDays(formData.startDate, formData.endDate);

    if (days <= 0) {
      alert("Invalid dates");
      return;
    }

    setLoading(true);
    await fetchWeather(formData.destination);

    setTimeout(() => {
      const city = formData.destination.toLowerCase().trim();

      const places =
        placesData[city] || [
          "City Center",
          "Local Market",
          "Popular Landmark",
        ];

      const activities = getActivities(city, formData.travelType);
      const timeline = generateTimeline(days, places, activities);

      setTripPlan({
        ...formData,
        days,
        totalCost: estimateBudget(
          days,
          formData.budget,
          formData.travelers
        ),
        hotels: getHotels(formData.budget),
        timeline,
      });

      setLoading(false);
    }, 1000);
  };

  const downloadTrip = () => window.print();

  // ================= NEW FUNCTIONS =================
  const handleConfirmBooking = () => {
    if (!bookingData.name || !bookingData.email || !bookingData.phone) {
      alert("Please fill all details");
      return;
    }

    if (!contactMode) {
      alert("Please select Chat or Call");
      return;
    }

    setBookingConfirmed(true);
  };

  const handleChat = () => {
    setContactMode("Chat");
  };

  const handleCall = () => {
    setContactMode("Call");
  };

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        ✈️ Smart Travel Planner
      </h1>

      {/* DESTINATION */}
      {selectedDestination && (
        <div className="max-w-3xl mx-auto mb-6 bg-white p-4 rounded-2xl shadow-md flex gap-4 items-center">
          <img
            src={selectedDestination.image}
            alt={selectedDestination.name}
            className="w-24 h-24 object-cover rounded-xl"
          />

          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800">
              {selectedDestination.name}
            </h2>
            <p className="text-gray-500 text-sm">
              {selectedDestination.location}
            </p>
            <p className="text-blue-600 font-semibold mt-1">
              ₹{selectedDestination.price} / person
            </p>
            <p className="text-sm text-gray-600">
              ⭐ {selectedDestination.rating} |{" "}
              {selectedDestination.duration} days
            </p>
          </div>
        </div>
      )}

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl grid gap-6"
      >
        <input
          type="text"
          value={formData.destination}
          placeholder="Enter Destination"
          className="border p-3 rounded-xl"
          onChange={(e) =>
            setFormData({ ...formData, destination: e.target.value })
          }
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
            required
          />
          <input
            type="date"
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
            required
          />
        </div>

        <input
          type="number"
          min="1"
          value={formData.travelers}
          className="border p-3 rounded-xl"
          onChange={(e) =>
            setFormData({ ...formData, travelers: e.target.value })
          }
        />

        <select
          onChange={(e) =>
            setFormData({ ...formData, budget: e.target.value })
          }
        >
          <option value="low">Budget</option>
          <option value="medium">Mid Range</option>
          <option value="luxury">Luxury</option>
        </select>

        <select
          onChange={(e) =>
            setFormData({ ...formData, travelType: e.target.value })
          }
        >
          <option value="relaxation">Relaxation</option>
          <option value="adventure">Adventure</option>
          <option value="family">Family</option>
          <option value="romantic">Romantic</option>
        </select>

        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl">
          Generate Plan 🚀
        </button>
      </form>

      {loading && (
        <p className="text-center mt-6 animate-pulse">
          Generating your trip...
        </p>
      )}

      {/* RESULT */}
      {tripPlan && !loading && (
        <div className="max-w-4xl mx-auto mt-12 bg-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold">
            Trip to {tripPlan.destination}
          </h2>

          <p>📅 {tripPlan.days} Days</p>
          <p>💰 ₹{tripPlan.totalCost}</p>

          {/* WEATHER */}
          {weather && (
            <div className="mt-6 p-4 bg-blue-100 rounded-xl">
              <h3 className="font-bold">🌦 Weather</h3>
              <p>{weather.main.temp}°C</p>
              <p>{weather.weather[0].main}</p>
            </div>
          )}

          {/* MAP */}
          <div className="mt-6">
            <h3 className="font-bold">🗺 Map</h3>
            <iframe
              src={getMapURL(tripPlan.destination)}
              className="w-full h-64 rounded-xl"
              title="map"
            ></iframe>
          </div>

          {/* TIMELINE */}
          <div className="mt-6">
            <h3 className="font-bold text-xl mb-3">📆 Day-wise Plan</h3>

            {tripPlan.timeline.map((d) => (
              <div
                key={d.day}
                className="border p-5 rounded-xl mt-3 shadow-sm bg-gray-50"
              >
                <h4 className="font-semibold text-lg mb-3">
                  Day {d.day} - {d.place}
                </h4>

                <p>🌅 Morning: {d.morning}</p>
                <p>🌞 Afternoon: {d.afternoon}</p>
                <p>🌙 Evening: {d.evening}</p>

                <div className="mt-2">
                  <span className="text-xs bg-blue-100 px-3 py-1 rounded-full">
                    🎯 {d.activity || "Exploration"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* HOTELS */}
          <div className="mt-6">
            <h3 className="font-bold">🏨 Hotels</h3>
            {tripPlan.hotels.map((h, i) => (
              <p key={i}>
                {h.name} - {h.rating} - {h.price}
              </p>
            ))}
          </div>

          {/* BOOK BUTTON */}
          <button
            onClick={() => setShowBooking(true)}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-xl"
          >
            Book Now
          </button>

          {/* BOOKING */}
          {showBooking && (
            <div className="mt-8 bg-gray-100 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">User Details</h3>

              <input
                placeholder="Name"
                className="border p-2 w-full mb-2"
                onChange={(e) =>
                  setBookingData({ ...bookingData, name: e.target.value })
                }
              />

              <input
                placeholder="Email"
                className="border p-2 w-full mb-2"
                onChange={(e) =>
                  setBookingData({ ...bookingData, email: e.target.value })
                }
              />

              <input
                placeholder="Phone"
                className="border p-2 w-full mb-2"
                onChange={(e) =>
                  setBookingData({ ...bookingData, phone: e.target.value })
                }
              />

              <h3 className="text-lg font-bold mt-4">Payment</h3>
              <select className="border p-2 w-full">
                <option>UPI</option>
                <option>Card</option>
                <option>Net Banking</option>
              </select>

              <button
                onClick={handleConfirmBooking}
                className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-xl"
              >
                Confirm Booking
              </button>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={handleChat}
                  className={`px-4 py-2 rounded text-white ${
                    contactMode === "Chat" ? "bg-blue-700" : "bg-blue-500"
                  }`}
                >
                  Chat 💬
                </button>

                <button
                  onClick={handleCall}
                  className={`px-4 py-2 rounded text-white ${
                    contactMode === "Call" ? "bg-green-700" : "bg-green-500"
                  }`}
                >
                  Call 📞
                </button>
              </div>

              {bookingConfirmed && (
                <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-xl">
                  ✅ Booking Confirmed!
                  <p>
                    We will contact you via <b>{contactMode}</b> shortly.
                  </p>
                </div>
              )}
            </div>
          )}

          <button
            onClick={downloadTrip}
            className="mt-6 bg-purple-600 text-white px-6 py-2 rounded-xl"
          >
            Download Plan
          </button>
        </div>
      )}
    </div>
  );
};

export default PlanTrip;