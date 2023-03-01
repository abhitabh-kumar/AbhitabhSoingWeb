import React, { useEffect, useState } from "react";
import './maincontainer.css';

const Maincontainer = () => {
    const [items,setItems]=useState([]);
    const [category,setCategory]=useState([]);
    const [cart,setcart]=useState([]);
    const [tot,setTot]=useState(0);
    const [qty,setQty]=useState(0);
    useEffect(()=>{
        const fetchApi=async()=>{
            const url=`https://fakestoreapi.com/products/categories`;
            const response=await fetch(url);
            const resJson=await response.json();
            setCategory(resJson);
        }
        fetchApi();
        getitem();
    },[]);
    useEffect(()=>{
        if(qty==0) setTot(0);
        console.log(qty);
        localStorage.setItem("cartItems", JSON.stringify(cart));
    },[qty])
    const getitem=async()=>{
            const url=`https://fakestoreapi.com/products`;
            const response=await fetch(url);
            const resJson=await response.json();
            setItems(resJson);
        }
     const cat=async(e)=>{
            let urlitem=category[e.target.id];
            console.log(urlitem);
            const url=`https://fakestoreapi.com/products/category/${urlitem}`;
            const response=await fetch(url);
            const resJson=await response.json();
            setItems(resJson);
    }
    const add=(e)=>{
        let ide=e.target.id;
        let catid=ide.slice(3,ide.length);
        var cartItem;
        for(var i=0;i<items.length;i++){
            if(items[i].id==catid){
                cartItem=items[i];
                break;
            }
        }
        var match=false;
        for(var i=0;i<cart.length;i++){
            if(cart[i].id==cartItem.id){
                match="true";
                cart[i].count+=1;
                break;
            }
        }
        console.log(match);
        if(!match){
            cartItem.count=1;
            setcart([...cart,cartItem])
        }
        setTot(tot+cartItem.price);
        setQty(qty+1);
    }
    const sub=(e)=>{
        let ide=e.target.id;
        let catid=ide.slice(3,ide.length);
        for(var i=0;i<cart.length;i++){
            if(cart[i].id==catid){
                if(cart[i].count>0) {
                setTot(tot-cart[i].price);
                cart[i].count-=1;
                setQty(qty-1);
            }
                break;
            }
        }
    }
  return (
    <div className="mainContainer">
        <div className="first">
        <h1>Categories</h1>
        <ul>
        <li onClick={()=>getitem()}>All items</li>
       
         {category.map((item,index) => (
            <li key={index} className="menuItemBox" id={index} onClick={(e)=>cat(e)}>
            {category[index]}
            </li>
        ))}
        </ul>

        </div>
        <div className="second">
            {items.map((item,index) => (
                <div key={index} className="box">
                    <img className="boxImg" src={item.image} alt="" srcSet="" />
                    <div className="desc">
                        <h2>{item.title}</h2>
                        <p>{item.price}</p>
                        <p className="text">{item.description}</p>
                    </div>
                    <div className="adding">
                        <span className="view" id={`sub${item.id}`} onClick={(e)=>sub(e)}>-</span>
                        <span className="chang">1</span>
                        <span className="view" id={`add${item.id}`} onClick={(e)=>add(e)}>+</span>
                    </div>
                </div>
            ))}
        </div>
        <div className="third">
                <h2>My Cart</h2>
                {cart.map((item,index) => (
                <div key={index} className="box">
                    <div className="desc">
                        <h2>{item.title}</h2>
                        <p>{item.price}</p>
                    </div>
                    <div className="adding">
                        <span className="view" id={`sub${item.id}`} onClick={(e)=>sub(e)}>-</span>
                        <span className="chang">{item.count}</span>
                        <span className="view" id={`add${item.id}`} onClick={(e)=>add(e)}>+</span>
                    </div>
                </div>
            ))}
            <div>Items Total <span>{qty}</span> Rs. {tot}</div>
            <a href="/cart"><button>check Out</button></a>
        </div>
    </div>
  )
}

export default Maincontainer