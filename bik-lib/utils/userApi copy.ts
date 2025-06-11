// import { useAuth2 } from "../context/auth/Auth2Provider";
// import AxiosAuth from "./AxiosAPI";
// import { getApi2Url } from "./Env";
// import { useSyncExternalStore, useEffect } from "react";

// export type TApiResponse<T> = {
//   error: boolean;
//   message?: string;
//   data?: T;
//   referenceName?: string;
// };

// // Global singleton for reloadKey and listeners
// const apiState = (() => {
//   let reloadKey = -1;
//   const listeners = new Set<(key: number) => void>();

//   return {
//     getReloadKey: () => reloadKey,
//     setReloadKey: (key: number) => {
//       reloadKey = key;
//       listeners.forEach((callback) => callback(key));
//     },
//     subscribe: (callback: () => void) => {
//       listeners.add(callback);
//       return () => listeners.delete(callback);
//     },
//     reset: () => {
//       reloadKey = -1; // Reset reloadKey to initial value
//     },
//   };
// })();

// /**
//  * Custom hook to handle API requests with authentication and error handling.
//  * Ensures `reloadKey` is reactive and accessible outside the hook.
//  */
// const useApi = () => {
//     const { authInfo, chkLoginReq } = useAuth2();

//     // Reset reloadKey to -1 only on app initialization or hot-reload
//     useEffect(() => {
//       apiState.reset(); // Reset reloadKey to initial value
//       return () => {
//         // Cleanup listeners when the hook is unmounted
//         apiState.subscribe(() => {});
//       };
//     }, []);

//     // Use `useSyncExternalStore` to force re-render when reloadKey updates
//     const reactiveReloadKey = useSyncExternalStore(
//       apiState.subscribe,
//       apiState.getReloadKey
//     );

//     const request = async <T = any>(
//       method: "get" | "post" | "put" | "delete",
//       url: string,
//       payload?: any,
//       query?: Record<string, any>
//     ): Promise<TApiResponse<T>> => {
//       try {
//         const apiRequest = AxiosAuth.currentUserAuth(authInfo).setUrl(
//           `${getApi2Url()}${url}`,
//           query
//         );

//         const { data }: { data: TApiResponse<T> } =
//           await apiRequest?.[method](payload);

//         chkLoginReq(data as any);
//         if (data.error) throw new Error(data.message);

//         // apiState.setReloadKey(-2); // Reset reload key after successful request
//         return data;
//       } catch (err) {
//         // apiState.setReloadKey(-2);
//         throw err;
//       }
//     };

//     return {
//       get: <T = any>(
//         url: string,
//         query?: Record<string, any>
//       ): Promise<TApiResponse<T>> => request("get", url, undefined, query),

//       post: (url: string, payload: any) => request("post", url, payload),
//       put: (url: string, payload: any) => request("put", url, payload),
//       delete: (url: string) => request("delete", url),

//       reloadKey: reactiveReloadKey, // Reactive reloadKey
//       reload: (key?: number) =>
//         apiState.setReloadKey(typeof key === "number" ? key : -1),
//     };
//   };

//   export default useApi;
