import { useParams } from "react-router-dom"

import "./Restaurant.css"

export default function Restaurant() {
    const { id } = useParams();

    return (
        <div>Restaurant {id}!</div>
    )
}