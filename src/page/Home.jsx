import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionsByAdminUserId } from "../redux/thunk/getTransactionsByAdminUserId";
import { getHotels } from "../redux/thunk/getHotels";
import { getAllNonAdminUsers } from "../redux/thunk/getAllUser";

const Home = () => {
  const user = useSelector((state) => state.admin.user || []);
  const res = useSelector((state) => state.admin.transaction.res || []);
  const hotel = useSelector((state) => state.admin.hotel.res || []);
  const alluser = useSelector((state) => state.admin.allUser.res || []);
  

  const dispatch = useDispatch();

   //Lưu trữ trang hiện tại và số phần tử trên mỗi trang
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 8;
 
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = res.slice(indexOfFirstItem, indexOfLastItem);
 
   const totalItems = res.length;
   const totalPages = Math.ceil(totalItems / itemsPerPage);
 
   const handleNext = () => {
     if (currentPage < totalPages) {
       setCurrentPage(currentPage + 1);
     }
   };
 
   const handlePrev = () => {
     if (currentPage > 1) {
       setCurrentPage(currentPage - 1);
     }
   };

  useEffect(() => {
    dispatch(getTransactionsByAdminUserId(user.userId));
    dispatch(getHotels(user.userId));
    dispatch(getAllNonAdminUsers(user.userId));
    
  }, [dispatch,user]);

  return (
    <div className="h-screen">
      {user && (
        <div>
          {/* Phần đầu của giao diện với các thống kê */}
          <div className="flex justify-between mx-[1%] mt-[2%]">
            <div className="w-[23%] px-2 py-2 rounded-lg border shadow-lg">
              <p className="text-gray-500 font-medium">USERS</p>
              <p>{alluser.length}</p>
              <p className="flex justify-end">
                <div className="bg-red-300 rounded-lg p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 font-bold text-red-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                </div>
              </p>
            </div>
            <div className="w-[23%] px-2 py-2 rounded-lg border shadow-lg">
              <p className="text-gray-500 font-medium">ODERS</p>
              <p>{res.length}</p>
              <div className="flex justify-end">
                <div className="bg-amber-100 rounded-lg p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-amber-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-[23%] px-2 py-2 rounded-lg border shadow-lg">
              <p className="text-gray-500 font-medium">EARNINGS</p>
              <p>{calculateTotalProfit(res)}</p>
              <div className="flex justify-end">
                <div className="bg-lime-100 rounded-lg p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-lime-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.25 7.756a4.5 4.5 0 1 0 0 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-[23%] px-2 py-2 rounded-lg border shadow-lg">
              <p className="text-gray-500 font-medium">BALANCE</p>
              <p>{calculateTotalProfit(res)}</p>
              <div className="flex justify-end">
                <div className="bg-pink-100 rounded-lg p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-pink-800"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Phần giao diện cho các giao dịch gần đây */}
          <div className="border rounded-lg mx-[1%] mt-[2%] shadow-lg">
            <p className="text-2xl text-slate-500 my-5 ml-5">
              Latest Transactions
            </p>
            <div className="flex justify-between">
              <div className="py-2">
                <p className=" px-5">
                  <input type="checkbox" placeholder="Enter text" />
                </p>
              </div>
              <div className="w-[21%]">
                <p className="border-l-2 px-1">ID</p>
              </div>
              <div className="w-[8%]">
                <p className="border-l-2 px-1">User</p>
              </div>
              <div className="w-[20%]">
                <p className="border-l-2 px-1">Hotel</p>
              </div>
              <div className="w-[10%]">
                <p className="border-l-2 px-1">Room</p>
              </div>
              <div className="w-[5%]">
                <p className="border-l-2 px-1">Price</p>
              </div>
              <div className="w-[14%]">
                <p className="border-l-2 px-1">Date</p>
              </div>
              <div className="w-[10%]">
                <p className="border-l-2 px-1">Payment Method</p>
              </div>
              <div className="w-[10%]">
                <p className="border-l-2 px-1">Status</p>
              </div>
            </div>
            {currentItems.map((trans) => (
              <div key={trans._id} className="flex justify-center">
                <div>
                  <p className="px-5">
                    <input type="checkbox" placeholder="Enter text" />
                  </p>
                </div>
                <div className="w-[21%]">
                  <p className="border h-full px-1">{trans._id}</p>
                </div>
                <div className="w-[8%]">
                  <p className="border h-full px-1">{trans.username}</p>
                </div>
                <div className="w-[20%]">
                  <p className="border h-full px-1">
                    {findHotelNameById(trans.hotel, hotel)}
                  </p>
                </div>
                <div className="w-[10%]">
                  <p className="border h-full px-1">
                    {trans.rooms.map((room, index) => (
                      <span key={index}>
                        {room.roomNumber}
                        {index < trans.rooms.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                </div>
                <div className="py-2 w-[5%] border">
                  <p className="h-full px-1">${calculateTotalAmount(trans)}</p>
                </div>
                <div className="py-2 w-[14%] border">
                  <p className="px-1">
                    {formatDate(trans.dateStart)} - {formatDate(trans.dateEnd)}
                  </p>
                </div>
                <div className="py-2 w-[10%] border">
                  <p className="px-1 text-center">{trans.payment}</p>
                </div>
                <div className="py-2 w-[10%] border">
                  <p className="px-1 text-center">
                    <p
                      className={
                        trans.status === "Booked"
                          ? "bg-red-400"
                          : trans.status === "Pending"
                          ? "bg-yellow-200"
                          : trans.status === "Cancelled"
                          ? "bg-red-200"
                          : "bg-gray-200"
                      }
                    >
                      {trans.status}
                    </p>
                  </p>
                </div>
              </div>
            ))}
            {/* Render thông tin phân trang*/}
      <div className="flex justify-end mr-[1%]">
        <span>
          {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} of{" "}
          {totalItems}
        </span>
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="mr-2"
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="page-button"
        >
          &gt;
        </button>
      </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

function findHotelNameById(hotelId, hotelArr) {
  const hotel = hotelArr.find((hotel) => hotel._id === hotelId);

  return hotel ? hotel.name : "Hotel not found";
}

//hàm tính tiền
const calculateTotalAmount = (transaction) => {
  if (
    !transaction ||
    !transaction.rooms ||
    !transaction.dateStart ||
    !transaction.dateEnd
  ) {
    return 0;
  }

  const { rooms, dateStart, dateEnd } = transaction;

  const startDate = new Date(dateStart);
  const endDate = new Date(dateEnd);

  const timeDiff = Math.abs(endDate - startDate);
  const numDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  const totalAmount = rooms.reduce((total, room) => {
    return total + room.price * numDays;
  }, 0);

  return totalAmount;
};

//Hàm định dạng lại ngày giờ
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

// Hàm tính số ngày giữa dateStart và dateEnd
const calculateDays = (dateStart, dateEnd) => {
  const start = new Date(dateStart);
  const end = new Date(dateEnd);
  const timeDiff = Math.abs(end - start);
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // số ngày
};

// Hàm tính tổng lợi nhuận từ các giao dịch
const calculateTotalProfit = (transactions) => {
  return transactions.reduce((totalProfit, transaction) => {
    const numberOfDays = calculateDays(transaction.dateStart, transaction.dateEnd);
    const transactionProfit = transaction.rooms.reduce((sum, room) => {
      return sum + room.price * numberOfDays;
    }, 0);

    return totalProfit + transactionProfit;
  }, 0); // Bắt đầu từ 0
};

