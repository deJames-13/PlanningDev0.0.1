import * as changeCase from "change-case";
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import resourceEndpoints from 'src/states/api/resources.js';
import { setResource } from 'src/states/slices/resources.js';


export default function useResource(resourceName) {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const resources = useSelector((state) => state?.resources || {});

    // MUTATIONS ########################################################
    const camelCaseName = changeCase.camelCase(resourceName);
    const kebabCaseName = changeCase.kebabCase(resourceName);
    const pascalCaseName = changeCase.pascalCase(resourceName);
    const capitalizeName = changeCase.capitalCase(resourceName);
    const resource = resourceEndpoints[camelCaseName];

    const [index] = resource[`use${pascalCaseName}IndexMutation`]();
    const [thrashed] = resource[`use${pascalCaseName}ThrashedMutation`]();
    const [all] = resource[`use${pascalCaseName}AllMutation`]();
    const [show] = resource[`use${pascalCaseName}ShowMutation`]();
    const [store] = resource[`use${pascalCaseName}StoreMutation`]();
    const [update] = resource[`use${pascalCaseName}UpdateMutation`]();
    const [destroy] = resource[`use${pascalCaseName}DestroyMutation`]();
    const [restore] = resource[`use${pascalCaseName}RestoreMutation`]();
    // MUTATIONS END ####################################################

    // STATES ########################################################
    const [data, setData] = React.useState([]);
    const [table, setTable] = React.useState({
        columns: [],
        data: []
    });
    const tableStates = ['index', 'thrashed', 'all'];
    const [tableState, setTableState] = React.useState(tableStates[0]);
    const [nextTableState, setNextTableState] = React.useState(tableStates[1]);
    const [current, setCurrent] = React.useState(null);
    const [selected, setSelected] = React.useState([]);
    const [thrashedData, setThrashedData] = React.useState([]);

    const fetchDatas = React.useCallback(async (qStr) => {
        if (resources.list) {
            setData(resources.list);
        }

        return await index(qStr).unwrap().then((response) => {
            setData(response.data);
            dispatch(setResource({
                resource: resourceName,
                data: response.data,
                type: 'list'
            }));
            return response;
        });
    }, [index]);

    const fetchThrashed = React.useCallback(async (qStr) => {
        if (resources.thrashed) {
            setThrashedData(resources.thrashed);
        }
        return await thrashed(qStr).unwrap().then((response) => {
            setThrashedData(response);
            dispatch(setResource({
                resource: resourceName,
                data: response,
                type: 'thrashed'
            }));
            return response;
        });
    }, [thrashed]);

    const fetchAll = React.useCallback(async (qStr) => {
        if (resources.all) {
            setData(resources.all);
        }
        return await all(qStr).unwrap().then((response) => {
            setData(response);
            dispatch(setResource({
                resource: resourceName,
                data: response,
                type: 'all'
            }));
            return response;
        });
    }, [all]);

    const fetchData = React.useCallback(async (id, qStr) => {
        if (resources.detail) {
            setCurrent(resources.detail);
        }
        return await show({ id, qStr }).unwrap().then((response) => {
            setCurrent(response);
            dispatch(setResource({
                resource: resourceName,
                data: response,
                type: 'detail'
            }));
            return response;
        }).catch((error) => {
            if (error.status === 404) {
                nav('/404');
            }
        });
    }, [show]);

    const doStore = React.useCallback(async (data) => {
        return await store(data).unwrap().then((response) => {
            setCurrent(response);
            nav(`/dashboard/${kebabCaseName}/edit/${id}`);
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

    // EVENTS ########################################################
    const onToggleTable = (state) => {
        if (!state) state = tableStates[0];
        const idx = tableStates.indexOf(state);
        const nextIdx = idx + 1 === tableStates.length ? 0 : idx + 1;
        const nextState = tableStates[nextIdx];
        setNextTableState(nextState);
        setTableState(state);

        if (state === 'index') {
            fetchDatas();
        } else if (state === 'thrashed') {
            fetchThrashed();
        } else if (state === 'all') {
            fetchAll();
        }
    }

    const onStore = async (data) => {
        return doStore(data).then((response) => {
            fetchDatas();
            return response;
        });
    }

    const onUpdate = async (id, data) => {
        return doUpdate(id, data).then((response) => {
            fetchDatas();
            return response;
        });
    }

    const onDestroy = async (id) => {
        return doDestroy(id).then((response) => {
            fetchDatas();
            return response;
        });
    }

    const onRestore = async (id) => {
        return doRestore(id).then((response) => {
            fetchDatas();
            return response;
        });
    }



    // EVENTS END ####################################################

    // NAVIGATIONS ########################################################
    const toForm = (id = null) => {
        if (id) {
            return nav(`/dashboard/${kebabCaseName}/edit/${id}`);
        }
        return nav(`/dashboard/${kebabCaseName}/add`);
    }
    const toView = (id) => {
        nav(`/dashboard/${kebabCaseName}/view/${id}`);
    }
    // NAVIGATIONS END ####################################################




    return {
        names: {
            camelCaseName,
            kebabCaseName,
            pascalCaseName,
            capitalizeName,
        },
        actions: {
            fetchDatas,
            fetchThrashed,
            fetchAll,
            fetchData,
            doStore,
            doUpdate,
            doDestroy,
            doRestore
        },
        // STATES
        states: {
            data,
            current,
            selected,
            thrashedData,
            table,
            tableState,
            nextTableState,
            setTable,
            setCurrent,
            setSelected,
            setTableState
        },
        // EVENTS
        events: {
            onToggleTable,
            onStore,
            onUpdate,
            onDestroy,
            onRestore
        },
        // NAVIGATIONS
        navigate: {
            toForm,
            toView
        }
    }
}