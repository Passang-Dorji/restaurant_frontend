"use client"
import { Dishes } from "@/app/modal/dish"
import { fetchMenu } from "@/app/service/dish"
import { useState, useEffect } from "react"
import { Prices } from "@/app/modal/price"
export default function RestaurantMenu(){
    const [menu, setMenu] = useState<Dishes[]>([])
    const [prices, setPrices] = useState<Prices[]>([]);

    useEffect(()=>{
        async function loadMenu() {
            try{
                const data = await fetchMenu()
                setMenu(data.data)
            }catch(error){
                console.log("fetching error",error)
            }
        }
        loadMenu()
    },[])

    useEffect(()=>{
        async function loadPrices() {
            try{
                const data = await fetchPrices()
                setPrices(data.data)
            }catch(error){
                console.log("fetching price error",error)
            }
        }
        loadPrices()
    },[])
        
    const fetchPrices = async () => {
        const response = await fetch('/api/prices');
        const data = await response.json();
        setPrices(data);
    };

    const getPriceForDish = (dishId) => {
        const priceObj = prices.find(price => price.dish_id === dishId);
        return priceObj ? priceObj.price : 'N/A';
    };
    return(
        <div className="ml-10 mt-10">
        <table className="w-1/3 bg-fuchsia-500 rounded-lg">
            <thead>
                <tr className="text-white">
                    <th className="text-left px-2 py-2">Name</th>
                    <th className="text-left px-2 py-2">Description</th>
                    <th className="text-left px-2 py-2">Price</th>
                </tr>
            </thead>
            <tbody>
                {menu.map((m) => (
                    <tr key={m.id} className="border-t">
                        <td className="px-2 py-2">{m.name}</td>
                        <td className="px-2 py-2">{m.description}</td>
                        <td className="px-2 py-2">{getPriceForDish(m.id)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

    )
}