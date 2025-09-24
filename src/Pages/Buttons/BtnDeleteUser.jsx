import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../store/user/deleteUserSlice";

function BtnDeleteUser() {
  const navigate = useNavigate();
  const [detete, setDelete] = useState(false);
  const dispatch = useDispatch();

  // --- delete user ----
  const handleDelete = async () => {
    try {
      const res = await dispatch(deleteUser()).unwrap();
      if (res.status == 200) {
        localStorage.clear();
        navigate("/home", { replace: true });
        location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <button
        onClick={() => setDelete(true)}
        className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-[15px] font-medium text-red-400 inset-ring inset-ring-red-400/20 cursor-pointer"
      >
        Delete account
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
    </>
  );
}

export default BtnDeleteUser;
