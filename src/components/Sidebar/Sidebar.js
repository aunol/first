import PerfectScrollbar from "perfect-scrollbar";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav } from "reactstrap";
import AddUser from "user/AddUser";
import FindId from "user/FindId";
import Login from "user/Login";

var ps;

function Sidebar(props) {
  const sidebar = useRef();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // State for modals
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [findIdModal, setFindIdModal] = useState(false);

  // State for login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Active route function
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  // Initialize PerfectScrollbar and check login status on mount
  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    // Cleanup PerfectScrollbar on unmount
    return () => {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  }, []);

  // Check login status when component mounts
  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true");
  }, []);

  // Handle logout logic
  const handleLogout = () => {
    // Clear session storage and update login state
    sessionStorage.clear();
    setIsLoggedIn(false);
  };

  // Toggle dropdown menu
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
                {!isLoggedIn ? (
                  <>
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
                  </>
                ) : (
                  <DropdownItem
                    tag="a"
                    style={{ cursor: 'pointer' }}
                    onClick={handleLogout}
                  >
                    로그아웃
                  </DropdownItem>
                )}
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
        <Login isOpen={loginModal} toggle={() => setLoginModal(false)} />

        {/* Add User Modal */}
        <AddUser isOpen={signupModal} toggle={() => setSignupModal(false)} />

        {/* Find ID Modal */}
        <FindId isOpen={findIdModal} toggle={() => setFindIdModal(false)} />
      </div>
    </div>
  );
}

export default Sidebar;
