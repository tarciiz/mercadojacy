import React,  { useEffect, useState } from 'react'; 
import './Catalog.css';
import { createClient } from '@supabase/supabase-js'
          
const Catalog = ({ title, q }) => {
    const url = process.env.REACT_APP_SUPERBASE_URL
    const token = process.env.REACT_APP_SUPERBASE_TOKEN
    const supabase = createClient(url, token)

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const formatToBRL = (number) => {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(number);
      };

    const fetchProducts = async () => {
        try {
          // Retrieve data from 'products' table
          
        let { data, error } = await supabase.from('stock_product')
        .select('barcode,name,sale_price')
        .or(`name.ilike.%${q}%, barcode.eq.${q}`);
                
    
          if (error) {
            console.error('error', error)
          }
          if(data){
            console.log('data', data)
            let p = []
            for(let d of data ){
                d.image='https://cdn-cosmos.bluesoft.com.br/products/'+d.barcode
                p.push(d)
            }
            setProducts(p);
          }
        } catch (error) {
          console.error('Error fetching products:', error.message);
        }
      };
            

  return (
    <div className="catalog-container">
      <h2 className="catalog-title">{title}</h2>
      <div className="catalog-grid">
        {products.map((product) => (
          <div key={product.barcode} className="catalog-item">
            <div className="catalog-item-image"><img src={product.image} alt={product.name} /></div>
            <h3 className="catalog-item-name">{product.name}</h3>
            <span >{product.barcode}</span>
            <p className="catalog-item-price">Preço: {formatToBRL(product.sale_price)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
