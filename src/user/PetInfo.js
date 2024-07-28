import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Card, CardBody, CardHeader, CardTitle } from'reactstrap';

const PetInfo = () => {
   
    

return (

  <Card>
  <CardHeader>
    <CardTitle tag="h4">Pet Info</CardTitle>
  </CardHeader>
  <CardBody>
    
      <span>This is a plain notification</span>
    
  </CardBody>
</Card>
)
}
export default PetInfo;