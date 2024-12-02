import React from 'react';
import { BAR_DATA } from '../data/bar';
import Particular from './particular';



export function Overview(props) {
    const [data, setData] = React.useState(BAR_DATA);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_APPSCRIPT_URL}?route=bar1`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const { data } = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);



    return (
        <div className="flex flex-col gap-4 pb-8">
            < h1 className='font-extrabold uppercase text-xl my-8' >
                Budget Accountability Report 1(BAR - 1)
            </h1 >
            <div className="divider m-0"></div>

            {
                data.map((item, i) => {
                    return (
                        <Particular
                            key={i}
                            data={item}
                            title={item.name}
                            className={i % 2 === 0 ? 'flex-row-reverse' : ''}
                        />
                    )
                })
            }

        </div >
    )
}


