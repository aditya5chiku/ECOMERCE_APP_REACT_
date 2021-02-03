
import { ADD_CATEGORY } from './type'
import axios from 'axios'

export const createProductCategory = (category_Id, category) => async (dispatch) => {
    console.log("ID", category_Id)

    fetch(`http://localhost:5000/api/category/create/${category_Id}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(data => console.log("&&&", data))
        .catch(err => console.log(err))
    // const res = await axios.post(`http://localhost:5000/api/category/create/${category_Id}`, category, head);


}