import { Card, CardBody, CardHeader, Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import NeighborList from "./neighborlist";


function NeighborTitle(){

    

    return(
        <div className="d-flex justify-content-between align-items-center">
            <h4 tag="h4" className="title">이웃 / 동 and 시</h4>
         </div>
        
    )

}




function NeighborBoard(){
    return(
        <Card>
          <CardHeader>
              <div className="d-flex justify-content-between align-items-center">
                {/* 타이틀 */}
                <NeighborTitle />
                {/*  검색 */}
                <form className="flex-grow-5">
                 <InputGroup className="no-border">
                   <Input placeholder="Search..." />
                   <InputGroupAddon addonType="append">
                   <InputGroupText>
                    <i className="now-ui-icons ui-1_zoom-bold"   style={{ marginLeft: '14px'}}/>
                   </InputGroupText>
                  </InputGroupAddon>
                  </InputGroup>
                </form>
              </div>       

          </CardHeader>

          <CardBody>
                <NeighborList />
                            
          </CardBody>

          </Card>
         
     )
}
export default NeighborBoard;