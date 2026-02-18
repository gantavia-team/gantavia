import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Star,
  Heart,
  Calendar,
  Users,
  Clock,
  Wifi,
  Coffee,
  Car,
  Home,
  Check,
  ArrowLeft,
  Share2,
  Sun,
} from "lucide-react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchDestinationDetails();
  }, [id]);

  const fetchDestinationDetails = async () => {
    try {
      setLoading(true);
      // Mock data - replace with API call (INDIAN DESTINATION - GOA)
      const mockDestination = {
        id: parseInt(id),
        name: "Goa",
        country: "India",
        rating: 4.9,
        reviews: 3542,
        price: 12999,
        duration: 5,
        description:
          "Sun-kissed beaches, Portuguese heritage, vibrant nightlife, and water sports on India's western coast",
        longDescription:
          "Goa, India's smallest state, is a tropical paradise known for its golden beaches, Portuguese colonial architecture, and vibrant culture. From the bustling beaches of North Goa to the serene shores of South Goa, experience water sports, beachside shacks, historic churches, spice plantations, and unforgettable sunsets.",
        images: [
          "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200",
          "https://images.unsplash.com/photo-1571490013442-f763cf80f8c8?w=1200",
          "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200",
          "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=1200",
        ],
        category: ["Beach", "Culture", "Adventure"],
        highlights: [
          "Explore stunning beaches like Baga, Calangute, and Palolem",
          "Visit historic churches and Portuguese forts",
          "Experience thrilling water sports and parasailing",
          "Discover vibrant night markets and beach shacks",
          "Tour spice plantations and wildlife sanctuaries",
          "Enjoy authentic Goan cuisine and seafood",
        ],
        included: [
          "Round-trip flights from major cities",
          "4-star beachfront resort accommodation",
          "Daily breakfast and welcome dinner",
          "Airport transfers",
          "Guided North Goa and Old Goa tours",
          "Water sports package (1 activity)",
        ],
        notIncluded: [
          "Lunch and dinner (except welcome dinner)",
          "Travel insurance",
          "Personal expenses",
          "Additional water sports activities",
        ],
        itinerary: [
          {
            day: 1,
            title: "Arrival in Goa",
            activities: [
              "Airport pickup and hotel check-in",
              "Welcome dinner at beachside restaurant",
              "Evening beach walk",
              "Leisure time",
            ],
          },
          {
            day: 2,
            title: "North Goa Beaches",
            activities: [
              "Visit Baga, Calangute, and Anjuna beaches",
              "Water sports at Baga Beach",
              "Explore vibrant beach shacks",
              "Sunset at Fort Aguada",
            ],
          },
          {
            day: 3,
            title: "Old Goa Heritage Tour",
            activities: [
              "Visit Basilica of Bom Jesus (UNESCO site)",
              "Explore Se Cathedral and Church of St. Francis",
              "Tour spice plantation with traditional lunch",
              "Visit Fontainhas Latin Quarter",
            ],
          },
          {
            day: 4,
            title: "South Goa Relaxation",
            activities: [
              "Palolem Beach and Butterfly Beach",
              "Cabo de Rama Fort",
              "Beachside yoga and relaxation",
              "Sunset cruise on Mandovi River",
            ],
          },
          {
            day: 5,
            title: "Departure",
            activities: [
              "Free morning for last-minute shopping",
              "Visit local markets",
              "Hotel checkout",
              "Airport transfer",
            ],
          },
        ],
        amenities: [
          { icon: <Wifi className="w-5 h-5" />, name: "Free WiFi" },
          { icon: <Coffee className="w-5 h-5" />, name: "Breakfast" },
          { icon: <Car className="w-5 h-5" />, name: "Transport" },
          { icon: <Home className="w-5 h-5" />, name: "4-Star Resort" },
        ],
        weather: {
          season: "Winter",
          temperature: "22-32°C",
          conditions: "Pleasant and sunny",
        },
        bestTimeToVisit: "November to February",
        languages: ["Hindi", "English", "Konkani"],
        currency: "Indian Rupee (INR)",
        timezone: "Indian Standard Time (IST)",
        location: {
          lat: 15.2993,
          lng: 74.124,
        },
      };
      setDestination(mockDestination);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching destination:", error);
      setLoading(false);
    }
  };

  const handleBooking = () => {
    navigate(`/booking/${id}`);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${destination.name}, ${destination.country}`,
        text: destination.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            Loading destination details...
          </p>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Destination not found
          </h2>
          <Button onClick={() => navigate("/destinations")}>
            Back to Destinations
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <button
          onClick={() => navigate("/destinations")}
          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Destinations
        </button>
      </div>

      {/* Image Gallery */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Main Image */}
            <div className="lg:col-span-3">
              <div className="relative rounded-xl overflow-hidden h-96 lg:h-150">
                <img
                  src={destination.images[selectedImage]}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                {/* Image Controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {destination.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`h-3 rounded-full transition-all ${
                        selectedImage === index
                          ? "bg-white w-8"
                          : "bg-white/50 hover:bg-white/75 w-3"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="lg:col-span-1 grid grid-cols-4 lg:grid-cols-1 gap-4">
              {destination.images.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-lg overflow-hidden h-24 lg:h-36 transition-all ${
                    selectedImage === index
                      ? "ring-4 ring-blue-600"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${destination.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 text-gray-500 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{destination.country}</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {destination.name}
                  </h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-semibold text-gray-900">
                        {destination.rating}
                      </span>
                      <span className="text-gray-500">
                        ({destination.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {destination.category.map((cat, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={toggleFavorite}
                    className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Heart
                      className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 text-lg">{destination.description}</p>
            </Card>

            {/* Tabs */}
            <Card className="p-0">
              <div className="border-b">
                <div className="flex space-x-8 px-6">
                  {["overview", "itinerary", "included", "info"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        About This Destination
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {destination.longDescription}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        Highlights
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {destination.highlights.map((highlight, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                            <span className="text-gray-700">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        Amenities
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {destination.amenities.map((amenity, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 text-gray-700"
                          >
                            {amenity.icon}
                            <span>{amenity.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Itinerary Tab */}
                {activeTab === "itinerary" && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {destination.duration}-Day Itinerary
                    </h3>
                    {destination.itinerary.map((day, index) => (
                      <div
                        key={index}
                        className="border-l-4 border-blue-600 pl-6 pb-6"
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                            {day.day}
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900">
                            {day.title}
                          </h4>
                        </div>
                        <ul className="space-y-2 mt-3">
                          {day.activities.map((activity, actIndex) => (
                            <li
                              key={actIndex}
                              className="flex items-start space-x-2"
                            >
                              <Check className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                              <span className="text-gray-600">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {/* Included Tab */}
                {activeTab === "included" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        What's Included
                      </h3>
                      <ul className="space-y-3">
                        {destination.included.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        What's Not Included
                      </h3>
                      <ul className="space-y-3">
                        {destination.notIncluded.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <span className="text-red-600 shrink-0 mt-0.5 font-bold">
                              ✕
                            </span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Info Tab */}
                {activeTab === "info" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 mb-1">
                          Best Time to Visit
                        </h4>
                        <p className="text-gray-900">
                          {destination.bestTimeToVisit}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 mb-1">
                          Languages
                        </h4>
                        <p className="text-gray-900">
                          {destination.languages.join(", ")}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 mb-1">
                          Currency
                        </h4>
                        <p className="text-gray-900">{destination.currency}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 mb-1">
                          Timezone
                        </h4>
                        <p className="text-gray-900">{destination.timezone}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 mb-3">
                        Weather
                      </h4>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <Sun className="w-6 h-6 text-yellow-500" />
                          <span className="font-semibold text-gray-900">
                            {destination.weather.season}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm mb-1">
                          Temperature: {destination.weather.temperature}
                        </p>
                        <p className="text-gray-700 text-sm">
                          Conditions: {destination.weather.conditions}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-4xl font-bold text-blue-600">
                    ₹{destination.price}
                  </span>
                  <span className="text-gray-500">per person</span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{destination.duration} days</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>Min 2 guests</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in Date
                  </label>
                  <div className="flex items-center px-4 py-3 border border-gray-300 rounded-lg">
                    <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                    <input
                      type="date"
                      className="flex-1 outline-none text-gray-700"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Guests
                  </label>
                  <div className="flex items-center px-4 py-3 border border-gray-300 rounded-lg">
                    <Users className="w-5 h-5 text-gray-400 mr-2" />
                    <select className="flex-1 outline-none text-gray-700">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} Guest{num > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <Button onClick={handleBooking} className="w-full" size="lg">
                Book Now
              </Button>

              <div className="mt-4 text-center text-sm text-gray-500">
                Free cancellation up to 24 hours before the trip
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Why book with us?
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span>Best price guarantee</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span>24/7 customer support</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span>Flexible cancellation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span>Secure payment</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
