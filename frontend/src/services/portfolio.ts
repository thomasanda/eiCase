import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TPortfolio } from "./types";

export const portfolioApi = createApi({
  reducerPath: "portfolioApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  tagTypes: ["Portfolio"],
  endpoints: (builder) => ({
    getPortfolios: builder.query<TPortfolio[], void>({
      query: () => "portfolio/",
      providesTags: ["Portfolio"],
    }),
    getPortfoliosById: builder.query<TPortfolio, number>({
      query: (id) => `portfolio/${id}/`,
    }),
    createPortfolio: builder.mutation<TPortfolio, Partial<TPortfolio>>({
      query: (data) => ({
        url: `portfolio/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Portfolio"],
    }),
    updatePortfolio: builder.mutation<
      TPortfolio,
      Partial<TPortfolio> & Pick<TPortfolio, "id">
    >({
      query: ({ id, ...data }) => ({
        url: `portfolio/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Portfolio"],
    }),
    deletePortfolio: builder.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `portfolio/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Portfolio"],
    }),
  }),
});

export const {
  useGetPortfoliosQuery,
  useGetPortfoliosByIdQuery,
  useCreatePortfolioMutation,
  useUpdatePortfolioMutation,
  useDeletePortfolioMutation,
} = portfolioApi;
