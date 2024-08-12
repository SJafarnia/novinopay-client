
<h3 align="center">Novinopay Client</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Client for Novinopay Payment gateway written in TypeScript 
    <br> 
</p>

## Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)

##  About <a name = "about"></a>

Get a Merchant ID from [Novinopay](https://novinopay.com/) and start working with this library easily. It's a fairly simple and light-weight package, requires no settings or setup at all and It can make payments and verify them via promises with zero complications using the same type definitions and input names as the [Official Docs](https://novinopay.com/docs).

## Getting Started <a name = "getting_started"></a>

### Prerequisites

```
npm i novinopay-client
```

### Usage <a name="usage"></a>


## Initializing


Create a new Instance of Client
```
const client = new NovinoPayClient("merchantID");
```
If you want to test the sandbox, then:

```
const client = new NovinoPayClient("test")
```
or swap to sandbox while developing, not changing the marchant ID
```
const client = new NovinoPayClient("merchantID", true)
```

## Making a Payment

```
const response = await client.PaymentRequest({
  amount: 10000,
  callBackUrl: "http://localhost:3000/PaymentCallbackURL",
  description: "Product 1",
  invoice_id: "Order 1 ID",
  mobile: "",
  Email: "",
});

```

## Verify a Payment

```
const response = await client.PaymentVerify({
  amount: 10000,
  authority: "Authority id recieved from callback url parameters or Payment response",
});

// always checks if verification amount is the same as the amount issued by your Payment request
and it's not manipulated by user.

```

