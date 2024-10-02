import { useMemo } from "react";



// react-chartjs-2 components
import { Bar } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// HorizontalBarChart configurations
import configs from "examples/Charts/BarCharts/HorizontalBarChart/configs";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";

function HorizontalBarChart({
  title = "", // Giá trị mặc định cho title
  description = "", // Giá trị mặc định cho description
  height = "19.125rem", // Giá trị mặc định cho height
  chart,
}) {
  const chartDatasets = chart.datasets
    ? chart.datasets.map((dataset) => ({
        ...dataset,
        weight: 5,
        borderWidth: 0,
        borderRadius: 4,
        backgroundColor: colors[dataset.color]
          ? colors[dataset.color || "dark"].main
          : colors.dark.main,
        fill: false,
        maxBarThickness: 35,
      }))
    : [];

  const { data, options } = configs(chart.labels || [], chartDatasets);

  const renderChart = (
    <SoftBox p={2}>
      {title || description ? (
        <SoftBox px={description ? 1 : 0} pt={description ? 1 : 0}>
          {title && (
            <SoftBox mb={1}>
              <SoftTypography variant="h6">{title}</SoftTypography>
            </SoftBox>
          )}
          <SoftBox mb={2}>
            <SoftTypography component="div" variant="button" fontWeight="regular" color="text">
              {description}
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      ) : null}
      {useMemo(
        () => (
          <SoftBox height={height}>
            <Bar data={data} options={options} />
          </SoftBox>
        ),
        [chart, height]
      )}
    </SoftBox>
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}



export default HorizontalBarChart;
