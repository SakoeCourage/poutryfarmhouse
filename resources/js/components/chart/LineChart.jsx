/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { useEffect, useState, useMemo } from 'react'
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { usePage } from '@inertiajs/inertia-react';


function LineChart() {
  const { Title, Paragraph } = Typography;
  const [series, setSeries] = useState([])
  const [colors, setColors] = useState([])
  const [categories, setCategories] = useState([])

  const lineChart = useMemo(function () {
    return {
      series:series,

      options: {
        chart: {
          width: "100%",
          height: 350,
          type: "area",
          toolbar: {
            show: false,
          },
        },

        legend: {
          show: false,
        },

        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },

        yaxis: {
          labels: {
            style: {
              fontSize: "14px",
              fontWeight: 600,
              colors: ["#8c8c8c"],
            },
          },
        },

        xaxis: {
          labels: {
            style: {
              fontSize: "14px",
              fontWeight: 600,
              colors: [
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
                "#8c8c8c",
              ],
            },
          },
          categories:categories,
        },

        tooltip: {
          y: {
            formatter: function (val) {
              return new Intl.NumberFormat().format(val);
            },
          },
        },
      },
    };
  }, [series,categories])

  const { line_chart } = usePage().props

  useEffect(() => {
    setCategories(line_chart.categories)
    setSeries(Object.values(line_chart.series))
  }, [line_chart])

  useEffect(() => {
    console.log(series)
  }, [series])
  


  


  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Weekly sales overview</Title>
          <Paragraph className="lastweek">
            Units of each products sold this week
          </Paragraph>
        </div>
        <div className="sales">
        <ul>
              {series.map((item,i )=><li key={i}>{<MinusOutlined />} {item.name}</li>
              )}
       </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
