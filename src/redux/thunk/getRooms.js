import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk để lấy tất cả khách sạn
export const getRooms = createAsyncThunk(
  "admin/getRooms",
  async (userID, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/room`, // URL API
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userID),
        }
      );

      // Kiểm tra nếu response không thành công
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData); // Xử lý lỗi từ server
      }

      const data = await response.json();
      
      return data; // Trả về dữ liệu khách sạn thành công
    } catch (error) {
      // Bắt các lỗi không mong muốn (ví dụ: lỗi mạng)
      return rejectWithValue(error.message);
    }
  }
);
