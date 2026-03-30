import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import DestinationCard from "../components/destinations/DestinationCard";
import FilterPanel from "../components/destinations/FilterPanel";
import { Search, MapPin } from "lucide-react";
import Button from "../components/common/Button";
import { getDestinations } from "../services/api";

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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const hasFetched = useRef(false);

  /* =========================
     FETCH
  ========================= */
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchDestinations();
  }, []);

  useEffect(() => {
    setFilteredDestinations(destinations);
  }, [destinations]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const fetchDestinations = async () => {
    try {
      setLoading(true);

      const data = await getDestinations();

      const formatted = data.map((dest) => ({
        id: dest._id,
        name: dest.name,
        country: dest.state || "India",
        location: dest.state || "",
        image: `http://localhost:5000${dest.image}`,
        rating: dest.rating || 4.5,
        reviews: dest.reviews || 1000,
        price: dest.price || 10000,
        duration: dest.duration || 5,
        description: dest.description,
        category: Array.isArray(dest.category)
          ? dest.category.map((c) => c.toLowerCase())
          : [dest.category?.toLowerCase() || "general"],
      }));

      setDestinations(formatted);
      setFilteredDestinations(formatted);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    } finally {
      setLoading(false);
    }
  };

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
        dest.category.some((cat) =>
          filters.category.map((c) => c.toLowerCase()).includes(cat)
        )
      );
    }

    setFilteredDestinations(filtered);
    setCurrentPage(1);
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
        dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredDestinations(filtered);
    setCurrentPage(1);
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
     PAGINATION
  ========================= */
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentDestinations = filteredDestinations.slice(
    indexOfFirst,
    indexOfLast
  );

  const totalPages = Math.ceil(filteredDestinations.length / itemsPerPage);

  /* =========================
     LOADING
  ========================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading destinations...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">

        {/* Search */}
        <div className="flex mb-6">
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-3 border rounded-l"
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>

        {/* Filters */}
        <FilterPanel onFilterChange={handleFilterChange} />

        {/* Sort */}
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

        {/* Cards */}
        {filteredDestinations.length === 0 ? (
          <p>No destinations found</p>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentDestinations.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex gap-2 justify-center">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className="px-3 py-1 border"
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Destinations;