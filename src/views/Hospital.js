import PanelHeader from 'components/PanelHeader/PanelHeader.js';
import { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import CheckBoxList from 'variables/checkBoxList';
import HospitalList from 'variables/hospitalList';
import Hour24 from 'variables/hour24';
import Kakao from 'variables/kakao';

export const hour24Rows = [
  { id: 0, name: '24시간' },
  { id: 1, name: '2차병원' }
];

export const speciesRows = [
  { id: 0, name: '강아지' },
  { id: 1, name: '고양이' },
  { id: 2, name: '특수포유류' },
  { id: 3, name: '파충류' },
  { id: 4, name: '조류' },
  { id: 5, name: '어류' }
];

export const hospitals = [
  { name: '병원A', address: '주소A', department: '강아지', hours: '24시간',  phone:'123'},
  { name: '병원B', address: '주소B', department: '고양이', hours: '2차병원', phone:'234'}
];

function FullScreenMap() {
  const [selectedHours, setSelectedHours] = useState(new Set());
  const [selectedSpecies, setSelectedSpecies] = useState(new Set());

  const handleHourChange = (selectedNames) => {
    setSelectedHours(new Set(selectedNames));
  };

  const handleSpeciesChange = (selectedNames) => {
    setSelectedSpecies(new Set(selectedNames));
  };

  const filterHospitals = () => {
    return hospitals.filter(hospital =>
      (selectedHours.size === 0 || selectedHours.has(hospital.hours)) &&
      (selectedSpecies.size === 0 || selectedSpecies.has(hospital.department))
    );
  };

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
              <CardHeader style={{ paddingTop: '5px', paddingBottom: '2px' }} />
              <CardBody style={{ paddingTop: '2px', paddingBottom: '2px' }}>
                <CheckBoxList onChange={handleSpeciesChange} />
                <Hour24 onChange={handleHourChange} />
              </CardBody>
            </Card>
            {/* 검색리스트 카드 */}
            <Card>
              <CardHeader style={{ paddingTop: '5px', paddingBottom: '2px' }} />
              <CardBody style={{ paddingTop: '2px', paddingBottom: '2px' }}>
                {/* 병원리스트 */}
                <HospitalList hospitals={filterHospitals()} />
              </CardBody>
            </Card>
          </Col>
          <Col md={9} xs={12}>
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
                          <i className="now-ui-icons ui-1_zoom-bold" style={{ marginLeft: '14px' }} />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </form>
                </div>
              </CardHeader>
              <CardBody>
                <div id="map" className="map" style={{ position: 'relative', overflow: 'hidden' }}>
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
