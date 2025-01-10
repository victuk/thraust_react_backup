
import { authStore } from "../store/authStore";
import { ApiResponseInterface, OrderInterface } from "../utils/apiInterface";
import { urlMaker } from "../utils/urlMaker";
import axios, { AxiosError } from "axios";
import { useState } from "react";

export const useOrders = () => {

  const [isPendingOrdersLoading, setPendingOrdersLoading] = useState(false);
  const [isOrderHistoryLoading, setOrderHistoryLoading] = useState(false);
  const [isCreateOrderLoading, setCreateOrderLoading] = useState(false);
  const [isMarkAsDeliveredLoading, setMarkAsDeliveredLoading] = useState(false);
  const [isCreatePaymentLinkLoading, setCreatePaymntLinkLoading] = useState(false);


  const [isAdminOrderHistoryLoading, setAdminOrderHistoryLoading] = useState(false);
  const [isAdminPendingOrderLoading, setAdminPendingOrderLoading] = useState(false);

  const jwt = authStore((state) => state.userDetails.jwt);

  const getPendingOrders = async (): Promise<ApiResponseInterface> => {
    try {
      setPendingOrdersLoading(true);
      const result = await axios.get(urlMaker("/customer/pending-orders"), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });

      return {
        data: result.data,
        error: null,
        successful: true,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        data: {
          status: axiosError.response?.status
        },
        error: axiosError.response?.status,
        successful: false,
      };
    } finally {
      setPendingOrdersLoading(false);
    }
  };

  const getOrderHistory = async (
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponseInterface> => {
    try {
      setOrderHistoryLoading(true);
      const result = await axios.get(
        urlMaker(`/customer/order-history/${page}/${limit}`),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      return {
        data: result.data,
        error: null,
        successful: true,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        data: {
          status: axiosError.response?.status
        },
        error: axiosError.response?.data,
        successful: false,
      };
    } finally {
      setOrderHistoryLoading(false);
    }
  };

  const createAnOrder = async ({
    // shopId,
    // hungryFee,
    products,
    totalCost,
    state,
    city,
    address,
  }: OrderInterface): Promise<ApiResponseInterface> => {
    try {

      setCreateOrderLoading(true);

      const result = await axios.post(
        urlMaker(`/customer/create-order`),
        {
          products,
          totalCost,
          state,
          city,
          address,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      return {
        data: result.data,
        error: null,
        successful: true,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        data: {
          status: axiosError.response?.status
        },
        error: axiosError.response?.data,
        successful: false,
      };
    } finally {
      setCreateOrderLoading(false);
    }
  };

  const createPaystackPaymentLink = async (orderId: string): Promise<ApiResponseInterface> => {
    try {
      setCreatePaymntLinkLoading(true);
      const result = await axios.post(
        urlMaker(`/customer/create-payment-link`),
        {
          orderId
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      return {
        data: result.data,
        error: null,
        successful: true,
      };

    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        data: {
          status: axiosError.response?.status
        },
        error: axiosError.response?.data,
        successful: false,
      };
    } finally {
      setCreatePaymntLinkLoading(false);
    }
  }


  const markOrderAsDelivered = async (orderId: string): Promise<ApiResponseInterface> => {
    try {
      setMarkAsDeliveredLoading(true);
      const result = await axios.post(
        urlMaker(`/customer/mark-order-as-delivered`),
        {
          orderId
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      return {
        data: result.data,
        error: null,
        successful: true,
      };

    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        data: {
          status: axiosError.response?.status
        },
        error: axiosError.response?.data,
        successful: false,
      };
    } finally {
      setMarkAsDeliveredLoading(false);
    }
  }

  const adminPendingOrders = async () => {
    try {
      setAdminPendingOrderLoading(true);
      const result = await axios.get(
        urlMaker(`/shop/pending-orders`),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      return {
        data: result.data,
        error: null,
        successful: true,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        data: {
          status: axiosError.response?.status
        },
        error: axiosError.response?.data,
        successful: false,
      };
    } finally {
      setAdminPendingOrderLoading(false);
    }
  }

  const adminOrderHistory = async (page: number = 1, limit: number = 10) => {
    try {
      setAdminOrderHistoryLoading(true);
      const result = await axios.get(
        urlMaker(`/shop/order-history/${page}/${limit}`),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      return {
        data: result.data,
        error: null,
        successful: true,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      return {
        data: {
          status: axiosError.response?.status
        },
        error: axiosError.response?.data,
        successful: false,
      };
    } finally {
      setAdminOrderHistoryLoading(false);
    }
  }

  return {
    getPendingOrders,
    getOrderHistory,
    createAnOrder,
    createPaystackPaymentLink,
    markOrderAsDelivered,
    adminOrderHistory,
    adminPendingOrders,
    isAdminOrderHistoryLoading,
    isAdminPendingOrderLoading,
    isCreateOrderLoading,
    isCreatePaymentLinkLoading,
    isMarkAsDeliveredLoading,
    isOrderHistoryLoading,
    isPendingOrdersLoading
  };
};
