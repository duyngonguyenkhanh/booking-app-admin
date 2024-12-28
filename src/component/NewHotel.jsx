import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addHotel } from "../redux/thunk/addHotel";
import { useNavigate } from "react-router-dom";

const NewHotel = () => {
  const [hotelData, setHotelData] = useState({
    name: "",
    type: "",
    city: "",
    address: "",
    distance: "",
    photos: "",
    desc: "",
    title: "",
    featured: false,
    rooms: "",
    cheapestPrice: "",
  });

  //Hàm chuyển hướng
  const navigate = useNavigate()

  const user = useSelector((state) => state.admin.user || []);
  const { status, err} = useSelector((state) => state.admin.resAddHotel);

  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHotelData({
      ...hotelData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  //hàm tạo ra id ngẫu nhiên
  const generateRandomId = () => {
    return [...Array(24)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");
  };

  const validateForm = () => {
    const {
      name,
      type,
      city,
      address,
      distance,
      photos,
      desc,
      title,
      rooms,
      cheapestPrice,
    } = hotelData;

    if (
      !name ||
      !type ||
      !city ||
      !address ||
      !distance ||
      !photos ||
      !desc ||
      !title ||
      !rooms ||
      !cheapestPrice
    ) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Xử lý số lượng phòng và tạo ID ngẫu nhiên
    const numberOfRooms = parseInt(hotelData.rooms, 10);
    if (isNaN(numberOfRooms) || numberOfRooms <= 0) {
      setError("Please enter a valid number for rooms.");
      return;
    }

    const generatedRoomIds = Array.from({ length: numberOfRooms }, () =>
      generateRandomId()
    );

    // Tạo object với các ID phòng đã tạo
    const newDateHotel = {
      userId: user.userId,
      hotelData: {
        ...hotelData,
        rooms: generatedRoomIds, // Thay thế rooms bằng mảng ID phòng đã tạo
      },
    };


    // Validate all fields before submitting
    if (!validateForm()) {
      setError("Please fill in all required fields.");
      return;
    }

    dispatch(addHotel(newDateHotel));

    navigate('/');
  };

  return (
    <div className="h-screen">
     <div className="w-full mt-5">
      <p className="text-xl text-gray-300 border rounded-lg shadow-md font-bold mx-4 my-4 pl-4">
        Add New Product
      </p>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form
        onSubmit={handleSubmit}
        className="mx-4 px-3 border rounded-lg shadow-md"
      >
        <div className="flex justify-between w-full">
          <div className="mb-4 w-[40%]">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={hotelData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border-b"
              required
            />
          </div>

          <div className="mb-4 w-[40%]">
            <label className="block text-gray-700">Type</label>
            <select
              name="type"
              value={hotelData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border-b"
              required
            >
              <option value="">Select Type</option>
              <option value="Hotel">Hotel</option>
              <option value="Apartments">Apartments</option>
              <option value="Resorts">Resorts</option>
              <option value="Villas">Villas</option>
              <option value="Cabins">Cabins</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between w-full">
          <div className="mb-4 w-[40%]">
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={hotelData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border-b"
              required
            />
          </div>

          <div className="mb-4 w-[40%]">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={hotelData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border-b"
              required
            />
          </div>
        </div>

        <div className="flex justify-between w-full">
          <div className="mb-4 w-[40%]">
            <label className="block text-gray-700">
              Distance (from city center)
            </label>
            <input
              type="text"
              name="distance"
              value={hotelData.distance}
              onChange={handleChange}
              className="w-full px-3 py-2 border-b"
              required
            />
          </div>

          <div className="mb-4 w-[40%]">
            <label className="block text-gray-700">Photos (URL)</label>
            <input
              type="text"
              name="photos"
              value={hotelData.photos}
              onChange={handleChange}
              className="w-full px-3 py-2 border-b"
              required
            />
          </div>
        </div>

        <div className="flex justify-between w-full">
          <div className="mb-4 w-[40%]">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="desc"
              value={hotelData.desc}
              onChange={handleChange}
              className="w-full px-3 py-2 border-b"
              required
            />
          </div>

          <div className="mb-4 w-[40%]">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={hotelData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border-b"
              required
            />
          </div>
        </div>

        <div className="flex justify-between w-full">
          <div className="mb-4 w-[40%]">
            <label className="block text-gray-700">
              Rooms (Enter quantity for example 1 or 2 or 3)
            </label>
            <input
              type="number"
              name="rooms"
              value={hotelData.rooms}
              onChange={handleChange}
              className="w-full px-3 py-2 border-b"
              required
              min="1" // Đảm bảo rằng người dùng không nhập số âm hoặc 0
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Featured</label>
            <input
              type="checkbox"
              name="featured"
              checked={hotelData.featured}
              onChange={handleChange}
              className="mr-2 leading-tight"
            />
            <span>Featured Hotel</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Cheapest Price</label>
          <input
            type="number"
            name="cheapestPrice"
            value={hotelData.cheapestPrice}
            onChange={handleChange}
            className="w-full px-3 py-2 border"
            required
          />
        </div>

        <button
          type="submit"
          className="w bg-green-600 text-white py-2 px-4 rounded"
        >
          Send
        </button>
      </form>
    </div>
    </div>
  );
};

export default NewHotel;
