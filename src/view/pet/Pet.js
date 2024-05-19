import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

const Pet = () => {
  const navigate = useNavigate();

    const addPet = () => {
        navigate("/pet/add")
    }
    return(
        <div className="container pet-manage">
            <div className="empty-pet">

        <img src="./Remove-bg.ai_1716049467772.png" />
            </div>
        <h1>Look like you <span>DON'T HAVE</span> any pet in our system. </h1> 
        <h3>Must add your boss before you proceed to booking</h3>
        <div onClick={addPet} className="btn"><FontAwesomeIcon icon={faPaw} />    Add boss!</div>
        </div>
    )
}

export default Pet