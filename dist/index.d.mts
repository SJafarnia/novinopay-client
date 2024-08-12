import { IPVersion } from 'net';

type PaymentRequestMethodInput = {
    amount: number;
    callbackUrl: string;
    invoice_id: string;
    description: string;
    Email: string;
    mobile: string;
};
type PaymentResponse = {
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
type VerificationResponse = {
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

/**
 * Description placeholder
 *
 * @export
 * @class NovinoPay
 * @typedef {NovinoPay}
 */
declare class NovinoPay {
    /**
     * API Gateway URL
     *
     * @private
     * @type {string}
     */
    private url;
    /**
     * Merchant ID
     *
     * @private
     * @type {string}
     */
    private merchant;
    /**
     * Creates an instance of NovinoPayClient.
     *
     * @constructor
     * @param {string} MerchantId
     * @param {boolean| null} sandbox Optional, if set true, uses "test" as merchant ID by default and ignores your input
     */
    constructor(MerchantId: string, sandbox?: boolean);
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
    private request;
    /**
     * Description placeholder
     *
     * @param {PaymentRequestMethodInput} Object
     * @param {PaymentRequestMethodInput} Object.amount
     * @param {PaymentRequestMethodInput} Object.callBackUrl
     * @param {PaymentRequestMethodInput} Object.invoice_id
     * @param {PaymentRequestMethodInput} Object.description
     * @param {PaymentRequestMethodInput} Object.Email
     * @param {PaymentRequestMethodInput} Object.mobile
     * @returns {*}
     */
    PaymentRequest({ amount, callbackUrl, invoice_id, description, Email, mobile, }: PaymentRequestMethodInput): Promise<PaymentResponse>;
    /**
     * Description placeholder
     * @param {number} paymentObject.amount
     * @param {string} paymentObject.authority
     * @returns {VerificationResponse|Error}
     */
    PaymentVerify({ amount, authority, }: {
        amount: number;
        authority: string;
    }): Promise<VerificationResponse | Error>;
}

declare class NovinoPayClient extends NovinoPay {
}

export { NovinoPayClient };
