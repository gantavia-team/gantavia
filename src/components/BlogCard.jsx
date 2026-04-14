import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:scale-105 transition">
      <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />

      <div className="p-4">
        <h2 className="text-xl font-bold">{blog.title}</h2>
        <p className="text-gray-600 text-sm mt-2">{blog.description}</p>

        <Link
          to={`/blogs/${blog.id}`}
          className="text-blue-500 mt-3 inline-block font-semibold"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;