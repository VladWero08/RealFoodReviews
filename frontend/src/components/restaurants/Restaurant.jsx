import { useParams } from "react-router-dom"

import "./Restaurant.scss"

export default function Restaurant() {
    const { id } = useParams();

    return (
        <div>Restaurant {id}!</div>
    )
}