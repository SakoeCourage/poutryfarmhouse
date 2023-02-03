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
import React,{useMemo,useState,useEffect,useContext} from 'react'
import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import { usePage } from '@inertiajs/inertia-react';
import { formatcurrency } from '../../api/Util';
import { DashboardContext } from '../../Pages/Dashboardcomponents/DashboardContext';


function EChart() {
  const { Title, Paragraph } = Typography;
  const [series, setSeries] = useState([])
  const [colors, setColors] = useState([])
  const [categories, setCategories] = useState([])
  const {dashboarData} = useContext(DashboardContext)

  const eChart = useMemo(function(){
    return {
      series: [{
          name: "Sales",
          data: series,
          color: "#fff",
      }, ],
  
      options: {
          chart: {
              type: "bar",
              width: "100%",
              height: "auto",
  
              toolbar: {
                  show: false,
              },
          },
          plotOptions: {
              bar: {
                  horizontal: false,
                  columnWidth: "55%",
                  borderRadius: 5,
              },
          },
          dataLabels: {
              enabled: false,
          },
          stroke: {
              show: true,
              width: 1,
              colors: ["transparent"],
          },
          grid: {
              show: true,
              borderColor: "#ccc",
              strokeDashArray: 2,
          },
          xaxis: {
              categories: categories,
              labels: {
                  show: true,
                  align: "right",
                  minWidth: 0,
                  maxWidth: 160,
                  style: {
                      colors: [
                          "#fff",
                          "#fff",
                          "#fff",
                          "#fff",
                          "#fff",
                          "#fff",
                          "#fff",
                          "#fff",
                          "#fff",
                          "#fff",
                          "#fff",
                          "#fff",
                          "#fff",
                      ],
                  },
              },
          },
          yaxis: {
              labels: {
                  show: true,
                  align: "right",
                  minWidth: 0,
                  maxWidth: 160,
                  style: {
                      colors: [
                          "#fff",
                          "#fff",
                          "#fff",
                          "#fff",
                          "#fff",
                          "#fff",
                          "#fff",
                          "#fff",
                          "#fff",
                          "#fff",
                          "#fff",
                          "#fff",
                      ],
                  },
              },
          },
  
          tooltip: {
              y: {
                  formatter: function(val) {
                      return formatcurrency(val);
                  },
              },
          },
      },
  };
  }, [series,categories])

  function getTotalUnits(definitions){
      let CumulatedUnits = 0
    for (const { units } of Object.values(definitions)) {

      CumulatedUnits += units
  }
  return new Intl.NumberFormat('en', { notation: 'compact' }).format(CumulatedUnits)
  }

  useEffect(() => {
      if(dashboarData){
        const{categories,data} = dashboarData.e_chart
        setCategories(categories)
        setSeries(Object.values(data))
      }
  }, [dashboarData])
  

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Sales this year - {new Date().getFullYear()}</Title>
        <Paragraph className="lastweek">
          Aggregated Sales over the year
        </Paragraph>
        <Row gutter>
          {Object.entries(dashboarData?.productSales).map((sale,i)=>{
            return(   <Col key={i} xs={6} xl={6} sm={6} md={6} >
              <div className="chart-visitor-count">
                <Title level={4}>{sale[0]}</Title>
                <span>{getTotalUnits(sale[1])} units</span>
              </div>
            </Col>)
          })}
        </Row>
      </div>
    </>
  );
}

export default EChart;
