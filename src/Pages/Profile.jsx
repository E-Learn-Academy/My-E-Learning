import { useEffect, useState } from "react";
import imgProfile from "../Components/images/profile.png";
import { TbCameraPlus } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../store/user/getProfileSlice";
import BtnUpdateProfile from "./Buttons/BtnUpdateProfile";
import BtnUpdatePassword from "./Buttons/BtnUpdatePassword";
import BtnDeleteUser from "./Buttons/BtnDeleteUser";

export const Profile = () => {
  const [img, setImg] = useState(null);
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfile());
    const savedImg = localStorage.getItem("profileImage");
    if (savedImg) setImg(savedImg);
  }, [dispatch]);

  // --- Event Handlers ---
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

        <div className="flex flex-col justify-center text-[18px] md:text-[25px] text-neutral-400 font-bold space-y-4 md:space-y-5">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <div>
              <p>
                Name : <span className="text-white">{profile.fullName}</span>
              </p>
              <p>
                Email : <span className="text-white">{profile.email}</span>
              </p>
              <p>
                Phone Number :
                <span className="text-white">{profile.phoneNumber}</span>
              </p>
              <p>
                Class Level :
                <span className="text-white">{profile.classLevel}</span>
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {/** Btn Update Profile*/}
            <BtnUpdateProfile />
            {/** Btn Update Password*/}
            <BtnUpdatePassword />
            {/** Btn Delete Account*/}
            <BtnDeleteUser />
          </div>
        </div>
      </div>
    </div>
  );
};
