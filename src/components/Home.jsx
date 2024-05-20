import React, { useState , useEffect} from "react";
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroupText from "react-bootstrap/InputGroupText";
import InputGroup  from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form"
import { Link, useLocation } from "react-router-dom";



function Home({socket}) {
    const [message, setMessage] = useState("")
    const [resArray, setResArray] = useState([])
    const [users, setUsers] = useState([])
    const getCurrentTime = () => {
        const currentTime = new Date();
        return currentTime.toLocaleTimeString();
    }


   
    const location = useLocation()

    const myUserName = location.state.username;
   
   

    function sendMessage() {
        //need to send to parameters with socket.io
        let element = {"username": myUserName, "message":message}
        socket.emit("message", (element))
        
        setMessage("")
        document.querySelector("#noname").value = ""
        

    }
   
    useEffect(() => {

   socket.on("user", (userArray) => {
    setUsers([...userArray])
   })

   socket.on("message", (msgArray) => {
    setResArray([...resArray, msgArray])
   })

 
    

    socket.on("disconnect", () => {
        console.log("disconnected")
    })
},);

console.log(resArray)
    return(
        <Container className="chat">
            <Row>
            <Col  className="col1">
                <Row className="titles1">
                😃ChatGram
                </Row>
                <Row>
                    <h3>Online Users</h3>
                    
                </Row>
                <Row className="users">
                <ul className="unordered-list">
                    {users.map((item) => {
                        
                        return(
                        <li> {item} </li>
                        
                        
                    )})}
                    </ul>
                </Row>
                <Row> <Link to={"/"}> <Button className="sign-out" variant="danger">Sign Out</Button></Link> </Row>
            </Col>
            <Col className="col2">
                
                <Row className="titles2">The Council</Row>
                    <ol className="messages">
                    
                    {resArray.map((item) => {
                        
                    return(
                    <>   
                   <li className= { item.username == myUserName ?  "messages2 alignment-start" :  "messages2 alignment-end"}>{item.message} </li>
                   <li className="username">{item.username} {getCurrentTime()}</li>
                    </> 
                    )})}
                    
                    </ol>
                <Row>
                    <InputGroup>
                
                    <Form.Control id="noname" onChange={(e) => {setMessage(e.target.value)}}/>
                    <Button  variant="success" onClick={() => message != "" ? sendMessage() : null } > Send </Button>
                    </InputGroup>
                    
                </Row>
                    
            </Col>
            </Row>
        </Container>
    )


}
export default Home;