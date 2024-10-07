import { render } from '@react-email/render';

export const sendEmail = async (emailData, EmailComponent) => {
    //renderizar el componente a string, es la unica forma de que pueda ser utilizado en el email
    const emailHtml = await render(<EmailComponent />); // Convierte el componente a HTML

    //verificar que el componente se renderice a string
    if (typeof emailHtml !== 'string') {
        console.error('Error: emailHtml no es una cadena de texto válida');
        return;
    }

    try {
        const response = await fetch('http://localhost:1337/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: emailData.to,
                subject: emailData.subject,
                //el html es enviado como una cadena de string
                body: emailHtml,
            }),
        });

        if (!response.ok) {
            throw new Error('Error al enviar el correo');
        }

        const data = await response.json();
        console.log('Correo enviado con éxito:', data);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
};
