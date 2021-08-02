import React from 'react'


function ProductCard(props){
    return (
    <div className="productCard">
            <a href={props.productUrl}>
                <div className="card">
                <img src={props.image} alt={props.name}/>
                <div className="card-body">
              <h2>{props.name}</h2>
              <p>Rs.{props.price}</p>
              <h5>{props.site}</h5>
                </div>
                </div>
            </a>
    </div>
        
    )
}

export default ProductCard
