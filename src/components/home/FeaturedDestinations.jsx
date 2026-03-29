import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../common/Card";
import { MapPin, Star } from "lucide-react";
import gangaarti from "../../assets/images/gangaarti.jpg";

const FeaturedDestinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    // India-focused destinations for your tourism app
    const mockDestinations = [
      {
        id: 1,
        name: "Leh Ladakh", // ✅ Changed to Leh Ladakh
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&fit=crop&h=400", // High-altitude landscapes
        rating: 4.9,
        reviews: 2876,
        price: 24999,
        description:
          "High-altitude adventure with Pangong Lake and monasteries",
        country: "India",
        duration: 7,
      },
      {
        id: 2,
        name: "Jaisalmer, Rajasthan",
        image:
          "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&fit=crop&h=400", // Desert fort
        rating: 4.8,
        reviews: 2987,
        price: 699,
        description: "Golden City with desert safaris and Thar Desert camps",
        country: "India",
        duration: 3,
      },
      {
        id: 3,
        name: "Manali, Himachal Pradesh",
        image:
          "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&fit=crop&h=400",
        rating: 4.9,
        reviews: 3201,
        price: 799,
        description: "Adventure hub with adventure sports and snowy peaks",
        country: "India",
        duration: 4,
      },
      {
        id: 4,
        name: "Rishikesh, Uttarakhand",
        image: gangaarti, // ✅ Ganga Aarti
        rating: 4.8,
        reviews: 1654,
        price: 499,
        description: "Yoga capital with Ganga Aarti and rafting",
        country: "India",
        duration: 2,
      },
    ];
    setDestinations(mockDestinations);
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Fixed title section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most popular destinations handpicked by travel experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination) => (
            <Link key={destination.id} to={`/destinations/${destination.id}`}>
              <Card hover={true}>
                <div className="relative">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600 shadow-lg">
                    ₹{destination.price}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {destination.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="text-sm font-medium text-gray-700">
                        {destination.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {destination.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-medium">
                      {destination.reviews.toLocaleString()} reviews
                    </span>
                    <MapPin className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/destinations"
            className="btn-primary inline-block px-8 py-4 text-lg font-semibold"
          >
            View All Destinations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
