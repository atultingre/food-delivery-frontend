import { useState } from "react";
import { useStore } from "../../context/StoreContext";
import "./PlaceOrder.scss";
import axios from "axios";

const PlaceOrder = () => {
  const { deliveryCost, getTotalCartAmount, token, food_list, cartItems, url } =
    useStore();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData({ ...data, [name]: value });
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: JSON.stringify(data),
      items: orderItems,

      amount: getTotalCartAmount() + deliveryCost,
    };
    let response = await axios.post(`${url}/api/order/place`, orderData, {
      headers: { token },
    });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            name="firstName"
            onChange={onChangeHandler}
            type="text"
            value={data.firstName}
            placeholder="First name"
            required
          />
          <input
            name="lastName"
            onChange={onChangeHandler}
            type="text"
            value={data.lastName}
            placeholder="Last name"
            required
          />
        </div>
        <input
          name="email"
          onChange={onChangeHandler}
          type="email"
          value={data.email}
          placeholder="Email address"
          required
        />
        <input
          name="street"
          onChange={onChangeHandler}
          type="text"
          value={data.street}
          placeholder="Street"
          required
        />
        <div className="multi-fields">
          <input
            name="city"
            onChange={onChangeHandler}
            type="text"
            value={data.city}
            placeholder="City"
            required
          />
          <input
            name="state"
            onChange={onChangeHandler}
            type="text"
            value={data.state}
            placeholder="State"
            required
          />
        </div>
        <div className="multi-fields">
          <input
            name="zipcode"
            onChange={onChangeHandler}
            type="text"
            value={data.zipcode}
            placeholder="Zipcode"
            required
          />
          <input
            name="country"
            onChange={onChangeHandler}
            type="text"
            value={data.country}
            placeholder="Country"
            required
          />
        </div>
        <input
          type="tel"
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          placeholder="Phone"
          required
        />
      </div>
      <div className="place-order-right">
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
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + deliveryCost}
                &#8377;
              </b>
            </div>
          </div>
          <button type="submit">Proceed To Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
