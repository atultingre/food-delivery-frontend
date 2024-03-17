import { useStore } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.scss";

const FoodDisplay = ({ category }) => {
  const { food_list } = useStore();

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list?.map(
          (item) =>
            (category === "All" || category === item.category) && (
              <FoodItem key={item._id} item={item} />
            )
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
