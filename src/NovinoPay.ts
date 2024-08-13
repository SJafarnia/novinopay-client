import { config } from "./conf";
import {
  PaymentRequestMethodInput,
  PaymentRequestDataType,
  RequestType,
  PaymentResponse,
  PaymentVerificationDataType,
  VerificationResponse,
} from "./types";

/**
 * Description placeholder
 *
 * @export
 * @class NovinoPay
 * @typedef {NovinoPay}
 */
export class NovinoPay {
  /**
   * API Gateway URL
   *
   * @private
   * @type {string}
   */
  private url: string;
  /**
   * Merchant ID
   *
   * @private
   * @type {string}
   */
  private merchant: string;

  /**
   * Creates an instance of NovinoPayClient.
   *
   * @constructor
   * @param {string} MerchantId
   * @param {boolean| null} sandbox Optional, if set true, uses "test" as merchant ID by default and ignores your input
   */
  constructor(MerchantId: string, sandbox: boolean = false) {
    if (typeof MerchantId !== "string") {
      throw new Error("MerchantId is invalid");
    }
    // if (MerchantId.length === config.merchantIDLength) {
    if (sandbox) {
      this.merchant = "test";
    } else {
      this.merchant = MerchantId;
    }
    // } else {
    //   throw new Error(
    //     "The MerchantID must be " + config.merchantIDLength + " Characters."
    //   );
    // }

    this.url = config.https;
  }

  /**
   * Description placeholder
   *
   * @async
   * @param {string} url API Gateway URL
   * @param {RequestType} requestType Action Endpoint in URL
   * @param {string} method HTTPS Request Type
   * @param {(PaymentRequestDataType | PaymentVerificationDataType)} data
   * @returns {PaymentResponse|VerificationResponse|Error} returns a response or an error
   */
  private request = async function (
    url: string,
    requestType: RequestType,
    method: string,
    data: PaymentRequestDataType | PaymentVerificationDataType
  ) {
    url = url + requestType;
    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify(data),
      });

      return response.json();
    } catch (error) {
      if (error) throw error;
      else throw error;
    }
  };

  /**
   *  Receives an Object of payment information
   * @param {PaymentRequestMethodInput} Object.amount
   * @param {PaymentRequestMethodInput} Object.callBackUrl
   * @param {PaymentRequestMethodInput} Object.invoice_id
   * @param {PaymentRequestMethodInput} Object.description
   * @param {PaymentRequestMethodInput} Object.Email
   * @param {PaymentRequestMethodInput} Object.mobile
   * @returns {PaymentResponse}
   */
  PaymentRequest({
    amount,
    callbackUrl,
    invoice_id,
    description,
    Email,
    mobile,
  }: PaymentRequestMethodInput): Promise<PaymentResponse> {
    const self = this;

    const params: PaymentRequestDataType = {
      merchant_id: this.merchant,
      amount: amount,
      callback_url: callbackUrl,
      invoice_id: invoice_id,
      description: description,
      mobile: mobile,
      email: Email,
    };

    const promise = new Promise(
      (resolve: (data: PaymentResponse) => PaymentResponse | void, reject) => {
        self
          .request(self.url, config.API.PaymentRequest, "POST", params)
          .then((data: PaymentResponse) => {
            resolve(data);
          })
          .catch(function (err: any) {
            reject(err);
          });
      }
    );

    return promise;
  }

  /**
   * Receives an Object of paymentObject information
   * @param {number} paymentObject.amount
   * @param {string} paymentObject.authority
   * @returns {VerificationResponse}
   */
  PaymentVerify({
    amount,
    authority,
  }: {
    amount: number;
    authority: string;
  }): Promise<VerificationResponse | Error> {
    const self = this;

    const params: PaymentVerificationDataType = {
      merchant_id: this.merchant,
      amount: amount,
      authority,
    };

    const promise: Promise<VerificationResponse> = new Promise(
      (resolve, reject) => {
        self
          .request(self.url, config.API.PaymentVerification, "POST", params)
          .then((data: VerificationResponse) => {
            resolve(data);
          })
          .catch(function (err: any) {
            reject(err);
          });
      }
    );

    return promise;
  }
}
