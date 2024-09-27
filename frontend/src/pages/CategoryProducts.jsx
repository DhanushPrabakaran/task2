import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryProducts = () => {
  
  const { userId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/products/category/${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();

        // alert(jsonData);
        setData(jsonData.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    console.log("cbeuv");
    fetchProducts();
  }); // Run only once when the component mounts

  return (
    <div className=" bg-base-200 min-h-screen">
      <div className=" p-4 flex flex-col justify-center align-middle items-center">
        <div className="join">
          <input
            className="input input-bordered join-item"
            placeholder="Search"
          />
          <button className="btn join-item rounded-r-full">Search</button>
        </div>
        {/* {JSON.stringify(data)} */}
        <div className="w-full h-full flex flex-wrap align-middle items-center justify-center ">
          {/* </div> */}

          {data.length > 0 ? (
            data.map((data) => (
              <div
                key={data.id}
                className="card bg-base-100 w-80 shadow-xl m-2"
              >
                <figure>
                  <img src={data.image_url} alt="Shoes" width={200} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{data.product_name}</h2>
                  <p>{data.description}</p>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">{data.category}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
        <div className="join">
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="1"
            defaultChecked
          />
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="2"
          />
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="3"
          />
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="4"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
