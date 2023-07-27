import { useLocation, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import UsernameContext from "./context/UsernameContext";

function App() {
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("Home");

  useEffect(() => {
    let titles = location.pathname.split("/");
    let title = "";
    if (!titles[1]) {
      setTitle("Home");
      return;
    }
    for (let word of titles) {
      title += word.slice(0, 1).toUpperCase() + word.slice(1) + " ";
    }
    setTitle(title);
  }, [location]);

  return (
    <>
      <UsernameContext.Provider value={[username, setUsername]}>
        <header>
          <h1>{title}</h1>
          {username && <h2>Welcome, {username}</h2>}
        </header>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />} key="test"></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </UsernameContext.Provider>
    </>
  );
}

export default App;
