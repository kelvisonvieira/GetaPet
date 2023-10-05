import { Link } from "react-router-dom"
import Logo from '../../assets/img/logo.png'
function Navbar(){
    return(
       <nav>
        <div>
            <img src={Logo} alt="Get a Pet"/>
            <h2>Get a Pet</h2>
        </div>
          <ul>
              <li>
                <Link to="/">Adotar</Link>
              </li>
              <li>
                <Link to="/">Entrar</Link>
              </li>
              <li>
                <Link to="/">Cadastrar</Link>
              </li>
          </ul>
       </nav>
    )
}


export default Navbar