{/* <NavbarToggler onClick={toggle}>
<span className="navbar-toggler-bar navbar-kebab" />
<span className="navbar-toggler-bar navbar-kebab" />
<span className="navbar-toggler-bar navbar-kebab" />
</NavbarToggler>
<Collapse isOpen={isOpen} navbar className="justify-content-end">
<form>
  <InputGroup className="no-border" style={{}}>
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
  <div style={{ display: 'flex', flexWrap: 'nowrap' }}>

    <Link to="#pablo" className="nav-link" style={{ display: 'inline-block' }}>
      <i className="now-ui-icons objects_spaceship" />
      <p>
        <span className="d-lg-none d-md-block">HOME</span>
      </p>
    </Link>

    <Link to="#pablo" className="nav-link" style={{ display: 'inline-block' }}>
      <i className="now-ui-icons location_map-big" />
      <p>
        <span className="d-lg-none d-md-block">HOSPITAL</span>
      </p>
    </Link>

    <Link to="#pablo" className="nav-link" style={{ display: 'inline-block' }}>
      <i className="now-ui-icons users_single-02" />
      <p>
        <span className="d-lg-none d-md-block">FRIENDS</span>
      </p>
    </Link>

    <Link to="#pablo" className="nav-link" style={{ display: 'inline-block' }}>
      <i className="now-ui-icons design-2_ruler-pencil" />
      <p>
        <span className="d-lg-none d-md-block">Neighbor</span>
      </p>
    </Link>

    <Link to="#pablo" className="nav-link" style={{ display: 'inline-block' }}>
      <i className="now-ui-icons media-2_sound-wave" />
      <p>
        <span className="d-lg-none d-md-block">COMMUNITY</span>
      </p>
    </Link>

    <Link to="#pablo" className="nav-link"  style={{ display: 'inline-block' }}>
      <i className="now-ui-icons ui-1_bell-53" />
      <p>
        <span className="d-lg-none d-md-block">Notifications</span>
      </p>
    </Link>


    </div>
  </NavItem>
  {/* 로그인 박스 */}



//   <Dropdown
//     nav
//     isOpen={dropdownOpen}
//     toggle={(e) => dropdownToggle(e)}
//   >              
//     <DropdownToggle caret nav>
//       <i className="now-ui-icons " />
//       <p>
//         <span className="d-lg-none d-md-block">Account</span>
//       </p>
//     </DropdownToggle>
//     <DropdownMenu right>
//         <DropdownItem tag="a" style={{ cursor: 'pointer' }}  
//           onClick={() => setLoginModal(true)}>로그인</DropdownItem>
//         <DropdownItem tag="a" style={{ cursor: 'pointer' }} 
//           onClick={() => setSignupModal(true)}>회원가입</DropdownItem>
//         <DropdownItem tag="a" style={{ cursor: 'pointer' }} 
//           onClick={() => setFindIdModal(true)}>회원아이디 찾기</DropdownItem>               

//     </DropdownMenu>
//   </Dropdown>

//   {/* <NavItem>
//     <Link to="#pablo" className="nav-link">
//       <i className="now-ui-icons users_single-02" />
//       <p>
//         <span className="d-lg-none d-md-block">Account</span>
//       </p>
//     </Link>
//   </NavItem> */}

// </Nav>
// </Collapse>
// </Container>
// </Navbar>

// {/* Login Modal */}
// <Modal isOpen={loginModal} toggle={() => setLoginModal(false)}>
// <ModalHeader toggle={() => setLoginModal(false)}>로그인</ModalHeader>
// <ModalBody>
// <form>
//   <div className="form-group">
//     <Label for="loginUserid">아이디</Label>
//     <Input type="text" name="userid" id="loginUserid" placeholder="아이디를 입력하세요" />
//   </div>
//   <div className="form-group">
//     <Label for="loginPassword">비밀번호</Label>
//     <Input type="password" name="password" id="loginPassword" placeholder="비밀번호를 입력하세요" />
//   </div>
// </form>
// </ModalBody>
// <ModalFooter>
// <Button color="primary" onClick={() => setLoginModal(false)}>로그인</Button>
// <Button color="secondary" onClick={() => setLoginModal(false)}>취소</Button>
// </ModalFooter>
// </Modal>

// {/* Signup Modal */}
// <Modal isOpen={signupModal} toggle={() => setSignupModal(false)}>
// <ModalHeader toggle={() => setSignupModal(false)}>회원가입</ModalHeader>
// <ModalBody>
// <form>
//   <div className="form-group">
//     <Label for="signupUserid">아이디</Label>
//     <Input type="text" name="userid" id="signupUserid" placeholder="아이디를 입력하세요" />
//   </div>
//   <div className="form-group">
//     <Label for="signupPassword">비밀번호</Label>
//     <Input type="password" name="password" id="signupPassword" placeholder="비밀번호를 입력하세요" />
//   </div>
//   <div className="form-group">
//     <Label for="signupcheckPassword">비밀번호 확인</Label>
//     <Input type="password" name="checkpassword" id="signupCheckpassword" placeholder="비밀번호를 다시 입력하세요" />
//   </div>
//   <div className="form-group">
//     <Label for="signupEmail">이메일</Label>
//     <Input type="email" name="email" id="signupEmail" placeholder="이메일을 입력하세요" />
//   </div>
//   <div className="form-group">
//     <Label for="signupConfirmPassword">닉네임</Label>
//     <Input type="text" name="username" id="signupUsername" placeholder="닉네임을 입력하세요" />
//   </div>
// </form>
// </ModalBody>
// <ModalFooter>
// <Button color="primary" onClick={() => setSignupModal(false)}>회원가입</Button>
// <Button color="secondary" onClick={() => setSignupModal(false)}>취소</Button>
// </ModalFooter>
// </Modal>

// {/* Find ID Modal */}
// <Modal isOpen={findIdModal} toggle={() => setFindIdModal(false)}>
// <ModalHeader toggle={() => setFindIdModal(false)}>회원아이디 찾기</ModalHeader>
// <ModalBody>
// <form>
//   <div className="form-group">
//     <Label for="findIdEmail">이메일</Label>
//     <Input type="email" name="email" id="findIdEmail" placeholder="이메일을 입력하세요" />
//   </div>
// </form>
// </ModalBody>
// <ModalFooter>
// <Button color="primary" onClick={() => setFindIdModal(false)}>아이디 찾기</Button>
// <Button color="secondary" onClick={() => setFindIdModal(false)}>취소</Button>
// </ModalFooter>
// </Modal>