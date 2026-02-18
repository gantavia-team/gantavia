import { useState } from "react";
import { Sliders, X } from "lucide-react";
import Button from "../common/Button";

const FilterPanel = ({ onFilterChange, isMobile }) => {
  const [isOpen, setIsOpen] = useState(!isMobile);
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    rating: 0,
    duration: "",
    category: [],
  });

  const categories = [
    "Beach",
    "Mountains",
    "City",
    "Adventure",
    "Culture",
    "Nature",
  ];
  const durations = ["1-3 days", "4-7 days", "8-14 days", "15+ days"];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCategoryToggle = (category) => {
    const newCategories = filters.category.includes(category)
      ? filters.category.filter((c) => c !== category)
      : [...filters.category, category];
    handleFilterChange("category", newCategories);
  };

  const resetFilters = () => {
    const defaultFilters = {
      priceRange: [0, 5000],
      rating: 0,
      duration: "",
      category: [],
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const filterContent = (
    <div className="space-y-6">
      {/* Price Range */}
      <div>
        <label className="block font-semibold text-gray-900 mb-2">
          Price Range
        </label>
        <input
          type="range"
          min="0"
          max="5000"
          step="100"
          value={filters.priceRange[1]}
          onChange={(e) =>
            handleFilterChange("priceRange", [0, parseInt(e.target.value)])
          }
          className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-blue-600"
        />
        <span className="text-sm text-gray-600">
          Max: ₹{filters.priceRange[1].toLocaleString()}
        </span>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Minimum Rating</h3>
        <div className="flex space-x-2 flex-wrap gap-2">
          {[0, 3, 4, 4.5].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => handleFilterChange("rating", rating)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                filters.rating === rating
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-600 hover:shadow-sm"
              }`}
            >
              {rating > 0 ? `${rating}+` : "Any"}
            </button>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Duration</h3>
        <select
          value={filters.duration}
          onChange={(e) => handleFilterChange("duration", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="">Any duration</option>
          {durations.map((duration) => (
            <option key={duration} value={duration}>
              {duration}
            </option>
          ))}
        </select>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryToggle(category)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                filters.category.includes(category)
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-600 hover:shadow-sm"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <Button variant="outline" className="w-full" onClick={resetFilters}>
        Reset Filters
      </Button>
    </div>
  );

  // Mobile version
  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-blue-600 text-white p-4 rounded-full shadow-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label="Open filters"
        >
          <Sliders className="w-6 h-6" />
        </button>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
                {filterContent}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop version
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
        <Button variant="outline" size="sm" onClick={resetFilters}>
          Reset All
        </Button>
      </div>
      {filterContent}
    </div>
  );
};

export default FilterPanel;
