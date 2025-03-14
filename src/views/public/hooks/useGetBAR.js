import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetBARMutation } from 'src/states/api/charts';
import { setBarData } from 'src/states/slices/bar';

export default function useGetBAR() {
    const dispatch = useDispatch();
    const barData = useSelector((state) => state.bar.data);
    const [data, setData] = React.useState(null);
    const [getBAR] = useGetBARMutation();

    const fetchBarData = React.useCallback(async () => {
        if (barData?.length > 0) {
            setData(barData);
        }
        return getBAR().unwrap().then((response) => {
            if (response?.data?.length > 0) {
                const newData = response.data.map((item) => ({
                    ...item,
                    indicators: item.particulars,
                }));
                setData(newData);
                dispatch(setBarData(newData));
                return newData;
            }

            dispatch(setBarData([]));

        })
    }, [])


    return {
        data,
        fetchBarData,
    }
}
