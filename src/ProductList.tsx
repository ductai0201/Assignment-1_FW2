import React, { useContext, useEffect } from 'react'
import { contextProvider } from './context'

const ProductList = () => {
    const {products,isLoading,error,fetchProducts,addProducts,updateProducts,deleteProducts} = useContext(contextProvider)
    
    useEffect(()=>{
        fetchProducts()
    },[])
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>{error}</div>
  return (
    <>
        {products?.map((product:any)=>(
            <div key={product.id}>{product.name}</div>
        ))}
        <button onClick={()=>addProducts({name: 'Product added'})}>Thêm</button>
        <button onClick={()=>updateProducts({name: 'Product updated',id:4})}>Sửa</button>
        <button onClick={()=>deleteProducts(4)}>Xóa</button>
    </>
  )
}

export default ProductList