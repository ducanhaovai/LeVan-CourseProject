import Modal from "@mui/material/Modal"
import Card from "@mui/material/Card"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Divider from "@mui/material/Divider"

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#000000",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 700,
      letterSpacing: 1,
    },
    h6: {
      fontWeight: 600,
      letterSpacing: 0.5,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 20px 0 rgba(0,0,0,0.05)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
        },
        containedPrimary: {
          backgroundColor: "#000000",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#333333",
          },
        },
        outlinedSecondary: {
          borderColor: "#000000",
          color: "#000000",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#000000",
        },
      },
    },
  },
})

const EditCourseModal = ({
  open,
  onClose,
  course,
  categories,
  onInputChange,
  onSectionChange,
  onContentChange,
  onAddSection,
  onRemoveSection,
  onAddContent,
  onRemoveContent,
  onSave,
}) => {
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const preview = URL.createObjectURL(file)
      onInputChange({ target: { name: "thumbnail", value: preview } })
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Modal open={open} onClose={onClose}>
        <Card
          style={{
            padding: "40px",
            margin: "40px auto",
            maxWidth: "900px",
            maxHeight: "90vh",
            overflowY: "auto",
            background: "#ffffff",
          }}
        >
          <Typography variant="h5" gutterBottom align="center" style={{ marginBottom: 40 }}>
            Edit Course
          </Typography>

          <Box mb={6}>
            <Typography variant="h6" gutterBottom>
              Basic Information
            </Typography>
            <TextField
              label="Course Title"
              name="title"
              value={course?.title || ""}
              onChange={onInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <TextField
                label="Price"
                name="price"
                type="number"
                value={course?.price || ""}
                onChange={onInputChange}
                style={{ width: "48%" }}
                margin="normal"
                variant="outlined"
              />
              <TextField
                label="Duration (hours)"
                name="duration"
                type="number"
                value={course?.duration || ""}
                onChange={onInputChange}
                style={{ width: "48%" }}
                margin="normal"
                variant="outlined"
              />
            </Box>
            <TextField
              label="Description"
              name="description"
              value={course?.description || ""}
              onChange={onInputChange}
              fullWidth
              margin="normal"
              multiline
              rows={3}
              variant="outlined"
            />
          </Box>

          <Divider style={{ margin: "32px 0" }} />

          <Box mb={6}>
            <Typography variant="h6" gutterBottom>
              Course Thumbnail
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <Button variant="outlined" component="label" style={{ marginRight: 16 }}>
                Choose Thumbnail
                <input type="file" hidden accept="image/*" onChange={handleThumbnailChange} />
              </Button>
              {course?.thumbnail && (
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt="Thumbnail Preview"
                  style={{ width: "120px", height: "120px", objectFit: "cover", borderRadius: "8px" }}
                />
              )}
            </Box>
          </Box>

          <Divider style={{ margin: "32px 0" }} />

          <Box mb={6}>
            <Typography variant="h6" gutterBottom>
              Detailed Information
            </Typography>
            <TextField
              label="Detailed Description"
              name="detailed_description"
              value={course?.detailed_description || ""}
              onChange={onInputChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
              variant="outlined"
            />
            <TextField
              label="Course Content"
              name="course_content"
              value={course?.course_content || ""}
              onChange={onInputChange}
              fullWidth
              margin="normal"
              multiline
              rows={3}
              variant="outlined"
            />
            <TextField
              label="Course Features"
              name="course_features"
              value={course?.course_features || ""}
              onChange={onInputChange}
              fullWidth
              margin="normal"
              multiline
              rows={3}
              variant="outlined"
            />
            <TextField
              label="Pricing Info"
              name="pricing_info"
              value={course?.pricing_info || ""}
              onChange={onInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Requirements"
              name="requirements"
              value={course?.requirements || ""}
              onChange={onInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Box>

          <Divider style={{ margin: "32px 0" }} />

          <Box mb={6}>
            <Typography variant="h6" gutterBottom>
              Category & Status
            </Typography>
            <Select
              name="category_id"
              value={course?.category_id || ""}
              onChange={onInputChange}
              fullWidth
              variant="outlined"
              style={{ marginBottom: 16 }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
            <FormControlLabel
              control={
                <Checkbox
                  name="status"
                  checked={course?.status === 1}
                  onChange={(e) =>
                    onInputChange({
                      target: { name: "status", value: e.target.checked ? 1 : 0 },
                    })
                  }
                />
              }
              label="Published"
            />
          </Box>

          <Divider style={{ margin: "32px 0" }} />

          <Box mb={6}>
            <Typography variant="h6" gutterBottom>
              Course Sections
            </Typography>
            {course?.sections
              ?.filter((sec) => !sec.is_deleted)
              .map((section, sectionIndex) => (
                <Card key={sectionIndex} style={{ marginBottom: 24, padding: 24, background: "#f9f9f9" }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Section {sectionIndex + 1}
                  </Typography>
                  <TextField
                    label="Section Title"
                    value={section.title || ""}
                    onChange={(e) => onSectionChange(sectionIndex, "title", e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    label="Section Description"
                    value={section.description || ""}
                    onChange={(e) => onSectionChange(sectionIndex, "description", e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={2}
                    variant="outlined"
                  />
                  <TextField
                    label="Video URL"
                    value={section.video_url || ""}
                    onChange={(e) => onSectionChange(sectionIndex, "video_url", e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={section.is_free || false}
                        onChange={(e) => onSectionChange(sectionIndex, "is_free", e.target.checked)}
                      />
                    }
                    label="Free Preview"
                  />
                  <Box mt={3}>
                    <Typography variant="subtitle2" gutterBottom>
                      Contents
                    </Typography>
                    {section.contents &&
                      section.contents.map((content, contentIndex) => (
                        <Card key={contentIndex} style={{ marginBottom: 16, padding: 16, background: "#ffffff" }}>
                          <Typography variant="body2" gutterBottom>
                            Content {contentIndex + 1}
                          </Typography>
                          <TextField
                            label="Content Title"
                            value={content.title || ""}
                            onChange={(e) => onContentChange(sectionIndex, contentIndex, "title", e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                          />
                          <TextField
                            label="Content Type"
                            value={content.content_type || ""}
                            onChange={(e) =>
                              onContentChange(sectionIndex, contentIndex, "content_type", e.target.value)
                            }
                            fullWidth
                            margin="normal"
                            variant="outlined"
                          />
                          <TextField
                            label="Content URL"
                            value={content.content_url || ""}
                            onChange={(e) => onContentChange(sectionIndex, contentIndex, "content_url", e.target.value)}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                          />
                          <TextField
                            label="Content Description"
                            value={content.description || ""}
                            onChange={(e) => onContentChange(sectionIndex, contentIndex, "description", e.target.value)}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={2}
                            variant="outlined"
                          />
                          <Button
                            variant="outlined"
                            onClick={() => onRemoveContent(sectionIndex, contentIndex)}
                            style={{ marginTop: 8 }}
                          >
                            Remove Content
                          </Button>
                        </Card>
                      ))}
                    <Button variant="outlined" onClick={() => onAddContent(sectionIndex)} style={{ marginTop: 16 }}>
                      Add Content
                    </Button>
                  </Box>
                  <Box mt={3}>
                    <Button variant="outlined" onClick={() => onRemoveSection(sectionIndex)}>
                      Remove Section
                    </Button>
                  </Box>
                </Card>
              ))}
            <Button variant="contained" onClick={onAddSection} fullWidth style={{ marginTop: 16 }}>
              Add Section
            </Button>
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button variant="contained" onClick={onSave} style={{ marginRight: 16 }}>
              Save Course
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </Card>
      </Modal>
    </ThemeProvider>
  )
}

export default EditCourseModal

