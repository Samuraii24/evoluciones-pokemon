import '../sass/Card.scss'
import PropTypes from 'prop-types'

const Card = ({name, img}) => {
    return (
        <div className="card">
            <p className="card_name">{name}</p>
            <div className="card_circle"></div>
            <img className="card_img" src={img} alt='pokemon img'></img>
        </div>
    )
}

// Definir propTypes para validar los props
Card.propTypes = {
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired
}

export {Card}
