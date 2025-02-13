import { apiSlice } from './index';
let resource = 'reports';
const reportApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        example: builder.query({
            query: () => ({
                url: `${resource}/pdf/example`,
                method: "GET",
                responseHandler: async (response) => {
                    const blob = await response.blob();
                    return URL.createObjectURL(blob);
                },
                cache: "no-cache",
            }),
        }),
        sectorReport: builder.query({
            query: (id) => ({
                url: `${resource}/pdf/sectors/${id}`,
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
    useExampleQuery,
    useSectorReportQuery
} = reportApiSlice;
export default reportApiSlice;

