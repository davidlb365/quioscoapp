import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Layout from '@/layout/Layout'
import useQuiosco from '@/hooks/useQuiosco'
import Producto from '@/components/Producto'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const {categoriaActual, loading} = useQuiosco()
    return (
        <Layout pagina={`Menú ${categoriaActual?.nombre}`}>
            <h1 className='text-4xl font-black'>{categoriaActual?.nombre}</h1>
            <p className='text-2xl my-10'>Elige y personaliza tu pedido a continuación</p>
            {loading && (
                <div className="sk-fading-circle">
                    <div className="sk-circle1 sk-circle"></div>
                    <div className="sk-circle2 sk-circle"></div>
                    <div className="sk-circle3 sk-circle"></div>
                    <div className="sk-circle4 sk-circle"></div>
                    <div className="sk-circle5 sk-circle"></div>
                    <div className="sk-circle6 sk-circle"></div>
                    <div className="sk-circle7 sk-circle"></div>
                    <div className="sk-circle8 sk-circle"></div>
                    <div className="sk-circle9 sk-circle"></div>
                    <div className="sk-circle10 sk-circle"></div>
                    <div className="sk-circle11 sk-circle"></div>
                    <div className="sk-circle12 sk-circle"></div>
                </div>
            )}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {categoriaActual?.productos?.map(producto => (
                    <Producto key={producto.id} producto={producto}/>
                ))} 
            </div>
        </Layout>
    )
}


