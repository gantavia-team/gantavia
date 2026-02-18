import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DestinationCard from "../components/destinations/DestinationCard";
import FilterPanel from "../components/destinations/FilterPanel";
import { Search, MapPin } from "lucide-react";
import Button from "../components/common/Button";

const Destinations = () => {
  const [searchParams] = useSearchParams();
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("destination") || "",
  );
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    // Apply search from URL params
    if (searchQuery) {
      handleSearch();
    }
  }, [searchQuery]);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      // Mock data - replace with API call
      const mockDestinations = [
        {
          id: 1,
          name: "Goa",
          country: "India",
          image:
            "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
          rating: 4.9,
          reviews: 3542,
          price: 12999,
          duration: 5,
          description:
            "Sun-kissed beaches, Portuguese heritage, and vibrant nightlife on India's western coast",
          category: ["Beach", "Culture"],
        },
        {
          id: 2,
          name: "Kerala",
          country: "India",
          image:
            "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800",
          rating: 4.8,
          reviews: 2876,
          price: 18999,
          duration: 7,
          description:
            "God's Own Country with tranquil backwaters, tea plantations, and Ayurvedic retreats",
          category: ["Beach", "Nature"],
        },
        {
          id: 3,
          name: "Jaipur",
          country: "India",
          image:
            "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800",
          rating: 4.7,
          reviews: 4201,
          price: 9999,
          duration: 4,
          description:
            "The Pink City with majestic forts, palaces, and vibrant Rajasthani culture",
          category: ["City", "Culture"],
        },
        {
          id: 4,
          name: "Udaipur",
          country: "India",
          image:
            "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
          rating: 4.9,
          reviews: 2654,
          price: 15999,
          duration: 4,
          description:
            "City of Lakes with romantic palaces, serene waters, and royal heritage",
          category: ["City", "Culture"],
        },
        {
          id: 5,
          name: "Manali",
          country: "India",
          image:
            "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
          rating: 4.6,
          reviews: 3832,
          price: 13499,
          duration: 5,
          description:
            "Himalayan paradise with snow peaks, adventure sports, and scenic valleys",
          category: ["Mountains", "Adventure"],
        },
        {
          id: 6,
          name: "Rishikesh",
          country: "India",
          image:
            "https://images.unsplash.com/photo-1626022179847-f38a3d456b66?w=800",
          rating: 4.8,
          reviews: 2987,
          price: 8999,
          duration: 3,
          description:
            "Yoga capital on the Ganges with spiritual retreats and river rafting",
          category: ["Nature", "Adventure"],
        },
        {
          id: 7,
          name: "Shimla",
          country: "India",
          image:
            "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800",
          rating: 4.5,
          reviews: 2234,
          price: 11999,
          duration: 4,
          description:
            "Colonial hill station with toy train rides and panoramic mountain views",
          category: ["Mountains", "Culture"],
        },
        {
          id: 8,
          name: "Agra",
          country: "India",
          image:
            "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800",
          rating: 4.7,
          reviews: 5876,
          price: 7999,
          duration: 2,
          description:
            "Home to the iconic Taj Mahal and Mughal architectural wonders",
          category: ["City", "Culture"],
        },
        {
          id: 9,
          name: "Leh-Ladakh",
          country: "India",
          image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
          rating: 4.9,
          reviews: 3543,
          price: 24999,
          duration: 8,
          description:
            "High-altitude desert with Buddhist monasteries, pristine lakes, and rugged beauty",
          category: ["Mountains", "Adventure"],
        },
        {
          id: 10,
          name: "Varanasi",
          country: "India",
          image:
            "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800",
          rating: 4.8,
          reviews: 4456,
          price: 8499,
          duration: 3,
          description:
            "Ancient holy city with sacred ghats, spiritual rituals, and Ganga aarti",
          category: ["City", "Culture"],
        },
        {
          id: 11,
          name: "Munnar",
          country: "India",
          image:
            "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=800",
          rating: 4.7,
          reviews: 2109,
          price: 14999,
          duration: 5,
          description:
            "Kerala's hill station with rolling tea gardens and misty valleys",
          category: ["Mountains", "Nature"],
        },
        {
          id: 12,
          name: "Jaisalmer",
          country: "India",
          image:
            "https://images.unsplash.com/photo-1609920658906-8223bd289001?w=800",
          rating: 4.8,
          reviews: 2987,
          price: 16999,
          duration: 4,
          description:
            "Golden City in Thar Desert with sand dunes, camel safaris, and desert camps",
          category: ["City", "Adventure", "Culture"],
        },
      ];

      setDestinations(mockDestinations);
      setFilteredDestinations(mockDestinations);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filters) => {
    let filtered = [...destinations];

    // Price filter
    filtered = filtered.filter(
      (dest) =>
        dest.price >= filters.priceRange[0] &&
        dest.price <= filters.priceRange[1],
    );

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((dest) => dest.rating >= filters.rating);
    }

    // Duration filter
    if (filters.duration) {
      const durationMap = {
        "1-3 days": [1, 3],
        "4-7 days": [4, 7],
        "8-14 days": [8, 14],
        "15+ days": [15, 999],
      };
      const [min, max] = durationMap[filters.duration];
      filtered = filtered.filter(
        (dest) => dest.duration >= min && dest.duration <= max,
      );
    }

    // Category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter((dest) =>
        dest.category.some((cat) => filters.category.includes(cat)),
      );
    }

    setFilteredDestinations(filtered);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredDestinations(destinations);
      return;
    }

    const filtered = destinations.filter(
      (dest) =>
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredDestinations(filtered);
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading destinations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Destinations
          </h1>
          <p className="text-xl mb-8">
            Discover amazing places around the India
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex items-center px-4 text-gray-500">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search destinations, countries, or activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 px-4 py-4 outline-none text-gray-900"
              />
              <Button onClick={handleSearch} className="rounded-none">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar - Desktop */}
          <aside className="hidden lg:block w-80 shrink-0">
            <FilterPanel onFilterChange={handleFilterChange} isMobile={false} />
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <FilterPanel onFilterChange={handleFilterChange} isMobile={true} />
          </div>

          {/* Destinations Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-gray-700">
                  <span className="font-semibold">
                    {filteredDestinations.length}
                  </span>{" "}
                  destinations found
                </div>
                <div className="flex items-center gap-4">
                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>

                  {/* View Toggle */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`px-3 py-1 rounded ${
                        viewMode === "grid"
                          ? "bg-white shadow-sm text-blue-600"
                          : "text-gray-600"
                      }`}
                    >
                      Grid
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`px-3 py-1 rounded ${
                        viewMode === "list"
                          ? "bg-white shadow-sm text-blue-600"
                          : "text-gray-600"
                      }`}
                    >
                      List
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Destinations Grid/List */}
            {filteredDestinations.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No destinations found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-6"
                }
              >
                {filteredDestinations.map((destination) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredDestinations.length > 0 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                    1
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destinations;
