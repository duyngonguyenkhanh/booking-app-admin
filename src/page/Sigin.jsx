import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../redux/thunk/LoginUser";

const Sigin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const err = useSelector((state) => state.admin.login.error);
  const isLogin = useSelector((state) => state.admin.login.isLogin);
  

  const [newAccount, setNewAccount] = useState({
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAccount((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const UserLogin = {
      email: newAccount.email,
      password: newAccount.password,
    };

    dispatch(LoginUser(UserLogin));
  };

  // Sử dụng useEffect để kiểm tra khi có thay đổi của err
  useEffect(() => {
    if (isLogin) {
      // Nếu không có lỗi, chuyển hướng đến trang chủ
      navigate("/");
      // Không reset form và điều hướng ngay lập tức
      setNewAccount({
        email: "",
        password: "",
      });
    }
  }, [err, isLogin, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <form onSubmit={handleLogin}>
        <div className="">
          <div className="">
            <h1 className="text-3xl text-center font-medium mb-2">Sigin</h1>
            <div>
              <input
                className=" border hover:border-[#003580] py-2 w-[400px] mb-6"
                type="text"
                onChange={handleChange}
                placeholder="email"
                name="email"
                value={newAccount.email}
              />
            </div>
            <div>
              <input
                className=" border hover:border-[#003580] py-2 w-[400px] mb-6"
                type="password"
                onChange={handleChange}
                placeholder="password"
                name="password"
                value={newAccount.password}
              />
            </div>
          </div>
        </div>
        {err && <p className="text-red-500 text-center">{err.error}</p>}
        <button
          type="submit"
          className="hover:bg-[#003580] bg-indigo-500 text-white rounded-sm py-2 w-[400px]"
        >
          Đăng nhập
        </button>
        <p className="text-center mt-2">
          create an Admin user?{" "}
          <i
            className="font-bold text-indigo-500"
            onClick={() => navigate("/sigup")}
          >
            Sigup
          </i>
        </p>
      </form>
    </div>
  );
};

export default Sigin;
