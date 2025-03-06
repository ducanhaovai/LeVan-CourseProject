"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import EditCourseModal from "./edit-course-modal"

export default function CourseManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    thumbnail: "",
    detailed_description: "",
    course_content: "",
    course_features: "",
    pricing_info: "",
    requirements: "",
    category_id: "",
    status: 1,
    sections: [],
  })

  const [categories, setCategories] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCourse((prev) => ({ ...prev, [name]: value }))
  }

  const handleSectionChange = (sectionIndex, field, value) => {
    setCourse((prev) => {
      const updatedSections = [...prev.sections]
      updatedSections[sectionIndex] = {
        ...updatedSections[sectionIndex],
        [field]: value,
      }
      return { ...prev, sections: updatedSections }
    })
  }

  const handleContentChange = (sectionIndex, contentIndex, field, value) => {
    setCourse((prev) => {
      const updatedSections = [...prev.sections]
      updatedSections[sectionIndex].contents[contentIndex] = {
        ...updatedSections[sectionIndex].contents[contentIndex],
        [field]: value,
      }
      return { ...prev, sections: updatedSections }
    })
  }

  const handleAddSection = () => {
    setCourse((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          title: "",
          description: "",
          video_url: "",
          is_free: false,
          contents: [],
        },
      ],
    }))
  }

  const handleRemoveSection = (sectionIndex) => {
    setCourse((prev) => {
      const updatedSections = [...prev.sections]
      updatedSections[sectionIndex] = {
        ...updatedSections[sectionIndex],
        is_deleted: true,
      }
      return { ...prev, sections: updatedSections }
    })
  }

  const handleAddContent = (sectionIndex) => {
    setCourse((prev) => {
      const updatedSections = [...prev.sections]
      updatedSections[sectionIndex].contents = [
        ...updatedSections[sectionIndex].contents,
        {
          title: "",
          content_type: "",
          content_url: "",
          description: "",
        },
      ]
      return { ...prev, sections: updatedSections }
    })
  }

  const handleRemoveContent = (sectionIndex, contentIndex) => {
    setCourse((prev) => {
      const updatedSections = [...prev.sections]
      updatedSections[sectionIndex].contents = updatedSections[sectionIndex].contents.filter(
        (_, i) => i !== contentIndex,
      )
      return { ...prev, sections: updatedSections }
    })
  }

  const handleSave = () => {
    setIsModalOpen(false)
  }

  return (

      <EditCourseModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={course}
        categories={categories}
        onInputChange={handleInputChange}
        onSectionChange={handleSectionChange}
        onContentChange={handleContentChange}
        onAddSection={handleAddSection}
        onRemoveSection={handleRemoveSection}
        onAddContent={handleAddContent}
        onRemoveContent={handleRemoveContent}
        onSave={handleSave}
      />
  )
}
