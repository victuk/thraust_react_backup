import axios, { AxiosError } from "axios";
import { useState } from "react";
import { ApiResponseInterface } from "../utils/apiInterface";
import { urlMaker } from "../utils/urlMaker";
import { authStore } from "../store/authStore";

export const useCategory = () => {

    const [isCategoriesLoading, setCategoriesLoading] = useState(false);
    const [isAddCategoryLoading, setAddCategoryLoading] = useState(false);
    const [isUpdateCategoryLoading, setUpdateCategoryLoading] = useState(false);
    const [isDeleteCategoryLoading, setDeleteCategoryLoading] = useState(false);

    const jwt = authStore((state) => state.userDetails.jwt);

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

    const addNewCategory = async (categoryName: string): Promise<ApiResponseInterface> => {
        try {
            setAddCategoryLoading(true);
            // const jwt = authStore((state) => state.userDetails.jwt);
            
            const response = await axios.post(urlMaker(`/admin/category`), {
                name: categoryName
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
            setAddCategoryLoading(false);
        }
    }

    const updateCategory = async (categoryName: string, categoryId: string): Promise<ApiResponseInterface> => {
        try {
            setUpdateCategoryLoading(true);
            // const jwt = authStore((state) => state.userDetails.jwt);
            
            const response = await axios.put(urlMaker(`/admin/category/${categoryId}`), {
                name: categoryName
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
            setUpdateCategoryLoading(false);
        }
    }

    const deleteCategory = async (categoryId: string): Promise<ApiResponseInterface> => {
        try {
            setDeleteCategoryLoading(true);
            // const jwt = authStore((state) => state.userDetails.jwt);
            
            const response = await axios.delete(urlMaker(`/admin/category/${categoryId}`), {
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
            setDeleteCategoryLoading(false);
        }
    }

    return {
        getAllCategories,
        addNewCategory,
        updateCategory,
        deleteCategory,
        isCategoriesLoading,
        isAddCategoryLoading,
        isUpdateCategoryLoading,
        isDeleteCategoryLoading
    };

}