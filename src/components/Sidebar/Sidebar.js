import PerfectScrollbar from "perfect-scrollbar";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav } from "reactstrap";
import dashRoutes from "routes";
import AddUser from "user/AddUser";
import FindId from "user/FindId";
import Login from "user/Login";

var ps;

function Sidebar(props) {
  const sidebar = useRef();
  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 사이드바 상태 관리

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

  // Toggle dropdown menu
  const dropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  // Handle logout logic
  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.clear();
    setIsLoggedIn(false);
  };

  // Filter routes based on login status
  const filteredRoutes = isLoggedIn
    ? dashRoutes
    : dashRoutes.filter(route => route.name !== "ACCOUNT");

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`} data-color={props.backgroundColor}>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {isLoggedIn && (
            <li className="nav-item" style={{ marginBottom: '10px' }}>
              <NavLink to="/" className="nav-link" onClick={handleLogout}>
                <i className="now-ui-icons ui-1_simple-remove" />
                <p>LOG OUT</p>
              </NavLink>
            </li>
          )}

          {!isLoggedIn && (
            
            <li>
              <Dropdown nav isOpen={dropdownOpen} toggle={dropdownToggle}>
                <DropdownToggle caret nav onClick={toggleSidebar}>
                  <i className={`now-ui-icons ${isSidebarOpen ? "ui-1_settings-gear-63" : "ui-1_settings-gear-63 closed"}`} />
                  <span>
                    <span className="d-lg-none d-md-block" />
                    ACCOUNT
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
            
          )}
         


          {filteredRoutes.map((prop, key) => {
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
