import { useParams, Link } from "react-router-dom";
import { blogs } from "../data/blogs";

const BlogDetail = () => {
  const { id } = useParams();
  const blogIndex = blogs.findIndex((b) => b.id === Number(id));
  const blog = blogs[blogIndex];

  if (!blog) {
    return <h2 className="text-center mt-10 text-xl">Blog not found</h2>;
  }

  const prevBlog = blogs[blogIndex - 1];
  const nextBlog = blogs[blogIndex + 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-10 px-4 font-sans">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* 🔙 Back */}
        <div className="p-6">
          <Link to="/blogs" className="text-blue-600 font-semibold hover:underline">
            ← Back to Blogs
          </Link>
        </div>

        {/* 🖼 COVER */}
        <div className="overflow-hidden">
          <img
            src={blog.cover}
            alt={blog.title}
            className="w-full h-[350px] object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* 📝 CONTENT */}
        <div className="p-8 md:p-10">

          {/* CATEGORY + TAGS */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
              {blog.category}
            </span>

            {blog.tags?.map((tag, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* TITLE */}
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight text-gray-800">
            {blog.title}
          </h1>

          {/* DESCRIPTION */}
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {blog.description}
          </p>

          {/* 📑 TABLE OF CONTENTS */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl mb-10 shadow-inner">
            <h3 className="font-bold mb-3 text-lg text-gray-800">
              📑 Table of Contents
            </h3>
            <ul className="space-y-2">
              {blog.sections.map((sec, index) => (
                <li key={index}>
                  <a
                    href={`#section-${index}`}
                    className="text-blue-600 hover:text-purple-600 transition font-medium"
                  >
                    → {sec.heading}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 📚 SECTIONS */}
          <div className="space-y-14">
            {blog.sections.map((sec, index) => (
              <div key={index} id={`section-${index}`}>

                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
                  {sec.heading}
                </h2>

                <div className="overflow-hidden rounded-xl shadow-md mb-4">
                  <img
                    src={sec.image}
                    alt={sec.heading}
                    className="w-full h-[260px] object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                <p className="text-gray-700 leading-relaxed text-lg">
                  {sec.text}
                </p>
              </div>
            ))}
          </div>

          {/* 💡 TIPS */}
          {blog.tips && (
            <div className="mt-12 bg-blue-50 p-6 rounded-2xl shadow">
              <h3 className="text-xl font-bold mb-4 text-blue-700">
                💡 Travel Tips
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {blog.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* 🏁 CONCLUSION */}
          {blog.conclusion && (
            <div className="mt-10">
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                🏁 Conclusion
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {blog.conclusion}
              </p>
            </div>
          )}

          {/* 📢 CTA */}
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl text-center shadow-lg">
            <h3 className="text-2xl font-bold mb-2">
              Ready to Plan Your Trip?
            </h3>
            <p className="mb-4">
              Use our smart planner to create your perfect itinerary.
            </p>
            <Link to="/itinerary">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
                Plan Now 🚀
              </button>
            </Link>
          </div>

          {/* ❓ FAQ */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              ❓ FAQs
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-white border rounded-xl shadow hover:shadow-lg transition">
                <p className="font-semibold">Is this free?</p>
                <p className="text-gray-600 text-sm">
                  Yes, basic features are free.
                </p>
              </div>

              <div className="p-5 bg-white border rounded-xl shadow hover:shadow-lg transition">
                <p className="font-semibold">Can I customize trips?</p>
                <p className="text-gray-600 text-sm">
                  Yes, fully customizable.
                </p>
              </div>

              <div className="p-5 bg-white border rounded-xl shadow hover:shadow-lg transition">
                <p className="font-semibold">AI recommendations?</p>
                <p className="text-gray-600 text-sm">
                  Yes, based on preferences.
                </p>
              </div>

              <div className="p-5 bg-white border rounded-xl shadow hover:shadow-lg transition">
                <p className="font-semibold">Is booking included?</p>
                <p className="text-gray-600 text-sm">
                  Planning is included, booking external.
                </p>
              </div>
            </div>
          </div>

          {/* 🔀 NAVIGATION */}
          <div className="flex justify-between mt-12 text-blue-600 font-medium">
            {prevBlog ? (
              <Link to={`/blogs/${prevBlog.id}`} className="hover:underline">
                ← {prevBlog.title}
              </Link>
            ) : <div />}

            {nextBlog && (
              <Link to={`/blogs/${nextBlog.id}`} className="hover:underline">
                {nextBlog.title} →
              </Link>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default BlogDetail;