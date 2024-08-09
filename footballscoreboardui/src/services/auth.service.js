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
            query: (credentials) => ({
                url: '/registeradmin',
                method: 'POST',
                body: credentials,
            }),
        }),
        usersignup: builder.mutation({
            query: (credentials) => ({
                url: '/registeruser',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation, useAdminsignupMutation, useUsersignupMutation } = authApi;
