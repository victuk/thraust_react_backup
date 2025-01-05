
import { authStore } from "../store/authStore";
import { ApiResponseInterface } from "../utils/apiInterface";
import { urlMaker } from "../utils/urlMaker";
import axios, { AxiosError } from "axios";
import { useState } from "react";

export const useProduct = () => {

    const [isProductsPaginatedLoading, setProductsPaginatedLoading] = useState(false);
    const [isSingleProductLoading, setSingleProductLoading] = useState(false);
    const [isSearchProductsLoading, setSearchProductsLoading] = useState(false);

    const jwt = authStore((state) => state.userDetails.jwt);

    const getNearbyMealsPaginated = async (page: number, limit: number, categoryValue: string = "all"): Promise<ApiResponseInterface> => {
        try {
            setProductsPaginatedLoading(true);
            
            const response = await axios.get(urlMaker(`/customer/meals-nearby/${page}/${limit}/${categoryValue}`), {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
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
            setProductsPaginatedLoading(false);
        }
    }

    const getMealById = async (mealId: string): Promise<ApiResponseInterface> => {
        try {
            setSingleProductLoading(true);

            const response = await axios.get(urlMaker(`/customer/meal-details/${mealId}`), {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
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
            setSingleProductLoading(false);
        }
    }

    const searchMeal = async (searchWord: string): Promise<ApiResponseInterface> => {
        try {
            setSearchProductsLoading(true);

            const response = await axios.post(urlMaker(`/customer/search-meal`), {
                searchWord
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${jwt}`
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
            setSearchProductsLoading(false);
        }
    }

    return {
        getNearbyMealsPaginated,
        getMealById,
        searchMeal,
        isProductsPaginatedLoading,
        isSearchProductsLoading,
        isSingleProductLoading
    }

}