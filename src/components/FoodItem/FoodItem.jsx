import "./FoodItem.scss";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { useStore } from "../../context/StoreContext";

const FoodItem = ({ item }) => {
  const { _id: id, name, price, description, image } = item;
  const { cartItems, addToCart, removeFormCart, url } = useStore();

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          src={url + "/images/" + image}
          className="food-item-image"
          alt={name}
        />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFormCart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">&#8377; {price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
