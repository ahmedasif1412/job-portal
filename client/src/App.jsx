import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLoggedIn } from "./store/authSlice";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch(checkLoggedIn());
  }, []);

  if (user) {
    return <Dashboard />;
  }

  return <Auth />;
}

export default App;
