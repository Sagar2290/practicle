import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/authProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DashBoard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [employees, setemployees] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({});
    navigate("/login");
  };

  const token = `Bearer ${auth.token}`;
  useEffect(() => {
    try {
      if (auth.token) {
        axios
          .get("http://localhost:3001/employee/getEmployees", {
            headers: {
              authentication: token,
            },
          })
          .then((data) => {
            console.log(data);
            const employees = data.data.employees;
            setemployees(employees);
          });
      }
    } catch (err) {
      console.log(err);
    }
  }, [token, auth]);

  return (
    <div>
      <div className="w-full fixed top-0 flex justify-around">
        <div>Welcome {auth.user}</div>
        <div>
          <button
            onClick={handleLogout}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
