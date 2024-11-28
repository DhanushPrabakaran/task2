import { useNavigate } from "react-router-dom";
const Category = () => {
  const navigate = useNavigate();

  const listOfCatagory = ["toys", "clothes", "shoes", "watch", "mobile"];
  return (
    <div className="hero bg-base-200 min-h-screen text-secondary-content">
      <div className="w-full h-full flex flex-wrap align-middle items-center justify-center ">
        {listOfCatagory.map((catagory, index) => {
          return (
            <div
              key={index}
              className="card bg-base-100 image-full w-96 shadow-xl m-2  "
            >
              <figure>
                <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes"
                />
              </figure>
              <div className="card-body justify-center flex flex-col ">
                <h1 className=" text-4xl card-title text-center">{catagory}</h1>

                {/* <div className="card-actions justify-end"> */}
                <button
                  onClick={() => navigate(`/category/${catagory}`)}
                  className="btn btn-primary"
                >
                  Visit
                </button>
                {/* </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
