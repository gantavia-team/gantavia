import { Link } from "react-router-dom";
import { MapPin, Star, Heart, Calendar, Users } from "lucide-react";
import { useState } from "react";
import Card from "../common/Card";

const DestinationCard = ({ destination, viewMode = "grid" }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  if (viewMode === "list") {
    return (
      <Link to={`/destinations/${destination.id}`} className="group">
        <Card className="flex flex-col md:flex-row gap-6 h-full hover:shadow-xl transition-all duration-300">
          {/* Image */}
          <div className="w-full md:w-64 h-48 md:h-64 shrink-0 rounded-lg overflow-hidden">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-between py-2">
            <div>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {destination.name}
                  </h3>
                  <div className="flex items-center text-gray-500 text-sm mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{destination.country}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-semibold text-gray-900">
                    {destination.rating}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-3">
                {destination.description}
              </p>

              <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{destination.duration} days</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{destination.reviews} reviews</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                {destination.category.map((cat, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Price & Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <span className="text-sm text-gray-500 block">
                  Starting from
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  ₹{destination.price}
                </span>
                <span className="text-sm text-gray-500 ml-1">per person</span>
              </div>
              <button
                onClick={toggleFavorite}
                className="p-3 bg-gray-100 hover:bg-red-100 rounded-xl transition-colors"
              >
                <Heart
                  className={`w-5 h-5 transition-all ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                />
              </button>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  // Grid View (default)
  return (
    <Link to={`/destinations/${destination.id}`}>
      <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="relative">
          {/* Image */}
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-all"
          >
            <Heart
              className={`w-5 h-5 transition-all ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`}
            />
          </button>

          {/* Price Tag */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md">
            <span className="text-xs text-gray-500 block">From</span>
            <span className="text-xl font-bold text-blue-600">
              ₹{destination.price}
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                {destination.name}
              </h3>
              <div className="flex items-center text-gray-500 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{destination.country}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-semibold text-gray-900">
                {destination.rating}
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {destination.description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{destination.duration} days</span>
            <span>{destination.reviews} reviews</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default DestinationCard;
