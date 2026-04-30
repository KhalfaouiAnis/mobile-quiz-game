import { toast } from "sonner-native";
import { api } from "../lib/api";
import { PaymentObjectInterface } from "../schemas/index.shemas";
import { API_BASE_URL } from "../constants";

export const createPaymentSession = async (payload: PaymentObjectInterface) => {
  try {
    const { data: paymentUrl } = await api.post("/subscriptions/purchase", {
      ...payload,
      urls: {
        successUrl: `https://backend-quiz-games-ejxze.ondigitalocean.app/api/v1/purchase/success`,
        errorUrl: `https://backend-quiz-games-ejxze.ondigitalocean.app/api/v1/purchase/failure`,
      },
    });

    return paymentUrl;
  } catch (error) {
    console.log(error);
    toast.error("Payment failed.");
  }
};
