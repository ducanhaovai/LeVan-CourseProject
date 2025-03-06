import React, { useEffect, useState } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import Modal from "@mui/material/Modal";
import { fetchUsers, updateUserInfo, deleteUser } from "../../api/apiAdmin";
import UsersTable from "./components/UsersTable";
import EditUserModal from "./components/EditUserModal";

const Tables = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  // Các trường để edit user
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(3);
  const [status, setStatus] = useState(1);

  // **State cho tính năng tìm kiếm**
  const [searchQuery, setSearchQuery] = useState("");

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
        setError("Error fetching data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Lọc danh sách người dùng dựa trên searchQuery (theo username hoặc email)
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

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
        prevUsers.map((u) =>
          u.id === editingUser.id
            ? { ...u, username, email, role, status }
            : u
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
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
      alert("User deleted successfully!");
    } catch (error) {
      alert("Failed to delete user.");
    }
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
          <SoftBox display="flex" flexDirection="column" p={3}>
            <SoftTypography variant="h6" mb={2}>
              User Table
            </SoftTypography>

            {/* Thay vì form HTML tĩnh, ta dùng input control để search */}
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50
                           focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600
                           dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                value={searchQuery}           
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800
                           focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2
                           dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
               
              >
                Search
              </button>
            </div>
          </SoftBox>

          {/* Bao bọc bảng trong container với max-height để cuộn */}
          <div style={{ maxHeight: "500px", overflowY: "auto" }}>
            <UsersTable users={filteredUsers} onEdit={handleEditUser} onDelete={handleDeleteUser} />
          </div>
        </Card>
      </SoftBox>

      <Modal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        aria-labelledby="edit-user-modal"
        aria-describedby="modal-to-edit-user-information"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            outline: 0,
          }}
        >
          <EditUserModal
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            role={role}
            setRole={setRole}
            status={status}
            setStatus={setStatus}
            onSave={handleSaveUser}
          />
        </div>
      </Modal>

      <Footer />
    </DashboardLayout>
  );
};

export default Tables;
