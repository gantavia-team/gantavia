import { useState, useEffect } from "react";

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

  // ===============================
  // UTIL FUNCTIONS
  // ===============================

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

  const getWeatherMock = () => {
    const temp = Math.floor(Math.random() * 15) + 18;
    return {
      temperature: `${temp}°C`,
      suggestion:
        temp < 20 ? "Carry a light jacket" : "Perfect weather for exploring",
    };
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
        return ["Trekking", "River Rafting", "Mountain Cycling"];
      case "romantic":
        return ["Sunset Dinner", "Private Cruise", "Couple Spa"];
      case "family":
        return ["Theme Park", "Zoo Visit", "Museum Tour"];
      default:
        return ["Beach Walk", "Cafe Hopping", "City Tour"];
    }
  };

  const generateTimeline = (days) => {
    const activities = getActivities();
    const plan = [];

    for (let i = 1; i <= days; i++) {
      plan.push({
        day: i,
        morning: activities[i % activities.length],
        afternoon: "Explore Local Attractions",
        evening: "Enjoy Local Cuisine & Relax",
      });
    }

    return plan;
  };

  // ===============================
  // SUBMIT
  // ===============================

  const handleSubmit = (e) => {
    e.preventDefault();

    const days = calculateDays();
    if (days <= 0) {
      alert("End date must be after start date");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const totalCost = estimateBudget(days);
      const weather = getWeatherMock();
      const hotels = getHotels();
      const timeline = generateTimeline(days);

      const newTrip = {
        ...formData,
        days,
        totalCost,
        weather,
        hotels,
        timeline,
      };

      setTripPlan(newTrip);
      localStorage.setItem("savedTrip", JSON.stringify(newTrip));
      setLoading(false);
    }, 1500);
  };

  // ===============================
  // DOWNLOAD
  // ===============================

  const downloadTrip = () => {
    window.print();
  };

  // ===============================
  // UI
  // ===============================

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-purple-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        Smart AI Travel Planner ✈️
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl grid gap-6"
      >
        <input
          type="text"
          placeholder="Destination"
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
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
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

        <button className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl">
          Generate Smart Plan
        </button>
      </form>

      {loading && (
        <p className="text-center mt-6 animate-pulse">
          Creating your perfect trip... ✨
        </p>
      )}

      {/* RESULT */}
      {tripPlan && !loading && (
        <div className="max-w-4xl mx-auto mt-12 bg-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold mb-4">
            Trip to {tripPlan.destination}
          </h2>

          <p>Duration: {tripPlan.days} Days</p>
          <p>Total Estimated Cost: ₹{tripPlan.totalCost}</p>

          <div className="mt-6">
            <h3 className="font-bold">Weather Forecast</h3>
            <p>{tripPlan.weather.temperature}</p>
            <p>{tripPlan.weather.suggestion}</p>
          </div>

          <div className="mt-6">
            <h3 className="font-bold">Recommended Hotels</h3>
            {tripPlan.hotels.map((hotel, index) => (
              <p key={index}>
                {hotel.name} — {hotel.rating} — {hotel.price}
              </p>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="font-bold">Day-wise Timeline</h3>
            {tripPlan.timeline.map((day) => (
              <div key={day.day} className="border p-4 rounded-xl mt-3">
                <p className="font-semibold">Day {day.day}</p>
                <p>🌅 Morning: {day.morning}</p>
                <p>🌞 Afternoon: {day.afternoon}</p>
                <p>🌙 Evening: {day.evening}</p>
              </div>
            ))}
          </div>

          <button
            onClick={downloadTrip}
            className="mt-8 bg-purple-600 text-white px-6 py-3 rounded-xl"
          >
            Download / Print Plan
          </button>
        </div>
      )}
    </div>
  );
};

export default PlanTrip;
