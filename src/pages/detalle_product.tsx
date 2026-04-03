import { useParams } from "react-router";

const Detalle_product=()=>{
     const { id } = useParams<{ id: string }>();
    return (
        <div>Detalle del producto {id}</div>
        
    )
}

export default Detalle_product;