import React, { useState } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";


function Login(props) {

        const [username, setUsername] = useState("")
        
        

    
    function handleLogin() {
        props.socket.emit("user", (username))
    }
    return (

        <Container className="login">
        <Row>
            <h1>Welcome to 😃ChatGram</h1>
        </Row> 
        <InputGroup className="mb-3">
            <InputGroup.Text id="username">UserName</InputGroup.Text>
            <Form.Control value={username} onChange={(e) => setUsername(e.target.value)  }/>
            <Link to={"/home"} state={{"username":username}} ><Button variant="success" onClick={handleLogin} >Log In</Button></Link>
        </InputGroup>
        
    </Container>


    )

}

export default Login;