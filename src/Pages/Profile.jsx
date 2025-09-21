import axios from "axios";
import { useEffect, useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  AcademicCapIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import imgProfile from "../Components/images/profile.png";
import { TbCameraPlus } from "react-icons/tb";

export const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = JSON.parse(localStorage.getItem("user"))?.id;
  const profileUrl = "https://edu-master-psi.vercel.app/user/";
  const profileUpdateUrl = `https://edu-master-psi.vercel.app/user/${userId}`;
  const updatePassUrl =
    "https://edu-master-psi.vercel.app/user/update-password";
  const deleteUser = "https://edu-master-psi.vercel.app/user/";
  const [profile, setProfile] = useState("");
  const [updatePasswoed, setUpdatePassword] = useState(false);
  const [update, setUpdate] = useState(false);
  const [detete, setDelete] = useState(false);
  const [img, setImg] = useState(null);
  const [error, setError] = useState("");
  const [errorPass, setErrorPass] = useState("");
  const [formUpdatePass, setformUpdatePass] = useState({
    oldPass: "",
    newPass: "",
    cPass: "",
  });
  const [formUpdate, setFormUpdate] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    classLevel: "",
  });

  // --- delete user ---
  const handleDelete = async () => {
    try {
      const res = await axios.delete(deleteUser, {
        headers: { token },
      });
      if (res.status == 200) {
        localStorage.clear();
        navigate("/home", { replace: true });
        location.reload();
      }
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };
  // --- Event Handlers ---
  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setFormUpdate((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleOnChangePass = (e) => {
    const { id, value } = e.target;
    setformUpdatePass((prevStat) => ({
      ...prevStat,
      [id]: value,
    }));
  };

  const handleImgOnChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgUrl = reader.result;
        setImg(imgUrl);
        localStorage.setItem("profileImage", imgUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Event update profile ---
  const handleUpdate = async (e) => {
    e.preventDefault();
    let { fullName, email, phoneNumber, classLevel } = formUpdate;
    if (!fullName) {
      fullName = profile.fullName;
    }
    if (!email) {
      email = profile.email;
    }
    if (!phoneNumber) {
      phoneNumber = profile.phoneNumber;
    }
    if (!classLevel) {
      classLevel = profile.classLevel;
    }
    try {
      const res = await axios.put(
        profileUpdateUrl,
        {
          fullName: fullName,
          email: email,
          phoneNumber: phoneNumber,
          classLevel: classLevel,
        },
        {
          headers: { token },
        }
      );
      if (res.status == 200) {
        getApiProfile();
        setUpdate(false);
      }
    } catch (err) {
      const errMessage = err.response?.data?.message;
      setError(errMessage);
    }
  };

  //--- Event update password
  const handleUpdatePass = async (e) => {
    e.preventDefault();
    const { oldPass, newPass, cPass } = formUpdatePass;
    if (!oldPass || !newPass || !cPass) {
      setErrorPass("Please fill in all fields.");
      return;
    }
    if (newPass !== cPass) {
      setErrorPass("Passwords do not match.");
      return;
    }
    if (newPass.length < 8) {
      setErrorPass("Password must be at least 8 characters long.");
      return;
    }
    try {
      const res = await axios.patch(
        updatePassUrl,
        {
          oldPassword: oldPass,
          newPassword: newPass,
          cpassword: cPass,
        },
        {
          headers: { token },
        }
      );
      if (res.status == 200) {
        setUpdatePassword(false);
        setformUpdatePass("");
        setErrorPass("");
      }
    } catch (err) {
      const errMessagePass = err.response?.data?.message;
      console.log(errMessagePass);
      setErrorPass(errMessagePass);
    }
  };

  // --- get profile ---
  const getApiProfile = () => {
    axios
      .get(profileUrl, {
        headers: { token },
      })
      .then((res) => setProfile(res.data.data))
      .then((res) => console.log(res.data.data))
      .catch((err) => {
        if (err.response) {
          console.error(
            "Request failed:",
            err.response.status,
            err.response.data
          );
        }
      });
  };

  useEffect(() => {
    getApiProfile();
    const savedImg = localStorage.getItem("profileImage");
    if (savedImg) setImg(savedImg);
  }, []);

  return (
    <div className="h-screen bg-[#1f2641] text-white flex items-center md:items-end">
      <div className="container mx-auto h-auto md:h-[550px] grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 rounded-4xl mb-5 shadow-2xl/50 p-4">
        {/** profil photo */}
        <div className="flex flex-col justify-center items-center space-y-4">
          <img
            src={img ? img : imgProfile}
            alt="#"
            className="w-[150px] h-[150px] md:w-[250px] md:h-[250px] object-cover rounded-full"
          />
          <div className="w-auto h-auto">
            <label htmlFor="inputImg">
              <TbCameraPlus className="text-[30px] cursor-pointer ml-[100px] mt-[-45px] md:ml-[150px]" />
            </label>
            <input
              id="inputImg"
              type="file"
              className="hidden"
              onChange={handleImgOnChange}
            />
          </div>
        </div>

        {/**users profile */}
        <div className="flex flex-col justify-center text-[18px] md:text-[25px] text-neutral-400 font-bold space-y-4 md:space-y-5">
          <p>
            Name : <span className="text-white">{profile.fullName}</span>
          </p>
          <p>
            Email : <span className="text-white">{profile.email}</span>
          </p>
          <p>
            Phone Number :{" "}
            <span className="text-white">{profile.phoneNumber}</span>
          </p>
          <p>
            Class Level :{" "}
            <span className="text-white">{profile.classLevel}</span>
          </p>

          {/** btn delete */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setDelete(true)}
              className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-[15px] font-medium text-red-400 inset-ring inset-ring-red-400/20 cursor-pointer"
            >
              Delete
            </button>

            {detete && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
                <div className="rounded-lg bg-gray-800 p-6 shadow-lg w-full max-w-md">
                  <h1 className="text-white mb-4">
                    Are you sure you want to delete your account?
                  </h1>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setDelete(false)}
                      className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="inline-flex items-center rounded-md bg-red-400/10 text-sm px-3 py-2 font-medium text-red-400 inset-ring inset-ring-red-400/20 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/** btn update */}
            <button
              onClick={() => setUpdate(true)}
              className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-[15px] md:text-[20px] font-medium text-green-400 inset-ring inset-ring-green-500/20 cursor-pointer"
            >
              Update
            </button>

            {update && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
                <form
                  onSubmit={handleUpdate}
                  className="rounded-lg bg-gray-800 p-6 shadow-lg w-full max-w-md"
                >
                  {/* Error Message */}
                  {error && (
                    <div
                      className="bg-red-500/20 border text-[15px] border-red-500 text-red-300 px-4 py-3 rounded-md relative mb-6"
                      role="alert"
                    >
                      <span className="block sm:inline">{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-6">
                    {/* Full Name */}
                    <div className="relative">
                      <UserIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
                      <input
                        id="fullName"
                        type="text"
                        placeholder="Full Name"
                        className="w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e85a4f] focus:border-transparent transition duration-300"
                        value={formUpdate.fullName}
                        onChange={handleOnChange}
                      />
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
                      <input
                        id="email"
                        type="email"
                        placeholder="Email Address"
                        className="w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e85a4f] focus:border-transparent transition duration-300"
                        value={formUpdate.email}
                        onChange={handleOnChange}
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="relative">
                      <DevicePhoneMobileIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
                      <input
                        id="phoneNumber"
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e85a4f] focus:border-transparent transition duration-300"
                        value={formUpdate.phoneNumber}
                        onChange={handleOnChange}
                      />
                    </div>

                    {/* Class Level */}
                    <div className="relative">
                      <AcademicCapIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
                      <input
                        id="classLevel"
                        type="text"
                        placeholder="Class Level"
                        className="w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e85a4f] focus:border-transparent transition duration-300"
                        value={formUpdate.classLevel}
                        onChange={handleOnChange}
                      />
                    </div>
                  </div>

                  {/**form btn */}
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => setUpdate(false)}
                      className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-sm font-medium text-green-400 inset-ring inset-ring-green-500/20 cursor-pointer"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/** btn update Password */}
            <button
              onClick={() => setUpdatePassword(true)}
              className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-[15px] md:text-[20px] font-medium text-green-400 inset-ring inset-ring-green-500/20 cursor-pointer"
            >
              Update Password
            </button>

            {updatePasswoed && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
                <form
                  onSubmit={handleUpdatePass}
                  className="rounded-lg bg-gray-800 p-6 shadow-lg w-full max-w-md"
                >
                  {/* ErrorPass Message */}
                  {errorPass && (
                    <div
                      className="bg-red-500/20 border text-[15px] border-red-500 text-red-300 px-4 py-3 rounded-md relative mb-6"
                      role="alert"
                    >
                      <span className="block sm:inline">{errorPass}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-6">
                    {/* old Password */}
                    <div className="relative">
                      <LockClosedIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
                      <input
                        id="oldPass"
                        type="password"
                        placeholder="Old Password"
                        className="w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e85a4f] focus:border-transparent transition duration-300"
                        value={formUpdatePass.oldPass}
                        onChange={handleOnChangePass}
                      />
                    </div>

                    {/* new Password */}
                    <div className="relative">
                      <LockClosedIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
                      <input
                        id="newPass"
                        type="password"
                        placeholder="New Password"
                        className="w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e85a4f] focus:border-transparent transition duration-300"
                        value={formUpdatePass.newPass}
                        onChange={handleOnChangePass}
                      />
                    </div>

                    {/* Confirm Password */}
                    <div className="relative">
                      <LockClosedIcon className="h-5 w-5 text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
                      <input
                        id="cPass"
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full pl-10 pr-3 py-3 bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e85a4f] focus:border-transparent transition duration-300"
                        value={formUpdatePass.cPass}
                        onChange={handleOnChangePass}
                      />
                    </div>
                  </div>

                  {/**form btn */}
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => {
                        setUpdatePassword(false);
                        setErrorPass("");
                        setformUpdatePass("");
                      }}
                      className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-sm font-medium text-green-400 inset-ring inset-ring-green-500/20 cursor-pointer"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
