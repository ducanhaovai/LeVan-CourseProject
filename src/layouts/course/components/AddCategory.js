"use client"

import { useState } from "react"
import axiosInstance from "hook/AxiosInterceptor"

const API_URL = process.env.REACT_APP_API_URL

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState("")
  const [categoryDes, setCategoryDes] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const token = localStorage.getItem("token")

  const handleSubmit = async () => {
    e.preventDefault()
    setError("")
    setSuccess("")
    try {
      await axiosInstance.post(
        `${API_URL}/courses/add-category`,
        { name: categoryName, des: categoryDes },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setSuccess("Category added successfully!")
      setCategoryName("")
      setCategoryDes("")
    } catch (err) {
      console.error("Error adding category:", err)
      setError("Failed to add category. Please try again.")
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
            Category Name
          </label>
          <input
            id="categoryName"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter category name"
          />
        </div>
        <div>
          <label htmlFor="categoryDes" className="block text-sm font-medium text-gray-700 mb-1">
            Category Description
          </label>
          <textarea
            id="categoryDes"
            value={categoryDes}
            onChange={(e) => setCategoryDes(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter category description"
            rows={3}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          Add Category
        </button>
      </form>
      {error && <div className="mt-4 text-red-600">{error}</div>}
      {success && <div className="mt-4 text-green-600">{success}</div>}
    </div>
  )
}

