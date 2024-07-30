import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap';

const MyInfo = () => {   
  // Get 'UserId' from sessionStorage
  const UserId = sessionStorage.getItem('UserId');
  const UserName = sessionStorage.getItem('UserName');
  const UserLoc = sessionStorage.getItem('UserLoc');
 
  
  // Helper function to provide default values
  const getDefaultValue = (value) => value || "";
    
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">My Info</CardTitle>
      </CardHeader>
      <CardBody> 
        {/* Display the UserId */}
        <div><strong>UserId:</strong> {getDefaultValue(UserId)}</div>
        <div><strong>UserName:</strong> {getDefaultValue(UserName)}</div>
        <div><strong>UserLoc:</strong> {getDefaultValue(UserLoc)}  </div>
        
      </CardBody>
    </Card>
  );
};

export default MyInfo;
