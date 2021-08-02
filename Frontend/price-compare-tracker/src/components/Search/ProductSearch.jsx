import React, {useState, useEffect} from "react";
import { heroBg, heroVector } from "../../images/homeImages";
import SearchResult from "./SearchResult";
import axios from 'axios'
import {FaSearchDollar} from 'react-icons/fa'

function ProductSearch() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);


  async function loadSearchData() {
    const res = await axios.get(
      `/api/product/search/?search=${query}`
    );
    setData(res);
  }
  // const search = async(query)=>{
  //   const res = await axios.get(
  //     `/api/product/search/?search=${query}`
  //   );
  //   setData(res);
  // }
  // console.log(data.data)
  // useEffect(() => {
  //   search(query)
  // }, [query])
  const inputEvent = (e)=>{
    const data = e.target.value;
    setQuery(data);
  }

    return (
        <>
            <section className="hero text-center">
      <div
        className="hero-background h-100 w-100 all-center"
        style={{ background: `url(${heroBg})` }}
      >
        <div className="container h-100 all-center-column justify-content-sm-around">
          <div className="caption all-center-column">
            <div className="title bold">
              Welcome to <span className="dark">CompareBase</span>
            </div>
            <div className="subtitle">
              We help you buy any products from various ecommerce site at minimum price.
            </div>
            <div className="form-group-lg">
              <label htmlFor="productUrl" className="d-block">
              </label>
              <input
                type="text"
                className="form-control-lg search-text"
                placeholder="Search for any product Eg. Iphone 12 Pro Max, Redmi Note 10 Pro, Amul Chocolate, Chocolate Mould"
                required
                value={query}
                onChange={inputEvent}
              />
              <button type="button" class="btn btn-primary" onClick={loadSearchData}>Search <FaSearchDollar/></button>
            </div>
          </div>
          <img
            src={heroVector}
            alt="vector"
            className="vector d-sm-block d-none"
          />
        </div>
        <div>
          
        </div>
      </div>
    </section>

    {query === "" ? null : <SearchResult data = {data} />}  
    {/* <SearchResult data={data}/> */}
        </>
    )
}

export default ProductSearch
