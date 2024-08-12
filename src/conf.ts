import { RequestType } from "./types";

export const config = {
  https: "https://api.novinopay.com/payment/ipg/v2/",
  // merchantIDLength: 36,
  API: {
    PaymentRequest: "request" as RequestType,
    PaymentVerification: "verification" as RequestType,
  },
};
