import Spinner from "@/components/Spinner";
import { formatearDinero } from "@/helpers";
import useQuiosco from "@/hooks/useQuiosco";
import Layout from "@/layout/Layout";
import { useCallback, useEffect, useState } from "react";

export default function Total() {
    
    const {pedido, nombre, setNombre, total, colocarOrden, loading} = useQuiosco()
    const comprobarPedido = () => {
        return pedido.length === 0 || nombre === "" || nombre.length < 3
    }

    return(
        <Layout pagina='Total y Confirmar Pedido'>
            <h1 className="text-4xl font-black">Total y Confirmar Pedido</h1>
            <p className="text-2xl my-10">Confirma tu pedido a Continuación</p>
            {loading && <Spinner />}
            <form onSubmit={colocarOrden}>
                <div>
                    <label htmlFor="nombre" className="block text-slate-800 uppercase font-bold text-xl">Nombre</label>
                    <input type="text" id="nombre" className="bg-gray-200 text-black p-2 outline-indigo-600 w-full lg:w-1/3 mt-3 rounded-md" value={nombre} onChange={e => setNombre(e.target.value)}/>
                </div>
                <div className="mt-10">
                    <p className="text-2xl">Total a pagar: {''} <span className="font-bold">{formatearDinero(total)}</span></p>
                </div>
                <div className="mt-5">
                    <input type="submit" className={`w-full lg:w-auto uppercase text-center text-white px-5 py-2 rounded font-bold cursor-pointer ${comprobarPedido() ? 'bg-indigo-300 hover:cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:cursor-pointer'} value="Confirmar Pedido`} disabled={comprobarPedido()} />
                </div>
            </form>
        </Layout>
    )
}