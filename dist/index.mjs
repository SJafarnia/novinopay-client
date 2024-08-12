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
  url;
  merchant;
  constructor(MerchantId, sandbox) {
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
  PaymentRequest({
    amount,
    callBackUrl,
    invoice_id,
    description,
    Email,
    mobile
  }) {
    const self = this;
    const params = {
      merchant_id: this.merchant,
      amount,
      callback_url: callBackUrl,
      invoice_id,
      description,
      mobile,
      email: Email
    };
    const promise = new Promise(function(resolve, reject) {
      self.request(self.url, config.API.PaymentRequest, "POST", params).then(function(data) {
        resolve(data);
      }).catch(function(err) {
        reject(err);
      });
    });
    return promise;
  }
  PaymentVerify({ amount, authority }) {
    const self = this;
    const params = {
      merchant_id: this.merchant,
      amount,
      authority
    };
    const promise = new Promise(function(resolve, reject) {
      self.request(self.url, config.API.PaymentVerification, "POST", params).then(function(data) {
        resolve(data);
      }).catch(function(err) {
        reject(err);
      });
    });
    return promise;
  }
};

// src/index.ts
var NovinoPayClient = class extends NovinoPay {
};
export {
  NovinoPayClient
};
