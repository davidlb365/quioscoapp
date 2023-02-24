import useQuiosco from "@/hooks/useQuiosco"
import Image from "next/image"

const Categoria = ({categoria}) => {
    const {handleClickCategoria, categoriaActual} = useQuiosco()
    const {icono, nombre, id} = categoria
    return (
        <>
            <div className={`flex items-center gap-4 w-full border p-5 ${categoriaActual?.id === id && 'bg-amber-400'} hover:bg-amber-400`}>
                <Image alt="Imagen icono" width={70} height={70} src={`/assets/img/icono_${icono}.svg`}  />
                <button type="button" className="text-2xl font-bold hover:cursor-pointer" onClick={() => handleClickCategoria(id)}>
                    {nombre}
                </button>
            </div>
        </>
    )
}

export default Categoria