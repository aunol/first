import PerfectScrollbar from "perfect-scrollbar";
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Nav } from "reactstrap";

var ps;

function Sidebar(props) {
  const sidebar = React.useRef();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // State for modals
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [findIdModal, setFindIdModal] = useState(false);

  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });

  const dropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="sidebar" data-color={props.backgroundColor}>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          <li>
            <Dropdown nav isOpen={dropdownOpen} toggle={dropdownToggle}>
              <DropdownToggle caret nav>
                <i className="now-ui-icons ui-1_settings-gear-63" />
                <span>
                  <span className="d-lg-none d-md-block" />
                  Account
                </span>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem
                  tag="a"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setLoginModal(true)}
                >
                  로그인
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSignupModal(true)}
                >
                  회원가입
                </DropdownItem>
                <DropdownItem
                  tag="a"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setFindIdModal(true)}
                >
                  회원아이디 찾기
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>

          {props.routes.map((prop, key) => {
            if (prop.redirect) return null;
            return (
              <li className={activeRoute(prop.layout + prop.path)} key={key}>
                <NavLink to={prop.layout + prop.path} className="nav-link">
                  <i className={"now-ui-icons " + prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
          })}
        </Nav>

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
                <Label for="signupCheckpassword">비밀번호 확인</Label>
                <Input type="password" name="checkpassword" id="signupCheckpassword" placeholder="비밀번호를 다시 입력하세요" />
              </div>
              <div className="form-group">
                <Label for="signupEmail">이메일</Label>
                <Input type="email" name="email" id="signupEmail" placeholder="이메일을 입력하세요" />
              </div>
              <div className="form-group">
                <Label for="signupUsername">닉네임</Label>
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
    </div>
  );
}

export default Sidebar;
