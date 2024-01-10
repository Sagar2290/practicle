/* eslint-disable react/prop-types */
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authProvider";

export default function Protected({ children }) {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const authentication = auth.authenticate;

  useEffect(() => {
    if (!authentication) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [navigate, authentication]);

  return <>{children}</>;
}
