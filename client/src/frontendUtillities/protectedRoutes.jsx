import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { authCheck, screenLoading } = useSelector(
    (state) => state.userReducer
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!authCheck && !screenLoading) {
      // console.log("AuthCheck:", authCheck, "ScreenLoading:", screenLoading)
      navigate('/login')
    }
  }, [authCheck, screenLoading]);

  return children;
};

export default ProtectedRoute;
