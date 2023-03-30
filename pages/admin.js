import useSWR from 'swr'
import AdminLayout from "@/layout/AdminLayout";
import axios from 'axios';
import Orden from '@/components/Orden';
import Spinner from '@/components/Spinner';
import useQuiosco from '@/hooks/useQuiosco';

export default function Admin() {
    const {loading} = useQuiosco()
    const fetcher = () => axios('/api/ordenes').then(datos => datos.data)
    const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, { refreshInterval: 100 })
    return (
        <AdminLayout pagina={'Admin'}>
            <h1 className="text-4xl font-black">Panel de Administración</h1>
            <p className="text-2xl my-10">Administra tus órdenes</p>
            {data && data.length ? data.map(orden => <Orden key={orden.id} orden={orden} />) : (!(isLoading || loading) && <p>No hay órdenes pendientes</p>)}
            {(isLoading || loading) && <Spinner />}
        </AdminLayout>
    )
}