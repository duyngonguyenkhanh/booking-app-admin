import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sigUpAdminUser } from "../redux/thunk/sigUpAdminUser";

const Sigup = () => {
  //Khởi tạo hàm chuyển hướng
  const navigate = useNavigate();
  const err = useSelector((state) => state.admin.error);


  //khởi tạo hám dispatch
  const dispatch = useDispatch();
  const [newAccount, setNewAccount] = useState({
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
  });
  //hàm đăng ký user mới
  const handleRegister = (e) => {
    e.preventDefault();

    // Kiểm tra tất cả các trường đều có giá trị
    if (
      !newAccount.email ||
      !newAccount.password ||
      !newAccount.fullName ||
      !newAccount.phoneNumber
    ) {
      alert("Please fill in all fields");
      return;
    }

    const newUser = {
      username: newAccount.email,
      password: newAccount.password,
      fullName: newAccount.fullName,
      phoneNumber: newAccount.phoneNumber,
      email: newAccount.email,
      isAdmin: true,
    };

    dispatch(sigUpAdminUser(newUser));
  };
  //hàm lấy dữ liệu từ form thông qua các cặp key và value
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAccount((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen ">
        <form onSubmit={handleRegister}>
          <div className="">
            <div className="">
              <h1 className="text-3xl text-center font-medium mb-2">Sigup</h1>
              <div>
                <input
                  className=" border hover:border-[#003580] py-2 w-[400px] mb-6"
                  type="text"
                  placeholder="Email"
                  onChange={handleChange}
                  name="email"
                  value={newAccount.email}
                />
              </div>
              <div>
                <input
                  className=" border hover:border-[#003580] py-2 w-[400px] mb-6"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  name="password"
                  value={newAccount.password}
                />
              </div>
              <div>
                <input
                  className=" border hover:border-[#003580] py-2 w-[400px] mb-6"
                  type="text"
                  placeholder="Full name"
                  onChange={handleChange}
                  name="fullName"
                  value={newAccount.fullName}
                />
              </div>
              <div>
                <input
                  className=" border hover:border-[#003580] py-2 w-[400px] mb-6"
                  type="text"
                  placeholder="Phone number"
                  onChange={handleChange}
                  name="phoneNumber"
                  value={newAccount.phoneNumber}
                />
              </div>
            </div>
          </div>
          {err && <p className="text-red-500 text-center">{err.error}</p>}
          <button
            type="submit"
            className="hover:bg-[#003580] bg-indigo-500 text-white rounded-sm py-2 w-[400px]"
          >
            Create New Account
          </button>
          <p className="text-center italic">
            Return Login Page?
            <i
              className="font-bold text-indigo-500"
              onClick={() => navigate("/sigin")}
            >
              Login
            </i>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Sigup;
