import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import ProjectCard from "../components/ProjectCard";
const CategoryProducts = () => {
  const { Category } = useParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCount, setTotalCount] = useState(0); // Total products count
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [productsPerPage] = useState(10); // Products per page

  // Fetch products based on the category and pagination
  useEffect(() => {
    const fetchProducts = async () => {
      const offset = (currentPage - 1) * productsPerPage;

      try {
        const response = await axiosInstance.get(
          `/api/products/category/${Category}`,
          {
            params: {
              limit: productsPerPage,
              offset: offset,
            },
          }
        );
        if (!response) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.data;
        setData(jsonData.data);
        setFilteredData(jsonData.data);
        setTotalCount(jsonData.totalCount); // Set the total product count
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, [Category, currentPage, productsPerPage]); // Fetch again when Category or currentPage changes

  // Handle search functionality
  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredData(data); // Reset to all products if search term is empty
    } else {
      const filtered = data.filter((product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered); // Set the filtered products based on search term
    }
  };

  // Handle pagination
  const totalPages = Math.ceil(totalCount / productsPerPage); // Calculate total pages

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1); // Move to the next page
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1); // Move to the previous page
    }
  };

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="p-4 flex flex-col justify-center items-center">
        {/* Search input */}
        <div className="join">
          <input
            className="input input-bordered join-item"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
          />
          <button
            className="btn join-item rounded-r-full"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {/* Display products */}
        <div className="w-full h-full flex flex-wrap items-center justify-center">
          {filteredData.length > 0 ? (
            filteredData.map((product) => (
              <ProjectCard key={product.id} data={product} />
              // <div
              //   key={product.id}
              //   className="card bg-base-100 w-80 shadow-xl m-2"
              // >
              //   <figure>
              //     <img
              //       src={product.image_url}
              //       alt={product.product_name}
              //       width={200}
              //     />
              //   </figure>
              //   <div className="card-body">
              //     {" "}
              //     <h2 className="card-title">{product.product_name}</h2>
              //     <p>{product.description}</p>
              //     <div className="card-actions justify-end">
              //       <div className="badge badge-outline">
              //         {product.category}
              //       </div>
              //     </div>
              //   </div>
              // </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
        {/* Pagination controls */}
        <div className="join mt-4">
          <button
            className="btn join-item"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="join-item btn">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn join-item"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
