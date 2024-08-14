import axios from "axios";
import { createUrl } from "layouts/createUrl";
import { useState } from "react";
import { Button, Card, CardBody, CardHeader, Collapse } from "reactstrap";

const Notifications = ({ notificationsData, fetchNotificationsData }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const acceptFriend = async (fromNo, toNo, postOfficeNo) => {
    const fullUrl = createUrl('accept');
    try {
      const response = await axios.post(fullUrl, null, { 
        params: {fromNo, toNo, postOfficeNo} });
      const result = response.data;
      console.log(result);
      // 성공 시 알림을 다시 불러오거나, 알림 목록을 갱신하는 로직 추가 가능
      fetchNotificationsData();
    } catch (error) {
      console.error("Error accepting friend request", error);
    }
  };

  const refuseFriend = async (postOfficeNo) => {
    const fullUrl = createUrl('refuse');
    try {
      const response = await axios.post(fullUrl, null, {
        params: { postOfficeNo } });
      const result = response.data;
      console.log(result);
      // 성공 시 알림을 다시 불러오거나, 알림 목록을 갱신하는 로직 추가 가능
      fetchNotificationsData();
    } catch (error) {
      console.error("Error refusing friend request", error);
    }
  };

  return (
    <Card>
      <CardHeader tag="h4" className="d-flex justify-content-between align-items-center">
        Notifications
        <Button
          color="link"
          onClick={toggleCollapse}
          className="ml-2"
        >
          {isCollapsed ? 'Show Notifications' : 'Hide Notifications'}
        </Button>
      </CardHeader>
      <CardBody>
        <Collapse isOpen={!isCollapsed}>
          {notificationsData.length > 0 ? (
            <ul>
              {notificationsData.map((notification, index) => (
                <li key={index}>
                  {notification.message}
                  <Button
                    onClick={() => acceptFriend(notification.fromNo, notification.toNo, notification.postOfficeNo)}
                    color="primary"
                    size="sm"
                    className="ml-2"
                  >
                    수락
                  </Button>
                  <Button
                    onClick={() => refuseFriend(notification.postOfficeNo)}
                    color="danger"
                    size="sm"
                    className="ml-2"
                  >
                    거절
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No notifications</p>
          )}
        </Collapse>
      </CardBody>
    </Card>
  );
};

export default Notifications;
