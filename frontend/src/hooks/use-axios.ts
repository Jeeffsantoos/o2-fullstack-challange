import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig } from "axios";

axios.defaults.baseURL = 'http://localhost:3000/api/v1/'

type SetDataFunction<T> = (data: T) => void;

export const useAxios = <T>() => {
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = useCallback(async (params: AxiosRequestConfig, setData: SetDataFunction<T>): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await axios.request(params);
      setData(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("Error " + error.message);
        throw error.response?.data.message;
      } else {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []
  );


  return [error, isLoading, fetchData] as const;
};
