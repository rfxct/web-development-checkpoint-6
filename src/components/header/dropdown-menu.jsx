import { NavLink } from "react-router-dom";

export default function DropdownMenu() {
  return (
    <div className="absolute top-full mt-2 bg-purple-800 rounded shadow-lg z-10">
      <div className="flex flex-col p-2">
        <NavLink
          to="/watched"
          className="text-white hover:underline block py-1"
        >
          Vistos
        </NavLink>

        <NavLink
          to="/watchlist"
          className="text-white hover:underline block py-1"
        >
          Ver mais tarde
        </NavLink>
      </div>
    </div>
  );
}
