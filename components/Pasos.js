import { useRouter } from "next/router"

const pasos = [
    {paso: 1, nombre: 'Menu', url: '/'},
    {paso: 2, nombre: 'Resumen', url: '/resumen'},
    {paso: 3, nombre: 'Datos y Total', url: '/total'}
]

const Pasos = () => {
    const router = useRouter()

    const calcularProgreso = () => {
        if(router.pathname === '/') return 'w-[2%]'
        if(router.pathname === '/resumen') return 'w-1/2'
        if(router.pathname === '/total') return 'w-full'
    }
    return (
        <>
            <div className="flex justify-between mb-5">
                {pasos.map(p => (
                    <button key={p.paso} className="text-2xl font-bold" onClick={() => {
                        router.push(p.url)
                    }}>
                        {p.nombre}
                    </button>
                ))}
            </div>
            <div className="bg-gray-100 mb-10">
                <div className={`rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white ${calcularProgreso()}`}></div>
            </div>
        </>
    )
}

export default Pasos