export const formattedPayload = (
  type: string,
  payload: Record<string, any>
): Record<string, any> => {
  switch (type) {
    case "domain":
      return {
        title: payload?.title || "",
        subscriptionStart: payload?.subscriptionStart || "",
        quantity: Number(payload?.contractDuration || "0"),
        price: Number(payload?.contractPrice || "0"),
        priceOffer: Number(payload?.contractPriceOffer || "0"),
        vat: Number(payload?.contractVatPercent || "0"),
        domain: payload?.domain || "",
        note: payload?.note || "",
        property: "",
      };
    case "hosting":
      return {
        title: payload?.title || "",
        subscriptionStart: payload?.subscriptionStart || "",
        quantity: Number(payload?.contractDuration || "0"),
        unitName: payload?.contractUnitName || "",
        price: Number(payload?.contractPrice || "0"),
        priceOffer: Number(payload?.contractPriceOffer || "0"),
        vat: Number(payload?.contractVatPercent || "0"),
        disk: payload?.disk || "",
        domain: payload?.domain || "",
        bandwidth: payload?.bandwidth || "",
        cpu: payload?.cpu || "",
        ram: payload?.ram || "",
        ep: payload?.ep || "",
        io: payload?.io || "",
        note: payload?.note || "",
      };

    default:
      return payload;
  }
};

export const productAddApiUrl = (key: string, id: string): string => {
  switch (key) {
    case "domain":
      return `/admin/invoice/${id}/domain/add-domain`;
    case "hosting":
      return `/admin/invoice/${id}/hosting/add-hosting`;
    case "any":
      return "/admin";
    default:
      throw new Error(`No API URL found for key: ${key}`);
  }
};

export const productUpdateApiUrl = (
  key: string,
  invoiceId: number,
  itemId: number
): string => {
  switch (key) {
    case "domain":
      return `/admin/invoice/${invoiceId}/domain/${itemId}/update-domain`;
    case "hosting":
      return `/admin/invoice/${invoiceId}/hosting/${itemId}/update-hosting`;
    case "any":
      return "/admin";
    default:
      return `/`;
  }
};
