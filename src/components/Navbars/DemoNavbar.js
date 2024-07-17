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
import { Link, useLocation } from "react-router-dom";
import {
  Button,
  Collapse,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem
} from "reactstrap";

import { useState } from "react";

import routes from "routes.js";

function DemoNavbar(props) {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");

 // State for modals
 const [loginModal, setLoginModal] = useState(false);
 const [signupModal, setSignupModal] = useState(false);
 const [findIdModal, setFindIdModal] = useState(false);

  const sidebarToggle = React.useRef();
  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("white");
    }
    setIsOpen(!isOpen);
  };
  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen);
  };
  const getBrand = () => {
    var name;
    routes.map((prop, key) => {
      if (prop.collapse) {
        prop.views.map((prop, key) => {
          if (prop.path === location.pathname) {
            name = prop.name;
          }
          return null;
        });
      } else {
        if (prop.redirect) {
          if (prop.path === location.pathname) {
            name = prop.name;
          }
        } else {
          if (prop.path === location.pathname) {
            name = prop.name;
          }
        }
      }
      return null;
    });
    return name;
  };
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("white");
    } else {
      setColor("transparent");
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateColor);
  }, []);
  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);


  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    <div>
    <Navbar
      color={
        location.pathname.indexOf("full-screen-maps") !== -1 ? "white" : color
      }
      expand="lg"
      className={
        location.pathname.indexOf("full-screen-maps") !== -1
          ? "navbar-absolute fixed-top"
          : "navbar-absolute fixed-top " +
            (color === "transparent" ? "navbar-transparent " : "")
      }
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <NavbarBrand href="/">{getBrand()}</NavbarBrand>
        </div>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <form>
            <InputGroup className="no-border">
              <Input placeholder="Search..." />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="now-ui-icons ui-1_zoom-bold"   style={{ marginLeft: '14px'}}/>
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </form>
          <Nav navbar>
            <NavItem>
              <Link to="#pablo" className="nav-link">
                <i className="now-ui-icons media-2_sound-wave" />
                <p>
                  <span className="d-lg-none d-md-block">Stats</span>
                </p>
              </Link>
            </NavItem>
            {/* 로그인 박스 */}
            <Dropdown
              nav
              isOpen={dropdownOpen}
              toggle={(e) => dropdownToggle(e)}
            >              
              <DropdownToggle caret nav>
                <i className="now-ui-icons users_single-02" />
                <p>
                  <span className="d-lg-none d-md-block">Account</span>
                </p>
              </DropdownToggle>
              <DropdownMenu right>
                  <DropdownItem tag="a" style={{ cursor: 'pointer' }}  
                    onClick={() => setLoginModal(true)}>로그인</DropdownItem>
                  <DropdownItem tag="a" style={{ cursor: 'pointer' }} 
                    onClick={() => setSignupModal(true)}>회원가입</DropdownItem>
                  <DropdownItem tag="a" style={{ cursor: 'pointer' }} 
                    onClick={() => setFindIdModal(true)}>회원아이디 찾기</DropdownItem>               

              </DropdownMenu>
            </Dropdown>

            {/* <NavItem>
              <Link to="#pablo" className="nav-link">
                <i className="now-ui-icons users_single-02" />
                <p>
                  <span className="d-lg-none d-md-block">Account</span>
                </p>
              </Link>
            </NavItem> */}

          </Nav>
        </Collapse>
      </Container>
    </Navbar>

      {/* Login Modal */}
      <Modal isOpen={loginModal} toggle={() => setLoginModal(false)}>
        <ModalHeader toggle={() => setLoginModal(false)}>로그인</ModalHeader>
        <ModalBody>
          <form>
            <div className="form-group">
              <Label for="loginUserid">아이디</Label>
              <Input type="text" name="userid" id="loginUserid" placeholder="아이디를 입력하세요" />
            </div>
            <div className="form-group">
              <Label for="loginPassword">비밀번호</Label>
              <Input type="password" name="password" id="loginPassword" placeholder="비밀번호를 입력하세요" />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setLoginModal(false)}>로그인</Button>
          <Button color="secondary" onClick={() => setLoginModal(false)}>취소</Button>
        </ModalFooter>
      </Modal>

      {/* Signup Modal */}
      <Modal isOpen={signupModal} toggle={() => setSignupModal(false)}>
        <ModalHeader toggle={() => setSignupModal(false)}>회원가입</ModalHeader>
        <ModalBody>
          <form>
            <div className="form-group">
              <Label for="signupUserid">아이디</Label>
              <Input type="text" name="userid" id="signupUserid" placeholder="아이디를 입력하세요" />
            </div>
            <div className="form-group">
              <Label for="signupPassword">비밀번호</Label>
              <Input type="password" name="password" id="signupPassword" placeholder="비밀번호를 입력하세요" />
            </div>
            <div className="form-group">
              <Label for="signupcheckPassword">비밀번호 확인</Label>
              <Input type="password" name="checkpassword" id="signupCheckpassword" placeholder="비밀번호를 다시 입력하세요" />
            </div>
            <div className="form-group">
              <Label for="signupEmail">이메일</Label>
              <Input type="email" name="email" id="signupEmail" placeholder="이메일을 입력하세요" />
            </div>
            <div className="form-group">
              <Label for="signupConfirmPassword">닉네임</Label>
              <Input type="text" name="username" id="signupUsername" placeholder="닉네임을 입력하세요" />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setSignupModal(false)}>회원가입</Button>
          <Button color="secondary" onClick={() => setSignupModal(false)}>취소</Button>
        </ModalFooter>
      </Modal>

      {/* Find ID Modal */}
      <Modal isOpen={findIdModal} toggle={() => setFindIdModal(false)}>
        <ModalHeader toggle={() => setFindIdModal(false)}>회원아이디 찾기</ModalHeader>
        <ModalBody>
          <form>
            <div className="form-group">
              <Label for="findIdEmail">이메일</Label>
              <Input type="email" name="email" id="findIdEmail" placeholder="이메일을 입력하세요" />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setFindIdModal(false)}>아이디 찾기</Button>
          <Button color="secondary" onClick={() => setFindIdModal(false)}>취소</Button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default DemoNavbar;
