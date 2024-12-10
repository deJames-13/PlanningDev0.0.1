
import { useEffect } from 'react'
import useResource from './useResource'

export default function useResourceOptions({ resourceName, labelKey = 'name', }) {
    const {
        actions: { fetchDatas },
        states: { data, loading },
    } = useResource(resourceName)

    useEffect(() => {
        fetchDatas('per_page=all')
    }, [])

    return {
        options: data?.length > 0 && data.map((d) => ({
            label: d?.full_name
                || d?.short_name
                || d?.name
                || d?.title
                || d[labelKey] || '',
            value: d.id
        })),
        loading: loading,

    }

}
