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
import Account from "views/Account.js";
import Boarding from "views/Boarding";
import Friend from "views/Friend";
import HospitalContainer from "views/HospitalContainer";
import Posting from "views/Posting";


// 세션 스토리지에서 로그인 상태 확인



var dashRoutes = [

   {path: "/account",
   name: "ACCOUNT",
   icon: "ui-1_settings-gear-63",
   component: <Account />,
   layout: "/admin",

   },  
  
  {
    path: "/hospital",
    name: "HOSPITAL",
    icon: "location_map-big",
    component: <HospitalContainer />,
    layout: "/admin",
  },

  {    
    path: "/posting",
    name: "POSTING",
    icon: "objects_spaceship",
    component: <Posting />,
    layout: "/admin",
  },

  {
    path: "/boarding",
    name: "BOARD",
    icon: "media-2_sound-wave",
    component: <Boarding />,
    layout: "/admin",
  },

   // 로그인한 사용자에게만 보이는 FRIEND 경로
   {
    path: "/friend",
    name: "FRIEND",
    icon: "design_image",
    component: <Friend />,
    layout: "/admin",
  },



  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "design_image",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "",
  //   icon: "ui-1_bell-53",
  //   component: <Notifications />,
  //   layout: "/admin",
  // },

  // {
  //   path: "/friendsDropdown",
  //   name: "FRIENDS",
  //   icon: "users_single-02",
  //   component: <FriendsDropdown />,
  //   layout: "/admin",
  // },
  
  // {
  //   path: "/neighbor",
  //   name: "Neighbor",
  //   icon: "design-2_ruler-pencil",
  //   component: <Neighbor />,
  //   layout: "/admin",
  // },

 
  // {
  //   path: "/noti",
  //   name: "NOTIFICATION",
  //   icon: "files_paper",
  //   component: <Notifications />,
  //   layout: "/admin",
  // },

  

  // {
  //   pro: true,
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "design_app",
  //   component: <Dashboard />,
  //   layout: "/admin",
  // },


]; 
export default dashRoutes;
