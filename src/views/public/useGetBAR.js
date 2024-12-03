import React from 'react';
import { useGetBARMutation } from 'src/api/bar';

const transformData = (data) => {
    return data;
}

export default function useGetBAR() {
    const [bar, setBar] = React.useState(null);
    const [getBAR] = useGetBARMutation();


    return {}
}
