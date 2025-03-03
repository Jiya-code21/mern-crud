import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom'


const Update=()=> {
   const[name,setName]=useState("")
      const[email,setEmail]=useState("")
      const[age,setAge]=useState("")
  
      const[error,setError]=useState("")
      const {id}=useParams()

      const navigate=useNavigate()
//get single user data
      const  getsingleuser=async()=>{
     

  const response=await fetch(`http://localhost:5000/${id}`)

  const result=await response.json()
    if(!response.ok){
      console.log(result.message)
      setError(result.message)
    }
    if(response.ok){
    setError("")
    console.log("updated user",result)
setName(result.name)
setEmail(result.email)
setAge(result.age)

  
      }
    }

    //send updated data to backend
    const handleUpdate=async(e)=>{
      e.preventDefault()
      const updateUser={name,email,age}
      const response=await fetch(`http://localhost:5000/${id}`,{
          method:"PATCH",
          body:JSON.stringify(updateUser),
          headers:{
              "Content-Type":"application/json",
          }
      })
      const result=await response.json()
      if(!response.ok){
          console.log(result.message)
          setError(result.message)
      }
      if(response.ok){
      console.log(result)
      setError("")
      navigate("/all")
      
      }
    }

useEffect(()=>{
getsingleuser()
},[])
  return (
    <div className="container my-2">
        {error&& <div className="alert alert-danger">
 {error}
</div>}
        <h2 className="text-center">Edit the data</h2>
        <form onSubmit={handleUpdate}>
        <div className="mb-3">
        <label className="form-label" >Name</label>
    <input type="text" className="form-control"value={name} onChange={(e)=>setName(e.target.value)} />
   
  </div>

  <div className="mb-3">
    <label className="form-label">Email address</label>
    <input type="email" className="form-control"value={email} onChange={(e)=>setEmail(e.target.value)}  />
  </div>
  

  <div className="mb-3">
    <label  className="form-label">Age</label>
    <input type="number" className="form-control" value={age} onChange={(e)=>setAge(e.target.value)} />
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
      </div>
  )
}


export default Update
