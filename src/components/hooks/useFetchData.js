import { useState } from "react";
import { useAxios } from "./useAxios"; // Asegúrate de que la ruta sea correcta

export function useFetchData() {
  const axiosInstance = useAxios(); // Uso de instancia de Axios con autenticación
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendData = async (url, data) => {
    setLoading(true);
    console.log("Sending data:", data); // Añade este console.log para ver los datos enviados
    try {
      const response = await axiosInstance.post(url, data);
      setLoading(false);
      return response.data; // Devuelve la respuesta del servidor
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err; // Lanza el error para manejarlo en el componente
    }
  };

  return { sendData, loading, error };
}
