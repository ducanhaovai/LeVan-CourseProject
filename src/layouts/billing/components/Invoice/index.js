// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function Invoice({ date, id, price, noGutter }) {
  return (
    <SoftBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pr={1}
      mb={noGutter ? 0 : 1}
    >
      {/* Hiển thị ngày và mã hóa đơn */}
      <SoftBox lineHeight={1}>
        <SoftTypography display="block" variant="button" fontWeight="medium">
          {date}
        </SoftTypography>
        <SoftTypography variant="caption" fontWeight="regular" color="text">
          {id}
        </SoftTypography>
      </SoftBox>

      {/* Hiển thị giá và nút tải xuống PDF */}
      <SoftBox display="flex" alignItems="center">
        <SoftTypography variant="button" fontWeight="regular" color="text">
          {price}
        </SoftTypography>
        <SoftBox
          display="flex"
          alignItems="center"
          lineHeight={0}
          ml={3}
          sx={{ cursor: "pointer" }} // Sửa lỗi typo ở đây
          onClick={() => alert(`Downloading PDF for invoice ID: ${id}`)} // Có thể thêm sự kiện click nếu cần
        >
          <Icon fontSize="small">picture_as_pdf</Icon>
          <SoftTypography variant="button" fontWeight="bold">
            &nbsp;PDF
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </SoftBox>
  );
}

export default Invoice;
