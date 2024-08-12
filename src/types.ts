import { IPVersion } from "net";

export type PaymentRequestMethodInput = {
  amount: number;
  callBackUrl: string;
  invoice_id: string;
  description: string;
  Email: string;
  mobile: string;
};

export type PaymentRequestDataType = {
  merchant_id: string;
  amount: number;
  callback_url: string;
  invoice_id: string;
  description: string | null;
  email: string | null;
  mobile: string | null;
};

export type PaymentVerificationDataType = {
  merchant_id: string;
  amount: number;
  authority: string;
};

export type PaymentResponse = {
  status: string;
  message: string;
  data: {
    wage: number;
    wage_payer: "merchant" | "customer";
    authority: string;
    trans_id: number;
    payment_url: string;
  } | null;
  errors: [] | null;
};

export type VerificationResponse = {
  status: string;
  message: string;
  data: {
    trans_id: number;
    ref_id: string;
    authority: string;
    card_pan: string;
    amount: number;
    invoice_id: string | null;
    buyer_ip: IPVersion;
    payment_time: number;
  } | null;
  errors: [] | null;
};


export enum RequestType {
  PaymentRequest = "request",
  PaymentVerification = "verification",
}
