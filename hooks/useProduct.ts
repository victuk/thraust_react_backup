
import { ProductInterface } from "../interfaces/ProductInterface";
import { authStore } from "../store/authStore";
import { ApiResponseInterface } from "../utils/apiInterface";
import { urlMaker } from "../utils/urlMaker";
import axios, { AxiosError } from "axios";
import { useState } from "react";



export const useProduct = () => {

    const [isProductsPaginatedLoading, setProductsPaginatedLoading] = useState(false);
    const [isSingleProductLoading, setSingleProductLoading] = useState(false);
    const [isSearchProductsLoading, setSearchProductsLoading] = useState(false);
    const [isUploadProductsLoading, setUploadProductsLoading] = useState(false);
    const [isEditProductsLoading, setEditProductsLoading] = useState(false);
    const [isDeleteProductsLoading, setDeleteProductsLoading] = useState(false);
    const [isAdminHomeLoading, setAdminHomeLoading] = useState(false);


    const adminHome = async (): Promise<ApiResponseInterface> => {
        try {
            setAdminHomeLoading(true);

            const response = await axios.get(urlMaker(`/shop/home`), {
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
            setAdminHomeLoading(false);
        }
    }

    const jwt = authStore((state) => state.userDetails.jwt);

    const uploadProduct = async ({
        productName,
        description,
        pictures,
        cost,
        forType,
        stockStatus,
        sizeAndColor,
        categories
    }: ProductInterface) => {
        try {
            setUploadProductsLoading(true);

            const response = await axios.post(urlMaker(`/shop/shop-product`), {
                productName,
                description,
                pictures,
                cost,
                forType,
                stockStatus,
                sizeAndColor,
                categories
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
            setUploadProductsLoading(false);
        }
    }

    const editProduct = async ({
        _id,
        productName,
        description,
        pictures,
        cost,
        forType,
        stockStatus,
        sizeAndColor,
        categories
    }: ProductInterface) => {
        try {
            setEditProductsLoading(true);

            const response = await axios.put(urlMaker(`/shop/shop-product/${_id}`), {
                productName,
                description,
                pictures,
                cost,
                forType,
                stockStatus,
                sizeAndColor,
                categories
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
            setEditProductsLoading(false);
        }
    }

    const deleteProduct = async (id: string) => {
        try {
            setDeleteProductsLoading(true);

            const response = await axios.delete(urlMaker(`/shop/shop-product/${id}`), {
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
            setDeleteProductsLoading(false);
        }
    }

    const getProductsPaginated = async (page: number, limit: number, categoryValue: string = "all"): Promise<ApiResponseInterface> => {
        try {
            setProductsPaginatedLoading(true);
            
            const response = await axios.get(urlMaker(`/shared/shop-products/${page}/${limit}/${categoryValue}`), {
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

    const getProductById = async (mealId: string): Promise<ApiResponseInterface> => {
        try {
            setSingleProductLoading(true);

            const response = await axios.get(urlMaker(`/shared/shop-product/${mealId}`), {
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
        getProductsPaginated,
        getProductById,
        searchMeal,
        uploadProduct,
        deleteProduct,
        editProduct,
        adminHome,
        isAdminHomeLoading,
        isProductsPaginatedLoading,
        isSearchProductsLoading,
        isSingleProductLoading,
        isUploadProductsLoading,
        isEditProductsLoading,
        isDeleteProductsLoading
    }

}