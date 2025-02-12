import { apiSlice } from './index';
let resource = 'reports';
const reportApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        example: builder.query({
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
    })
});
export const {
    useExampleQuery,
} = reportApiSlice;
export default reportApiSlice;

