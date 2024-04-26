import axios from "axios";
import { useStore } from "../../context/StoreContext";
import "./Verify.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useStore();
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = axios.post(`${url}/api/order/verify`, {
        success,
        orderId,
      });

      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
