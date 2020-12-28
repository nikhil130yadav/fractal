import React, {Component,Fragment} from 'react';
import Axios from "axios";
import {base_url} from "../constants"
import M from 'materialize-css';
import {Image,Nav,Spinner,Row,Col,Button,Container,Alert} from 'react-bootstrap';
import './home.css';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import BucketList from './BucketList';
import 'bootstrap/dist/css/bootstrap.min.css';

class Home extends Component{
    constructor(props){
        super(props);
     
        this.state={
            // displayContent:'Hello WOlrd',
            showSpinner:false,
            data:[],
            Buckets :["Bucket 1","Bucket 2"],
            newbucketName:"",
        }
    }



    fetchData=async()=>{
      var url_ = base_url+"buckettodos/"
      console.log("ulr",url_)
      await Axios({
         url:url_,
         method:'get',
        
       }).then(async(response)=>{
         console.log(response);

         var buckets = response.data.map(item=>{
            return item.bucket_name
         })
         this.setState(state=>({
         
          data:response.data,
          Buckets:buckets,
      }))
      
   
       
   
       }).catch(function(response){
         console.log(response);
   
         M.toast({
           html: ` failure `,
           classes: "center white-text orange rounded"
         })
       })
     }
    addbucketToDB=async(data)=>{
      var url_ = base_url+"bucket/"
      console.log("ulr",url_)
      await Axios({
         url:url_,
         method:'post',
         data:data
        
       }).then(async(response)=>{
        
        let bucketname = response.data.bucket_name
        let bucketid = response.data.bucket_id
  

      let newitem = {"bucket_id":bucketid,"bucket_name":bucketname,"todo":[]}
      this.state.Buckets.push(bucketname)
      this.state.data.unshift(newitem)
      this.setState(state=>({
        data: this.state.data
      }))
      

         M.toast({
           html: `Bucket Succesfully Added  `,
           classes: "center white-text green rounded"
         })
   
       
   
       }).catch(function(response){
         console.log(response);
   
         M.toast({
           html: ` failure `,
           classes: "center white-text orange rounded"
         })
       })
     }
    addTaskToDB=async(data,temp,index,newitem,to_Update_Bucket)=>{
      var url_ = base_url+"todos/"
      console.log("ulr",url_)
      await Axios({
         url:url_,
         method:'post',
         data:data
        
       }).then(async(response)=>{
        //  var newItem_ = newitem
      
         newitem["id"] = response.data.todo_id
      
        to_Update_Bucket.todo.push(newitem) 
        // console.log("updatedlist" ,to_Update_Bucket)
        temp.splice(index, 1, to_Update_Bucket);
        this.setState(state=>({
          data:temp
        }))
      

         M.toast({
           html: `Task Succesfully Added  `,
           classes: "center white-text green rounded"
         })
   
       
   
       }).catch(function(response){
         console.log(response);
   
         M.toast({
           html: ` failure `,
           classes: "center white-text orange rounded"
         })
       })
     }
    deleteTaskFromDB=async(todo_id,temp,index,selectedRowIndex,to_Update_Bucket)=>{
      var url_ = base_url+`todos/${todo_id}`
      console.log("ulr",url_)
      await Axios({
         url:url_,
         method:'delete',
        
       }).then(async(response)=>{
        
  


          to_Update_Bucket.todo.splice(selectedRowIndex,1) 

          temp.splice(index, 1, to_Update_Bucket);
          this.setState(state=>({
            data:temp
          }))
          

         M.toast({
           html: `Task Succesfully Deleted  `,
           classes: "center white-text green rounded"
         })
   
       
   
       }).catch(function(response){
         console.log(response);
   
         M.toast({
           html: ` failure `,
           classes: "center white-text orange rounded"
         })
       })
     }
    UpdateTaskInDB=async(data,temp,index,selectedRowIndex,newitem,to_Update_Bucket)=>{
      var url_ = base_url+`todos/${data.todo_id}/`
      console.log("ulr",url_)
      await Axios({
         url:url_,
         method:'patch',
        data:data
       }).then(async(response)=>{
        
  

        to_Update_Bucket.todo.splice(selectedRowIndex,1,newitem) 
        temp.splice(index, 1, to_Update_Bucket);
        this.setState(state=>({
          data:temp
        }))
      

         M.toast({
           html: `Task Succesfully updated  `,
           classes: "center white-text green rounded"
         })
   
       
   
       }).catch(function(response){
         console.log(response);
   
         M.toast({
           html: ` failure `,
           classes: "center white-text orange rounded"
         })
       })
     }

    componentDidMount(){
        M.AutoInit();
        this.fetchData()
        let data = [{ "name":"Bucket 1","todoitems":[{id:0,description:"run 200 km",status:1},{id:1,description:"run 210 km","status":0}]},
        { "name":"Bucket 2","todoitems":[{id:0,description:"run 210 km",status:0}]}]




        // this.setState(state=>({
        //     // displayContent: <BucketList  data={data}/>,
        //     data:data
        // }))
    }


handleAutoCompleteChange=(event,newInputValue)=>{
    console.log(newInputValue);
    // console.log(event.inputValue);
    // alert(event.target.value);
  if(newInputValue=== null){
    this.setState({newbucketName:""})
  }else{
    this.setState({newbucketName:newInputValue})
  }
    
}

addBucket=()=>{
    // alert(this.state.newbucketName);
    
    let bucketname = this.state.newbucketName
    if(bucketname ===""){
      M.toast({html:"Please Enter text",classes:"white-text red rounded"})
      return;
    }
    const data = {
      "bucket_name": bucketname
  }
    this.addbucketToDB(data)
    
}

addTask=(bucketName,newTask,bucket_data_indexfinder)=>{

// alert(bucketName)
const temp = this.state.data;

const isElemenPresent = (element) => element.bucket_name == bucketName;
const index = temp.findIndex(isElemenPresent)
// alert(index)
if (index === -1){
  M.toast({html: 'Failed to capture Bucket',classes:"white-text red rounded"});
  return;
}
const to_Update_Bucket = temp[temp.findIndex(isElemenPresent)]

const id_newtask= to_Update_Bucket.todo.length >0?to_Update_Bucket.todo.length:0

let newitem = {name: newTask,id:id_newtask ,status: "pending"}
let data ={
  "todo_name": newTask,
  "todo_status": "pending",
  "todo_bucket": bucketName
}
this.addTaskToDB(data,temp,index,newitem,to_Update_Bucket)


}


updateTask=(selectedRowIndex,bucketName,name,status)=>{


const temp = this.state.data;
console.log("data update",temp)
if (bucketName === null){
  return;
}
const isElemenPresent = (element) => element.bucket_name === bucketName;
const index = temp.findIndex(isElemenPresent)
const todo_id_ = temp[index].todo[selectedRowIndex].id
const to_Update_Bucket = temp[temp.findIndex(isElemenPresent)]
let newitem = {name: name,id:selectedRowIndex ,status: status}
let data = {
  "todo_id": todo_id_,
  "todo_name": name,
  "todo_status": status,
  "todo_bucket": bucketName
}
this.UpdateTaskInDB(data,temp,index,selectedRowIndex,newitem,to_Update_Bucket)




}

deleteTask=(selectedRowIndex,bucketName)=>{

if (bucketName === null){
  return;
}
  const temp = this.state.data;

const isElemenPresent = (element) => element.bucket_name === bucketName;
const index = temp.findIndex(isElemenPresent)

let todo_id_ = temp[index].todo[selectedRowIndex].id
const to_Update_Bucket = temp[temp.findIndex(isElemenPresent)]
this.deleteTaskFromDB(todo_id_,temp,index,selectedRowIndex,to_Update_Bucket)





}


loadBucket=()=>{

    M.toast({html: 'Work in progress!',classes:"white-text red rounded"});
    let data = [{ "name":"Bucket 1","todoitems":[{id:0,description:"run 200 km","status":0},{id:1,description:"run 210 km","status":0}]},
    { "name":"Bucket 2","todoitems":[{id:0,description:"run 210 km","status":0}]}
]



    this.setState(state=>({
        // displayContent: <BucketList  data={data}/>,
        data:data
    }))
}

render(){
    return(
        <Fragment>

 <nav className="black black-text " role="navigation">

 <div className="nav-wrapper"><p id="logo-container"  className="brand-logo center compamny_title white-text "> Fractal ToDoApp</p>

 </div>
</nav>

 <Container>
 <div className=" ">

 <br></br>
 <div className="" >
 {
       this.state.showSpinner
         ? < div className="center">
       
         <Spinner animation="grow" variant="primary" size="sm" />
         <Spinner animation="grow" variant="success" size="sm" />
         <Spinner animation="grow" variant="warning" size="sm" />
       </div>
         : null
     }
<Row >
    <Col sm={6} md={4} lg={4}>

    

    <Autocomplete  className="pull-right autocomplete_height"
  id="newbucket-autocomplete"
  options={this.state.Buckets}
  
  onChange={this.handleAutoCompleteChange}
  value={this.state.newbucketName}
  inputValue={this.state.newbucketName}
  onInputChange={this.handleAutoCompleteChange}
//   getOptionLabel={(option) => option.title}
  style={{ height:30,maxHeight:20,marginBottom:60}}
  renderInput={(params) => <TextField {...params} label="New Bucket" variant="outlined" />}
/>
  {/* <Button className="pull-right"  variant="primary" type="submit">
    Add
  </Button> */}

    </Col>

<Col >
<Button className="addBtn" onClick={this.addBucket} variant="primary" type="submit">
    Add Bucket
  </Button>
</Col>

</Row>
     <Row>
         <Col>
         {/* {this.state.displayContent} */}
     

         <Alert show={this.state.data.length>0?false:true} variant="warning">
        <Alert.Heading>Add New Bucket</Alert.Heading>
        <p>
          To add new TODO,First add Bucket. Cheers!
          <strong>NOTE:- Bucket List Will be an Expandable card. Click to see More.</strong>
        </p>
        <hr />
       
      </Alert>



         <BucketList  data={this.state.data} addTaskBtnClick={this.addTask}
          deleteTaskBtnClick={this.deleteTask} updateTaskBtnClick={this.updateTask}/>
         </Col>
     
     </Row>
  
     


 </div>
<br></br>
</div>  
   </Container>

     </Fragment>

    )
}
}
export default Home;