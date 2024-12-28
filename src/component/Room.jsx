import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "../redux/thunk/getRooms";
import { useNavigate } from "react-router-dom";
import { deleteRoom } from "../redux/thunk/deleteRoom";
import { editRoom } from "../redux/slice/userSlice";

const Room = () => {
  const rooms = useSelector((state) => state.admin.rooms.res || []);
  const { err, status } = useSelector(
    (state) => state.admin.resDeleteRoom || []
  );
  const user = useSelector((state) => state.admin.user || []);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  console.log(err);

  //Lưu trữ trang hiện tại và số phần tử trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rooms.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems = rooms.length;
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

  const handleDelete = (roomId) => {
    const item = { userId: user.userId, roomId: roomId };
    console.log(item);

    dispatch(deleteRoom(item));
  };

  const handleEdit = (room) => {
    dispatch(editRoom(room));
    navigate("/updateroom");
  };


  useEffect(() => {
    dispatch(getRooms({ userId: user.userId }));
  }, [dispatch, user]);

  // Lắng nghe khi hành động xóa thành công và cập nhật lại danh sách
  useEffect(() => {
    if (status === "successful") {
      dispatch(getRooms({userId: user.userId})); // Gọi lại API để cập nhật danh sách phòng
    }
  }, [status, dispatch, user]);

  return (
    <div className="h-screen">
      {err && <p className="text-center text-red-500">{err.message}</p>}
      {user && (
        <div>
          <div className="border rounded-lg mx-[1%] mt-[2%] shadow-lg">
            <div className="flex justify-between items-center content-center w-[98%]">
              <p className="text-2xl text-slate-500 my-5 ml-5">Hotel List</p>
              <button
                onClick={() => {
                  navigate("/newroom");
                }}
                className="h-[30px] w-[80px] text-green-600 border border-green-600 rounded-lg p-0"
              >
                Add New
              </button>
            </div>
            <div className="flex w-full ">
              <div className="py-2">
                <p className=" px-2 w-[10%]">
                  <input type="checkbox" placeholder="Enter text" />
                </p>
              </div>
              <div className="w-[20%]">
                <p className="border-l-2 ">ID</p>
              </div>
              <div className="w-[20%]">
                <p className="border-l-2 px-1">Title</p>
              </div>
              <div className="w-[25%]">
                <p className="border-l-2 px-1">Description</p>
              </div>
              <div className="w-[5%]">
                <p className="border-l-2 px-1">Price</p>
              </div>
              <div className="w-[10%]">
                <p className="border-l-2 px-1">Max People</p>
              </div>
              <div className="w-[10%]">
                <p className="border-l-2 px-1">Action</p>
              </div>
            </div>
            {currentItems.map((hotel) => (
              <div key={hotel._id} className="flex border">
                <div>
                  <p className="px-2 w-[10%]">
                    <input type="checkbox" placeholder="Enter text" />
                  </p>
                </div>
                <div className="w-[20%]">
                  <p className="  h-full ">{hotel._id}</p>
                </div>
                <div className="w-[20%]">
                  <p className="  h-full ">{hotel.title}</p>
                </div>
                <div className="w-[25%]">
                  <p className=" h-full ">{hotel.desc}</p>
                </div>
                <div className="w-[5%]">
                  <p className=" h-full ">{hotel.price}</p>
                </div>
                <div className="py-2 w-[10%]">
                  <p className="h-full ">{hotel.maxPeople}</p>
                </div>
                <div className="py-1 w-[10%] flex">
                  <button
                    onClick={() => {
                      handleDelete(hotel._id);
                    }}
                    className="h-[30px] w-[70px] text-red-500 border border-red-500 rounded-md "
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(hotel)}
                    className="h-[30px] w-[70px] text-yellow-400 border border-yellow-400 rounded-md "
                  >
                    Edit
                  </button>
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

export default Room;
