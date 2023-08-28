import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cart from '../Cart';
import Card from '../Card';
import './home.css';

export default function Home() {
    const [productsData,setProductsData]=useState([]);
    const [cartItems, setCrtItems] = useState([]);

    useEffect(() => {
        axios.get('/Products.json')
          .then(response => {
            setProductsData(response.data);
        })
          .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    const onAdd = (product) => {
        const exist = cartItems.find(x => x.id === product.id);
        if (exist) {
            setCrtItems(
                cartItems.map(x =>
                    x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
                )
            )
        } else {
            setCrtItems([...cartItems, { ...product, qty: 1 }])
        }
    }
    const onRemove = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist.qty === 1) {
            setCrtItems(
                cartItems.filter((x) =>
                    x.id !== product.id
                )
            );
        } else {
            setCrtItems(cartItems.map(x => x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x))
        }
    }
    const onDelete = (product) => {
        setCrtItems(
            cartItems.filter((x) =>
                x.id !== product.id
            )
        );
    }
    const onCancel = () => {
        setCrtItems([]);
    }

    return (
        <div className="mainContainer">
            <div className='subContainer subCaintainer1'>
                <Cart cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} onCancel={onCancel} onDelete={onDelete} setCrtItems={setCrtItems}/>
            </div>
            <div className='subContainer subCaintainer2'>
                <Card productList={productsData} addToCart={onAdd} />
            </div>
        </div>
    )
}
