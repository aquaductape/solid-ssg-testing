import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import $ from "jquery";
import jQueryFusionCharts from "jquery-fusioncharts";
import { onMount } from "solid-js";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

Charts(FusionCharts); // Resolve Charts as dependency for FusionCharts.
FusionTheme(FusionCharts); // Resolve Fusion theme as dependency for FusionCharts
jQueryFusionCharts(FusionCharts); // Resolve FusionCharts as dependency for jqueryFusionCharts

const chartConfig = {
  type: "column2d",
  width: "600",
  height: "400",
  dataFormat: "json",
  dataSource: {
    chart: {
      caption: "Countries With Most Oil Reserves [2017-18]",
      subCaption: "In MMbbl = One Million barrels",
      xAxisName: "Country",
      yAxisName: "Reserves (MMbbl)",
      numberSuffix: "K",
      theme: "fusion",
    },
    data: [
      {
        label: "Venezuela",
        value: "290",
      },
      {
        label: "Saudi",
        value: "260",
      },
      {
        label: "Canada",
        value: "180",
      },
      {
        label: "Iran",
        value: "140",
      },
      {
        label: "Russia",
        value: "115",
      },
      {
        label: "UAE",
        value: "100",
      },
      {
        label: "US",
        value: "30",
      },
      {
        label: "China",
        value: "30",
      },
    ],
  },
};

const FusionTimeChart = () => {
  onMount(() => {
    //@ts-ignore
    $("#chart-container").insertFusionCharts(chartConfig);
  });
  return <div id="chart-container"></div>;
};

export default FusionTimeChart;
