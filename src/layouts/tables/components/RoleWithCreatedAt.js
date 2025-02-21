
import React from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

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

const RoleWithCreatedAt = ({ role, createdAt }) => {
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
};

export default RoleWithCreatedAt;
