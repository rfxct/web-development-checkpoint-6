import { Outlet } from "react-router-dom";
import Header from "./components/header";
import "./styles/global.css";

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
