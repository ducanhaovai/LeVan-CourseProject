
import React from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

const EditUserModal = ({
  open,
  onClose,
  username,
  setUsername,
  email,
  setEmail,
  role,
  setRole,
  status,
  setStatus,
  onSave,
}) => {
  return (
    <Card style={{ padding: "20px", margin: "100px auto", width: "400px" }}>
      <SoftTypography variant="h5" fontWeight="bold" mb={2}>
        Edit User
      </SoftTypography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <SoftBox display="flex" flexDirection="column" mt={2} mb={2}>
        <SoftTypography variant="subtitle2">Role</SoftTypography>
        <Select value={role} onChange={(e) => setRole(e.target.value)} fullWidth>
          <MenuItem value={1}>Admin</MenuItem>
          <MenuItem value={2}>Instructor</MenuItem>
          <MenuItem value={3}>Student</MenuItem>
        </Select>
      </SoftBox>
      <SoftBox display="flex" flexDirection="column" mt={2} mb={2}>
        <SoftTypography variant="subtitle2">Status</SoftTypography>
        <Select value={status} onChange={(e) => setStatus(e.target.value)} fullWidth>
          <MenuItem value={1}>Active</MenuItem>
          <MenuItem value={0}>Inactive</MenuItem>
        </Select>
      </SoftBox>
      <SoftBox mt={2} display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={onSave}
          style={{ marginRight: 8 }}
        >
          Save
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </SoftBox>
    </Card>
  );
};

export default EditUserModal;
