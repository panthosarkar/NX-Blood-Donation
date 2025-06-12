// import { useState, useEffect } from "react";
// import { TApiResponse } from "../types/response";
// import AxiosAuth from "./AxiosAPI";
// import { getApi2Url } from "./Env";
// import { useAuth2 } from "../context/auth/Auth2Provider";

// // Create store
// type Listener<T> = (state: T) => void;

// function createStore<T>(initialState: T) {
//   let state = initialState;
//   const listeners = new Set<Listener<T>>();

//   return {
//     getState: () => state,
//     setState: (partial: Partial<T>) => {
//       state = { ...state, ...partial };
//       listeners.forEach((listener) => listener(state));
//     },
//     subscribe: (listener: Listener<T>) => {
//       listeners.add(listener);
//       return () => listeners.delete(listener);
//     },
//   };
// }

// // store structure
// interface ApiState {
//   reloadKey: number;
// }

// // Create a global store instance
// const apiStore = createStore<ApiState>({ reloadKey: -1 });

// // Custom hook to access the store
// export function useStore() {
//   const [state, setState] = useState(apiStore.getState());

//   useEffect(() => {
//     const unsubscribe = apiStore.subscribe(setState);
//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return { ...state, setState: apiStore.setState };
// }

// // API Hook
// export default function useApi() {
//   const { reloadKey, setState } = useStore();
//   const { authInfo, chkLoginReq } = useAuth2();

//   const request = async <T>(
//     method: "get" | "post" | "put" | "delete",
//     path: string,
//     payload?: any,
//     query?: Record<string, any>,
//     headers?: Record<string, any>
//   ): Promise<TApiResponse<T>> => {
//     setState({ reloadKey: -1 });
//     try {
//       const formattedUrl = path.startsWith("/") ? path : `/${path}`;

//       let apiRequest;
//       let response: { data: TApiResponse<T> };

//       if (headers !== undefined) {
//         // Make the request
//         apiRequest = AxiosAuth.currentUserAuth(authInfo).setUrl(
//           `${getApi2Url()}${formattedUrl}`
//         );
//         response = await apiRequest?.[method](payload, headers);
//       } else {
//         // Make the request
//         const apiRequest = AxiosAuth.currentUserAuth(authInfo).setUrl(
//           `${getApi2Url()}${formattedUrl}`,
//           query
//         );
//         response = await apiRequest?.[method](payload);
//       }

//       const { data } = response;

//       chkLoginReq(data as any);
//       if (data.error) {
//         throw new Error(data.message);
//       }

//       return data;
//     } catch (error) {
//       throw error;
//     }
//   };

//   return {
//     get: <T = any>(
//       url: string,
//       query?: Record<string, any>
//     ): Promise<TApiResponse<T>> => request("get", url, undefined, query),

//     post: <T = any>(
//       url: string,
//       payload: Record<string, any>,
//       headers?: Record<string, any>
//     ): Promise<TApiResponse<T>> =>
//       request("post", url, payload, undefined, headers),
//     put: <T = any>(
//       url: string,
//       payload: Record<string, any>,
//       headers?: Record<string, any>
//     ): Promise<TApiResponse<T>> =>
//       request("put", url, payload, undefined, headers),
//     remove: (url: string) => request("delete", url),
//     reloadKey,
//     reload: (value = -1) =>
//       setState({ reloadKey: typeof value === "number" ? value : -1 }),
//   };
// }
