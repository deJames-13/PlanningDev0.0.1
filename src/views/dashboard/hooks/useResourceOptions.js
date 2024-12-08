
import { useEffect } from 'react'
import useResource from './useResource'

export default function useResourceOptions({ resourceName }) {
    const {
        actions: { fetchDatas },
        states: { data, loading },
    } = useResource(resourceName)

    useEffect(() => {
        fetchDatas('per_page=all')
    }, [])

    return {
        options: data?.length > 0 && data.map((d) => ({ label: d.name, value: d.id })),
        loading: loading,

    }

}
