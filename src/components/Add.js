import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {   useNavigate } from "react-router-dom";

function Add(){
  
    let history = useNavigate();

    const[product_name, setProductName] = useState('');
    const[category_name, setCategory] = useState('');
    const[description, setDescription] = useState('');
    const[created_by, setCreatedBy] = useState('');
    const[status, setStatus] = useState('');
    const[created_at, setCreatedAt] = useState('');
    const[updated_at, setUpdatedAt] = useState('');

    
    const sendDataToAPI = () => {
        axios.post(
          "https://sheltered-sea-10901.herokuapp.com/products", {
            product_name,
            category_name,
            description,
            created_by,
            status,
            created_at,
            updated_at
        })
          history("/");
    }
     
      

    return(
         <div >
        <Form className="d-grid gap-2" style={{margin:"15rem"}}>
           <Form.Group  className="mb-3" controlId="formProductName" >
                <Form.Control type="text"  placeholder="Enter Product Name" required onChange={(e) => setProductName(e.target.value)}>  
                </Form.Control>
           </Form.Group>

           <Form.Group className="mb-3" controlId="formCategory">
                <Form.Control type="text" placeholder="Enter Category" required onChange={(e) => setCategory(e.target.value)}>  
                </Form.Control>
           </Form.Group>

           <Form.Group className="mb-3" controlId="formDescription">
                <Form.Control type="text" placeholder="Enter Description" required onChange={(e) => setDescription(e.target.value)}>  
                </Form.Control>
           </Form.Group>

           <Form.Group className="mb-3" controlId="formCreatedBy">
                <Form.Control type="text" placeholder="Enter CreatedBy" required onChange={(e) => setCreatedBy(e.target.value)}>  
                </Form.Control>
           </Form.Group>

           <Form.Group className="mb-3" controlId="formStatus">
                <Form.Control type="text" placeholder="Enter Status" required onChange={(e) => setStatus(e.target.value)}>  
                </Form.Control>
           </Form.Group>

           <Form.Group className="mb-3" controlId="formCreatedAt">
                <Form.Control type="text" placeholder="Enter Created At" required onChange={(e) => setCreatedAt(e.target.value)}>  
                </Form.Control>
           </Form.Group>

           <Form.Group className="mb-3" controlId="formUpdatedAt">
                <Form.Control type="text" placeholder="Enter Updated At" required onChange={(e) => setUpdatedAt(e.target.value)}>  
                </Form.Control>
           </Form.Group>

           <Button  type="submit" onClick={sendDataToAPI}>Submit</Button>
        </Form>

        </div>
    
    )
}

export default Add;