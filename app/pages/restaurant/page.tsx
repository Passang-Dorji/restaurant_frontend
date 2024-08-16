"use client"
import { fetchRestaurant, searchRestaurantByname } from "@/app/service/restaurant"
import { Restaurants } from "@/app/modal/resturant"
import { fetchDishByRestaurantId } from "@/app/service/dish"
import { useState, useEffect } from "react"
import { Dishes } from "@/app/modal/dish"
export default function RestaurantList(){
    const [restaurants, setRestaurants] = useState<Restaurants[]>([])
    const [name, setName] = useState("")
    const [ dishes,setDishes] = useState<Dishes[]>([])
    useEffect(()=>{
        async function loadRestaurant() {
            try{
                const data = await fetchRestaurant()
                setRestaurants(data.data)
            }catch(error){
                console.log("fetching eror",error)
            }
        }
        loadRestaurant()
    },[])

    async function searchRestaurant() {
        try{
            const data = await searchRestaurantByname(name)
            setRestaurants(data.data)
        }catch(error){
            console.log("fetch error",error)
        }
    }

    async function getDishByRestaurantId(restaurant_id:string) {
        try{
            const data = await fetchDishByRestaurantId(restaurant_id)
            setDishes(data.data)
            console.log(data,"my dishes")
        }catch(error){
            console.log("fetching Menu error",error)
        }  
    }

    return (
       
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">Restaurants</h2>
            <div className="flex justify-center items-center mb-6">
                <input
                className="w-full sm:w-1/2 lg:w-1/3 p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                type="text"
                placeholder="Search restaurants..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                <button
                className="bg-gray-500 text-white font-semibold p-3 rounded-r-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={() => searchRestaurant()}
                >
                Search
                </button>
            </div>
            <div className="bg-gray-100 flex justify-center min-h-screen">
            {!dishes.length? 
                <div className="overflow-x-auto w-1/2 ">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                        <th className="py-3 px-6 text-left text-sm font-medium tracking-wider">Dish Name</th>
                        <th className="py-3 px-6 text-left text-sm font-medium tracking-wider">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurants.map((restaurant, index) => (
                        <tr
                            key={restaurant.id}
                            className={`${
                            index % 2 === 0 ? "bg-gray-100" : "bg-white"
                            } hover:bg-gray-200 cursor-pointer`}
                            onClick={() => getDishByRestaurantId(restaurant.id)}
                        >
                            <td className="py-4 px-6 text-sm font-medium text-gray-900">{restaurant.name}</td>
                            <td className="py-4 px-6 text-sm text-gray-700">{restaurant.address}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div> :
                <div className="overflow-x-auto w-1/2 ">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                    <tr>
                    <th className="py-3 px-6 text-left text-sm font-medium tracking-wider">Name</th>
                    <th className="py-3 px-6 text-left text-sm font-medium tracking-wider">Description</th>
                    <th className="py-3 px-6 text-left text-sm font-medium tracking-wider">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {dishes.map((dish, index) => (
                    <tr
                        key={dish.id}
                        className={`${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                        } hover:bg-gray-200 `}
                    >
                        <td className="py-4 px-6 text-sm font-medium text-gray-900">{dish.name}</td>
                        <td className="py-4 px-6 text-sm text-gray-700">{dish.description}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
             } 
          </div>
        </div>
      );
      
    }      