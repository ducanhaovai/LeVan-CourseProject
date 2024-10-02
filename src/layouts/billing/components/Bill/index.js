// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

function Bill({ name, company, email, vat, noGutter }) {
  return (
    <SoftBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor="grey-100"
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <SoftBox width="100%" display="flex" flexDirection="column">
        {/* Header: Tên và các nút thao tác */}
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {name}
          </SoftTypography>

          {/* Nút chỉnh sửa và xóa */}
          <SoftBox
            display="flex"
            alignItems="center"
            mt={{ xs: 2, sm: 0 }}
            ml={{ xs: -1.5, sm: 0 }}
          >
            <SoftBox mr={1}>
              <SoftButton variant="text" color="error">
                <Icon>delete</Icon>&nbsp;delete
              </SoftButton>
            </SoftBox>
            <SoftButton variant="text" color="dark">
              <Icon>edit</Icon>&nbsp;edit
            </SoftButton>
          </SoftBox>
        </SoftBox>

        {/* Thông tin hóa đơn */}
        <Information label="Company Name" value={company} />
        <Information label="Email Address" value={email} />
        <Information label="VAT Number" value={vat} />
      </SoftBox>
    </SoftBox>
  );
}

// Component con: hiển thị thông tin với label và value
function Information({ label, value }) {
  return (
    <SoftBox mb={1} lineHeight={0}>
      <SoftTypography variant="caption" color="text">
        {label}:&nbsp;&nbsp;&nbsp;
        <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
          {value}
        </SoftTypography>
      </SoftTypography>
    </SoftBox>
  );
}



export default Bill;
