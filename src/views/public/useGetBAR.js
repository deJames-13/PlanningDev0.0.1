import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetBARMutation } from 'src/states/api/bar';
import { setBarData } from 'src/states/slices/bar';

export default function useGetBAR() {
    const dispatch = useDispatch();
    const barData = useSelector((state) => state.bar.data);
    const [data, setData] = React.useState(null);
    const [getBAR] = useGetBARMutation();

    const fetchBarData = React.useCallback(async()=>{
        if (barData?.length > 0) {
            setData(barData);
        }
        return getBAR().unwrap().then((response) => {
            setData(response.data);
            dispatch(setBarData(response.data));
        })
    }, [])


    return {
        data,
        fetchBarData,
    }
}
