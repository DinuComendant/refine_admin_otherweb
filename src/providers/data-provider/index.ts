"use client";

import { DataProvider } from "@refinedev/core/dist/contexts/data/types";
import dataProviderSimpleRest from "@refinedev/simple-rest";

const API_URL = "http://192.168.0.122:8000";
const API_KEY =
  "APIKEY wMBb2XUctRtOOrULI82rcbXH5FiT27fwWZLqH7p4/8Oo2K3nVQ/JrYFghukbncxDxrfYLBUzqn+RzYL9uwaWPw==";

export const dataProvider: DataProvider = {
  getOne: async ({ resource, id }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY!,
      },
    });
    const data = await response.json();
    console.log("GET BRIEF", data);
    return {
      data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY!,
      },
    });
    const data = await response.json();
    return {
      data,
    };
  },
  getMany: async ({ resource }) => {
    const response = await fetch(`${API_URL}/${resource}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY!,
      },
    });
    const data = await response.json();
    return { data };
  },
  create: async ({ resource, variables }) => {
    const res = await fetch(`${API_URL}/${resource}`, {
      method: "POST",
      body: JSON.stringify(variables),
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY!,
      },
    });
    const response = await res.json();
    return await res.json();
  },

  deleteOne: async ({ resource, id }) => {
    const res = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY!,
      },
    });
    const data = await res.json();

    return {
      data,
    };
  },

  getList: async ({ resource, pagination, sorters, filters, meta }) => {
    const { current, pageSize } = pagination ?? {};

    const response = await fetch(
      `${API_URL}/${resource}?page=${current}&page_size=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: API_KEY!,
        },
      }
    );
    const data = await response.json();
    const total = data.total;

    return { data, total };
  },
  getApiUrl: () => API_URL,
  // custom: async ({id, state}) => {
  //   const response = await fetch(`${API_URL}/${id}/state`, {
  //     method: "POST",
  //     body: JSON.stringify(state),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: API_KEY!
  //     }
  //   })
  //   const data = await response.json()
  //   return {
  //     data
  //   }
  // }
};
