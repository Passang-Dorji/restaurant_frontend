import { MenuData, Dishes } from "../modal/dish"


export const fetchMenu= async():Promise<{data: Dishes[]}>=>{
    const response = await fetch("http://localhost:4000/api/dishes")
    if(!response.ok){
        throw new Error("failed to fetch")
    }
    return response.json()
}


export const createMenu= async(menuData:MenuData):Promise<{data: Dishes[]}>=>{
    const response = await fetch("http://localhost:4000/api/dishes",{
        method: "POST",
        body: JSON.stringify({ post: menuData }),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    if(!response.ok){
        throw new Error("failed to fetch")
    }
    const data = await response.json()
    return data
}

export const fetchDishByRestaurantId= async(restaurant_id:string):Promise<{data: Dishes[]}>=>{
    const response = await fetch(`http://localhost:4000/api/dishes?restaurant_id=${restaurant_id}`)
    if(!response.ok){
        throw new Error("failed to fetch")
    }
    return response.json()
}
