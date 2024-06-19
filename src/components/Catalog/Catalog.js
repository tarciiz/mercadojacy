import React,  { useEffect, useState } from 'react'; 
import './Catalog.css';
import { createClient } from '@supabase/supabase-js'

// const products = [
//   { id: 1, name: 'Produto 1', price: 'R$ 100,00', image: 'https://cdn-cosmos.bluesoft.com.br/products/7896005309988' },
//   { id: 2, name: 'Produto 2', price: 'R$ 200,00', image: 'https://cdn-cosmos.bluesoft.com.br/products/7896945402282' },
//   { id: 3, name: 'Produto 3', price: 'R$ 300,00', image: 'https://via.placeholder.com/150' },
//   { id: 4, name: 'Produto 4', price: 'R$ 400,00', image: 'https://via.placeholder.com/150' },
//   { id: 5, name: 'Produto 5', price: 'R$ 500,00', image: 'https://via.placeholder.com/150' },
//   { id: 6, name: 'Produto 6', price: 'R$ 600,00', image: 'https://via.placeholder.com/150' },
// ];


          
const Catalog = ({ title, q }) => {
    const supabase = createClient('https://takziyqllixacfdastcg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRha3ppeXFsbGl4YWNmZGFzdGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3NDYwMDAsImV4cCI6MjAzNDMyMjAwMH0.Q7CmfW1sftRnnBfWznYZ9OUkCt5aXsQ7spjKteNriWs')

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
