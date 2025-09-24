import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../context/AuthenticationContext";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddExam({ onCreated }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      duration: 10,
      classLevel: "",
      startDate: "",
      endDate: "",
      isPublished: true,
    },
  });

  const [serverError, setServerError] = useState(null);

  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const onSubmit = async (formData) => {
    setServerError(null);

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      duration: Number(formData.duration),
      classLevel: formData.classLevel.trim(),
      startDate: formData.startDate, // ex: "2025-10-22"
      endDate: formData.endDate,
      isPublished: !!formData.isPublished,
    };

    try {
      const { data } = await axios.post(
        "https://edu-master-psi.vercel.app/exam",
        payload,
        {
          headers: { token: `${token}` },
        }
      );
      console.log(data.data);

      toast.success("Exam Add Successfully ");

      navigate("/ListExam");

      reset();
      if (typeof onCreated === "function") onCreated(data?.data || data);
    } catch (err) {
      console.error("Add exam error:", err?.response?.data || err);
      setServerError(err?.response?.data?.message || "حدث خطأ أثناء الإضافة");
    }
  };

  return (
    <div
      style={{
        padding: "80px",
        backgroundColor: "rgb(240, 240, 240)",
        minHeight: "100vh",
      }}
    >
      <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Add New Exam</h2>

        {serverError && (
          <div className="mb-4 text-red-700 bg-red-100 border border-red-200 p-3 rounded">
            {serverError}
          </div>
        )}

       

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              {...register("title", { required: "العنوان مطلوب" })}
              className={`w-full border rounded px-3 py-2 focus:outline-none ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="e.g. english kg1"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              {...register("description", { required: "الوصف مطلوب" })}
              rows={3}
              className={`w-full border rounded px-3 py-2 focus:outline-none ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Final exam covering english kg1"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Duration */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Duration (minutes)
              </label>
              <input
                type="number"
                {...register("duration", {
                  required: "المدة مطلوبة",
                  min: {
                    value: 1,
                    message: "المدة لازم تكون على الأقل دقيقة واحدة",
                  },
                })}
                className={`w-full border rounded px-3 py-2 focus:outline-none ${
                  errors.duration ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.duration && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.duration.message}
                </p>
              )}
            </div>

            {/* Class Level */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Class Level
              </label>
              <input
                {...register("classLevel", { required: "المستوى مطلوب" })}
                className={`w-full border rounded px-3 py-2 focus:outline-none ${
                  errors.classLevel ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Grade 1 Secondary"
              />
              {errors.classLevel && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.classLevel.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Start Date
              </label>
              <input
                type="date"
                {...register("startDate", { required: "تاريخ البداية مطلوب" })}
                className={`w-full border rounded px-3 py-2 focus:outline-none ${
                  errors.startDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                {...register("endDate", { required: "تاريخ الانتهاء مطلوب" })}
                className={`w-full border rounded px-3 py-2 focus:outline-none ${
                  errors.endDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.endDate.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                {...register("isPublished")}
                defaultChecked
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm">Is Published</span>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
            >
              {isSubmitting ? "جاري الإضافة..." : "Add Exam"}
            </button>

            <button
              type="button"
              onClick={() => {
                reset();
                setServerError(null);
                //  setSuccessMsg(null);
              }}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
