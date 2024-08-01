import { useState } from 'react';
import { Button, Card, CardBody, CardHeader, CardTitle } from 'reactstrap';
import LocFix from './LocFix';
import PasswdFix from './PasswdFix';


const MyInfo = () => {   
  // Get 'UserId' from sessionStorage
  const UserId = sessionStorage.getItem('UserId');
  const UserName = sessionStorage.getItem('UserName');
  const UserLoc = sessionStorage.getItem('UserLoc');

  const [isLocFix, setIsLocFix] = useState(false);
  const [isPasswdFix, setIsPasswdFix] = useState(false);
  
  
  // Helper function to provide default values
  const getDefaultValue = (value) => value || "";
    
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">
          My Info
          <Button
            onClick={() => setIsLocFix(true)}
            color="primary"
            size="sm"
          >
            지역변경
          </Button>
          <Button
            onClick={() => setIsPasswdFix(true)}
            color="primary"
            size="sm"
          >
            비밀번호변경
          </Button>

          {isLocFix && (
            <LocFix
            isOpen={isLocFix}
            toggle={() => setIsLocFix(false)}
            
            />
          )}
          {isPasswdFix &&(
            <PasswdFix
            isOpen={isPasswdFix}
            toggle={() => setIsPasswdFix(false)}
            />
          )}


        </CardTitle>
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
