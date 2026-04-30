import { useCallback, useState } from "react";
import { InAppBrowser } from "react-native-inappbrowser-reborn";
import { PaymentObjectInterface } from "@/src/schemas/index.shemas";
import { createPaymentSession } from "@/src/services/payment.service";

type PaymentStatus = "idle" | "loading" | "success" | "cancelled" | "error";

export function useInAppPayment() {
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const initiatePayment = useCallback(
    async (options: PaymentObjectInterface) => {
      setStatus("loading");
      setError(null);

      try {
        const url = await createPaymentSession(options);

        const isAvailable = await InAppBrowser.isAvailable();
        if (!isAvailable)
          throw new Error("In-app browser is not available on this device");

        const result = await InAppBrowser.openAuth(url, "kahoot://payment", {
          // iOS options
          dismissButtonStyle: "cancel",
          preferredBarTintColor: "#1a1a2e",
          preferredControlTintColor: "white",
          readerMode: false,
          animated: true,
          modalEnabled: true,
          enableBarCollapsing: false,
          // Android options
          showTitle: true,
          toolbarColor: "#1a1a2e",
          secondaryToolbarColor: "black",
          navigationBarColor: "black",
          navigationBarDividerColor: "white",
          enableUrlBarHiding: true,
          enableDefaultShare: false,
          forceCloseOnRedirection: false,
          animations: {
            startEnter: "slide_in_right",
            startExit: "slide_out_left",
            endEnter: "slide_in_left",
            endExit: "slide_out_right",
          },
          //   headers: {
          //     "my-custom-header": "my-custom-header-value",
          //   },
        });

        if (result.type === "success" && result.url) {
          setStatus("success");
        } else if (result.type === "cancel") {
          setStatus("cancelled");
        } else {
          setStatus("error");
          setError("Payment did not complete.");
        }
      } catch (err: any) {
        setStatus("error");
        setError(err?.message ?? "An unexpected error occurred");
        InAppBrowser.closeAuth();
      }
    },
    [],
  );

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
  }, []);

  return { initiatePayment, status, error, reset };
}
