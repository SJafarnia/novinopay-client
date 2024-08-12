// src/conf.ts
var config = {
  https: "https://api.novinopay.com/payment/ipg/v2/",
  // merchantIDLength: 36,
  API: {
    PaymentRequest: "request",
    PaymentVerification: "verification"
  }
};

// src/NovinoPay.ts
var NovinoPay = class {
  /**
   * API Gateway URL
   *
   * @private
   * @type {string}
   */
  url;
  /**
   * Merchant ID
   *
   * @private
   * @type {string}
   */
  merchant;
  /**
   * Creates an instance of NovinoPayClient.
   *
   * @constructor
   * @param {string} MerchantId
   * @param {boolean| null} sandbox Optional, if set true, uses "test" as merchant ID by default and ignores your input
   */
  constructor(MerchantId, sandbox = false) {
    if (typeof MerchantId !== "string") {
      throw new Error("MerchantId is invalid");
    }
    if (sandbox) {
      this.merchant = "test";
    } else {
      this.merchant = MerchantId;
    }
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
  request = async function(url, requestType, method, data) {
    url = url + requestType;
    try {
      const response = await fetch(url, {
        method,
        body: JSON.stringify(data)
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
   * @returns {*}
   */
  PaymentRequest({
    amount,
    callbackUrl,
    invoice_id,
    description,
    Email,
    mobile
  }) {
    const self = this;
    const params = {
      merchant_id: this.merchant,
      amount,
      callback_url: callbackUrl,
      invoice_id,
      description,
      mobile,
      email: Email
    };
    const promise = new Promise(
      (resolve, reject) => {
        self.request(self.url, config.API.PaymentRequest, "POST", params).then((data) => {
          resolve(data);
        }).catch(function(err) {
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
   * @returns {VerificationResponse|Error}
   */
  PaymentVerify({
    amount,
    authority
  }) {
    const self = this;
    const params = {
      merchant_id: this.merchant,
      amount,
      authority
    };
    const promise = new Promise(
      (resolve, reject) => {
        self.request(self.url, config.API.PaymentVerification, "POST", params).then((data) => {
          resolve(data);
        }).catch(function(err) {
          reject(err);
        });
      }
    );
    return promise;
  }
};

// src/index.ts
var NovinoPayClient = class extends NovinoPay {
};
export {
  NovinoPayClient
};
