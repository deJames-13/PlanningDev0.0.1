import { CProgress } from '@coreui/react'
import React from 'react'

const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
  ]

const ProgressExample = () => {
  return (
    <>
     {progressGroupExample1.map((item, index) => (
        <div className="progress-group mb-4" key={index}>
            <div className="progress-group-bars">
            <span className="text-body-secondary small">{item.title}</span>
            <CProgress thin color="info" value={item.value1} />
            <CProgress thin color="danger" value={item.value2} />
            </div>
        </div>
    ))} 
    </>
  )
}

export default ProgressExample
