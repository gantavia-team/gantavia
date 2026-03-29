import { useState, useEffect } from "react";
import axios from "axios";

const PlanTrip = () => {
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

  // ===============================
  // 🌦 WEATHER API
  // ===============================
  const fetchWeather = async (city) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=18f18fbce711a5a02679b777c67c77f3&units=metric`
      );
      setWeather(res.data);
    } catch (error) {
      console.error("Weather Error:", error);
      setWeather(null);
    }
  };

  // ===============================
  // 🗺 MAP URL
  // ===============================
  const getMapURL = (city) => {
    return `https://www.google.com/maps?q=${city}&output=embed`;
  };

  // ===============================
  // 📅 CALCULATE DAYS
  // ===============================
  const calculateDays = () => {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diff = (end - start) / (1000 * 3600 * 24) + 1;
    return diff > 0 ? diff : 0;
  };

  // ===============================
  // 💰 BUDGET
  // ===============================
  const estimateBudget = (days) => {
    const base =
      formData.budget === "low"
        ? 1500
        : formData.budget === "medium"
        ? 3000
        : 6000;

    return base * days * formData.travelers;
  };

  // ===============================
  // 🏨 HOTELS
  // ===============================
  const getHotels = () => {
    const price =
      formData.budget === "low"
        ? "₹1500 / night"
        : formData.budget === "medium"
        ? "₹3500 / night"
        : "₹9000 / night";

    return [
      { name: "Grand Stay Hotel", rating: "4.5⭐", price },
      { name: "City View Resort", rating: "4.2⭐", price },
    ];
  };

  // ===============================
  // 🎯 ACTIVITIES
  // ===============================
  const getActivities = () => {
    switch (formData.travelType) {
      case "adventure":
        return ["Trekking", "River Rafting", "Cycling"];
      case "romantic":
        return ["Candle Light Dinner", "Beach Walk", "Couple Spa"];
      case "family":
        return ["Theme Park", "Zoo Visit", "Museum"];
      default:
        return ["City Tour", "Cafe Hopping", "Relax"];
    }
  };

  // ===============================
  // 📆 TIMELINE
  // ===============================
  const generateTimeline = (days) => {
    const activities = getActivities();
    const plan = [];

    for (let i = 1; i <= days; i++) {
      plan.push({
        day: i,
        morning: activities[i % activities.length],
        afternoon: "Explore local attractions",
        evening: "Enjoy food & relax",
      });
    }

    return plan;
  };

  // ===============================
  // 🚀 SUBMIT
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const days = calculateDays();
    if (days <= 0) {
      alert("Invalid dates");
      return;
    }

    setLoading(true);

    await fetchWeather(formData.destination);

    setTimeout(() => {
      const trip = {
        ...formData,
        days,
        totalCost: estimateBudget(days),
        hotels: getHotels(),
        timeline: generateTimeline(days),
      };

      setTripPlan(trip);
      setLoading(false);
    }, 1000);
  };

  // ===============================
  // 📄 DOWNLOAD
  // ===============================
  const downloadTrip = () => {
    window.print();
  };

  // ===============================
  // UI
  // ===============================
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">

      <h1 className="text-4xl font-bold text-center mb-10">
        ✈️ Smart Travel Planner
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl grid gap-6"
      >
        <input
          type="text"
          placeholder="Enter Destination (Goa, Delhi...)"
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

      {/* LOADING */}
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
            ></iframe>
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

          {/* TIMELINE */}
          <div className="mt-6">
            <h3 className="font-bold">📆 Plan</h3>
            {tripPlan.timeline.map((d) => (
              <div key={d.day} className="border p-3 rounded-xl mt-2">
                <p>Day {d.day}</p>
                <p>🌅 {d.morning}</p>
                <p>🌞 {d.afternoon}</p>
                <p>🌙 {d.evening}</p>
              </div>
            ))}
          </div>

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