


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
import React, { useState } from "react";

import {
  Card,
  Col,
  Row,
  Typography,

} from "antd";

import Echart from "../components/chart/EChart";
import LineChart from "../components/chart/LineChart";
import '../assets/styles/main.css'
import '../assets/styles/responsive.css'
import StatsOverview from "./Dashboardcomponents/StatsOverview";
import ProductionOverview from "./Dashboardcomponents/ProductionOverview";
import StockOverview from "./Dashboardcomponents/StockOverview";

function Dashboard() {
  const { Title, Text } = Typography;
  return (
    <>
      <div className="container mx-auto">
        <StatsOverview />
        <Row gutter={[12, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <Echart />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart />
            </Card>
          </Col>
        </Row>
        <Row gutter={[24, 0]}>
        <Col xs={24} className="mb-24">
            <div className="w-full px-7">
            <StockOverview />
            </div>
          </Col>    
        </Row>
        <Row gutter={[24, 0]}>
          <Col xs={24} className="mb-24">
            <div className="w-full px-7">
              <ProductionOverview/>
            </div>
          </Col>    
        </Row>

      </div>
    </>
  );
}

export default Dashboard;
