import { TApiResponse } from "@/src/types/response";
import { AxiosAuth } from "@/src/utils/AxiosAPI";
import { useState, useEffect } from "react";

// Create store
type Listener<T> = (state: T) => void;

function createStore<T>(initialState: T) {
  let state = initialState;
  const listeners = new Set<Listener<T>>();

  return {
    getState: () => state,
    setState: (partial: Partial<T>) => {
      state = { ...state, ...partial };
      listeners.forEach((listener) => listener(state));
    },
    subscribe: (listener: Listener<T>) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

// store structure
interface ApiState {
  reloadKey: number;
}

// Create a global store instance
const apiStore = createStore<ApiState>({ reloadKey: -1 });

// Custom hook to access the store
export function useStore() {
  const [state, setState] = useState(apiStore.getState());

  useEffect(() => {
    const unsubscribe = apiStore.subscribe(setState);
    return () => {
      unsubscribe();
    };
  }, []);

  return { ...state, setState: apiStore.setState };
}

// API Hook
export function useApi2() {
  const { reloadKey, setState } = useStore();

  const request = async <T>(method: "get" | "post", path: string, payload?: any, query?: Record<string, any>): Promise<TApiResponse<T>> => {
    try {
      const formattedUrl = path.startsWith("/") ? path : `/${path}`;

      // Make the request
      const apiRequest = AxiosAuth.setPath(formattedUrl, query);

      const { data }: { data: TApiResponse<T> } = await apiRequest?.[method](payload);

      if (data.error) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  return {
    get: <T extends unknown>(url: string, query?: Record<string, any>): Promise<TApiResponse<T>> => request("get", url, undefined, query),

    post: <T extends unknown>(url: string, payload: Record<string, any>): Promise<TApiResponse<T>> => request("post", url, payload),
    reloadKey,
    reloadFn: (value = -1) =>
      setState({
        reloadKey: typeof value === "number" ? value : reloadKey + 1,
      }),
  };
}
