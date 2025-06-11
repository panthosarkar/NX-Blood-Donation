/* eslint-disable no-undef */

import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import CorsHandle, { TMethod } from "../CorsHandle";

export const OptionOk = () => {
  // Headers
  const path = headers().get("path") || "";
  const origin = headers().get("origin") || "";
  const method: TMethod = headers().get("method") as TMethod;

  // Cors Handel
  const corsValidate = new CorsHandle(origin, method);
  const extHeaders = corsValidate.getHeaders(path);

  return NextResponse.json(null, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      ...extHeaders,
    },
  });
};

export const ApiResSuccess = (
  message: string,
  data: null | object | [] = null,
  reference = ""
) => {
  // Headers
  const path = headers().get("path") || "";
  const origin = headers().get("origin") || "";
  const method: TMethod = headers().get("method") as TMethod;

  // Cors Handel
  const corsValidate = new CorsHandle(origin, method);
  const extHeaders = corsValidate.getHeaders(path);

  return NextResponse.json(
    { error: 0, message, data, reference },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...extHeaders,
      },
    }
  );
};

export const ApiResError = (
  message: string,
  data: null | object | [] = null,
  reference = ""
) => {
  // Headers
  const path = headers().get("path") || "";
  const origin = headers().get("origin") || "";
  const method: TMethod = headers().get("method") as TMethod;

  // Cors Handel
  const corsValidate = new CorsHandle(origin, method);
  const extHeaders = corsValidate.getHeaders(path);

  return NextResponse.json(
    { error: 1, message, data, reference },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...extHeaders,
      },
    }
  );
};

export const ApiResValidateError = (obj: any) => {
  // Headers
  const path = headers().get("path") || "";
  const origin = headers().get("origin") || "";
  const method: TMethod = headers().get("method") as TMethod;

  // Cors Handel
  const corsValidate = new CorsHandle(origin, method);
  const extHeaders = corsValidate.getHeaders(path);

  return NextResponse.json(
    {
      error: 2,
      message: obj.message,
      data: obj.data,
      reference: obj.reference,
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...extHeaders,
      },
    }
  );
};
