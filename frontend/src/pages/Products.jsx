import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import ProjectCard from "../components/ProjectCard";
const Products = () => {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false); // Toggle between normal and Solr search
  const [searchTerm, setSearchTerm] = useState(""); // General search term (used for both)
  const [page, setPage] = useState(1); // Current page for pagination
  const [limit] = useState(10); // Products per page
  const [total, setTotal] = useState(0); // Total product count

  // Common function for fetching products (Solr or normal based on flag)
  useEffect(() => {
    const fetchProducts = async () => {
      const offset = (page - 1) * limit;
      try {
        const searchParams = {
          limit: limit,
          offset: offset,
          search: searchTerm,
        };

        const endpoint = flag
          ? "/api/products/allproductsolr" // Solr-based search
          : "/api/products/allproducts"; // Normal search

        const response = await axiosInstance.get(endpoint, {
          params: searchParams,
        });
        if (!response) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response;
        console.log(jsonData);
        setData(jsonData.data.data);
        setTotal(parseInt(jsonData.data.total));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [limit, page, searchTerm, flag]); // Re-fetch products when relevant states change

  const handleSearch = () => {
    setPage(1); // Reset to first page on search
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="p-4 flex flex-col justify-center items-center">
        <div className="join">
          <input
            className="input input-bordered join-item"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn join-item rounded-r-full"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 mt-2">
          <label className="label cursor-pointer">
            <span className="label-text">Use Solr Search?</span>
            <input
              type="checkbox"
              className="toggle toggle-primary ml-2"
              checked={flag}
              onChange={() => setFlag(!flag)} // Toggle between Solr and normal search
            />
          </label>
        </div>

        <div className="w-full h-full flex flex-wrap items-center justify-center mt-4">
          {data.length > 0 ? (
            data.map((product) => (
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

        <div className="join mt-4">
          <button
            className="btn"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span className="px-4">
            {page} of {totalPages}
          </span>
          <button
            className="btn"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
