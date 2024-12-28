import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateRoom } from "../redux/thunk/editRoom";

const UpdateRoom = () => {
  const user = useSelector((state) => state.admin.user || []);

  const dataEditRoom = useSelector((state) => state.admin.resEditRoom.dataEdit || []);
  const statusEditRoom = useSelector((state) => state.admin.resEditRoom.statusEdit || '');

  
  const [roomData, setRoomlData] = useState(dataEditRoom);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (statusEditRoom === "successful") {
      navigate("/room");
    }
  }, [statusEditRoom, navigate]);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRoomlData({
      ...roomData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const { title, desc, price, maxPeople } = roomData;

    if (!title || !desc || !price || !maxPeople) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Tạo object với các ID phòng đã tạo
    const dataUpdate = {
      userId: user.userId,
      roomId: dataEditRoom._id,
      roomData: roomData,
    };


   dispatch(updateRoom(dataUpdate));


    // Validate all fields before submitting
    if (!validateForm()) {
      setError("Please fill in all required fields.");
      return;
    }

    //dispatch(addRoom(newDateRoom));
  };

  return (
    <>
      <div className="w-full mt-5">
        <p className="text-xl text-gray-300 border rounded-lg shadow-md font-bold mx-4 my-4 pl-4">
          Add New Product
        </p>

        {error && <p className="text-red-500">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="mx-4 px-3 border rounded-lg shadow-md"
        >
          <div className="flex justify-between w-full">
            <div className="mb-4 w-[40%]">
              <label className="block text-gray-700">Tilte</label>
              <input
                type="text"
                name="title"
                value={roomData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b"
                required
              />
            </div>

            <div className="mb-4 w-[40%]">
              <label className="block text-gray-700">Decription</label>
              <input
                type="text"
                name="desc"
                value={roomData.desc}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b"
                required
              />
            </div>
          </div>
          <div className="flex justify-between w-full">
            <div className="mb-4 w-[40%]">
              <label className="block text-gray-700">Price</label>
              <input
                type="text"
                name="price"
                value={roomData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b"
                required
              />
            </div>

            <div className="mb-4 w-[40%]">
              <label className="block text-gray-700">Max People</label>
              <input
                type="text"
                name="maxPeople"
                value={roomData.maxPeople}
                onChange={handleChange}
                className="w-full px-3 py-2 border-b"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w bg-green-600 text-white py-2 px-4 rounded"
          >
            Edit
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateRoom;
