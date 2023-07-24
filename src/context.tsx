import React, { createContext, useState } from 'react'
import { instance } from './config'

export const contextProvider = createContext({} as any)

const ContextProduct = ({children}:any) => {
    const [products,setProducts] = useState<any>([])
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState('')
    const fetchProducts = async()=>{
        try {
            setProducts(await instance.get('/products'))            
        } catch (error:any) {
            setError(error.message)
        }
        finally{
            setIsLoading(false)
        }
    }

    const addProducts = async (product:any)=>{
        try {
            setProducts([...products,await instance.post('/products',product)])            
        } catch (error:any) {
            setError(error.message)
        }
        finally{
            setIsLoading(false)
        }
    }

    const updateProducts = async (product:any)=>{
        try {
            await instance.put('/products/'+product.id,product)
            setProducts(products?.map((item:any)=> item.id == product.id ?product : item))            
        } catch (error:any) {
            setError(error.message)
        }
        finally{
            setIsLoading(false)
        }
    }

    const deleteProducts = async (id:any)=>{
        try {
            await instance.delete('/products/'+id)
            setProducts(products?.filter((item:any)=> item.id != id))            
        } catch (error:any) {
            setError(error.message)
        }
        finally{
            setIsLoading(false)
        }
    }
  return (
    <contextProvider.Provider value={{products,isLoading,error,fetchProducts,addProducts,updateProducts,deleteProducts}}>
        {children}
    </contextProvider.Provider>
  )
}

export default ContextProduct