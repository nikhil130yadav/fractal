import React,{Component} from 'react';
// import Navbar from 'react-bootstrap/Navbar';
import M from 'materialize-css';
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import  Delete from '@material-ui/icons/Delete';

import EditIcon from '@material-ui/icons/Edit';


import './todoList.css'



class TodoList extends Component{
    constructor(props){
        super(props);
        this.state={bucketName:"",
            updated_task_text:"", 
            status:"pending"
            ,show:false,
            selectedRowIndex:null,
        }
     
    }
componentDidMount(){
    M.AutoInit();
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
        



    handleShow =   (e) => {
        var target = e.srcElement || e.target;
      
         let status = parseInt(target.getAttribute("status"));
         let bucket = target.getAttribute("bucket");
         let desc = target.getAttribute("description")
        
         
        let selectedRowIndex ;
        e = e || window.event;
       
        target = e.srcElement || e.target;
       
       
        // console.log(target.nodeName)
        while (target && target.nodeName !== "TR") {
            target = target.parentNode;
            selectedRowIndex= target.sectionRowIndex
            console.log("Clicked row",target.sectionRowIndex)
            // console.log(target.parentNode.index)
        }

        this.setState({ bucketName:bucket,show:true,status:status,
          selectedRowIndex:selectedRowIndex,updated_task_text:desc }, () => {
          console.log(this.state.bucketName, 'bucketName');
           
            this.props.openUpdateModal(selectedRowIndex,bucket,desc,status)

        }); 
//  this.setState({show:true,status:status,
//         selectedRowIndex:selectedRowIndex,updated_task_text:desc}
//           )
  
     
      
      
      }

      handleclose=async()=>{
      await  this.setState(state=>({show:false,status:"pending",
            selectedRowIndex:null,updated_task_text:"",bucketName:""}
              ))
         
        var newTaskmodal = document.getElementById('updateTaskModal');
        var instance = M.Modal.init(newTaskmodal);
        instance.close();
      }


    handleDelete = (e)=>{

        var target = e.srcElement || e.target;
        let bucket = target.getAttribute("bucket");

        let selectedRowIndex ;
        e = e || window.event;
        var data = [];
         target = e.srcElement || e.target;
        // console.log(target.nodeName)
        while (target && target.nodeName !== "TR") {
            target = target.parentNode;
            selectedRowIndex= target.sectionRowIndex
            console.log("Clicked row",target.sectionRowIndex)
            // console.log(target.parentNode.index)
        }
      

this.props.deleteTask(selectedRowIndex,bucket);
    }





    render(){

        if (this.props.items=== undefined){
            return <></>;
          }
            
        return(
                <>







                <Table striped bordered hover className="tableFormat">
                    <thead>
                      <tr>
                        <th>Sr No.</th>
                        <th>{this.props.name}</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        </tr>

                    </thead>
                    <tbody>
                  
                        {this.props.items.map((item,index)=>(
                            <tr key={item.id}>
                                <td>{++index}</td>
                                <td>{item.name}</td>    
                                <td className={item.status==="complete"?"green-text":"red-text"}>{item.status}</td>    
                        <td>
                            
                            
                            <Nav > <Nav.Link bucket={this.props.bucketName} description={item.name} status={item.status} onClick={this.handleShow}> 
                           Edit <EditIcon bucket={this.props.bucketName} description={item.name} status={item.status} color="primary" onClick={this.handleShow}/>
                                </Nav.Link>
                       </Nav>
                        
                        </td>    
                                <td>
                                    
                                <Nav > 
                                        <Nav.Link bucket={this.props.bucketName} onClick={this.handleDelete}>Delete
                                        <Delete bucket={this.props.bucketName} />
                                        </Nav.Link>
                                </Nav>
                                   </td>    

                            </tr>
                            
                            ))}
                    </tbody>
                </Table>
                </>
        )
    }
}

export default TodoList;