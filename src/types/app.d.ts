import express from "express";

interface IexpressResponse extends express.Response {
  fail: (
    data: object | null,
    error?: string | object | null | unknown,
    message?: string,
    status?: number
  ) => void;
  success: (
    data: object,
    error?: object | string | null,
    message?: string,
    status?: number
  ) => void;
}

interface IexpressRequest extends express.Request {
  container: any;
}
