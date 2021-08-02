import React from 'react'
import ProductCard from '../Search/ProductCard'

function SearchResult(data) {
    console.log(data)
    const renderProduct = ()=>{
        if(data){
            try {
                return(
                    data.data.data.map((product) => 
                <ProductCard
                    productUrl= {product.productUrl}
                    image= {product.image}
                    name= {product.name}
                    price= {product.price}
                    site= {product.site}
                />
                    )
                );
            } catch (error) {
                console.error(error)
            }
        }
    }
    
    return (
        <div className="d-flex flex-wrap search-result">
            {renderProduct()}
        </div>
    )
}

export default SearchResult
