const paymentMethods = [
    {
        id: 10000004,
        provider: "paypal",
        title: "PayPal Payment",
        subTitle: "USD International",
        buttonText: "Pay with PayPal",
        isDefault: 4,
        icon: "",
        priority: 2,
        status: "active"
    },
    {
        id: 10000005,
        provider: "googlepay",
        title: "Google Payment",
        subTitle: "USD International",
        buttonText: "Pay with Google Pay",
        isDefault: 5,
        icon: "",
        priority: 4,
        status: "active"
    },
    {
        id: 10000001,
        provider: "sslcom",
        title: "Debit or Credit cards",
        subTitle: "BDT, USD International",
        buttonText: "Pay with MFS, Cards or Internet Bank",
        isDefault: 1,
        icon: "",
        priority: 1,
        status: "active"
    },
    {
        id: 10000002,
        provider: "bkash",
        title: "bKash Payment",
        subTitle: "BDT - Bangladesh Only",
        buttonText: "Pay with bKash",
        isDefault: 2,
        icon: "",
        priority: 3,
        status: "active"
    },
    {
        id: 10000003,
        provider: "nagad",
        title: "Nagad Payment",
        subTitle: "BDT - Bangladesh Only",
        buttonText: "Pay with Nagad",
        isDefault: 3,
        icon: "",
        priority: 5,
        status: "active"
    }
];

export default paymentMethods;
