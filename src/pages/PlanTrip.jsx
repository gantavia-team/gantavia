import { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [weatherError, setWeatherError] = useState("");

  // WEATHER API
  const fetchWeather = async (city) => {
    try {
      setWeatherError("");
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=18f18fbce711a5a02679b777c67c77f3&units=metric`
      );
      setWeather(res.data);
    } catch (error) {
      setWeather(null);
      setWeatherError("Weather not found ❌");
    }
  };

  const getMapURL = (city) =>
    `https://www.google.com/maps?q=${city}&output=embed`;

  const calculateDays = () => {
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diff = (end - start) / (1000 * 3600 * 24) + 1;
    return diff > 0 ? diff : 0;
  };

  const estimateBudget = (days) => {
    const base =
      formData.budget === "low"
        ? 1500
        : formData.budget === "medium"
        ? 3000
        : 6000;

    return base * days * formData.travelers;
  };

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

  const getActivities = () => {
    switch (formData.travelType) {
      case "adventure":
        return ["Trekking", "River Rafting", "Cycling"];
      case "romantic":
        return ["Dinner", "Cruise", "Spa"];
      case "family":
        return ["Park", "Zoo", "Museum"];
      default:
        return ["Beach", "Cafe", "City Tour"];
    }
  };

  const generateTimeline = (days) => {
    const activities = getActivities();
    return Array.from({ length: days }, (_, i) => ({
      day: i + 1,
      morning: activities[i % activities.length],
      afternoon: "Explore",
      evening: "Relax",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const days = calculateDays();
    if (days <= 0) return alert("Invalid dates");

    setLoading(true);

    await fetchWeather(formData.destination);

    const newTrip = {
      ...formData,
      days,
      totalCost: estimateBudget(days),
      hotels: getHotels(),
      timeline: generateTimeline(days),
    };

    setTripPlan(newTrip);
    localStorage.setItem("savedTrip", JSON.stringify(newTrip));

    setLoading(false);
  };

  const downloadTrip = () => window.print();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <h1 className="text-4xl text-center font-bold mb-10">
        Smart AI Travel Planner ✈️
      </h1>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl grid gap-6">
        <input
          type="text"
          placeholder="Enter City"
          className="border p-3 rounded-xl"
          onChange={(e) =>
            setFormData({ ...formData, destination: e.target.value })
          }
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input type="date" onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} required />
          <input type="date" onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} required />
        </div>

        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl">
          Generate Plan
        </button>
      </form>

      {loading && <p className="text-center mt-6">Loading...</p>}

      {tripPlan && !loading && (
        <div className="max-w-4xl mx-auto mt-12 bg-white p-8 rounded-3xl shadow-xl">
          <h2>Trip to {tripPlan.destination}</h2>
          <p>Days: {tripPlan.days}</p>
          <p>Cost: ₹{tripPlan.totalCost}</p>

          {weather && <p>🌡 {weather.main.temp}°C</p>}

          <iframe
            title="map"
            width="100%"
            height="300"
            src={getMapURL(tripPlan.destination)}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default PlanTrip;