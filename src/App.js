import React, { Component } from 'react'
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Plan from './Plan'
import axios from 'axios'

const ai=axios.create({
  baseURL:'http://127.0.0.1:8000/api'
})


export default class App extends Component {
  state={
    items:[],
    text:""
  } 
  showPlan=()=>{
    ai.get('/list/')
    .then((res)=>{
      //console.log()
      this.setState({items:res.data})
    })
  }
    addPlan =(d)=>{
      if(this.state.text!==""){
        ai.post('/create/',d)
        .then((res)=>{
        this.setState({ text:'' })
        this.showPlan()
        })
      
    }
  }
  handleChange=e=>{
    this.setState({text:e.target.value})
}
 handleAdd = e =>  {
   let dt={items:this.state.text}
   this.addPlan(dt)




//   if (this.state.text!==""){
//     const items=[...this.state.items,this.state.text];
//     this.setState({items:items,text:""});

  
}
handleDelete = id=>{
  console.log("deleted", id);
  ai.delete(`/delete/${id}`)
  .then((res)=> {
    this.showPlan()
  })

}

componentDidMount()
{
  this.showPlan();
}
  render() {
    return (
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-sm-6 mx-auto text-white shadow-lg p-3">
            <h1 className="text-center">Today's plan</h1>
            <div className="row">
            <div className="col-9">
              <input type="text" className="form-control" placeholder="Write plan here"
              value={this.state.text} onChange={this.handleChange} />
            </div>
            <div className="col-2">
              <button className="btn btn-warning px-4 " onClick={this.handleAdd}>Add</button>
            </div>
            <div className="container-fluid">
               <ul className="list-unstyled row sm-5 ">
                 
                {
                  this.state.items.map((value, i)=>{
                    //.log(value.id,value.items)
                    return <Plan key={i}  id={value.id} value={value.items} 
                    sendData={this.handleDelete}/>
                  }) 
                }
                  
              </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    }
  
    }
     




