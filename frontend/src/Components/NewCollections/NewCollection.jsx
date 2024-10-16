import React, { useEffect, useState } from 'react'
import './NewCollection.css'
import Item from '../Item/Item'

 const NewCollection = () => {

  const [new_collection, setNewCollection] = useState([])

  useEffect(()=> {
    fetch("http://localhost:4000/newcollections")
    .then((response) => response.json())
    .then((data) => setNewCollection(data))
  }, [])

  return (
    <div className='newcollection'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
            {new_collection.map((item,i) => {
               return <Item key={i} productId={item.productId} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>

    </div>
  )
}

export default NewCollection
