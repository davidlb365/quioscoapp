import { useEffect, useState } from "react"
import { formatearDinero } from "@/helpers"
import useQuiosco from "@/hooks/useQuiosco"
import Image from "next/image"

const ModalProducto = () => {
    const {producto, handleChangeModal, handleAgregarPedido, pedido} = useQuiosco()
    const [edicion, setEdicion] = useState(false)
    const handleInitialState = () => {
        const productoState = pedido?.find(prod => prod.id === producto.id)
        if(productoState) {
            setEdicion(true)
            return productoState.cantidad
        }
        return 1
    }
    const [cantidad, setCantidad] = useState(handleInitialState)
    const {imagen, nombre, precio} = producto
    return (
        <div className="md:flex gap-10">
            <div className="max-w-xs md:max-w-none md:w-1/3">
                <Image src={`/assets/img/${imagen}.jpg`} alt={`Imagen Platillo ${nombre}`} width={500} height={600} />
            </div>
            <div className="mt-3 md:mt-0 md:w-2/3">
                <div className="flex justify-end">
                    <button onClick={handleChangeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"> <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
                    </button>
                </div>
                <h1 className="text-xl md:text-3xl font-bold mt-2 md:mt-5">{nombre}</h1>
                <p className="mt-3 md:mt-5 font-black text-2xl md:text-5xl text-amber-500">{formatearDinero(precio)}</p>
                <div className="flex gap-4 mt-3 md:mt-5">
                    <button type="button" onClick={() => {
                        if(cantidad < 2) return
                        setCantidad(cantidad - 1)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <p className="text-xl md:text-3xl">{cantidad}</p>
                    <button type="button" onClick={() => {
                        if(cantidad >= 5) return
                        setCantidad(cantidad + 1)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
                <button type="button" className="bg-indigo-600 transition-colors hover:bg-indigo-800 px-5 py-2 mt-3 md:mt-5 text-white font-bold uppercase rounded" onClick={() => handleAgregarPedido({...producto, cantidad})}>{edicion ? 'Guardar Cambios' : 'Añadir al pedido'}</button>
            </div>
        </div>
    )
}

export default ModalProducto