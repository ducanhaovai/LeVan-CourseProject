import React from "react";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const EditCourseModal = ({
  open,
  onClose,
  course,
  categories,
  onInputChange,      // Xử lý thay đổi các trường thông tin khóa học chính
  onSectionChange,    // (sectionIndex, field, value) để cập nhật section
  onContentChange,    // (sectionIndex, contentIndex, field, value) để cập nhật content
  onAddSection,       // Hàm thêm section mới
  onRemoveSection,    // Hàm xóa section
  onAddContent,       // Hàm thêm content mới vào section
  onRemoveContent,    // Hàm xóa content
  onSave
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Card style={{ padding: "20px", margin: "40px auto", maxWidth: "800px", maxHeight: "80vh", overflowY: "auto", }}>
        <Typography variant="h5" gutterBottom>
          Edit Course
        </Typography>

        {/* Thông tin chính của khóa học */}
        <TextField
          label="Title"
          name="title"
          value={course?.title || ""}
          onChange={onInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={course?.description || ""}
          onChange={onInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={course?.price || ""}
          onChange={onInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Duration"
          name="duration"
          type="number"
          value={course?.duration || ""}
          onChange={onInputChange}
          fullWidth
          margin="normal"
        />
        <Box mt={2} mb={2}>
          <Typography variant="subtitle2">Category</Typography>
          <Select
            name="category_id"
            value={course?.category_id || ""}
            onChange={onInputChange}
            fullWidth
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Các phần (sections) của khóa học */}
        <Box mt={3}>
          <Typography variant="h6">Sections</Typography>
          {course?.sections?.filter(sec => !sec.is_deleted).map((section, sectionIndex) => (
            <Box key={sectionIndex} border={1} borderRadius="4px" padding={2} marginY={1}>
              <Typography variant="subtitle1">
                Section {sectionIndex + 1}
              </Typography>
              <TextField
                label="Section Title"
                value={section.title || ""}
                onChange={(e) =>
                  onSectionChange(sectionIndex, "title", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Section Description"
                value={section.description || ""}
                onChange={(e) =>
                  onSectionChange(sectionIndex, "description", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Video URL"
                value={section.video_url || ""}
                onChange={(e) =>
                  onSectionChange(sectionIndex, "video_url", e.target.value)
                }
                fullWidth
                margin="normal"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={section.is_free || false}
                    onChange={(e) =>
                      onSectionChange(sectionIndex, "is_free", e.target.checked)
                    }
                  />
                }
                label="Is Free"
              />

              {/* Danh sách nội dung (contents) của section */}
              <Box mt={2}>
                <Typography variant="subtitle2">Contents</Typography>
                {section.contents &&
                  section.contents.map((content, contentIndex) => (
                    <Box key={contentIndex} border={1} borderRadius="4px" padding={1} marginY={1}>
                      <Typography variant="body1">
                        Content {contentIndex + 1}
                      </Typography>
                      <TextField
                        label="Content Title"
                        value={content.title || ""}
                        onChange={(e) =>
                          onContentChange(sectionIndex, contentIndex, "title", e.target.value)
                        }
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Content Type"
                        value={content.content_type || ""}
                        onChange={(e) =>
                          onContentChange(sectionIndex, contentIndex, "content_type", e.target.value)
                        }
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Content URL"
                        value={content.content_url || ""}
                        onChange={(e) =>
                          onContentChange(sectionIndex, contentIndex, "content_url", e.target.value)
                        }
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Content Description"
                        value={content.description || ""}
                        onChange={(e) =>
                          onContentChange(sectionIndex, contentIndex, "description", e.target.value)
                        }
                        fullWidth
                        margin="normal"
                      />
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => onRemoveContent(sectionIndex, contentIndex)}
                      >
                        Remove Content
                      </Button>
                    </Box>
                  ))}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => onAddContent(sectionIndex)}
                >
                  Add Content
                </Button>
              </Box>

              <Box mt={2}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => onRemoveSection(sectionIndex)}
                >
                  Remove Section
                </Button>
              </Box>
            </Box>
          ))}
          <Button variant="contained" color="primary" onClick={onAddSection}>
            Add Section
          </Button>
        </Box>

        {/* Nút lưu và hủy */}
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button variant="contained" color="primary" onClick={onSave} style={{ marginRight: 10 }}>
            Save
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Card>
    </Modal>
  );
};

export default EditCourseModal;
