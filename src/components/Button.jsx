import '../sass/Button.scss'

const Button = ({icon, handleClick}) => {
    return (
        <div className='button_box'>
            <button
                className='button' 
                onClick={handleClick}>
                {icon}
            </button>
            <div className='button-shadow'></div>
        </div>
    )
}

export {Button}

// Al cambiar entre llaves se debe usar el nombre tal y como aparece en el archivo
// import {Button} from './button.jsx'