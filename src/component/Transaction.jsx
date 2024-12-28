import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionsByAdminUserId } from "../redux/thunk/getTransactionsByAdminUserId";
import { getHotels } from "../redux/thunk/getHotels";
import { getAllNonAdminUsers } from "../redux/thunk/getAllUser";

const Transaction = () => {
  const user = useSelector((state) => state.admin.user || []);
  const res = useSelector((state) => state.admin.transaction.res || []);
  const hotel = useSelector((state) => state.admin.hotel.res || []);

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
  }, [dispatch, user]);

  return (
    <div className="h-screen">
      {user && (
        <div>
          {/* Phần giao diện cho các giao dịch gần đây */}
          <div className="border rounded-lg mx-[1%] mt-[2%] shadow-lg">
            <p className="text-2xl text-slate-500 my-5 ml-5">
              Transactions List
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
                {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)}{" "}
                of {totalItems}
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

export default Transaction;

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
