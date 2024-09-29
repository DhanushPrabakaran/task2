import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
const Products = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // products per page
  const [total, setTotal] = useState(0); // total products count

  useEffect(() => {
    const fetchProducts = async () => {
      const offset = (page - 1) * limit;
      try {
        const response = await axiosInstance.get("/api/products/allproducts", {
          params: {
            limit: limit,
            offset: offset,
            search: searchTerm,
          },
        });
        // console.log(JSON.stringify(response));
        if (!response) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.data;
        // alert("data renderd", jsonData);
        setData(jsonData.data);
        setTotal(jsonData.total);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [limit, page, searchTerm]); // Re-fetch products when page or searchTerm changes

  const handleSearch = () => {
    setPage(1); // reset to first page on search
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className=" bg-base-200 min-h-screen">
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

        <div className="w-full h-full flex flex-wrap items-center justify-center ">
          {data.length > 0 ? (
            data.map((product) => (
              <div
                key={product.id}
                className="card bg-base-100 w-80 shadow-xl m-2"
              >
                <figure>
                  <img
                    src={product.image_url}
                    alt={product.product_name}
                    width={200}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{product.product_name}</h2>
                  <p>{product.description}</p>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">
                      {product.category}
                    </div>
                  </div>
                </div>
              </div>
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
