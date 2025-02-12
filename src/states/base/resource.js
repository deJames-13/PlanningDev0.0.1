import * as changeCase from "change-case";

export default function resourceBuilder(resource) {
    let name = changeCase.camelCase(resource);

    return (builder) => ({
        [`${name}Index`]: builder.mutation({
            query: (qStr) => ({
                url: `${resource}${qStr ? `?${qStr}` : ''}`,
                method: 'GET',
            })
        }),
        [`${name}Thrashed`]: builder.mutation({
            query: (qStr) => ({
                url: `${resource}/thrashed${qStr ? `?${qStr}` : ''}`,
                method: 'GET',
            })
        }),
        [`${name}All`]: builder.mutation({
            query: (qStr) => ({
                url: `${resource}/all${qStr ? `?${qStr}` : ''}`,
                method: 'GET',
            })
        }),
        [`${name}Show`]: builder.mutation({
            query: ({ id, qStr }) => ({
                url: `${resource}/${id}${qStr ? `?${qStr}` : ''}`,
                method: 'GET',
            })
        }),
        [`${name}Store`]: builder.mutation({
            query: (data) => ({
                url: `${resource}`,
                method: 'POST',
                body: data
            })
        }),
        [`${name}Update`]: builder.mutation({
            query: ({ id, data }) => ({
                url: `${resource}/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        [`${name}Destroy`]: builder.mutation({
            query: (id) => {
                return {
                    url: `${resource}/${id}`,
                    method: 'DELETE',
                }
            }
        }),
        [`${name}Restore`]: builder.mutation({
            query: (id) => {
                return {
                    url: `${resource}/${id}/restore`,
                    method: 'PATCH',
                }
            }
        }),
        [`${name}ForceDelete`]: builder.mutation({
            query: (id) => ({
                url: `${resource}/${id}/force-delete`,
                method: 'DELETE',
            })
        }),
    });
}