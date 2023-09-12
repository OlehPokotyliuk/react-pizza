import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const FullPizza = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [pizza,setPizza] = useState('')
  useEffect(()=>{
    async function fetchPIzza(){
     try{
      const {data} = await axios.get(`https://64f093088a8b66ecf779e060.mockapi.io/items/`+id);
     setPizza(data);
     }catch(err){
      alert('Ошибка при загрузке данных');
      navigate('/');
     }
    }
    fetchPIzza();
  },[])
  if(!pizza){
    return "Загрузка..."
  }
  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} P</h4>
    </div>
  );
};

