import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useContext, useEffect } from "react";
import "./Home.css";
import UsernameContext from "./context/UsernameContext";
import { toast } from "react-toastify";
import toastConfig from "./toastConfig";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, , removeCookies] = useCookies([]);
  // eslint-disable-next-line no-unused-vars
  const [_, setUsername] = useContext(UsernameContext);

  useEffect(() => {
    const verifyCookies = async () => {
      if (!cookies.token) {
        setUsername("");
        navigate("/login");
      }

      const data = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
        credentials: "include",
      });

      const dataCl = data.clone();

      try {
        const { status, user } = await data.json();
        if (status) {
          setUsername(user);
        } else {
          setUsername("");
          navigate("/login");
        }
      } catch (err) {
        toast.error(await dataCl.text(), toastConfig);
      }
    };
    verifyCookies();
  }, [cookies, navigate, removeCookies, setUsername]);

  const handleLogout = () => {
    removeCookies("token");
    setUsername("");
    toast.success("Logged out successfully!", toastConfig);
    navigate("/login");
  };

  return (
    <>
      <main>
        <button onClick={handleLogout}>Logout</button>
      </main>
    </>
  );
};

export default Home;
