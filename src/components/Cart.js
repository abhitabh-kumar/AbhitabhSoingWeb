import React, { useEffect, useState } from 'react'
import './cart.css'

const Cart = () => {
    const [final,setFinal]=useState([{
                id:1,
                title:'...',
                price:'...',
                category:'...',
                description:'...',
                image:'...'
            }]);
    const [flag,setFlag]=useState(0);
    useEffect(()=>{
        setFinal(final)
    },[flag])
    useEffect(()=>{
        var item1=JSON.parse(localStorage.getItem("cartItems"));
        var fin=item1.filter(e=>e.count!=0);
        setFinal(item1.filter(e=>e.count!=0));
        console.log(final);
        setFlag(1);
    },[])
  return (
    <div className='cart'>
        <h1>Review Your Order</h1>
        <hr />
        <div className="white">
        {final.map((item,index) => (
                <div key={index} className="box">
                <img className="boxImg" src={item.image} alt="" srcSet="" />
                    <div className="desc">
                        <h2>{item.title}</h2>
                        <p>{item.price}</p>
                    </div>
                    <div className="adding">
                        <span className="view" id={`sub${item.id}`}>-</span>
                        <span className="chang">{item.count}</span>
                        <span className="view" id={`add${item.id}`} >+</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Cart