import React, { useEffect, useState } from "react";
import { Alert, Container } from "react-bootstrap";
import "../css/foodapp.css"
import axios from "axios";
import FoodHeader from "./foodheader";
import FoodList from "./foodlist";
export const AuthContext = React.createContext(null)
export function getCart() {
    let json = localStorage.getItem('cart')
    if (!json) {
        return []
    }
    else {
        return JSON.parse(json)
    }
}

export default function FoodApp() {
    const [foods, setFoods] = useState([])
    const [foodCart, setFoodCart] = useState([])
    const [user, setUser] = useState([])

    useEffect(() => {
        axios.get('https://625a91bf0ab4013f94a2d9a8.mockapi.io/meals').then(reponse => {
            setFoods(reponse.data)
        })
       setFoodCart(getCart())
    }, [])

    const postOrder = (user) => {
        axios.post('https://625a91bf0ab4013f94a2d9a8.mockapi.io/orders', user).then(reponse => {
            setUser(reponse.data)
        })
    }
    const addtocart = (amount, food) => {
        let newOrder = { ...food, amount: amount }
        let cart = [...foodCart]
        const findDuplicate = foodCart.some(item => item.name == food.name)
        if (!findDuplicate) {
            cart = [...foodCart, newOrder]
            const json = localStorage.setItem('cart', JSON.stringify(cart))
            const getJson = localStorage.getItem('cart')
            setFoodCart(JSON.parse(getJson))
        }
        else {
            alert('this item have been add')
        }
    }
    const inCreaseItem = (id) => {
        const order = [...foodCart]
        let foundItem = order.find(item => item.id === id)
        if (!foundItem) {
            return
        }
        foundItem.amount = foundItem.amount + 1
        setFoodCart(order)
    }
    const deCreaseItem = (id) => {
        const order = [...foodCart]
        let foundItem = order.find(item => item.id === id)
        if (!foundItem) {
            return
        }
        foundItem.amount = foundItem.amount - 1;
        let orderFilter = order.filter(item => item.amount > 0)
        setFoodCart(orderFilter)
    }
    const deleteItem = (id) => {
        let order = [...foodCart]
        let orderFilter = order.filter(item => item.id !== id)
        setFoodCart(orderFilter)
    }

    return (
        <AuthContext.Provider value={{ foodCart, setFoodCart }}>
            <Container className="food-app">
                <FoodHeader foodCart={foodCart}
                    inCreaseItem={inCreaseItem}
                    deCreaseItem={deCreaseItem}
                    deleteItem={deleteItem}
                    postOrder={postOrder} />
                <h2>Food List</h2>
                <FoodList foods={foods} addtocart={addtocart} />
            </Container>
        </AuthContext.Provider>
    )
}