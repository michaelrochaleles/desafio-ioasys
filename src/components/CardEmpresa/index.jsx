import React from 'react';

import './styles.css';

const CardEmpresa = ({nomeEmpresa, tipoEmpresa, paisEmpresa,...rest})=>{
    return(
        <div className="card-empresa">
            <div>
                <img alt="imagemEmpresa"/>
            </div>
            <div className="card-empresa-info">
                <h3>{nomeEmpresa}</h3>
                <h4>{tipoEmpresa}</h4>
                <h5>{paisEmpresa}</h5>
            </div>                            
        </div>
    );
}

export default CardEmpresa;