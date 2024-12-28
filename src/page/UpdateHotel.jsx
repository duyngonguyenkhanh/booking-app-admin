import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateHotel } from "../redux/thunk/updateHotel";
import { useNavigate } from "react-router-dom";

const UpdateHotel = () => {
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
    cheapestPrice: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const user = useSelector((state) => state.admin.user || []);
  const dataEdit = useSelector((state) => state.admin.editHotel.dataEdit);
  const { status, err } = useSelector((state) => state.admin.dataUpdateHotel);

  

  //Trạng thái lỗi từ redux store

  useEffect(() => {
    if (dataEdit) {
      setHotelData(dataEdit);
    }
  }, [dataEdit]);

  // Lắng nghe trạng thái từ Redux để hiển thị thông báo
  useEffect(() => {
    if (status === "successful") {
      setSuccess("Cập nhật khách sạn thành công!");
      setError(""); // Xóa thông báo lỗi nếu thành công
    } else if (status === "failed") {
      setError(err || "Cập nhật khách sạn thất bại!");
      setSuccess(""); // Xóa thông báo thành công nếu thất bại
    }
  }, [status, err]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Khi người dùng thay đổi, cập nhật giá trị trong hotelData
    setHotelData({
      ...hotelData,
      [name]: type === "checkbox" ? checked : value,
    });
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
      cheapestPrice,
    } = hotelData;

    // Kiểm tra các trường bắt buộc đã được điền chưa
    if (
      !name ||
      !type ||
      !city ||
      !address ||
      !distance ||
      !photos ||
      !desc ||
      !title ||
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

    // Tạo object với các ID phòng đã tạo
    const newDateHotel = {
      userId: user.userId,
      hotelId: dataEdit._id,
      updateData: hotelData,
    };

    // Validate all fields before submitting
    if (!validateForm()) {
      setError("Please fill in all required fields.");
      return;
    }

    dispatch(updateHotel(newDateHotel));

    navigate("/hotel");
  };

  return (
    <>
      <div className="w-full mt-5">
        <p className="text-xl text-gray-300 border rounded-lg shadow-md font-bold mx-4 my-4 pl-4">
          Edit Product
        </p>

        {error && (
          <p className="text-red-500">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </p>
        )}
        {success && (
          <p className="text-green-500">
            {typeof success === "string" ? success : JSON.stringify(success)}
          </p>
        )}

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
            Edit
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateHotel;
