import { formatearDinero } from "@/helpers"
import useQuiosco from "@/hooks/useQuiosco"
import Image from "next/image"


const Producto = ({producto}) => {
    const {handleSetProducto, handleChangeModal} = useQuiosco()
    const {nombre, imagen, precio} = producto
    return (
        <div className="p-3 border flex flex-col justify-between">
            <div>
                <Image src={`/assets/img/${imagen}.jpg`} alt={`Imagen Platillo ${nombre}`} width={500} height={600} />
                <h3 className="font-bold text-2xl px-5 pt-3">{nombre}</h3>
            </div>
            <div className="px-5 pb-5">
                <p className="font-black mt-5 text-4xl text-amber-500">{formatearDinero(precio)}</p>
                <button type="button" className="uppercase w-full font-bold bg-indigo-600 text-white p-3 mt-5 transition-colors hover:bg-indigo-800" onClick={() => {
                    handleChangeModal()
                    handleSetProducto(producto)
                }}>Agregar</button>
            </div>
        </div>
    )
}

export default Producto