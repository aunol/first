/*!

=========================================================
* Now UI Dashboard React - v1.5.2
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

//kakao map
import Kakao from "variables/kakao";

// reactstrap components
import {
  CardTitle,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

import CheckBoxList from "variables/checkBoxList";
import HospitalList from "variables/hospitalList";
import Hour24 from "variables/hour24";



function FullScreenMap() {
  return (
    <>
      <PanelHeader
        content={
          <div className="header text-center">
            <h1 className="title">Hospital</h1>
            
          </div>
        }
      />
      <div className="content">
        <Row>

        <Col md={2} xs={12} style={{ minWidth: '185px' }}>
          <Card>
              {/* 카테고리 카드 */}
              <CardHeader style={{ paddingTop: '2px', paddingBottom: '2px'}}>
                <CardTitle tag="h4">Check List</CardTitle>
              </CardHeader>

              <CardBody style={{ paddingTop: '2px', paddingBottom: '2px' }}>
               
                <CheckBoxList />
                <Hour24 />

              </CardBody>
            </Card>
             {/* 검색리스트 카드 */}
            <Card>              
              <CardHeader style={{ paddingTop: '2px', paddingBottom: '2px' }}>
              <CardTitle tag="h4">SearchList</CardTitle>
              </CardHeader>

              <CardBody style={{ paddingTop: '2px', paddingBottom: '2px' }}>
                {/* 병원리스트 */}
                <HospitalList />
                
              </CardBody>
            </Card>
          </Col> 

          <Col md={9} xs={12} >
            <Card>
              <CardHeader>
              <div className="d-flex justify-content-between align-items-center">
                {/* 타이틀 */}
                <h4 className="title">Hospital Map</h4>
                {/*  검색 */}
                <form className="flex-grow-5">
                 <InputGroup className="no-border">
                   <Input placeholder="Search..." />
                   <InputGroupAddon addonType="append">
                   <InputGroupText>
                    <i className="now-ui-icons ui-1_zoom-bold"   style={{ marginLeft: '14px'}}/>
                   </InputGroupText>
                  </InputGroupAddon>
                  </InputGroup>
                </form>
              </div>       
         

              </CardHeader>
              <CardBody >
                <div
                  id="map"
                  className="map"
                  style={{ position: "relative", overflow: "hidden" }}
                >
                 {/* 카카오 맵 삽입 */}
                 <Kakao />

                </div>
              </CardBody>
            </Card>
          </Col>
          
        </Row>
      </div>
    </>
  );
}

export default FullScreenMap;
