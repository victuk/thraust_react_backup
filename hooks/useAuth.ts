import { useState } from "react";
import axios, { AxiosError } from "axios";
import { ApiResponseInterface } from "../utils/apiInterface";
import { urlMaker } from "../utils/urlMaker";

interface LoginInterface {
  email: string;
  password: string;
}

interface RegisterInterface extends LoginInterface {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export const useAuth = () => {
  const [isLoginLoading, setLoginLoading] = useState(false);
  const [isAdminLoginLoading, setAdminLoginLoading] = useState(false);
  const [isRegisterLoading, setRegisterLoading] = useState(false);

  const register = async ({
    firstName,
    lastName,
    phoneNumber,
    email,
    password
  }: RegisterInterface): Promise<ApiResponseInterface> => {
    try {
        setRegisterLoading(true);
      const response = await axios.post(
        urlMaker("/customer/register"),
        {
          firstName,
          lastName,
          phoneNumber,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return {
        data: response.data,
        error: null,
        successful: true
      }

    } catch (error) {

      const axiosError = error as AxiosError;

        return {
            data: {
              status: axiosError.response?.status
            },
            error: axiosError.response?.data,
            successful: false
        }
    } finally {
        setRegisterLoading(false);
    }
  };

  const login = async ({
    email,
    password,
  }: LoginInterface): Promise<ApiResponseInterface> => {
    try {
        setLoginLoading(true);
      const response = await axios.post(
        urlMaker("/customer/login"),
        {
          email,
          password
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return {
        data: response.data,
        error: null,
        successful: true
      }
    } catch (error) {

      const axiosError = error as AxiosError;

        return {
            data: {
              status: axiosError.response?.status
            },
            error: axiosError.response?.data,
            successful: false
        }
    } finally {
        setLoginLoading(false);
    }
  };

  const adminLogin = async ({
    email,
    password,
  }: LoginInterface): Promise<ApiResponseInterface> => {
    try {
        setAdminLoginLoading(true);
      const response = await axios.post(
        urlMaker("/shop/login"),
        {
          email,
          password
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return {
        data: response.data,
        error: null,
        successful: true
      }
    } catch (error) {

      const axiosError = error as AxiosError;

        return {
            data: {
              status: axiosError.response?.status
            },
            error: axiosError.response?.data,
            successful: false
        }
    } finally {
      setAdminLoginLoading(false);
    }
  };

  return {register, login, adminLogin, isRegisterLoading, isLoginLoading, isAdminLoginLoading};

};
