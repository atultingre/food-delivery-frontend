import { useStore } from "../../context/StoreContext";
import "./Cart.scss";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    deliveryCost,
    cartItems,
    food_list,
    removeFormCart,
    getTotalCartAmount,
    url,
  } = useStore();
  const navigate = useNavigate();
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {getTotalCartAmount() > 0 && (
          <>
            {food_list?.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={index}>
                    <div className="cart-items-title cart-items-item">
                      <img
                        src={url + "/images/" + item.image}
                        alt={item.name}
                      />
                      <p>{item.name}</p>
                      <p> {item.price} &#8377;</p>
                      <p>{cartItems[item._id]}</p>
                      <p> {item.price * cartItems[item._id]} &#8377;</p>
                      <p
                        className="cross"
                        onClick={() => removeFormCart(item._id)}
                      >
                        X
                      </p>
                    </div>
                    <hr />
                  </div>
                );
              }
            })}
          </>
        )}
      </div>
      {getTotalCartAmount() > 0 && (
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>{getTotalCartAmount()} &#8377;</p>
              </div>
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>{getTotalCartAmount() === 0 ? 0 : deliveryCost} &#8377;</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  {" "}
                  {getTotalCartAmount() === 0
                    ? 0
                    : getTotalCartAmount() + deliveryCost}
                  &#8377;
                </b>
              </div>
            </div>

            <button onClick={() => navigate("/order")}>
              Proceed To Checkout
            </button>
          </div>
          <div className="card-promocode">
            <div>
              <p>If you have a promo code Enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="promo code" />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
