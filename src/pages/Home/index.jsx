import React, {useEffect, useState} from 'react';

import api from '../../services/api';

import CardEmpresa from '../../components/CardEmpresa';

const Home = ()=>{

    const [empresas,setEmpresas] = useState([]);

    const cabecalho = {
        "access-token":localStorage.getItem('access-token'),
        "client":localStorage.getItem('client'),
        "uid":localStorage.getItem('uid')
    };

    useEffect(()=>{


        console.log('cabeçahlho:',cabecalho);

        async function data(){
            try {

                const response = await api.get('enterprises', {headers: cabecalho}
                )    
    
                console.log('response',response.data);
    
                if (response.status === 200){                    
                    setEmpresas(response.data['enterprises']);
                    console.log('empresas:',empresas);
                }                        
    
            } catch (error) {
                
                console.log('está com erro')
    
            }        
        }        

        data();

    },[]);

    return(
        <div>
            <h1>List Empresas</h1>
            {   
                empresas.map((empresa,i)=>{
                    return( <CardEmpresa key={i} nomeEmpresa={empresa['enterprise_name']} tipoEmpresa={empresa['enterprise_type']['enterprise_type_name']} paisEmpresa={empresa['country']} />);
                })
            }
        </div>
    );
}

export default Home;