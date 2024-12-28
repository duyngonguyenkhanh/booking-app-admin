import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getHotels } from "../redux/thunk/getHotels";
import { editHotel } from "../redux/slice/userSlice";
import { deleteHotel } from "../redux/thunk/deleteHotel";
import { confirmAlert } from "react-confirm-alert"; // Import thư viện
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import CSS

const Hotel = () => {
  const user = useSelector((state) => state.admin.user || []);
  const hotel = useSelector((state) => state.admin.hotel.res || []);
  const statusDelete = useSelector(
    (state) => state.admin.resDeleteHotel.status || []
  );
  const err = useSelector((state) => state.admin.resDeleteHotel.err || []);
  const { status } = useSelector((state) => state.admin.dataUpdateHotel );

  

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Lưu trữ trang hiện tại và số phần tử trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = hotel.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems = hotel.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    if (statusDelete === "successful" || status === "successful") {
      dispatch(getHotels(user.userId));
    }
  }, [statusDelete, dispatch, user, status]);




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

  const handleDelete = (id) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this hotel?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const dataDelete = { userId: user.userId, hotelId: id };
            dispatch(deleteHotel(dataDelete));
          }
        },
        {
          label: 'No'
        }
      ]
    });
  };

  useEffect(() => {
    dispatch(getHotels(user.userId));
  }, [dispatch, user]);

  const handleEdit = (hotel) => {
    dispatch(editHotel(hotel));
    navigate("/updatehotel");
  };

  return (
    <div className="h-screen">
      {err && <p className="text-red-500">{err.message}</p>}
      {user && (
        <div className="border rounded-lg mx-[1%] mt-[2%] shadow-lg">
          <div className="flex justify-between items-center content-center w-[98%]">
            <p className="text-2xl text-slate-500 my-5 ml-5">Hotel List</p>
            <button
              onClick={() => {
                navigate("/newhotel");
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
              <p className="border-l-2 px-1">Name</p>
            </div>
            <div className="w-[10%]">
              <p className="border-l-2 px-1">Type</p>
            </div>
            <div className="w-[20%]">
              <p className="border-l-2 px-1">Title</p>
            </div>
            <div className="w-[10%]">
              <p className="border-l-2 px-1">City</p>
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
                <p className="  h-full ">{hotel.name}</p>
              </div>
              <div className="w-[10%]">
                <p className=" h-full ">{hotel.type}</p>
              </div>
              <div className="w-[20%]">
                <p className=" h-full ">{hotel.title}</p>
              </div>
              <div className="py-2 w-[10%]">
                <p className="h-full ">{hotel.city}</p>
              </div>
              <div className="py-1 w-[10%] flex">
                <button
                  onClick={() => handleDelete(hotel._id)}
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
           {/* Render thông tin phân trang */}
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
      )}
     
    </div>
  );
};

export default Hotel;
