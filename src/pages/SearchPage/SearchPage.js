import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

const SearchPage = () => {
  return (
    <div>
      <Header />
      <h1>Página de Pesquisa</h1>
      <input type="text" placeholder="Pesquisar..." />
      <br />
      <Link to="/mercadojacy">Voltar para a página inicial</Link>
      <br />
      <Link to="/product">Ver produto</Link>
    </div>
  );
};

export default SearchPage;