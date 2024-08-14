import axios from 'axios';
import { createUrl } from "layouts/createUrl";
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'reactstrap';

const FriendsDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [friendsData, setFriendsData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Get UserNO from sessionStorage
  const userNo = sessionStorage.getItem('UserNo');

  // API 호출 함수
  const fetchFriends = async () => {
    const fullUrl = createUrl('friendsList');
    try {
      const friendsResponse = await axios.get(fullUrl, {
        params: { userNo },
        headers: { 'Content-Type': 'application/json' }
      });

      // API에서 받아온 데이터를 쉼표로 분리하여 배열로 변환
      const friendsArray = friendsResponse.data.split(',');
      setFriendsData(friendsArray);

    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      fetchFriends();
    }
  }, [dropdownOpen]);

  return (
    
      <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown} style={{padding:'0px', margin:'0px'}}>
        <DropdownToggle caret nav onClick={toggleSidebar} style={{padding:'0px', margin:'0px'}}> 
                  
                   <h1> FRIENDS </h1>
                 
        </DropdownToggle>

        <DropdownMenu right>
          {friendsData.length > 0 ? (
            friendsData.map((friend, index) => (
              <DropdownItem key={index} tag="a" style={{ cursor: 'pointer' }}>

              <NavLink to={`/admin/friend/${friend}`}>{friend}</NavLink>
            </DropdownItem>
            ))
          ) : (
            <DropdownItem disabled>친구가 없습니다</DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    
  );
};

export default FriendsDropdown;
