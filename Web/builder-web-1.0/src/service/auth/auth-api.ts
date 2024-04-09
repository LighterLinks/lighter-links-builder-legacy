import LocalStorage from "@/lib/localstroage";
import axios from "axios";
import { User } from "next-auth";
import { instance } from "../interceptor";

const authInstance = axios.create({
  baseURL: "https://api-builder.lighterlinks.io/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function register({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const result = await authInstance.post("/register", {
    name,
    email,
    password,
  });
  return result.data as {
    status: number;
    message: string;
    data?: User;
  };
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const result = await authInstance.post("/login", {
    email,
    password,
  });
  return result.data as {
    status: number;
    message?: string;
    accessToken?: string;
    refreshToken?: string;
  };
}

export async function logout({ refreshToken }: { refreshToken: string }) {
  const result = await authInstance.post("/logout", {
    refreshToken,
  });
  return result.data as {
    status: number;
    message: string;
  };
}

export async function refresh({ refreshToken }: { refreshToken: string }) {
  const result = await authInstance.post("/refresh", {
    refreshToken,
  });
  return result.data as {
    status: number;
    message?: string;
    accessToken?: string;
  };
}

export async function profile() {
  const result = await instance.get("/auth/profile");
  return result.data as {
    id: string;
    email: string;
    iat: number;
    exp: number;
  };
}
