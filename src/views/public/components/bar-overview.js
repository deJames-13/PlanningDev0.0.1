import React from 'react'
import ParticularsCard from './chart-card'
import useGetBAR from '../hooks/useGetBAR'
import NoResult from 'src/components/skeletons/no-result.js';

const _defaultNames = [
  'Higher Education',
]

export default function BarOverview() {
  const {
    data, fetchBarData
  } = useGetBAR()
  React.useEffect(() => {
    fetchBarData()
  }, [])

  return (
    <>
      {
        data?.length > 0 && data.map((item, idx) => (
          <ParticularsCard
            key={idx}
            title={item?.title}
            data={item}
            reversed={idx % 2 !== 0}
          />
        ))
      }
      {/* Skeleton for loading */}
      {
        !data?.length && <NoResult />
      }

    </>
  )
}
