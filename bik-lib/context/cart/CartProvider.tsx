"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import AxiosAuth from "@/bik-lib/utils/AxiosAPI";
import { useApp } from "@/bik-lib/context/AppProvider";
import { TDomainInfo } from "../../types/domain";
import {
  ApiCartAdd,
  ApiCreateInvoice,
  ApiDeleteCartItem,
  ApiEmptyCart,
  ApiLoadCartData,
  ApiUpdateCartDuration,
} from "./CartOperation";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { TCartData, TCartSummery } from "./cartDataType";
import { useRouter } from "next/navigation";

// types
type TCartContext = {
  reloadCartData: () => void;
  reloadKey: number;
  duration: number;
  setDuration: (duration: number) => void;
  handelMinusClick: (inc: number) => void;
  handelPlusClick: (inc: number) => void;
  loading: string;
  fetching: boolean;
  notFound: boolean;
  cartItems: TCartData[];
  cartSummery: TCartSummery;
  handleAddToCart: (productData: TDomainInfo) => void;
  handleUpdateCartItem: (productData: any) => Promise<any>;
  deleteProduct: (productId: number) => void;
  handleEmptyCart: () => void;
  createInvoice: () => void;
  updateDuration: (cartItemId: number, quantity: number) => void;
};

type TProps = {
  children: React.ReactNode;
};

const CartContext = createContext<TCartContext | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  return context as TCartContext;
}

const cart2store = (
  productData: any,
  hash: string,
  operation: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    AxiosAuth.setPath(`/cart/operation/${operation}`)
      .post({
        hash,
        serviceId: productData.serviceId,
        packageId: productData.id,
        duration: productData.duration,
        type: productData.type,
        property: productData.property,
      })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err: Error) => {
        reject(err);
      });
  });
};

const CartProvider: React.FC<TProps> = ({ children }) => {
  const [duration, setDuration] = useState(12);
  const [reloadKey, setReloadKey] = useState(0);
  const [loading, setLoading] = useState("");
  const [cartData, setCartData] = useState<{
    cartItems: TCartData[];
    cartSummery: TCartSummery;
    notfound?: boolean;
  } | null>(null);

  const router = useRouter();

  const { setMessage, setConfirm, setTemplateLoading, closeModal } =
    useTemplate();
  const { locale } = useApp();
  //   console.log(duration, "cartData");
  const resetState = () => {
    setDuration(12);
  };

  const { authInfo } = useAuth2();

  useEffect(() => {
    // setCartData(null);
    // setLoading("loading");
    if (!authInfo.loading) {
      ApiLoadCartData(authInfo)
        .then(({ data }) => {
          setCartData({
            cartItems: data?.cartItems as TCartData[],
            cartSummery: data?.cartSummery as TCartSummery,
            notfound: data?.cartItems.length === 0,
          });
          resetState();
        })
        .catch((err: Error) => {
          setMessage(err);
          setCartData({
            cartItems: [],
            cartSummery: {
              totalPrice: 0,
              totalPriceOffer: 0,
              save: 0,
            },
            notfound: true,
          });
        })
        .finally(() => {
          setLoading("");
        });
    }
  }, [authInfo, reloadKey, locale, setMessage]);

  const value = useMemo(() => {
    const reloadCartData = (placeholder = true) => {
      if (placeholder) {
        setCartData(null);
        setReloadKey((prev) => prev + 1);
      } else {
        setReloadKey((prev) => prev + 1);
      }
    };

    const handelMinusClick = (inc = 1) => {
      setDuration((currentState) => {
        if (currentState > 1) {
          return currentState - inc;
        }
        return currentState;
      });
    };

    const handelPlusClick = (inc = 1) => {
      setDuration((currentState) => {
        if (currentState < 10) {
          return currentState + inc;
        }
        return currentState;
      });
    };

    const handleAddToCart = (productData: TDomainInfo) => {
      setMessage("Adding to cart...");
      ApiCartAdd(authInfo, productData)
        .then(({ message }) => {
          setMessage(message as string);
          reloadCartData();
          closeModal();
        })
        .catch((err: Error) => {
          setMessage(err);
        });
    };

    const updateDuration = (cartItemId: number, quantity: number) => {
      setMessage("Updating duration...");
      setLoading("loading");
      ApiUpdateCartDuration(authInfo, cartItemId, quantity)
        .then(({ message }) => {
          reloadCartData(false);
          setMessage(message as string);
        })
        .catch((err: Error) => {
          setMessage(err);
        });
    };

    const createInvoice = () => {
      setLoading("btn-loading");
      setMessage("Creating invoice...");

      const payload = cartData?.cartItems.map((item) => item.id) || [0];
      ApiCreateInvoice(authInfo, payload)
        .then(({ message, data }) => {
          setMessage(message as string);
          setReloadKey((prev) => prev + 1);
          router.push(`/payment/${data?.invoiceId || 0}`);
        })
        .catch((err: Error) => {
          setMessage(err);
        })
        .finally(() => {
          setLoading("");
        });
    };

    const handleUpdateCartItem = (productData: any) =>
      new Promise((resolve, reject) => {
        console.log(productData, "productData");
        const typeAdd =
          productData?.type === "domain" ? "update-domain" : "update";
        cart2store(productData, productData.hash || "", typeAdd)
          .then((data) => {
            if (data.error === 0) {
              setCartData(data?.cartData);
              resetState();
            }
            resolve(data);
          })
          .catch((err: Error) => {
            reject(err);
          });
      });

    const deleteProduct = (productId: number) => {
      setConfirm({
        show: true,
        text: "Are you sure you want to remove this item from cart?",
        textCancel: "No",
        txtAction: "Yes",

        clickAction: () => {
          setMessage("Removing...");
          setTemplateLoading(true);
          ApiDeleteCartItem(authInfo, productId)
            .then(({ message }) => {
              setMessage(message as string);
              setConfirm(null);
              reloadCartData();
            })
            .catch((err: Error) => {
              setMessage(err);
            })
            .finally(() => {
              setTemplateLoading(false);
            });
        },
      });
    };
    const handleEmptyCart = () => {
      setConfirm({
        show: true,
        text: "Are you sure you want to empty the cart?",
        textCancel: "No",
        txtAction: "Yes",

        clickAction: () => {
          setMessage("Removing...");
          setTemplateLoading(true);
          ApiEmptyCart(authInfo)
            .then(({ message }) => {
              setMessage(message as string);
              setConfirm(null);
              reloadCartData();
            })
            .catch((err: Error) => {
              setMessage(err);
            })
            .finally(() => {
              setTemplateLoading(false);
            });
        },
      });
    };

    return {
      reloadCartData,
      reloadKey,
      duration,
      setDuration,
      handelMinusClick,
      handelPlusClick,
      // cartData,
      loading,
      fetching: !cartData,
      notFound: cartData?.notfound || false,
      cartItems: cartData?.cartItems || [],
      cartSummery: cartData?.cartSummery as TCartSummery,
      handleAddToCart,
      handleUpdateCartItem,
      deleteProduct,
      handleEmptyCart,
      createInvoice,
      updateDuration,
    };
  }, [
    authInfo,
    cartData,
    closeModal,
    duration,
    loading,
    reloadKey,
    router,
    setConfirm,
    setMessage,
    setTemplateLoading,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
