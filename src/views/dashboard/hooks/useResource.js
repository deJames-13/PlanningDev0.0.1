import React from 'react';
import resourceEndpoints from 'src/states/api/resources.js';

export default function useResource(resourceName) {
    // MUTATIONS ########################################################
    const resource = resourceEndpoints[resourceName];
    const [index] = resource[`use${resourceName.charAt(0).toUpperCase() + resourceName.slice(1)}IndexMutation`]();
    const [thrashed] = resource[`use${resourceName.charAt(0).toUpperCase() + resourceName.slice(1)}ThrashedMutation`]();
    const [all] = resource[`use${resourceName.charAt(0).toUpperCase() + resourceName.slice(1)}AllMutation`]();
    const [show] = resource[`use${resourceName.charAt(0).toUpperCase() + resourceName.slice(1)}ShowMutation`]();
    const [store] = resource[`use${resourceName.charAt(0).toUpperCase() + resourceName.slice(1)}StoreMutation`]();
    const [update] = resource[`use${resourceName.charAt(0).toUpperCase() + resourceName.slice(1)}UpdateMutation`]();
    const [destroy] = resource[`use${resourceName.charAt(0).toUpperCase() + resourceName.slice(1)}DestroyMutation`]();
    const [restore] = resource[`use${resourceName.charAt(0).toUpperCase() + resourceName.slice(1)}RestoreMutation`]();
    // MUTATIONS END ####################################################

    // STATES ########################################################
    const [data, setData] = React.useState([]);
    const [table, setTable] = React.useState({
        columns: [],
        data: []
    });
    const [current, setCurrent] = React.useState(null);
    const [selected, setSelected] = React.useState([]);
    const [thrashedData, setThrashedData] = React.useState([]);

    const fetchDatas = React.useCallback(async (qStr) => {
        return await index(qStr).unwrap().then((response) => {
            setData(response.data);
            return response;
        });
    }, [index]);

    const fetchThrashed = React.useCallback(async (qStr) => {
        return await thrashed(qStr).unwrap().then((response) => {
            setThrashedData(response);
            return response;
        });
    }, [thrashed]);

    const fetchAll = React.useCallback(async (qStr) => {
        return await all(qStr).unwrap().then((response) => {
            setData(response);
            return response;
        });
    }, [all]);

    const fetchData = React.useCallback(async (id, qStr) => {
        return await show({ id, qStr }).unwrap().then((response) => {
            setCurrent(response);
            return response;
        });
    }, [show]);

    const doStore = React.useCallback(async (data) => {
        return await store(data).unwrap().then((response) => {
            setCurrent(response);
            return response;
        });
    }, [store]);

    const doUpdate = React.useCallback(async (id, data) => {
        return await update({ id, data }).unwrap().then((response) => {
            setCurrent(response);
            return response;
        });
    }, [update]);

    const doDestroy = React.useCallback(async (id) => {
        return await destroy(id).unwrap().then((response) => {
            setCurrent(response);
            return response;
        });
    }, [destroy]);

    const doRestore = React.useCallback(async (id) => {
        return await restore(id).unwrap().then((response) => {
            setCurrent(response);
            return response;
        });
    }, [restore]);

    // STATES END ####################################################

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
        thrashedData,
        table,
        setTable,
    }
}