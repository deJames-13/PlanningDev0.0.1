import React from 'react'
import ParticularsCard from './chart-card'
import useGetBAR from './useGetBAR'
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
    data?.length > 0 && data.map((item,idx)=>(
        <ParticularsCard
        key={idx}
        title={item?.name}
        data={item}
        reversed={idx % 2 !== 0}
      />
      ))
    }
    {/* Skeleton for loading */}
    {
      !data && (
        <div style={{
          height: '300px',
          width: '100%',
          backgroundColor: 'lightgray',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        
      )
    }


    </>
  )
}
