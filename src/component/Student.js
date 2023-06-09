import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Student = () => {

    const [student,setStudent] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8084/").then((res)=>{
            setStudent(res.data)
        }).catch(err=>console.log(err));
    },[]);

    const deleteHandler = async(id) => {
        try{
            await axios.delete("http://localhost:8084/delete/"+id);
            window.location.reload();
        }
        catch(err){
            console.log(err);
        }
    }

    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-4">
                <Link to="/create" className="btn btn-success">Add</Link>
                <table className="table">
                <thead>
                    <tr> <th>Name</th> <th>Email</th> </tr>
                </thead>
                
                <tbody>
                    {student.map(el=>(
                        <tr key={el.id}>
                            <td>{el.name}</td>
                            <td>{el.email}</td>
                            <td><Link to={`/update/${el.id}`} className="btn btn-primary">Update</Link></td>
                            <td><button className="btn btn-danger ms-2" onClick={e=>deleteHandler(el.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
}

export default Student;