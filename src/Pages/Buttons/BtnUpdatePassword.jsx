import { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { updatePassword } from "../../store/user/updatePasswordSlice";
import toast from "react-hot-toast";

function BtnUpdatePassword() {
  const [updatePasswoed, setUpdatePassword] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    oldPass: "",
    newPass: "",
    cPass: "",
  });
  const dispatch = useDispatch();

  // --- Event Handlers ---
  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setForm((prevStat) => ({
      ...prevStat,
      [id]: value,
    }));
  };

  //--- Event update password
  const handleUpdatePass = async (e) => {
    e.preventDefault();
    const { oldPass, newPass, cPass } = form;
    if (!oldPass || !newPass || !cPass) {
      setError("Please fill in all fields.");
      return;
    }
    if (newPass !== cPass) {
      setError("Passwords do not match.");
      return;
    }
    if (newPass.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    try {
      const res = await dispatch(
        updatePassword({
          oldPass,
          newPass,
          cPass,
        })
      ).unwrap();
      if (res.status === 200) {
        setUpdatePassword(false);
        setForm("");
        setError("");
        toast.success("Success updated password ");
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
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
            {error && (
              <div
                className="bg-red-500/20 border text-[15px] border-red-500 text-red-300 px-4 py-3 rounded-md relative mb-6"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
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
                  value={form.oldPass}
                  onChange={handleOnChange}
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
                  value={form.newPass}
                  onChange={handleOnChange}
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
                  value={form.cPass}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            {/**form btn */}
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => {
                  setUpdatePassword(false);
                  setError("");
                  setForm("");
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
    </>
  );
}

export default BtnUpdatePassword;
