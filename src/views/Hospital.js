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
import React from "react";

// reactstrap components
import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

//kakao map
import Kakao from "variables/kakao";


// reactstrap components
import {
  Alert,
  CardTitle
} from "reactstrap";

// core components

const MapWrapper = () => {
  const mapRef = React.useRef(null);
  React.useEffect(() => {
    let google = window.google;
    let map = mapRef.current;
    let lat = "40.748817";
    let lng = "-73.985428";
    const myLatlng = new google.maps.LatLng(lat, lng);
    const mapOptions = {
      zoom: 13,
      center: myLatlng,
      scrollwheel: false,
      zoomControl: true,
      styles: [
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#e9e9e9" }, { lightness: 17 }],
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }, { lightness: 20 }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [{ color: "#ffffff" }, { lightness: 17 }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ color: "#ffffff" }, { lightness: 29 }, { weight: 0.2 }],
        },
        {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [{ color: "#ffffff" }, { lightness: 18 }],
        },
        {
          featureType: "road.local",
          elementType: "geometry",
          stylers: [{ color: "#ffffff" }, { lightness: 16 }],
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }, { lightness: 21 }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [{ color: "#dedede" }, { lightness: 21 }],
        },
        {
          elementType: "labels.text.stroke",
          stylers: [
            { visibility: "on" },
            { color: "#ffffff" },
            { lightness: 16 },
          ],
        },
        {
          elementType: "labels.text.fill",
          stylers: [
            { saturation: 36 },
            { color: "#333333" },
            { lightness: 40 },
          ],
        },
        { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [{ color: "#f2f2f2" }, { lightness: 19 }],
        },
        {
          featureType: "administrative",
          elementType: "geometry.fill",
          stylers: [{ color: "#fefefe" }, { lightness: 20 }],
        },
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [{ color: "#fefefe" }, { lightness: 17 }, { weight: 1.2 }],
        },
      ],
    };

    map = new google.maps.Map(map, mapOptions);

    const marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      animation: google.maps.Animation.DROP,
      title: "Now UI Dashboard React!",
    });

    const contentString =
      '<div class="info-window-content"><h2>Now UI Dashboard React</h2>' +
      "<p>A free Admin for React, Reactstrap, and React Hooks.</p></div>";

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    google.maps.event.addListener(marker, "click", function () {
      infowindow.open(map, marker);
    });
  });
  return (
    <>
      <div style={{ height: `100%` }} ref={mapRef}></div>
    </>
  );
};

function FullScreenMap() {
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md={8} xs={12} >
            <Card>
              <CardHeader>
                <CardTitle tag="h4">병원 찾기</CardTitle>
              </CardHeader>
              <CardBody>
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
          <Col md={4} xs={12}>
          <Card>
              <CardHeader>
                <CardTitle tag="h4">Notification states</CardTitle>
              </CardHeader>
              <CardBody>
                <Alert color="primary" isOpen={true} toggle={() => {}}>
                  <span>
                    <b> Primary - </b> This is a regular notification made with
                    color="primary"
                  </span>
                </Alert>
                <Alert color="info" isOpen={true} toggle={() => {}}>
                  <span>
                    <b> Info - </b> This is a regular notification made with
                    color="info"
                  </span>
                </Alert>
                <Alert color="success" isOpen={true} toggle={() => {}}>
                  <span>
                    <b> Success - </b> This is a regular notification made with
                    color="success"
                  </span>
                </Alert>
                <Alert color="warning" isOpen={true} toggle={() => {}}>
                  <span>
                    <b> Warning - </b> This is a regular notification made with
                    color="warning"
                  </span>
                </Alert>
                <Alert color="danger" isOpen={true} toggle={() => {}}>
                  <span>
                    <b> Danger - </b> This is a regular notification made with
                    color="danger"
                  </span>
                </Alert>
              </CardBody>
            </Card>

          </Col>
        </Row>
      </div>
    </>
  );
}

export default FullScreenMap;
