import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useGetDepsMutation } from 'src/states/api/charts.js'
import { setResource } from 'src/states/slices/resources.js'

export default function SectorNavList() {
    const dispatch = useDispatch()
    const departmentsList = useSelector((state) => state?.resources?.list?.departmentsList || {});
    const [getDeps, { isLoading }] = useGetDepsMutation()
    const [list, setList] = useState([])

    useEffect(() => {
        setList(departmentsList)
        getDeps().unwrap().then((res) => {
            setList(res.data)
            dispatch(setResource({
                resource: 'departmentsList',
                data: res.data,
                type: 'list'
            }))
        })
    }, [])




    return (
        <div className="sector-nav-list h-100 p-lg-5 mt-lg-5">
            <h3></h3>
            <hr />
            {
                isLoading &&
                <>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </>
            }
            <ul>
                {list?.length > 0 && list.map((item, index) => {

                    if (item.type === 'division') {
                        return <li key={index} className="pl-3 fw-bold text-uppercase pt-3">
                            <span className='text-primary'>
                                {item.name}
                            </span>

                            {item?.sectors?.length > 0 && <ul>
                                {item.sectors.map((sector, index) => {
                                    return <li key={index} className="pl-20 fw-normal text-capitalize">
                                        <a href={`/sectors/${sector.slug}`}>{sector.name}</a>
                                    </li>
                                })}
                            </ul>}


                        </li>
                    }
                    if (item.type === 'department') {
                        return <li key={index} className="pl-20 text-uppercase">
                            <span className='text-primary'>
                                {item.name}
                            </span>

                            {item?.sectors?.length > 0 && <ul>
                                {item.sectors.map((sector, index) => {
                                    return <li key={index} className="pl-20 fw-normal text-capitalize">
                                        <a href={`/sectors/${sector.slug}`}>{sector.name}</a>
                                    </li>
                                })}
                            </ul>}


                        </li>
                    }

                    return <li key={index} className="pl-20 fw-normal text-capitalize">
                        <a href={`/sectors/${item.slug}`}>{item.name}</a>
                    </li>

                })}
            </ul>
        </div>
    )
}
