import React from 'react';
import { useGetBARMutation } from 'src/api/bar';
import BAR_DATA from './data';
const _defaults = BAR_DATA

const transformData = (indicator) => {
    const chartData = indicator.values
        .map((value) => ({
            type: String(value.year),
            target: parseInt(value.target) || 0,
            accomplishment: value.accomplishment,
        }));
    return chartData;
};


export default function useGetBAR() {
    const [bar, setBar] = React.useState(null);
    const [getBAR] = useGetBARMutation();


    return {}
}
