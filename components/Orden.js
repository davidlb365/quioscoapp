import { formatearDinero } from '@/helpers'
import axios from 'axios'
import { toast } from 'react-toastify'
import Image from 'next/image'
import useQuiosco from '@/hooks/useQuiosco'

export default function Orden({orden}) {
    const {setLoading} = useQuiosco()
    const {id, nombre, total, pedido} = orden
    const completarOrden = async () => {
        try {
            setLoading(true)
            await axios.post(`/api/ordenes/${id}`)
            toast.success('Orden Lista')
        } catch (error) {
            toast.error('Hubo un Error')
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='border p-10 space-y-5'>
            <h3 className="text-2xl font-bold">Orden: {id}</h3>
            <p className="text-lg font-bold">Cliente: {nombre}</p>
            <div>
                {pedido.map(platillo => (
                    <div key={platillo.id} className='py-3 sm:flex border-b last-of-type:border-0 items-center'>
                        <div className='sm:w-32 sm:shrink-0'>
                            <Image src={`/assets/img/${platillo.imagen}.jpg`} alt={`Imagen producto ${platillo.nombre}`} width={500} height={600} className='w-full' />
                        </div>
                        <div className="p-5 space-y-2">
                            <h4 className='text-xl font-bold text-amber-500'>{platillo.nombre}</h4>
                            <p className='text-lg font-bold'>Cantidad: {platillo.cantidad}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='md:flex md:items-center md:justify-between my-10'>
                <p className='mt-5 font-black text-4xl text-amber-500'>Total a pagar: {formatearDinero(total)}</p>
                <button type='button' className='bg-indigo-600 hover:bg-indigo-800 text-white mt-5 md:mt-0 py-3 px-10 uppercase font-bold rounded-lg' onClick={completarOrden}>
                    Completar Orden
                </button>
            </div>
        </div>
    )
}
