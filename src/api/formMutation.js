import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }), 
  endpoints: (builder) => ({
    submitFormData: builder.mutation({
      query: (formData) => ({
        url: 'api',
        method: 'POST',
        body: JSON.stringify(formData),
      }),
    }),
  }),
});

export const { useSubmitFormDataMutation } = api;