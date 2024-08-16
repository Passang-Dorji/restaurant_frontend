
import { Restaurants } from "../modal/resturant"

export const fetchRestaurant= async():Promise<{data: Restaurants[]}>=>{
    const response = await fetch("http://localhost:4000/api/restaurants")
    if(!response.ok){
        throw new Error("failed to fetch")
    }
    return response.json()
}

export const searchRestaurantByname = async(name:string):Promise<{data: Restaurants[]}>=>{
    const response = await fetch(`http://localhost:4000/restaurants/search?name=${name}`)
    if(!response.ok){
        throw new Error("failed to fetch")
    }
    return response.json()
}