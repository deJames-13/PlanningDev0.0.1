import React from 'react'

export default function QuarterSummary({ quarters }) {
    const data = quarters.reduce((acc, quarter) => {
        acc.total.target += parseFloat(quarter.target) || 0
        acc.total.accomplishment += parseFloat(quarter.accomplishment) || 0
        return acc
    }, {
        total: {
            target: 0,
            accomplishment: 0,
            percentage: 0
        }
    })
    return (<>

        {/* TOTAL */}
        <div>
            <span className='fw-bold text-uppercase' style={{
                fontSize: '1rem'
            }}>
                Total
            </span>
            <div className="d-flex justify-content-between items-align-center flex-wrap">
                <div className='d-flex flex-column'>
                    <span className='fw-bold'>Target</span>
                    <span>{data?.total?.target}</span>
                </div>
                <div className='d-flex flex-column'>
                    <span className='fw-bold'>Accomplishment</span>
                    <span>{data?.total?.accomplishment}</span>
                </div>
                <div className='d-flex flex-column'>
                    <span className='fw-bold'>Percantage</span>
                    <span className='fst-italic'>{data?.total?.percentage || parseFloat(data?.total?.accomplishment / data?.total?.target * 100 || 0).toFixed(2)}%</span>
                </div>
            </div>
        </div>
        <hr />
        {/* QUARTERS SUMMARY */}
        {
            quarters?.length > 0 && quarters.map((quarter, index) => (
                <div key={index}>
                    <span className='fw-bold text-uppercase' style={{
                        fontSize: '1rem'
                    }}>
                        Quarter {index + 1}
                    </span>
                    <div className="d-flex justify-content-between items-align-center flex-wrap">
                        <div className='d-flex flex-column'>
                            <span className='fw-bold'>Target</span>
                            <span>{quarter.target}</span>
                        </div>
                        <div className='d-flex flex-column'>
                            <span className='fw-bold'>Accomplishment</span>
                            <span>{quarter.accomplishment}</span>
                        </div>
                        <div className='d-flex flex-column'>
                            <span className='fw-bold'>Percentage</span>
                            <span className='fst-italic'>{quarter.percentage || parseFloat(quarter.accomplishment / quarter.target * 100).toFixed(2)}%</span>
                        </div>
                    </div>


                    <hr />


                </div>
            ))
        }
    </>
    )
}
