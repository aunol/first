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
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import HomeMain from "homeinside/homemain";
import HomePost from "homeinside/homepost";
import HomeTitle from "homeinside/hometitle";

function Home() {
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
      <Row>
          <Col md={12} xs={12} >
            <Card>
              <CardHeader>
              <div className="d-flex justify-content-between align-items-center">
                {/* 타이틀 */}
                <HomeTitle />
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
              
              <CardBody>
                <HomeMain />
                <HomePost />
                            
              </CardBody>
            </Card>
          </Col>
          
        </Row>
      </div>
    </>
  );
}

export default Home;
