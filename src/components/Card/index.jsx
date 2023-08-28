import React, { useState } from 'react';
import './Card.css';

const Card = ({ productList, addToCart }) => {
  const [hoveredId, setHoveredId] = useState(null);

  const handleMouseEnter = (id) => {
    setHoveredId(id);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };
  
  return (
    <div className="card-container">
      {productList.map(product => (
        <div
          key={product.id}
          className="card"
          onMouseEnter={() => handleMouseEnter(product.id)}
          onMouseLeave={handleMouseLeave}
          onClick={() => addToCart(product)}
        >
          <div className="product-image-container">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-details">
                <h3>{product.name}</h3>
            </div>
            {hoveredId === product.id && (
              <div className="hover-content">
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
