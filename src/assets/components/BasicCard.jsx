import { PropTypes } from 'prop-types';

//el parametro children permite que ESTE componente reciba una etiqueta html u otro componente de react
//para que este componente reciba un children, debe de tener un etiqueta de apertura y cierre cuando se instancia
export function BasicCard({children, src}){
    return(
        <div className="flex flex-col items-center text-center gap-3 w-fit">
            <img src={`${src}`} alt="image card" />
            <h3>Titulo</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda optio eligendi doloribus reprehenderit impedit velit dignissimos nam unde eius blanditiis</p>
            {children}
        </div>
    )
}

BasicCard.propTypes = {
    children: PropTypes.children,
    src: PropTypes.string
}