type PaymentRequestMethodInput = {
    amount: number;
    callBackUrl: string;
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

declare class NovinoPay {
    private url;
    private merchant;
    constructor(MerchantId: string, sandbox: boolean);
    private request;
    PaymentRequest({ amount, callBackUrl, invoice_id, description, Email, mobile, }: PaymentRequestMethodInput): Promise<PaymentResponse>;
    PaymentVerify({ amount, authority }: {
        amount: number;
        authority: string;
    }): Promise<unknown>;
}

declare class NovinoPayClient extends NovinoPay {
}

export { NovinoPayClient };
