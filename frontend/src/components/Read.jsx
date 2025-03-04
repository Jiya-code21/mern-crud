import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom"
function Read() {
  const [data,setdata]=useState([])
    const[error,setError]=useState("")

  async function getdata(){
    const response=await fetch("https://mern-crud-x33b.onrender.com/")
    const result=await response.json()

    if(!response.ok){
      console.log(result.message)
      setError(result.message)
    }
    if(response.ok){
      setdata(result)
    }

  }

  const handledelete=async(id)=>{
    const response=await fetch(`https://mern-crud-x33b.onrender.com/${id}`,
      {method:"DELETE"}

    )
    const result=await response.json()
    if(!response.ok){
      console.log(result.message)
      setError(result.message)
    }
    if(response.ok){
      setError("Deleted successfully")
      setTimeout(()=>{
setError("")
getdata()
      },1000)
    }
  }
useEffect(()=>{
  getdata()
},[])


console.log(data)
  return (
      <div className="container my-2">
        {error&& <div className="alert alert-danger">
 {error}
</div>}
        <h2 className="text-center">All data</h2>
<div className="row">
  {data?.map((ele)=>(

<div key={ele._id} className="col-3">
  <div className="card">
  <div className="card-body">
    <h5 className="card-title">{ele.name}</h5>
    <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
  <p className="text-muted">{ele.age}</p>
    <a href="#" className="card-link" onClick={()=>handledelete(ele._id)}>Delete</a>
    <Link to={`/${ele._id}`} className="card-link">Edit</Link>
  </div>
</div>
  </div>

  ))}


  
</div>
      </div>
  )
}

export default Read
