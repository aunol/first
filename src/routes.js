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
import Community from "views/Community.js";
import Friends from "views/Friends.js";
import Home from "views/Home.js";
import FullScreenMap from "views/Hospital.js";
import Neighbor from "views/Neighbor.js";
import Notifications from "views/Notifications.js";
import Account from "views/Account.js";

var dashRoutes = [

   {path: "/account",
   name: "ACCOUNT",
   icon: "ui-1_settings-gear-63",
   component: <Account />,
   layout: "/admin",

   }, 

  {
    pro: true,
    path: "/home",
    name: "HOME",
    icon: "objects_spaceship",
    component: <Home />,
    layout: "/admin",
  },
  
  {
    path: "/hospital",
    name: "HOSPITAL",
    icon: "location_map-big",
    component: <FullScreenMap />,
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
  {
    path: "/friends",
    name: "FRIENDS",
    icon: "users_single-02",
    component: <Friends />,
    layout: "/admin",
  },
  
  {
    path: "/neighbor",
    name: "Neighbor",
    icon: "design-2_ruler-pencil",
    component: <Neighbor />,
    layout: "/admin",
  },

  {
    path: "/community",
    name: "COMMUNITY",
    icon: "media-2_sound-wave",
    component: <Community />,
    layout: "/admin",
  },

  {
    path: "/noti",
    name: "NOTIFICATION",
    icon: "files_paper",
    component: <Notifications />,
    layout: "/admin",
  },

  

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
