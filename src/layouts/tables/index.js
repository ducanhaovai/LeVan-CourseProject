import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import { fetchUsers, updateUserInfo, deleteUser } from "../../api/apiAdmin";
import SoftBadge from "components/SoftBadge";
import SoftAvatar from "components/SoftAvatar";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// Component hiển thị thông tin tác giả
function Author({ user }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox mr={2}>
        <SoftAvatar alt={user.username} size="sm" variant="rounded">
          {/* Hiển thị ký tự đầu của first_name và last_name */}
          {user.first_name[0] + user.last_name[0]}
        </SoftAvatar>
      </SoftBox>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="bold" color="black">
          {user.first_name} {user.last_name}
        </SoftTypography>
        <SoftTypography variant="caption" color="black">
          {user.email}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}

// Hàm chuyển đổi role thành tên vai trò
const getRoleName = (role) => {
  switch (role) {
    case 1:
      return "Admin";
    case 2:
      return "Instructor";
    case 3:
      return "Student";
    default:
      return "Unknown";
  }
};

// Component hiển thị Role kèm Created At
function RoleWithCreatedAt({ role, createdAt }) {
  return (
    <SoftBox display="flex" flexDirection="column">
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        Role: {getRoleName(role)}
      </SoftTypography>
      <SoftTypography variant="caption" fontWeight="medium" color="secondary">
        Created At: {new Date(createdAt).toLocaleString("en-GB")}
      </SoftTypography>
    </SoftBox>
  );
}

function Tables() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(3); // Role mặc định là Student
  const [status, setStatus] = useState(1); // Status mặc định là Active

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      setLoading(true);
      try {
        const userResponse = await fetchUsers(token || "");
        const allUsers = userResponse.data.users;
        setUsers(allUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUsername(user.username);
    setEmail(user.email);
    setRole(user.role);
    setStatus(user.status);
    setOpenEditModal(true);
  };

  const handleSaveUser = async () => {
    if (!editingUser) return;
    const token = localStorage.getItem("token");
    try {
      await updateUserInfo(editingUser.id, { username, email, role, status }, token || "");
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUser.id ? { ...user, username, email, role, status } : user
        )
      );
      setEditingUser(null);
      setOpenEditModal(false);
      alert("User info updated successfully!");
    } catch (error) {
      alert("Failed to update user info.");
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    try {
      await deleteUser(userId, token || "");
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      alert("User deleted successfully!");
    } catch (error) {
      alert("Failed to delete user.");
    }
  };

  const authorsTableData = {
    columns: [
      { name: "Logo", align: "center" },
      { name: "ID", align: "center" },
      { name: "User Name", align: "center" },
      { name: "Email", align: "center" },
      { name: "Role & Created At", align: "center" },
      { name: "Status", align: "center" },
      { name: "Updated At", align: "center" },
      { name: "Last Logout", align: "center" },
      { name: "Action", align: "center" },
    ],
    rows: users.map((user) => ({
      Logo: (
        <SoftAvatar alt={user.username} size="sm" variant="rounded">
          {/* Thay đổi màu chữ logo thành màu đen */}
          <SoftTypography variant="caption" color="black">
            {user.first_name[0] + user.last_name[0]}
          </SoftTypography>
        </SoftAvatar>
      ),
      ID: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          {user.id}
        </SoftTypography>
      ),
      "User Name": (
        <SoftTypography variant="caption" color="black" fontWeight="bold">
          {user.username}
        </SoftTypography>
      ),
      Email: (
        <SoftTypography variant="caption" color="black" fontWeight="medium">
          {user.email}
        </SoftTypography>
      ),
      "Role & Created At": <RoleWithCreatedAt role={user.role} createdAt={user.created_at} />,
      Status: (
        <SoftBadge
          variant="gradient"
          badgeContent={user.status === 1 ? "Active" : "Inactive"}
          color={user.status === 1 ? "success" : "error"}
          size="xs"
          container
        />
      ),
      "Updated At": (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {new Date(user.updated_at).toLocaleString("en-GB")}
        </SoftTypography>
      ),
      "Last Logout": (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {user.last_logout ? new Date(user.last_logout).toLocaleString("en-GB") : "Never"}
        </SoftTypography>
      ),
      Action: (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleEditUser(user)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button variant="contained" color="secondary" onClick={() => handleDeleteUser(user.id)}>
            Delete
          </Button>
        </div>
      ),
    })),
  };

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox py={3}>
          <SoftTypography variant="h4" color="text">
            Loading...
          </SoftTypography>
        </SoftBox>
        <Footer />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">User Table</SoftTypography>
          </SoftBox>
          <Table columns={authorsTableData.columns} rows={authorsTableData.rows} />
        </Card>
      </SoftBox>

      {/* Modal Chỉnh Sửa */}
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Card style={{ padding: "20px", margin: "100px auto", width: "400px" }}>
          <h2>Edit User</h2>
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveUser}
            style={{ marginRight: 8 }}
          >
            Save
          </Button>
          <Button variant="contained" color="secondary" onClick={() => setOpenEditModal(false)}>
            Cancel
          </Button>
        </Card>
      </Modal>

      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
