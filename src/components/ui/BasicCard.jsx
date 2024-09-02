import { PropTypes } from 'prop-types';

//el parametro children permite que ESTE componente reciba una etiqueta html u otro componente de react
//para que este componente reciba un children, debe de tener un etiqueta de apertura y cierre cuando se instancia
export function BasicCard({children, src, title, text, customClass = ""}){

    return(
        <div className={`flex flex-col items-center text-center gap-3 w-fit ${customClass}`}>
            <img src={`${src}`} alt="image card" />
            <h3>{title}</h3>
            <p>{text}</p>
            {children}
        </div>
    )
}

BasicCard.propTypes = {
    children: PropTypes.children,
    src: PropTypes.string,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    customClass: PropTypes.string
}