import { cilCheck, cilCheckCircle, cilFlagAlt } from '@coreui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetObjMutation } from 'src/states/api/charts';
import {
    getObjectiveFailure,
    getObjectiveStart,
    getObjectiveSuccess,
    setSector,
} from 'src/states/slices/objective';

const transformData = (data) => {
    let totalAccomplished = data.reduce((acc, curr) => acc + curr.total.accomplishment, 0);
    let totalTarget = data.reduce((acc, curr) => acc + curr.total.target, 0);
    return {
        objectives: data,
        progressGroup: [
            { title: 'Total Acommplished', icon: cilCheckCircle, value: totalAccomplished, },
            { title: 'Total Target', icon: cilFlagAlt, value: totalTarget, },
            { title: '', icon: cilCheck, value: parseFloat((totalAccomplished / totalTarget * 100).toFixed(2)), progress: true },
        ],
        last_updated: (new Date()).toLocaleString()
    }
}

export default function useObjectiveCharter({ name }) {
    const nav = useNavigate()
    const dispatch = useDispatch();
    const objState = useSelector(s => s.objective);
    const [getObj, { isLoading }] = useGetObjMutation();
    const [data, setData] = React.useState({});

    const fetchtData = React.useCallback((name) => {
        if (objState.sectorObjectives[name]) {
            setData(objState.sectorObjectives[name]);
        }

        dispatch(setSector(name));
        dispatch(getObjectiveStart());
        getObj(name).then((res) => {
            if (res?.data) {
                let { data } = res.data
                let formatted = transformData(data)
                if (objState.currentSector && objState.currentSector === name) {
                    setData(formatted);
                };
                dispatch(getObjectiveSuccess({ [name]: formatted }));
            }
        }).catch(e => {
            dispatch(getObjectiveFailure());
            if (e.status == 404) {
                nav('/404')
            }
            toast.error(e.data?.message)
            console.error(e);
        });
    }, [name]);

    return {
        data,
        isLoading,
        fetchtData,
        setData
    }
}
