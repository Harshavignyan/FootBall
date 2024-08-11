import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        adminsignup: builder.mutation({
            query: (formData) => {
                console.log('FormData received:', formData);
                return {
                    url: '/registeradmin',
                    method: 'POST',
                    body: formData, // Assume formData is a valid FormData object
                };
            },
        }),
        usersignup: builder.mutation({
            query: (credentials) => {
                const formData = new FormData();
                Object.keys(credentials).forEach(key => {
                    formData.append(key, credentials[key]);
                });

                return {
                    url: '/registeruser',
                    method: 'POST',
                    body: formData, // FormData object containing all fields
                };
            },
        }),
    }),
});

export const { useLoginMutation, useAdminsignupMutation, useUsersignupMutation } = authApi;
