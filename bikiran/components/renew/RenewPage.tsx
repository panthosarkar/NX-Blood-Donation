"use client";
import {
  TRenewData,
  TRenewProduct,
  TRenewProductPayload,
} from "./renewProductTypes";
import { Button } from "@bikiran/button";
import { useRouter } from "next/navigation";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { initialRenewData } from "./renewProductConstants";
import { FC, useEffect, useState } from "react";
import useApi from "@/bik-lib/utils/useApi";
import RenewProductComp from "./RenewProductComp";
import PriceCalculationComp from "./PriceCalculationComp";
import RecommendedProductComp from "./RecommendedProductComp";
import ProductNotFoundSection from "./ProductNotFoundSection";
import ProductRenewHeaderSection from "./ProductRenewHeaderSection";
import ProductRenewSkeletonSection from "./ProductRenewSkeletonSection";

const RenewPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  const [renewData, setRenewData] = useState<TRenewData>(initialRenewData);
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  // Destructuring renewData
  const products = renewData?.scopes || [];
  const billingAccounts = renewData?.billingAccounts || [];
  const currency = renewData?.currency?.toLowerCase() || "";

  const [dataLength, setDataLength] = useState<number>(2);

  // Default checked product
  const defaultSelectedData =
    products?.filter((dt: TRenewProduct) => dt.isChecked) || [];

  // State to store selected renew products
  const [selectedData, setSelectedData] =
    useState<TRenewProduct[]>(defaultSelectedData);

  const { get, post } = useApi();
  const { setMessage } = useTemplate();

  const subTotal = selectedData.reduce((acc, dt) => acc + dt.priceOffer, 0);

  const recommendedProducts = products?.filter(
    (i: TRenewProduct) => !i.isChecked
  );

  // Load renew data
  useEffect(() => {
    if (reloadKey !== -2) {
      get(`/admin/billing/renew`, query)
        .then(({ data }) => {
          if (data) {
            // If no data found
            if (Object.keys(data).length === 0) {
              setRenewData({ ...data, notFound: true });
            } else {
              setRenewData(data);
            }
            setSelectedData(
              data?.scopes.filter((dt: TRenewProduct) => dt.isChecked)
            );
          }
        })
        .catch(() => {
          setRenewData({ ...initialRenewData, notFound: true });
        })
        .finally(() => {
          setReloadKey(-2);
        });
    }
  }, [reloadKey, query]);

  // reload renew data once when formData is changed
  useEffect(() => {
    if (reloadKey !== -1) {
      setReloadKey(-1);
    }
  }, [query]);

  const reloadRenewData = () => {
    setReloadKey(-1);
  };

  const selectProduct = (data: TRenewProduct) => {
    setSelectedData((prevData) => {
      if (prevData.some((dt) => dt.subscriptionId === data.subscriptionId)) {
        return prevData.filter(
          (dt) => dt.subscriptionId !== data.subscriptionId
        );
      } else {
        return [...prevData, data];
      }
    });
  };

  // handler to checkout
  const handleCheckout = () => {
    const { subscriptionId, asset, userId } = query;

    const payload: TRenewProductPayload = {
      primarySubscriptionId: subscriptionId,
      // billingAccountId: query?.billingAccounts?.toUpperCase(),
      currency: query?.currency?.toUpperCase(),
      subscriptionIds: selectedData.map((dt) => dt.subscriptionId),
    };

    setLoading(true);
    setMessage("Creating invoice...");

    post(
      `/admin/billing/renew/create-invoice?subscriptionId=${subscriptionId}&asset=${asset}&userId=${userId}`,
      payload
    )
      .then(({ message, data }) => {
        setMessage(message);

        // Redirect to invoice page
        router.push(`/billing/invoice/${data.invoiceId}/update`);
      })
      .catch((err: Error) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isLoading = reloadKey === -1;

  if (isLoading) return <ProductRenewSkeletonSection />;

  if (renewData.notFound) {
    return (
      <section className="">
        <ProductRenewHeaderSection
          billingAccounts={billingAccounts}
          reloadRenewData={reloadRenewData}
          query={query}
          notFound
        />
        <ProductNotFoundSection />
      </section>
    );
  }
  return (
    <section>
      <ProductRenewHeaderSection
        billingAccounts={billingAccounts}
        reloadRenewData={reloadRenewData}
        query={query}
      />

      {/* Selected Renew Product */}

      <div className="overflow-auto pb-7 custom-scrollbar">
        {defaultSelectedData?.length > 0 && (
          <RenewProductComp data={defaultSelectedData[0]} isSelected={true} />
        )}

        {/* Recommend Renew Products */}
        {recommendedProducts.length !== 0 && (
          <RecommendedProductComp
            data={recommendedProducts?.slice(0, dataLength)}
            project={renewData.project}
            selectProduct={selectProduct}
            selectedData={selectedData}
          />
        )}

        {/* Load more button*/}

        {dataLength < recommendedProducts?.length && (
          <button
            type="button"
            className="text-secondary font-medium mt-2 border-b border-secondary"
            onClick={() => setDataLength((prev) => prev + 2)}
          >
            Load more +{recommendedProducts?.length - dataLength}
          </button>
        )}

        <PriceCalculationComp
          subTotal={subTotal}
          selectedData={selectedData.length}
          currency={currency}
        />

        <div className="flex justify-end">
          <Button
            variant="secondary"
            className="px-5 py-2.5"
            onClick={handleCheckout}
            loading={loading}
          >
            Checkout
          </Button>
        </div>
      </div>
    </section>
  );
};
export default RenewPage;
