import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, CardTitle } from 'reactstrap';

const getDefaultValue = (value) => value || "";

const FreInfo = ({ userData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">Fre Info</CardTitle>
      </CardHeader>
      <CardBody> 
        {/* Display the UserId */}       
        {/* <div><strong>UserName:</strong> {getDefaultValue(userData.name)}</div>
        <div><strong>UserLoc:</strong> {getDefaultValue(userData.loc)}</div> */}
      </CardBody>
    </Card>
  );
};

FreInfo.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string,
    loc: PropTypes.string
  }).isRequired
};

export default FreInfo;
