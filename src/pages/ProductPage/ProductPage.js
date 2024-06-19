import React from 'react';
import { Link } from 'react-router-dom';

const ProductPage = () => {
  return (
    <div>
      <h1>Informações do Produto</h1>
      <img src="/path/to/product/image.jpg" alt="Imagem do produto" />
      <h2>Nome do Produto</h2>
      <p>Descrição do produto...</p>
      <Link to="/search">Voltar para a página de pesquisa</Link>
    </div>
  );
};

export default ProductPage;