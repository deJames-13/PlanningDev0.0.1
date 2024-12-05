import React from 'react';
import resourceEndpoints from 'src/states/api/resources.js';
import tableData from '../bar-data/table-data.js';

export default function useBarData({ } = {}) {
    // MUTATIONS ########################################################
    const barData = resourceEndpoints.barData;
    const [barDataIndex] = barData.useBarDataIndexMutation();
    const [barDataThrashed] = barData.useBarDataThrashedMutation();
    const [barDataAll] = barData.useBarDataAllMutation();
    const [barDataShow] = barData.useBarDataShowMutation();
    const [barDataStore] = barData.useBarDataStoreMutation();
    const [barDataUpdate] = barData.useBarDataUpdateMutation();
    const [barDataDestroy] = barData.useBarDataDestroyMutation();
    const [barDataRestore] = barData.useBarDataRestoreMutation();
    // MUTATIONS END ####################################################

    // STATES ########################################################
    const [data, setData] = React.useState([]);
    const [table, setTable] = React.useState({
        columns: [],
        data: []
    });
    const [current, setCurrent] = React.useState(null);
    const [selected, setSelected] = React.useState([]);
    const [thrashed, setThrashed] = React.useState([]);

    const fetchDatas = React.useCallback(async (qStr) => {
        return await barDataIndex(qStr).unwrap().then((response) => {
            setData(response.data);
            return response;
        });
    }, []);

    const fetchThrashed = React.useCallback(async (qStr) => {
        return await barDataThrashed(qStr).unwrap().then((response) => {
            setThrashed(response);
            return response;
        });
    }, []);

    const fetchAll = React.useCallback(async (qStr) => {
        return await barDataAll(qStr).unwrap().then((response) => {
            setData(response);
            return response;
        });
    }, []);

    const fetchData = React.useCallback(async (id, qStr) => {
        return await barDataShow({ id, qStr }).unwrap().then((response) => {
            setCurrent(response);
            return response;
        });
    }, []);

    const doStore = React.useCallback(async (data) => {
        return await barDataStore(data).unwrap().then((response) => {
            setCurrent(response);
            return response;
        });
    }, []);

    const doUpdate = React.useCallback(async (id, data) => {
        return await barDataUpdate({ id, data }).unwrap().then((response) => {
            setCurrent(response);
            return response;
        });
    }, []);

    const doDestroy = React.useCallback(async (id) => {
        return await barDataDestroy(id).unwrap().then((response) => {
            setCurrent(response);
            return response;
        });
    }, []);

    const doRestore = React.useCallback(async (id) => {
        return await barDataRestore(id).unwrap().then((response) => {
            setCurrent(response);
            return response;
        });
    }, []);

    React.useEffect(() => {
        if (data.length) {
            setTable(tableData(data));
        }
    }, [data]);


    return {
        fetchDatas,
        fetchThrashed,
        fetchAll,
        fetchData,
        doStore,
        doUpdate,
        doDestroy,
        doRestore,
        // STATES
        data,
        current,
        selected,
        thrashed,
        table,
    }
}
