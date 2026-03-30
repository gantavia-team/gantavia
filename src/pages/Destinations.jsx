import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DestinationCard from "../components/destinations/DestinationCard";
import FilterPanel from "../components/destinations/FilterPanel";
import { Search, MapPin } from "lucide-react";
import Button from "../components/common/Button";
import axios from "axios";

const Destinations = () => {
  const [searchParams] = useSearchParams();
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("destination") || ""
  );

  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("popular");

  /* =========================
     FETCH FROM BACKEND
  ========================= */
  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/places");

      // Map backend data to your UI format
      const formattedData = res.data.map((item) => ({
        id: item._id,
        name: item.name,
        country: item.location,
        image:
          item.image ||
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        rating: item.rating || 4.5,
        reviews: item.reviews || 1000,
        price: item.price || 10000,
        duration: item.duration || 5,
        description: item.description || "No description available",
        category: item.category || ["General"],
      }));

      setDestinations(formattedData);
      setFilteredDestinations(formattedData);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     SEARCH
  ========================= */
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredDestinations(destinations);
      return;
    }

    const filtered = destinations.filter(
      (dest) =>
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredDestinations(filtered);
  };

  useEffect(() => {
    if (searchQuery) handleSearch();
  }, [searchQuery]);

  /* =========================
     FILTER
  ========================= */
  const handleFilterChange = (filters) => {
    let filtered = [...destinations];

    filtered = filtered.filter(
      (dest) =>
        dest.price >= filters.priceRange[0] &&
        dest.price <= filters.priceRange[1]
    );

    if (filters.rating > 0) {
      filtered = filtered.filter((dest) => dest.rating >= filters.rating);
    }

    if (filters.duration) {
      const durationMap = {
        "1-3 days": [1, 3],
        "4-7 days": [4, 7],
        "8-14 days": [8, 14],
        "15+ days": [15, 999],
      };

      const [min, max] = durationMap[filters.duration];

      filtered = filtered.filter(
        (dest) => dest.duration >= min && dest.duration <= max
      );
    }

    if (filters.category.length > 0) {
      filtered = filtered.filter((dest) =>
        dest.category.some((cat) => filters.category.includes(cat))
      );
    }

    setFilteredDestinations(filtered);
  };

  /* =========================
     SORT
  ========================= */
  const handleSort = (sortType) => {
    setSortBy(sortType);

    let sorted = [...filteredDestinations];

    switch (sortType) {
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        sorted.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    setFilteredDestinations(sorted);
  };

  /* =========================
     LOADING UI
  ========================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin h-16 w-16 border-t-4 border-blue-600 rounded-full mx-auto mb-4"></div>
          <p>Loading destinations...</p>
        </div>
      </div>
    );
  }

  /* =========================
     UI
  ========================= */
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Explore Destinations</h1>
          <p className="mb-6">Discover amazing places</p>

          <div className="flex bg-white rounded-lg overflow-hidden max-w-xl">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 text-black"
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="container mx-auto px-4 py-8 flex gap-6">

        <FilterPanel onFilterChange={handleFilterChange} />

        <div className="flex-1">

          {/* SORT */}
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
            className="mb-4 p-2 border rounded"
          >
            <option value="popular">Popular</option>
            <option value="rating">Rating</option>
            <option value="price-low">Low Price</option>
            <option value="price-high">High Price</option>
          </select>

          {/* CARDS */}
          {filteredDestinations.length === 0 ? (
            <p>No destinations found</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Destinations;