import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

import icoEmail from '../../assets/ico/ic-email.svg';
import icoCadeado from '../../assets/ico/ic-cadeado.svg';
import logoHome from '../../assets/images/logo-home.jpg';

function Login() {  

  const [emailAcess,setEmailAcess] = useState('');
  const [passWordAcess,setPassWordAcess] = useState('');

  const history = useHistory();

    async function fetchData(e){      
      e.preventDefault();      

      const data = {
        // email: "testeapple@ioasys.com.br",
        // password: "12341234"      
        email: emailAcess,
        password: passWordAcess
      }
  
      const msgErro = "Credenciais informadas são inválidas, tente novamente.";

      try {        
  
        const response = await api.post('users/auth/sign_in',data);

        if (response.status === 200) {          
          
          localStorage.setItem('access-token',response.headers['access-token']);
          localStorage.setItem('client',response.headers['client']);
          localStorage.setItem('uid',response.headers['uid']);
          
          history.push('/home');
        } else {
          document.getElementById('resp-login').style.color = `#ff0f44`;
          document.getElementById('resp-login').innerText = msgErro;
        }
  
      } catch (error) {        
        
        document.getElementById('resp-login').style.color = `#ff0f44`;
        document.getElementById('resp-login').innerText = msgErro;
        
        console.error('request:',error);
      }
    }

  return (
    <div className="App">
      <header className="App-header">
        <div className="login-header-img">
          <div className="login-header-img-home">
            <img src={logoHome} alt="logo"/>
          </div>          
        </div>
        <div className="login-header-cabecalho">
          <h1>BEM-VINDO AO</h1>
          <h1>EMPRESAS</h1>
        </div>
        <div className="login-header-cabecalho-complemento">
          <h3>Lorem ipsum dolor sit amet, contetur adipiscing elit. Nunc accumsan.</h3>
        </div>                
      </header>      

      <form onSubmit={fetchData} method="post">
          
          <fieldset className="login-fieldset">
            <div className="login-input-email">              
              <div>
                <img src={icoEmail} alt="ico-email"/>
              </div>
              <div className="login-input">
                <input type="email" name="username" value={emailAcess} onChange={e => {setEmailAcess(e.target.value)}} />
              </div>                            
            </div>

            <div className="login-input-password">

              <div>
                <img src={icoCadeado} alt="ico-cadeado"/>
              </div>
              <div className="login-input">
                <input type="password" name="password" id="password-login" value={passWordAcess} onChange={e => {setPassWordAcess(e.target.value)}} />
              </div>              
              <div>
                <i class="far fa-eye"></i>
              </div>
            </div>                    
          </fieldset>

          <span id="resp-login"></span>
          
          <div className="login-button">
            <button type="submit">ENTRAR</button>
          </div>
          
        </form>
    </div>
  );
}

export default Login;
