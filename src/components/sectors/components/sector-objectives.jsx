import { Spinner } from '@components';
import React from 'react';
import BudgetVisiualization from '../charts/budget';
import QualityObjectives from '../charts/quality-objectives';

export default function SectorObjectives({ sector }) {

    const [objData, setObjData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        const fetchObjectives = async () => {
            let objectives = localStorage.getItem('objectives');
            if (objectives) {
                setObjData(JSON.parse(objectives));
            }
            if (!sector) return;
            setLoading(true);

            try {
                const response = await fetch(`${import.meta.env.VITE_APPSCRIPT_URL}?route=obj&name=${sector}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const { data } = await response.json();
                const objectives = data.map((obj) => {
                    return {
                        id: obj.id,
                        label: obj.name,
                        quarters: obj.quarterlies.map((quarter) => {
                            return {
                                target: quarter.target,
                                accomplishment: quarter.accomplishment,
                            };
                        }),
                        goal: {
                            target: obj.total.target,
                            accomplishment: obj.total.accomplishment,
                            progress: Math.round(parseFloat(obj.total.accomplishment / obj.total.target * 100), 2)

                        }
                    }
                });

                setObjData(objectives);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }

        }
        fetchObjectives();
    }, [sector]);

    return loading ? <Spinner /> : (
        <>
            <BudgetVisiualization sector={sector} />
            <QualityObjectives objectives={objData} />
        </>
    )
}
