import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect, createContext } from "react";
import {toast} from 'react-toastify'

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const obtenerCategorias = async () => {
        setLoading(true)
        const {data} = await axios('/api/categorias')
        setCategorias(data)
        setLoading(false)
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    useEffect(() => {
        const sum = pedido.reduce((acum, currentValue) => acum + (currentValue.precio * currentValue.cantidad), 0)
        setTotal(sum)
    }, [pedido])

    const handleClickCategoria = id => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleAgregarPedido = ({categoriaId, ...prod}) => {
        if(pedido.some(productoState => productoState.id === prod.id)) {
            const pedidoState = pedido.map(productoState => productoState.id === prod.id ? prod : productoState )
            setPedido(pedidoState)
            toast.success('Guardado Correctamente')
        }
        else {
            setPedido([...pedido, prod])
            toast.success('Agregado al Pedido')
        }
        setModal(false)
    }

    const handleEditarCantidades = id => {
        const productoActualizar = pedido.find(prod => prod.id === id)
        setProducto(productoActualizar)
        setModal(!modal)
    }

    const handleEliminarPedido = id => {
        const pedidoActualizado = pedido.filter(prod => prod.id !== id)
        setPedido(pedidoActualizado)
    }

    const colocarOrden = async e => {
        e.preventDefault()
        try {
            setLoading(true)
            await axios.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()})
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)
            toast.success('Pedido Realizado Correctamente')
            setTimeout(() => {
                router.push('/')
            }, 3000);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                handleClickCategoria,
                categoriaActual,
                loading,
                setLoading,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminarPedido,
                nombre,
                setNombre,
                total,
                colocarOrden
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}
export default QuioscoContext