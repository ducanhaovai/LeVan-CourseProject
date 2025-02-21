
import React from "react";
import Table from "examples/Tables/Table";
import SoftAvatar from "components/SoftAvatar";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";
import RoleWithCreatedAt from "./RoleWithCreatedAt";
import Button from "@mui/material/Button";

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

const UsersTable = ({ users, onEdit, onDelete }) => {
  const columns = [
    { name: "Logo", align: "center" },
    { name: "ID", align: "center" },
    { name: "User Name", align: "center" },
    { name: "Email", align: "center" },
    { name: "Role & Created At", align: "center" },
    { name: "Status", align: "center" },
    { name: "Updated At", align: "center" },
    { name: "Last Logout", align: "center" },
    { name: "Action", align: "center" },
  ];

  const rows = users.map((user) => ({
    Logo: (
      <SoftAvatar alt={user.username} size="sm" variant="rounded">
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
      <SoftBox>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onEdit(user)}
          style={{ marginRight: 8 }}
        >
          Edit
        </Button>
        <Button variant="contained" color="secondary" onClick={() => onDelete(user.id)}>
          Delete
        </Button>
      </SoftBox>
    ),
  }));

  return <Table columns={columns} rows={rows} />;
};

export default UsersTable;
