import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TProperty } from "./types";

export const propertyApi = createApi({
  reducerPath: "propertyApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  tagTypes: ["Property"],
  endpoints: (builder) => ({
    getProperties: builder.query<TProperty[], number>({
      query: (id) => `properties/?portfolio_id=${id}/`,
      providesTags: ["Property"],
    }),
    createProperty: builder.mutation<TProperty, Partial<TProperty>>({
      query: (data) => ({
        url: "properties/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Property"],
    }),
    updateProperty: builder.mutation<
      TProperty,
      Partial<TProperty> & Pick<TProperty, "id">
    >({
      query: ({ id, ...data }) => ({
        url: `properties/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Property"],
    }),
    deleteProperty: builder.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `properties/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Property"],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} = propertyApi;
