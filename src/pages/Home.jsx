import Hero from "../components/home/Hero";
import FeaturedDestinations from "../components/home/FeaturedDestinations";
import { Compass, Shield, Headphones, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      icon: Compass,
      title: "Expert Guidance",
      description: "Get personalized recommendations from travel experts with years of experience matching your perfect vibe.",
    },
    {
      icon: Shield,
      title: "Secure Booking",
      description: "Your safety is our priority with fully secure payment processing and highly verified partners across India.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer support to assist you throughout your journey, anywhere, anytime.",
    },
    {
      icon: Award,
      title: "Best Price Guarantee",
      description: "We guarantee the best prices for top local resorts or we will instantly refund the difference.",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-slate-50">
      
      {/* Decorative Background Blobs for specific sections */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob pointer-events-none"></div>
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-indigo-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000 pointer-events-none"></div>

      <Hero />
      <FeaturedDestinations />

      {/* Features Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4 relative">
          <div className="absolute inset-0 bg-white/50 backdrop-blur-3xl rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.03)] -z-10"></div>
          
          <div className="text-center mb-16 pt-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Why Choose <span className="text-gradient">Gantavia?</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium lead-relaxed">
              Experience completely hassle-free travel planning with our modern, AI-powered comprehensive services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative text-center p-8 rounded-3xl bg-white/60 backdrop-blur-md border border-white/80 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-3 hover:shadow-indigo-500/20 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                
                <div className="flex justify-center mb-6 relative">
                  <div className="absolute inset-0 bg-indigo-100 rounded-full blur-xl opacity-50 group-hover:bg-indigo-300 transition-colors duration-500"></div>
                  <feature.icon className="w-16 h-16 text-indigo-600 relative group-hover:scale-110 group-hover:text-purple-600 transition-all duration-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-indigo-900 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 -z-20"></div>
        
        {/* Animated animated blobs inside CTA */}
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob pointer-events-none -z-10"></div>
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-pink-300 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-4000 pointer-events-none -z-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10 glass bg-white/10 border-white/20 p-16 md:p-24 rounded-[3rem] shadow-2xl backdrop-blur-xl">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8 text-white drop-shadow-md tracking-tight">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-indigo-50 font-medium leading-relaxed drop-shadow-sm">
            Join thousands of happy travelers and let our AI plan an unforgettable journey across India.
          </p>
          <Link to="/destinations">
            <button className="group relative inline-flex items-center space-x-3 bg-white text-indigo-600 px-10 py-5 rounded-full text-xl font-bold shadow-[0_10px_40px_-10px_rgba(255,255,255,0.4)] hover:shadow-[0_20px_50px_-10px_rgba(255,255,255,0.7)] hover:-translate-y-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50 overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <Compass className="w-7 h-7 relative group-hover:rotate-45 transition-transform duration-500" />
              <span className="relative">Explore Destinations</span>
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;