import axios, { AxiosError } from "axios";
import { useState } from "react";
import { ApiResponseInterface } from "../utils/apiInterface";
import { urlMaker } from "../utils/urlMaker";

export const useCategory = () => {

    const [isCategoriesLoading, setCategoriesLoading] = useState(false);

    const getAllCategories = async (): Promise<ApiResponseInterface> => {
        try {
            setCategoriesLoading(true);
            // const jwt = authStore((state) => state.userDetails.jwt);
            
            const response = await axios.get(urlMaker(`/shared/categories`), {
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": `Bearer ${jwt}`
                }
            });

            return {
                data: response.data,
                error: null,
                successful: true
            };

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
            setCategoriesLoading(false);
        }
    }

    return {
        getAllCategories, isCategoriesLoading
    };

}