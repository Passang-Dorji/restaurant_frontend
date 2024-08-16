
import { Prices } from "../modal/price"
export const fetchPrice= async():Promise<{data: Prices[]}>=>{
    const response = await fetch("http://localhost:4000/api/prices")
    if(!response.ok){
        throw new Error("failed to fetch")
    }
    return response.json()
}