import { apiSlice } from './index';
let resource = 'reports';
const reportApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        example: builder.mutation({
            query: () => ({
                url: `${resource}/example`,
                method: "GET",
                responseHandler: async (response) => {
                    const blob = await response.blob();
                    return URL.createObjectURL(blob);
                },
                cache: "no-cache",
            }),
        }),
        sectorReport: builder.mutation({
            query: (id) => ({
                url: `${resource}/sectors/${id}`,
                method: "GET",
                responseHandler: async (response) => {
                    const blob = await response.blob();
                    return URL.createObjectURL(blob);
                },
                cache: "no-cache",
            }),
        }),


    })
});
export const {
    useExampleMutation,
    useSectorReportMutation,
} = reportApiSlice;
export default reportApiSlice;

