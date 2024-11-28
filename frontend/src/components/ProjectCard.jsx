import PropTypes from "prop-types";

const ProjectCard = ({
  data: {
    image_url,
    product_name,
    description,
    stock,
    current_price,
    discount_price,
    category,
  },
}) => {
  return (
    <div className="card bg-base-100 w-80 shadow-xl m-2">
      <figure>
        <img src={image_url} alt={product_name} width={200} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product_name}</h2>
        <p>{description}</p>
        <p>Stock: {stock}</p>
        <p>Current Price: {current_price}</p>
        <p>Discount Price: {discount_price}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{category}</div>
        </div>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  data: PropTypes.shape({
    image_url: PropTypes.string.isRequired,
    product_name: PropTypes.string.isRequired,
    description: PropTypes.string,
    stock: PropTypes.number,
    current_price: PropTypes.string.isRequired,
    discount_price: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
};

export default ProjectCard;
