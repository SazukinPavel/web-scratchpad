import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { any } from "prop-types";
import { useEffect } from "react";

ProtectedRoute.propTypes = {
  component: any,
};

export default function ProtectedRoute({ component: Component }) {
  const isAuthorized = useSelector((state) => state.auth.isAuthorized);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/login");
    }
  }, [isAuthorized]);

  return <Component />;
}
