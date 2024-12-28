import { createSlice } from "@reduxjs/toolkit";

import { decodeToken } from "../../utils/decodeToken";
import { sigUpAdminUser } from "../thunk/sigUpAdminUser";
import { LoginUser } from "../thunk/LoginUser";
import { getTransactionsByAdminUserId } from "../thunk/getTransactionsByAdminUserId";
import { getHotels } from "../thunk/getHotels";
import { getAllNonAdminUsers } from "../thunk/getAllUser";
import { addHotel } from "../thunk/addHotel";
import { updateHotel } from "../thunk/updateHotel";
import { getRooms } from "../thunk/getRooms";
import { deleteHotel } from "../thunk/deleteHotel";
import { addRoom } from "../thunk/addRoom";
import { updateRoom } from "../thunk/editRoom";
import { deleteRoom } from "../thunk/deleteRoom";

const initialState = {
  res: null,
  error: null,
  status: null,
  users: [],
  token: localStorage.getItem("admintoken") || null,
  statusTrans: "idle",
  user: localStorage.getItem("admin")
    ? JSON.parse(localStorage.getItem("admin"))
    : null, // Lấy thông tin người dùng từ localStorage
  transaction: { res: null, err: null, status: "idle" },
  login: { res: null, error: null, status: "idle", isLogin: false },
  hotel: { res: null, err: null, status: "idle" },
  allUser: { res: null, err: null, status: "idle" },
  resAddHotel: { res: null, err: null, status: "idle" },
  editHotel: { isEdit: false, errEdit: null, dataEdit: null },
  dataUpdateHotel: { res: null, err: null, status: "idle" },
  rooms: { res: null, err: null, status: "idle" },
  resDeleteHotel: { err: null, status: "idle" },
  resDeleteRoom: { err: null, status: "idle" },
  resAddRoom: { err: null, status: "idle" },
  resEditRoom: {
    isEdit: false,
    errEdit: null,
    statusEdit: null,
    dataEdit: null,
  },
};

const userSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.login.isLogin = false;
      state.login.error = null;
      state.transaction = { res: null, err: null, status: "idle" }; // Đặt lại dữ liệu transaction
      state.hotel = { res: null, err: null, status: "idle" }; // Đặt lại dữ liệu hotel
      state.allUser = { res: null, err: null, status: "idle" }; // Đặt lại dữ liệu allUser
      state.resAddHotel = { res: null, err: null, status: "idle" }; // Đặt lại dữ liệu resAddHotel
      state.dataUpdateHotel = { res: null, err: null, status: "idle" }; // Đặt lại dữ liệu resAddHotel
      state.rooms = { res: null, err: null, status: "idle" };
      state.resDeleteHotel = { err: null, status: "idle" };
      state.resAddRoom = { err: null, status: "idle" };
      state.resEditRoom = {
        isEdit: false,
        errEdit: null,
        statusEdit: null,
        dataEdit: null,
      };
      localStorage.removeItem("admintoken");
      localStorage.removeItem("admin");
    },
    setTokenFromLocalStorage: (state) => {
      const token = localStorage.getItem("admintoken");
      if (token) {
        state.token = token;
        const decodedUser = decodeToken(token); // Giải mã token và lưu trữ thông tin người dùng
        state.user = decodedUser;
        localStorage.setItem("admin", JSON.stringify(decodedUser)); // Lưu thông tin người dùng vào localStorage
      }
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload; // Lưu trữ thông tin người dùng đã giải mã
    },
    //hàm để set nút Edit
    editHotel: (state, action) => {
      state.editHotel.isEdit = true;
      state.editHotel.dataEdit = action.payload;
    },
    //hàm để set nút Edit
    editRoom: (state, action) => {
      state.resEditRoom.isEdit = true;
      state.resEditRoom.dataEdit = action.payload;
    },
    //Đặt lại trạng thái lỗi 
    resetDeleteError: (state) => {
      state.resDeleteHotel.err = null;
    },
    
  },
  extraReducers: (builder) => {
    builder
      //Create admin user
      .addCase(sigUpAdminUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sigUpAdminUser.fulfilled, (state, action) => {
        state.status = "successful";
        state.res = action.payload;
      })
      .addCase(sigUpAdminUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      //Login
      .addCase(LoginUser.pending, (state) => {
        state.login.status = "loading";
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.login.status = "successful";
        state.login.res = action.payload;
        state.login.isLogin = true;
        state.token = action.payload.token;
        localStorage.setItem("admintoken", action.payload.token);

        // Giải mã token và lưu thông tin người dùng
        const decodedUser = decodeToken(action.payload.token);
        state.user = decodedUser;
        localStorage.setItem("admin", JSON.stringify(decodedUser)); // Lưu thông tin người dùng vào localStorage
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.login.status = "failed";
        state.login.error = action.payload;
        state.login.isLogin = false;
      })

      //Nhận Transaction
      .addCase(getTransactionsByAdminUserId.pending, (state) => {
        state.transaction.status = "loading";
      })
      .addCase(getTransactionsByAdminUserId.fulfilled, (state, action) => {
        state.transaction.status = "successful";
        state.transaction.res = action.payload;
        state.transaction.err = null;
      })
      .addCase(getTransactionsByAdminUserId.rejected, (state, action) => {
        state.transaction.status = "failed";
        state.transaction.err = action.payload;
      })

      //Nhận thông tin tất cả khác sạn
      .addCase(getHotels.pending, (state) => {
        state.hotel.status = "loading";
      })
      .addCase(getHotels.fulfilled, (state, action) => {
        state.hotel.status = "successful";
        state.hotel.res = action.payload;
        state.hotel.err = null;
      })
      .addCase(getHotels.rejected, (state, action) => {
        state.hotel.status = "failed";
        state.hotel.err = action.payload;
      })

      //Nhận thông tin tất cả khác sạn
      .addCase(getAllNonAdminUsers.pending, (state) => {
        state.allUser.status = "loading";
      })
      .addCase(getAllNonAdminUsers.fulfilled, (state, action) => {
        state.allUser.status = "successful";
        state.allUser.res = action.payload;
        state.allUser.err = null;
      })
      .addCase(getAllNonAdminUsers.rejected, (state, action) => {
        state.allUser.status = "failed";
        state.allUser.err = action.payload;
      })

      //Thêm mới 1 hotel
      .addCase(addHotel.pending, (state) => {
        state.resAddHotel.status = "loading";
      })
      .addCase(addHotel.fulfilled, (state) => {
        state.resAddHotel.status = "successful";
        state.resAddHotel.err = null;
      })
      .addCase(addHotel.rejected, (state, action) => {
        state.dataUpdateHotel.status = "failed";
        state.dataUpdateHotel.err = action.payload;
      })

      //Cập nhật phòng
      .addCase(updateHotel.pending, (state) => {
        state.dataUpdateHotel.status = "loading";
      })
      .addCase(updateHotel.fulfilled, (state) => {
        state.dataUpdateHotel.status = "successful";
        state.dataUpdateHotel.err = null;
      })
      .addCase(updateHotel.rejected, (state, action) => {
        state.dataUpdateHotel.status = "failed";
        state.dataUpdateHotel.err = action.payload;
      })
      //Xóa Khách sạn
      .addCase(deleteHotel.pending, (state) => {
        state.resDeleteHotel.status = "loading";
      })
      .addCase(deleteHotel.fulfilled, (state) => {
        state.resDeleteHotel.status = "successful";
        state.resDeleteHotel.err = null;
      })
      .addCase(deleteHotel.rejected, (state, action) => {
        state.resDeleteHotel.status = "failed";
        state.resDeleteHotel.err = action.payload;
      })

      //nhận tất cả rooms
      .addCase(getRooms.pending, (state) => {
        state.rooms.status = "loading";
      })
      .addCase(getRooms.fulfilled, (state, action) => {
        state.rooms.status = "successful";
        state.rooms.res = action.payload;
        state.rooms.err = null;
      })
      .addCase(getRooms.rejected, (state, action) => {
        state.rooms.status = "failed";
        state.rooms.err = action.payload;
      })

      //nhận thêm khách sạn mới
      .addCase(addRoom.pending, (state) => {
        state.resAddRoom.status = "loading";
      })
      .addCase(addRoom.fulfilled, (state) => {
        state.resAddRoom.status = "successful";
        state.resAddRoom.err = null;
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.resAddRoom.status = "failed";
        state.resAddRoom.err = action.payload;
      })

      //Xóa room
      .addCase(deleteRoom.pending, (state) => {
        state.resDeleteRoom.status = "loading";
      })
      .addCase(deleteRoom.fulfilled, (state) => {
        state.resDeleteRoom.status = "successful";
        state.resDeleteRoom.err = null;
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.resDeleteRoom.status = "failed";
        state.resDeleteRoom.err = action.payload;
      })

      //cập nhật khách sạn
      .addCase(updateRoom.pending, (state) => {
        state.resEditRoom.statusEdit = "loading";
      })
      .addCase(updateRoom.fulfilled, (state) => {
        state.resEditRoom.statusEdit = "successful";
        state.resEditRoom.err = null;
      })
      .addCase(updateRoom.rejected, (state, action) => {
        state.resEditRoom.statusEditRoom = "failed";
        state.resEditRoom.errEdit = action.payload;
      });
  },
});

export const {
  logout,
  setTokenFromLocalStorage,
  setToken,
  editHotel,
  editRoom,
  resetDeleteError,
} = userSlice.actions;
export default userSlice.reducer;
