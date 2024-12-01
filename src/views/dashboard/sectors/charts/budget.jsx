import React from 'react';
import { BudgetLineChart } from './budget-line';
const chartData = [
    { year: "2024", allotment: 0, obligated: 0, rate: 0 },
]

const transformData = (data) => {

    return Object.keys(data).map((key) => {
        return {
            year: key,
            allotment: parseFloat(data[key]["Allotment"]) || 0,
            obligated: parseFloat(data[key]["Obligated"]) || 0,
            rate: parseFloat(data[key]["UtilizationRate"]) || 0,
        }
    });
}


function useGetBugetData({ sector }) {
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const fetchBudgetData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_APPSCRIPT_URL}?route=budget&name=${sector}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const { data } = await response.json();
            setData(transformData(data));
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    return {
        data,
        loading,
        fetchBudgetData,
    }
}



export default function BudgetVisiualization({ sector }) {
    const { data, loading, fetchBudgetData } = useGetBugetData({ sector });
    React.useEffect(() => {
        fetchBudgetData();
    }, [sector]);
    console.log(data);

    return !data ? '' : (
        <div className="flex gap-4">
            <div className='w-full flex justify-center h-fit'>
                <BudgetLineChart chartData={data} />
            </div>
        </div>
    )
}
