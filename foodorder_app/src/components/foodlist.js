import React from "react";
import { ListGroup,Alert } from "react-bootstrap";
import FoodItem from "./fooditem";


export default function FoodList({foods, addtocart}) {
    return (
        <div className="food-list">
            <ListGroup>
                {foods.map((food,index)=>{
                    return(
                        <ListGroup.Item>
                            <FoodItem 
                            food = {food}
                            key={food.id}
                            id = {food.id}
                            image = {food.image}
                            name = {food.name}
                            description = {food.description}
                            price = {food.price}
                            addtocart = {addtocart}
                            />
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </div>
    )
}