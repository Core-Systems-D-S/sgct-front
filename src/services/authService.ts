import axiosInstance from './axiosInstance';
import type { RegisterFormValues, AuthTokens } from '../types/auth';

export type DRFValidationErrors = Record<string, string[]>;

export interface RegisterResult {
  success: true;
}

export interface RegisterError {
  success: false;
  fieldErrors: DRFValidationErrors;
}

export type RegisterResponse = RegisterResult | RegisterError;

export async function registerUser(
  payload: Omit<RegisterFormValues, 'confirmPassword'>
): Promise<RegisterResponse> {
  // The backend returns a plain string (not JSON) on 201 success.
  // Using validateStatus prevents Axios from throwing on 201 or 400,
  // and the custom transformResponse avoids a JSON-parse crash on the plain string body.
  const response = await axiosInstance.post<unknown>('/api/v1/users/', payload, {
    validateStatus: (status) => status === 201 || status === 400,
    transformResponse: (data: unknown) => {
      if (typeof data !== 'string') return data;
      try {
        return JSON.parse(data);
      } catch {
        return data; // plain string body — perfectly valid for 201
      }
    },
  });

  if (response.status === 201) {
    return { success: true };
  }

  // status === 400: DRF validation errors object
  return {
    success: false,
    fieldErrors: response.data as DRFValidationErrors,
  };
}

export async function loginUser(
  username: string,
  password: string
): Promise<AuthTokens> {
  const response = await axiosInstance.post<AuthTokens>('/api/token/', {
    username,
    password,
  });
  return response.data;
}
