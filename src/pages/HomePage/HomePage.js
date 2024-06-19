import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Catalog from '../../components/Catalog/Catalog';  // Importar o componente Catalog

const HomePage = () => {
  const location = useLocation();

  const getQueryParams = () => {
    return new URLSearchParams(location.search);
  };

  const queryParams = getQueryParams();
  const q = queryParams.get('q');
  
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchActivated, setSearchActivated] = useState(false);

  useEffect(() => {
    if (q) {  
      setInputValue(q);
      setSearchActivated(true);
      setSearchTerm(q); // Define o termo de busca inicial
    }
  }, []);

  const handleChangeValue = (event) => {
    setInputValue(event.target.value);
  };
  
  const handleSearch = () => {
    setSearchTerm(inputValue); // Atualiza o termo de busca ao clicar no botão de pesquisa
    setSearchActivated(true); // Ativa a busca
  };

  return (
    <div className={`container ${searchActivated ? 'search-activated' : ''}`}>
      <div className={`logo-image ${searchActivated ? 'search-activated' : ''}`}>
        <div className="image">
          <img className="logo" src={`${process.env.PUBLIC_URL}//FrameLogo.png`} alt="Logo" />
          <span className={`holtwood-one-sc-regular white-text ${searchActivated ? 'search-activated' : ''}`}>Mercado
            <img className="nome" src={`${process.env.PUBLIC_URL}//nome jacy.png`} alt="Jacy" />
            Catálogo
          </span>
        </div>
        <div className={`query ${searchActivated ? 'search-activated' : ''}`}> 
          <input type="text" className={`${searchActivated ? 'search-activated' : ''}`} value={inputValue} onChange={handleChangeValue} placeholder="Descrição ou código de barras" />          
          <button onClick={handleSearch}><FontAwesomeIcon color="white" icon={faMagnifyingGlass} /></button>
        </div>
      </div>
      <div className={`bottom-div ${searchActivated ? 'expanded' : ''}`}> 
        {searchActivated && <Catalog key={searchTerm} title="Produtos encontrados" q={searchTerm} />}
      </div>
    </div>
  );
};

export default HomePage;
