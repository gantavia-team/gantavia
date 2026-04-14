import { useState } from "react";
import { blogs } from "../data/blogs";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "AI", "India", "Travel Tips"];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.description.toLowerCase().includes(search.toLowerCase()) ||
      blog.tags?.join(" ").toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || blog.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 md:p-10">

      {/* 🔥 TITLE */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 text-gray-800">
        ✍️ Travel Blogs
      </h1>

      {/* 🔍 SEARCH */}
      <div className="max-w-4xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search blogs by title, description or tags..."
          className="w-full p-4 rounded-2xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 📂 CATEGORY FILTER */}
      <div className="flex justify-center gap-3 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              category === cat
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 shadow hover:bg-blue-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 📰 BLOG CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filteredBlogs.map((blog) => (
          <Link key={blog.id} to={`/blogs/${blog.id}`}>
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition duration-300">

              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={blog.cover}
                  alt={blog.title}
                  className="h-48 w-full object-cover hover:scale-110 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5">

                {/* CATEGORY */}
                <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                  {blog.category}
                </span>

                {/* TITLE */}
                <h2 className="text-lg md:text-xl font-bold mt-3 text-gray-800 line-clamp-2">
                  {blog.title}
                </h2>

                {/* DESCRIPTION */}
                <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                  {blog.description}
                </p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {blog.tags?.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* READ MORE */}
                <div className="mt-4">
                  <span className="text-blue-600 text-sm font-semibold hover:underline">
                    Read More →
                  </span>
                </div>
              </div>

            </div>
          </Link>
        ))}
      </div>

      {/* ❌ EMPTY STATE */}
      {filteredBlogs.length === 0 && (
        <div className="text-center mt-16">
          <p className="text-gray-500 text-lg">😢 No blogs found</p>
          <p className="text-sm text-gray-400 mt-2">
            Try changing search or category
          </p>
        </div>
      )}
    </div>
  );
};

export default Blogs;