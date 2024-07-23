import PerfectScrollbar from "perfect-scrollbar";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav } from "reactstrap";
import AddUser from "user/AddUser";
import FindId from "user/FindId";
import FreInfo from "user/FreInfo";
import HosInfo from "user/HosInfo";
import Login from "user/Login";
import MyInfo from "user/MyInfo";
import MyWrite from "user/MyWrite";
import PetInfo from "user/PetInfo";

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
  const [myinfoModal, setMyinfoModal] = useState(false);
  const [mywriteModal, setMywriteModal] = useState(false);
  const [petinfoModal, setPetinfoModal] = useState(false);
  const [freinfoModal, setFreinfoModal] = useState(false);
  const [hosinfoModal, setHosinfoModal] = useState(false);

  // State for login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // MyPage component
  function MyPage() {
    const [uName, setUName] = useState("");
    
    useEffect(() => {
      const castname = sessionStorage.getItem("UserName");
      if (castname) {
        setUName(castname);
      } 
    }, []);

    return (
      <DropdownItem tag="a">
        안녕하세요<br />
        {uName} 님        
      </DropdownItem>
    );
  }

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

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`} data-color={props.backgroundColor}>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          <li>
            <Dropdown nav isOpen={dropdownOpen} toggle={dropdownToggle}>
              <DropdownToggle caret nav onClick={toggleSidebar}>
                <i className={`now-ui-icons ${isSidebarOpen ? "ui-1_settings-gear-63" : "ui-1_settings-gear-63 closed"}`} />
                <span>
                  <span className="d-lg-none d-md-block" />
                  {isSidebarOpen ? "ACCOUNT" : "ACCOUNT"}
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
                  <>
                    <MyPage />
                    <DropdownItem
                      tag="a"
                      style={{ cursor: 'pointer' }}
                      onClick={handleLogout}
                    >
                      로그아웃
                    </DropdownItem>
                    <DropdownItem
                      tag="a"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setMyinfoModal(true)}
                    >
                      내 정보
                    </DropdownItem>
                    <DropdownItem
                      tag="a"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setPetinfoModal(true)}
                    >
                      내 펫정보
                    </DropdownItem>
                    <DropdownItem
                      tag="a"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setFreinfoModal(true)}
                    >
                      내 친구정보
                    </DropdownItem>
                    <DropdownItem
                      tag="a"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setHosinfoModal(true)}
                    >
                      내 병원정보
                    </DropdownItem>
                    <DropdownItem
                      tag="a"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setMywriteModal(true)}
                    >
                      내 글정보
                    </DropdownItem>
                  </>
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

        {/* MyInfo Modal */}
        <MyInfo isOpen={myinfoModal} toggle={() => setMyinfoModal(false)} />

        {/* PetInfo Modal */}
        <PetInfo isOpen={petinfoModal} toggle={() => setPetinfoModal(false)} />

        {/* FreInfo Modal */}
        <FreInfo isOpen={freinfoModal} toggle={() => setFreinfoModal(false)} />

        {/* HosInfo Modal */}
        <HosInfo isOpen={hosinfoModal} toggle={() => setHosinfoModal(false)} />

        {/* MyWrite Modal */}
        <MyWrite isOpen={mywriteModal} toggle={() => setMywriteModal(false)} />
      </div>
    </div>
  );
}

export default Sidebar;
