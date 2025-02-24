import { useState, useEffect } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

const useApi = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!endpoint) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(endpoint);
      setData(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Error al obtener los datos");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const postData = async (newData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post(endpoint, newData);
      setData((prevData) => [...prevData, response.data]);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Error al enviar los datos");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const putData = async (id, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.put(`${endpoint}/${id}`, updatedData);
      setData((prevData) => prevData.map((item) => (item.id === id ? response.data : item)));
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || "Error al actualizar los datos");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete(`${endpoint}/${id}`);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.response?.data?.message || "Error al eliminar los datos");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { axiosInstance, data, loading, error, postData, putData, deleteData };
};

export default useApi;
