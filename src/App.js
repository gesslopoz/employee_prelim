import React, {useState, useEffect} from "react"
import { View } from "./components/View";

//getting values of local storage
const getDatafromLS=()=>{
  const data = localStorage.getItem('employees');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

export const App = () => {

  const [employees, setEmployees]= useState([getDatafromLS()]);

  //input field states
  const [name, setName]= useState('');
  const [address, setAddress]= useState('');
  const [position, setPosition]= useState('');
  const [company_name, setCompanyName]= useState('');

  //form submit event
  const handleAddEmployeeSubmit=(e)=>{
    e.preventDefault();

    //creating an object
    let employee={
      name,
      address,
      position,
      company_name
    }
    setEmployees([...employees, employee]);
    setName('');
    setAddress('');
    setPosition('');
    setCompanyName('');
  }

  //delete from LS
  const deleteEmployee=(name)=>{
    const filteredEmployees=employees.filter((element,index)=>{
      return element.name !== name
    })
    setEmployees(filteredEmployees);
  }

  //saving data to local storage
  useEffect(()=>{
    localStorage.setItem('employees', JSON.stringify(employees));
  },[employees])

  return(
    <div className="wrapper">
      <h1>Employee List</h1>
      <p>Add and view your list.</p>
      <div className="main">
        <div className="form-container">
          <form autoComplete="off" className="form-group"
          onSubmit={handleAddEmployeeSubmit}>
            <label>Name</label>
            <input type="text" className="form-control" required
            onChange={(e)=>setName(e.target.value)} value={name}></input>
            <br></br>
            <label>Address</label>
            <input type="text" className="form-control" required
            onChange={(e)=>setAddress(e.target.value)} value={address}></input>
            <br></br>
            <label>Position</label>
            <input type="text" className="form-control" required
            onChange={(e)=>setPosition(e.target.value)} value={position}></input>
            <br></br>
            <label>Company Name</label>
            <input type="text" className="form-control" required
            onChange={(e)=>setCompanyName(e.target.value)} value={company_name}></input>
            <br></br>
            <button type="submit" className="btn btn-success btn-md">
              Add Employee
            </button>
          </form>
        </div>

        <div className="view-container">
          {employees.length>0&&<>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Position</th>
                  <th>Company Name</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                <View employees={employees} deleteEmployee={deleteEmployee}/>
              </tbody>
            </table>
          </div>
          <button className="btn btn-danger btn-md" 
          onClick={()=>setEmployees([])}>Remove All</button>
          </>}
          {employees.length <1 && <div>No employees added.</div>}
        </div>
      </div>
    </div>
  )
}

export default App;