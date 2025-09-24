import { useEffect, useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../store/user/updateProfileSlice";
import { getProfile } from "../../store/user/getProfileSlice";
import toast from "react-hot-toast";


function BtnUpdateProfile() {
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    classLevel: "",
  });
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  // --- Event Handlers ---
  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // --- Event update profile ---
  const handleUpdate = async (e) => {
    e.preventDefault();
    let { fullName, email, phoneNumber, classLevel } = form;
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
      const res = await dispatch(
        updateProfile({
          fullName,
          email,
          phoneNumber,
          classLevel,
        })
      ).unwrap();
      if (res.status == 200) {
        setUpdate(false);
        dispatch(getProfile());
        setError("");
        setForm("");
        toast.success("Updated success");
      }
    } catch (err) {
      setError(err);
    }
  };
  return (
    <>
      {/** btn update */}
      <button
        onClick={() => setUpdate(true)}
        className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-[15px] md:text-[20px] font-medium text-green-400 inset-ring inset-ring-green-500/20 cursor-pointer"
      >
        Update profile
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
                  value={form.fullName}
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
                  value={form.email}
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
                  value={form.phoneNumber}
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
                  value={form.classLevel}
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
    </>
  );
}

export default BtnUpdateProfile;
