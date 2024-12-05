export default function resourceBuilder(resource) {
    return (builder) => ({
        index: builder.query({
            query: (qStr) => ({
                url: `${resource}${qStr ? qStr : ''}`,
                method: 'GET',
            })
        }),
        thrashed: builder.query({
            query: (qStr) => ({
                url: `${resource}/thrashed${qStr ? qStr : ''}`,
                method: 'GET',
            })
        }),
        all: builder.query({
            query: (qStr) => ({
                url: `${resource}/all${qStr ? qStr : ''}`,
                method: 'GET',
            })
        }),
        show: builder.query({
            query: ({ id, qStr }) => ({
                url: `${resource}/${id}${qStr ? qStr : ''}`,
                method: 'GET',
            })
        }),
        store: builder.mutation({
            query: (data) => ({
                url: `${resource}`,
                method: 'POST',
                body: data
            })
        }),
        update: builder.mutation({
            query: ({ id, data }) => ({
                url: `${resource}/${id}`,
                method: 'PUT',
                body: data
            })
        }),
        destroy: builder.mutation({
            query: (id) => ({
                url: `${resource}/${id}`,
                method: 'DELETE',
            })
        }),
        restore: builder.mutation({
            query: (id) => ({
                url: `${resource}/${id}/restore`,
                method: 'POST',
            })
        }),
    });
}