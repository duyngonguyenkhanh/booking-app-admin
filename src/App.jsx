import { Routes, Route } from "react-router-dom";
import User from "./component/User";
import Hotel from "./component/Hotel";
import Room from "./component/Room";
import Transaction from "./component/Transaction";
import NewHotel from "./component/NewHotel";
import Newrooms from "./component/Newrooms";
import Sidebar from "./layout/Sidebar";
import Home from "./page/Home";
import Sigup from "./page/Sigup";
import Sigin from "./page/Sigin";
import UpdateHotel from "./page/UpdateHotel";
import UpdateRoom from "./page/UpdateRoom";

function App() {
  return (
    <>
      <div className="flex">
        <div className="w-[20%] h-full ">
          <Sidebar />
        </div>
        <div className="w-[80%] h-full border-l-2 mt-[100px] border-t-2 ">
          <Routes>
            {routesConfig.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </div>
      </div>
    </>
  );
}
//mảnh chứa tuyến đường đến các component
const routesConfig = [
  { path: "/", element: <Home /> },
  { path: "/user", element: <User /> },
  { path: "/hotel", element: <Hotel /> },
  { path: "/room", element: <Room /> },
  { path: "/transaction", element: <Transaction /> },
  { path: "/newhotel", element: <NewHotel /> },
  { path: "/newroom", element: <Newrooms /> },
  { path: "/sigup", element: <Sigup /> },
  { path: "/sigin", element: <Sigin /> },
  { path: "/updatehotel", element: <UpdateHotel /> },
  { path: "/updateroom", element: <UpdateRoom /> },
  // Thêm các route khác vào đây...
];

export default App;
