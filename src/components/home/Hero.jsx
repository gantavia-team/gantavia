import SearchBar from "../common/SearchBar";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleSearch = (searchData) => {
    console.log("Search data:", searchData);

    // Fix: Use template literal with backticks for dynamic URL
    const queryParams = new URLSearchParams({
      destination: searchData.destination,
      startDate: searchData.startDate,
      endDate: searchData.endDate,
      guests: searchData.guests,
    }).toString();

    navigate(`/destinations?${queryParams}`);
  };

  return (
    <div className="relative bg-linear-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920')",
        }}
      />

      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto">
            Explore breathtaking destinations, create unforgettable memories,
            and travel with confidence
          </p>
        </div>

        <SearchBar onSearch={handleSearch} />

        {/* Stats */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-gray-200">Destinations</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">50K+</div>
            <div className="text-gray-200">Happy Travelers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">4.9★</div>
            <div className="text-gray-200">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-gray-200">Support</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
