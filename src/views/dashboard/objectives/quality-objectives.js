import { CProgress, CProgressStacked } from '@coreui/react'
import React from 'react'

const progressGroupExample1 = [
    { title: 'Sentence Here', value1: 34, value2: 78 },
    { title: 'Sentence Here', value1: 56, value2: 94 },
    { title: 'Sentence Here', value1: 12, value2: 67 },
    { title: 'Sentence Here', value1: 43, value2: 91 },
    { title: 'Sentence Here', value1: 22, value2: 73 },
    { title: 'Sentence Here', value1: 53, value2: 82 },
    { title: 'Sentence Here', value1: 9, value2: 69 },
  ]

  export default function QualityObjectives (){
  return (
    <>
     {progressGroupExample1.map((item, index) => (
        <div className="progress-group mb-4" key={index}>
            <div className="progress-group-bars">
              <span className="text-body-secondary small">{item.title}</span>
              <CProgress thin color="info" value={item.value1} />
              <CProgress thin color="info" value={item.value1} />
              <CProgress thin color="info" value={item.value1} />
              <CProgress thin color="info" value={item.value1} />
              <CProgress thin color="warning" value={item.value2} />
            </div>
        </div>
    ))} 
    </>
  )
}


