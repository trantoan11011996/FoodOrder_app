import React, { useContext } from "react";
import { Col, Container, Row, Button, Badge, Navbar } from "react-bootstrap";

import "../css/foodapp.css"
import { AuthContext } from "./foodapp";
import OrderForm from "./orderform";


export default function FoodHeader({foodCart,inCreaseItem,deCreaseItem,deleteItem,postOrder}) {
    const auth = useContext(AuthContext)
    console.log(auth.foodCart)
    return (
        <Container>
                <Navbar>
                    <Navbar.Brand>React Food App</Navbar.Brand>
                    <OrderForm foodCart = {foodCart} 
                    inCreaseItem = {inCreaseItem} 
                    deCreaseItem = {deCreaseItem} 
                    deleteItem = {deleteItem}
                    postOrder = {postOrder}/>
                </Navbar>
        </Container>
    )
}