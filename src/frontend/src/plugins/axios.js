// импортируем axios
import axios from "axios";

// создаём новый экземпляр axios с /api в качестве базового URL
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

// добавляем централизованную обработку ошибок при получении ответа от сервера
axiosInstance.interceptors.response.use(
  (res) => res,
  (e) => {
    let message = "Возникла ошибка при выполнении запроса к серверу";
    axiosInstance.$notifier.error(
      (message = e?.response?.data?.error?.message || message)
    );
    throw new Error(message);
  }
);

export default axiosInstance;
