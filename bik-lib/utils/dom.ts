/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
type TWin = {
  innerWidth: number;
  innerHeight: number;
  addEventListener: (
    event: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ) => void;
  removeEventListener: (
    event: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ) => void;
};

// Type definition for document body
type TDoc = {
  body: {
    scrollHeight: number;
    scrollWidth: number; // Corrected from scrollWeight to scrollWidth
  };
};

// Type casting with fallback to an empty object if undefined
export const win: TWin =
  typeof window !== "undefined"
    ? window
    : ({
        innerWidth: 0,
        innerHeight: 0,
        addEventListener: () => {},
        removeEventListener: () => {},
      } as TWin);

export const doc: TDoc =
  typeof document !== "undefined"
    ? document
    : ({
        body: {
          scrollHeight: 0,
          scrollWidth: 0,
        },
      } as TDoc);

// Use localStorage if available, or provide a fallback
export const storage =
  typeof localStorage !== "undefined"
    ? localStorage
    : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
      };
