import React,{Component} from 'react';
import {Card, Accordion,Button,ButtonGroup,Nav, Row, Col,OverlayTrigger,Tooltip } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';

import M from 'materialize-css';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TodoList from './TodoList';
import './todoList.css';
import './bucketList.css'
import 'bootstrap/dist/css/bootstrap.min.css';


class BucketList extends Component{
    constructor(props){
        super(props);
        this.state={
          addTaskbucketName:"",
          new_task_text:"",
          bucket_data_indexfinder :{},
          show:false,
          bucketName:"",
          status:"pending",
    selectedRowIndex:"",
    updated_task_text:""
        }
    }

    addNewTask=(e)=>{
    
      this.setState(state=>({show:false}
        ))
        this.props.addTaskBtnClick(this.state.addTaskbucketName, 
          this.state.new_task_text,this.state.bucket_data_indexfinder)
    }


    handleChange=(e)=>{
// console.log(e.target.id)
const name = e.target.id
const value = e.target.value

if(name === 'status'){
           
  let completed = e.target.checked?"complete":"pending"

  this.setState(
      { [name]:completed }
  )
}else{
  this.setState(
      { [name]:value }
  )
}


    }


  //  handleClose = () =>  this.setState(state=>({show:true}));
    handleShow = async (e) => {
      var target = e.srcElement || e.target;
      let bucketname = target.getAttribute("bucket");
      let bucketdata = target.getAttribute("bucketdata");
      console.log(bucketname)
      await this.setState(state=>({show:true,addTaskbucketName:bucketname,
        bucket_data_indexfinder:bucketdata}
        ))
      console.log(bucketname);
     
      var newTaskmodal = document.getElementById('newTaskModal');
      var instance = M.Modal.init(newTaskmodal);
      instance.open();
    
    }

openUpdateModal=(selectedRowIndex,bucket,desc,status)=>{
  if(bucket=== null){
    return
  }
  this.setState({ bucketName:bucket,show:true,status:status,
    selectedRowIndex:selectedRowIndex,updated_task_text:desc }, () => {
    console.log(this.state.bucketName, 'bucketName->Bucketlist');

  }); 
 
  var newTaskmodal = document.getElementById('updateTaskModal');
  var instance = M.Modal.init(newTaskmodal);
  instance.open();
}

deleteTask=(selectedRowIndex,bucketName)=>{

  this.props.deleteTaskBtnClick(selectedRowIndex,bucketName);
}


updateTask=()=>{
  let selectedRowIndex = this.state.selectedRowIndex
  let bucketName = this.state.bucketName
  let description = this.state.updated_task_text 
  let status =   this.state.status
 
  this.props.updateTaskBtnClick(selectedRowIndex,bucketName,description,status);
}
   

componentDidMount(){
  M.AutoInit();
}
    render(){

 

        return(
                <>
                {/* Modalfor adding new Task */}
  <div id="updateTaskModal" className="modal newTaskModel modal-fixed-footer">
    <div className="modal-content ">
      <h4 className="center blue-grey-text">Update Task</h4>
      {/* <h4 className="center blue-grey-text">{this.state.addTaskbucketName}</h4> */}
      
      <form   noValidate autoComplete="off">
        <Row  className="center">
          <Col > 
     
          <TextField 
          id="bucketName"
          label="Bucket"
          value={this.state.bucketName}
          variant="outlined"
         
          type="text"
        
        />
          
          </Col>
     
        </Row>
   <Row  className="center">
     <Col>
   <TextField id="updated_task_text" label="New Task" 
    value={this.state.updated_task_text}
   type="text"  variant="outlined" onChange={this.handleChange}/>

     </Col>

   </Row>
   <Row  >
       <Col md={{ span: 4, offset: 3 }}><FormGroup  >
          <FormControlLabel
            control={<Checkbox id="status"  onChange={this.handleChange} name="status" />}
            label="Completed"
            labelPlacement="start"
          />
          </FormGroup>
       
       </Col>
   </Row>
    </form>
    </div>
    <div className="modal-footer">
      {/* <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a> */}
      <ButtonGroup >
  <Button className="modal-close mr-2 " variant="light" >Cancel</Button>
  <Button className = " modal-close mr-1" variant="primary " onClick={this.updateTask}>Update</Button>

</ButtonGroup>
    
    </div>
  </div>


{/* Modalfor adding new Task */}
  <div id="newTaskModal" className="modal newTaskModel modal-fixed-footer">
    <div className="modal-content ">
      <h4 className="center blue-grey-text">New Task</h4>
      {/* <h4 className="center blue-grey-text">{this.state.addTaskbucketName}</h4> */}

      <form   noValidate autoComplete="off">
        <Row className="center">
          <Col > 
     
          <TextField 
          id="addTaskbucketName"
          label="Bucket"
          value={this.state.addTaskbucketName}
          variant="outlined"
          InputProps={{
            readOnly: true,
          }}
        />
          
          </Col>
     
        </Row>
   <Row  className="center">
     <Col>
   <TextField id="new_task_text" label="New Task" 
   type="text"  variant="outlined" onChange={this.handleChange}/>

     </Col>

   </Row>
    </form>
    </div>
    <div className="modal-footer">
      {/* <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a> */}
      <ButtonGroup >
  <Button className="modal-close mr-2 " variant="light">Cancel</Button>
  <Button className = " modal-close mr-1" variant="primary " onClick={this.addNewTask}>Add</Button>

</ButtonGroup>
    
    </div>
  </div>


                {this.props.data.map(item => (    
                   <>
     
                     <Accordion key={item.bucket_name} defaultActiveKey={item.bucket_id+""}>
  <Card>
  
      <Accordion.Toggle as={Card.Header} className="center  grey darken-4 white-text " eventKey={item.bucket_id}>
      <OverlayTrigger
      key={item.bucket_id}
      placement="top"
      overlay={
        <Tooltip id={`tooltip-${item.bucket_id}`}>
         Click Me!.
        </Tooltip>
      }>
     <h5>{ item.bucket_name}</h5></OverlayTrigger>
      </Accordion.Toggle>
    
    <Accordion.Collapse  eventKey={item.bucket_id}>
      <Card.Body>
        <Nav style={{float: 'right'}}>
        <Nav.Link className="modal-trigger"  href="#newTaskModal" 
        bucket={item.bucket_name} bucketdata = {item} onClick={this.handleShow}>New Task <AddCircleIcon/>
        
        </Nav.Link>
        </Nav>
                  {console.log(item.todo)}
      <TodoList  name="Tasks" bucketName={item.bucket_name} items={item.todo} deleteTask={this.deleteTask} 
      updateTask={this.updateTask} openUpdateModal={this.openUpdateModal}/>

      </Card.Body>
    </Accordion.Collapse>
  </Card>

</Accordion>
</>
))

                }
        
                </>
        )
    }
}

export default BucketList;