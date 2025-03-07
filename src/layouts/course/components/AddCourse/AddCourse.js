"use client";

import { useState, useEffect } from "react";
import { fetchInstructors, createCourse, uploadCourseImage } from "../../../../api/apiAdmin";
import axiosInstance from "../../../../hook/AxiosInterceptor";

const API_URL = process.env.REACT_APP_API_URL;

export default function AddCourse() {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    category_id: "",
    instructor_id: "",
    status: 1,
    thumbnail: "",
    detailed_description: "",
    course_content: "",
    course_features: "",
    pricing_info: "",
    requirements: "",
    sections: [],
    top: 0,
  });
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [activeTab, setActiveTab] = useState("basic");
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // file ảnh khóa học
  const [previewURL, setPreviewURL] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, instructorsData] = await Promise.all([
          axiosInstance.get(`${API_URL}/courses/category`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetchInstructors(token),
        ]);
        setCategories(categoriesResponse.data);
        setInstructors(instructorsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý thay đổi file cho ảnh khóa học (courseImage)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
  };

  // Xử lý thay đổi cho section
  const handleSectionChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newSections = [...course.sections];
    newSections[index] = {
      ...newSections[index],
      [name]: type === "checkbox" ? checked : value,
    };
    // Nếu chưa có contents thì khởi tạo
    if (!newSections[index].contents) {
      newSections[index].contents = [];
    }
    setCourse((prev) => ({ ...prev, sections: newSections }));
  };

  // Xử lý thay đổi cho content
  const handleContentChange = (sectionIndex, contentIndex, e) => {
    const { name, value } = e.target;
    const newSections = [...course.sections];
    if (!newSections[sectionIndex].contents) {
      newSections[sectionIndex].contents = [];
    }
    newSections[sectionIndex].contents[contentIndex] = {
      ...newSections[sectionIndex].contents[contentIndex],
      [name]: value,
    };
    setCourse((prev) => ({ ...prev, sections: newSections }));
  };

  // Đổi tên hàm từ handlePdfFileChange thành handleDocumentFileChange
  // để nhất quán với "document"
  const handleDocumentFileChange = (sectionIndex, contentIndex, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const newSections = [...course.sections];
    if (!newSections[sectionIndex].contents) {
      newSections[sectionIndex].contents = [];
    }
    // Lưu vào thuộc tính documentFile
    newSections[sectionIndex].contents[contentIndex] = {
      ...newSections[sectionIndex].contents[contentIndex],
      documentFile: file,
    };
    setCourse((prev) => ({ ...prev, sections: newSections }));
  };

  // Khi thêm section, gán order = sections.length + 1
  const addSection = () => {
    setCourse((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          title: "",
          description: "",
          video_url: "",
          is_free: false,
          order: prev.sections.length + 1,
          contents: [],
        },
      ],
    }));
  };

  const removeSection = (sectionIndex) => {
    setCourse((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, index) => index !== sectionIndex),
    }));
  };

  // Khi thêm content, gán order_index = contents.length + 1
  const addContent = (sectionIndex) => {
    const newSections = [...course.sections];
    if (!newSections[sectionIndex].contents) {
      newSections[sectionIndex].contents = [];
    }
    newSections[sectionIndex].contents.push({
      content_type: "",
      content_url: "",
      title: "",
      description: "",
      order_index: newSections[sectionIndex].contents.length + 1,
    });
    setCourse((prev) => ({ ...prev, sections: newSections }));
  };

  const removeContent = (sectionIndex, contentIndex) => {
    const newSections = [...course.sections];
    if (newSections[sectionIndex].contents) {
      newSections[sectionIndex].contents.splice(contentIndex, 1);
    }
    setCourse((prev) => ({ ...prev, sections: newSections }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      // Tạo FormData
      const formData = new FormData();
      formData.append("title", course.title);
      formData.append("description", course.description);
      formData.append("price", course.price);
      formData.append("duration", course.duration);
      formData.append("category_id", course.category_id);
      formData.append("instructor_id", course.instructor_id);
      formData.append("status", course.status);
      formData.append("detailed_description", course.detailed_description);
      formData.append("course_content", course.course_content);
      formData.append("course_features", course.course_features);
      formData.append("pricing_info", course.pricing_info);
      formData.append("requirements", course.requirements);
      formData.append("top", course.top);

      // Loại bỏ documentFile khỏi sections trước khi stringify
      const clonedSections = course.sections.map((section) => ({
        ...section,
        contents: section.contents
          ? section.contents.map((content) => {
              // Tách documentFile ra
              const { documentFile, ...rest } = content;
              return rest;
            })
          : [],
      }));
      formData.append("sections", JSON.stringify(clonedSections));

      // Ảnh khóa học (nếu có)
      if (selectedFile) {
        formData.append("courseImage", selectedFile);
      }

      // Append file "document" cho các content
      course.sections.forEach((section) => {
        if (section.contents && section.contents.length > 0) {
          section.contents.forEach((content) => {
            // Thay "pdf" thành "document"
            if (content.content_type === "document" && content.documentFile) {
              // Append với key "documentFile"
              formData.append("documentFile", content.documentFile);
            }
          });
        }
      });

      // Gửi request
      const response = await axiosInstance.post(`${API_URL}/courses/course-sections`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Course created:", response.data);
      setUploading(false);
      // Sau khi tạo thành công, reset hoặc điều hướng
    } catch (error) {
      console.error("Error creating course:", error);
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Create New Course</h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex border-b">
            <button
              type="button"
              className={`flex-1 py-4 px-6 text-sm font-medium ${
                activeTab === "basic" ? "bg-blue-500 text-white" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("basic")}
            >
              Basic Info
            </button>
            <button
              type="button"
              className={`flex-1 py-4 px-6 text-sm font-medium ${
                activeTab === "sections" ? "bg-blue-500 text-white" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("sections")}
            >
              Sections & Content
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6">
            {activeTab === "basic" && (
              <div className="space-y-6">
                {/* Basic Fields */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Course Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={course.title}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Short Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    value={course.description}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  ></textarea>
                </div>
                {/* Detailed Fields */}
                <div>
                  <label htmlFor="detailed_description" className="block text-sm font-medium text-gray-700">
                    Detailed Description
                  </label>
                  <textarea
                    id="detailed_description"
                    name="detailed_description"
                    rows="4"
                    value={course.detailed_description || ""}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter a detailed description of the course..."
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="course_content" className="block text-sm font-medium text-gray-700">
                    Course Content
                  </label>
                  <textarea
                    id="course_content"
                    name="course_content"
                    rows="3"
                    value={course.course_content || ""}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Outline the course curriculum or topics..."
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="course_features" className="block text-sm font-medium text-gray-700">
                    Course Features
                  </label>
                  <textarea
                    id="course_features"
                    name="course_features"
                    rows="3"
                    value={course.course_features || ""}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="List the key features or benefits of the course..."
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="pricing_info" className="block text-sm font-medium text-gray-700">
                    Pricing & Materials Info
                  </label>
                  <textarea
                    id="pricing_info"
                    name="pricing_info"
                    rows="2"
                    value={course.pricing_info || ""}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="E.g. Tuition fee, extra materials cost, etc."
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
                    Requirements
                  </label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    rows="2"
                    value={course.requirements || ""}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="E.g. prerequisites, equipment needed, etc."
                  ></textarea>
                </div>
                {/* Price, Duration, Category, Instructor, Thumbnail, Status */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={course.price}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      id="duration"
                      name="duration"
                      value={course.duration}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      id="category_id"
                      name="category_id"
                      value={course.category_id}
                      onChange={handleChange}
                      className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="instructor_id" className="block text-sm font-medium text-gray-700">
                      Instructor
                    </label>
                    <select
                      id="instructor_id"
                      name="instructor_id"
                      value={course.instructor_id}
                      onChange={handleChange}
                      className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Select Instructor</option>
                      {instructors.map((inst) => (
                        <option key={inst.id} value={inst.id}>
                          {inst.username}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">
                    Thumbnail
                  </label>
                  <input
                    type="file"
                    name="courseImage"
                    id="thumbnail"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
                      file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100"
                  />
                  {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
                  {previewURL && (
                    <div className="mt-2">
                      <img src={previewURL} alt="Thumbnail Preview" className="h-32" />
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="top" className="block text-sm font-medium text-gray-700">
                    Top Course
                  </label>
                  <input
                    type="checkbox"
                    id="top"
                    name="top"
                    checked={course.top === 1}
                    onChange={(e) =>
                      setCourse((prev) => ({ ...prev, top: e.target.checked ? 1 : 0 }))
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={course.status}
                    onChange={handleChange}
                    className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value={1}>Active</option>
                    <option value={2}>Inactive</option>
                    <option value={3}>Suspended</option>
                  </select>
                </div>
              </div>
            )}
            {activeTab === "sections" && (
              <div className="space-y-6">
                {/* Sections & Content */}
                {course.sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Section {sectionIndex + 1} {section.title ? `- ${section.title}` : ""}
                    </h3>
                    {/* Hiển thị thứ tự của section (read-only) */}
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Order
                      </label>
                      <input
                        type="number"
                        name="order"
                        value={section.order}
                        readOnly
                        className="mt-1 block w-full border border-gray-300 rounded-md bg-gray-100 py-2 px-3 sm:text-sm"
                      />
                    </div>
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="title"
                        value={section.title || ""}
                        onChange={(e) => handleSectionChange(sectionIndex, e)}
                        placeholder="Section Title"
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <textarea
                        name="description"
                        value={section.description || ""}
                        onChange={(e) => handleSectionChange(sectionIndex, e)}
                        placeholder="Section Description"
                        rows="2"
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      ></textarea>
                      <input
                        type="text"
                        name="video_url"
                        value={section.video_url || ""}
                        onChange={(e) => handleSectionChange(sectionIndex, e)}
                        placeholder="Video URL"
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id={`is_free_${sectionIndex}`}
                          name="is_free"
                          checked={section.is_free || false}
                          onChange={(e) => handleSectionChange(sectionIndex, e)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor={`is_free_${sectionIndex}`} className="ml-2 block text-sm text-gray-900">
                          Is Free
                        </label>
                      </div>
                      <h4 className="font-medium text-gray-900 mt-4 mb-2">Contents</h4>
                      {section.contents && section.contents.length > 0 ? (
                        section.contents.map((content, contentIndex) => (
                          <div key={contentIndex} className="bg-white p-3 rounded-md shadow-sm space-y-3">
                            <input
                              type="text"
                              name="title"
                              value={content.title || ""}
                              onChange={(e) => handleContentChange(sectionIndex, contentIndex, e)}
                              placeholder="Content Title"
                              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            <select
                              name="content_type"
                              value={content.content_type || ""}
                              onChange={(e) => handleContentChange(sectionIndex, contentIndex, e)}
                              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                              <option value="">Select Content Type</option>
                              <option value="video">Video</option>
                              <option value="document">Document</option>
                            </select>
                            {/* Nếu content_type là document => hiển thị input file */}
                            {content.content_type === "document" && (
                              <input
                                type="file"
                                name="documentFile"
                                onChange={(e) => handleDocumentFileChange(sectionIndex, contentIndex, e)}
                                className="block w-full text-sm text-gray-500
                                  file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
                                  file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700
                                  hover:file:bg-blue-100"
                              />
                            )}
                            {/* Nếu content_type là video => hiển thị input link */}
                            {content.content_type === "video" && (
                              <input
                                type="text"
                                name="content_url"
                                value={content.content_url || ""}
                                onChange={(e) => handleContentChange(sectionIndex, contentIndex, e)}
                                placeholder="Content URL (Video link)"
                                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                              />
                            )}
                            <textarea
                              name="description"
                              value={content.description || ""}
                              onChange={(e) => handleContentChange(sectionIndex, contentIndex, e)}
                              placeholder="Content Description"
                              rows="2"
                              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            ></textarea>
                            {/* Thứ tự content (read-only) */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Order Index
                              </label>
                              <input
                                type="number"
                                name="order_index"
                                value={content.order_index}
                                readOnly
                                className="mt-1 block w-full border border-gray-300 rounded-md bg-gray-100 py-2 px-3 sm:text-sm"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeContent(sectionIndex, contentIndex)}
                              className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Remove Content
                            </button>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">No content added yet.</p>
                      )}
                      <button
                        type="button"
                        onClick={() => addContent(sectionIndex)}
                        className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Add Content
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSection(sectionIndex)}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Remove Section
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSection}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Section
                </button>
              </div>
            )}
            <div className="mt-8">
              <button
                type="submit"
                disabled={uploading}
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {uploading ? "Uploading..." : "Create Course"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
