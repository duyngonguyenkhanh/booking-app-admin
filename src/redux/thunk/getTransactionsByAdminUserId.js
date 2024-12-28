import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk để lấy tất cả giao dịch của user theo userId
export const getTransactionsByAdminUserId = createAsyncThunk(
  "admin/getTransactionsByAdminUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/transactions`, // URL API
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }), // Gửi userId qua body
        }
      );

      // Kiểm tra nếu response không thành công
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData); // Xử lý lỗi từ server
      }

      const data = await response.json();

      return data; // Trả về dữ liệu thành công
    } catch (error) {
      // Bắt các lỗi không mong muốn (ví dụ: lỗi mạng)
      return rejectWithValue(error.message);
    }
  }
);
