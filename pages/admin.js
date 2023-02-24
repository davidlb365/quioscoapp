import useSWR from 'swr'
import AdminLayout from "@/layout/AdminLayout";
import axios from 'axios';
import Orden from '@/components/Orden';

export default function Admin() {
    const fetcher = () => axios('/api/ordenes').then(datos => datos.data)
    const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, { refreshInterval: 100 })
    // console.log(data)
    // console.log(error)
    // console.log(isLoading)
    return (
        <AdminLayout pagina={'Admin'}>
            <h1 className="text-4xl font-black">Panel de Administración</h1>
            <p className="text-2xl my-10">Administra tus órdenes</p>
            {data && data.length ? data.map(orden => <Orden key={orden.id} orden={orden} />) : <p>No hay órdenes pendientes</p> }
            {isLoading && (
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
        </AdminLayout>
    )
}