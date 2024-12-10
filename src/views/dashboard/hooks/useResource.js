import * as changeCase from "change-case";
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import DetailedToast from 'src/components/toast/detail';
import resourceEndpoints from 'src/states/api/resources.js';
import { setResource } from 'src/states/slices/resources.js';

const TABLE_STATES = ['index', 'thrashed'];

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
    const [tableState, setTableState] = React.useState(TABLE_STATES[0]);
    const [nextTableState, setNextTableState] = React.useState(TABLE_STATES[1]);
    const [current, setCurrent] = React.useState(null);
    const [selected, setSelected] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [thrashedData, setThrashedData] = React.useState([]);

    const fetchDatas = React.useCallback(async (qStr) => {
        if (resources.list[resourceName]) {
            setData(resources.list[resourceName]);
        }
        setLoading(true);
        return await index(qStr).unwrap().then((response) => {
            setData(response.data);
            dispatch(setResource({
                resource: resourceName,
                data: response.data,
                type: 'list'
            }));
            setLoading(false);
            return response;
        });
    }, [index]);

    const fetchThrashed = React.useCallback(async (qStr) => {
        if (resources.thrashed[resourceName]) {
            setThrashedData(resources.thrashed[resourceName]);
        }
        setLoading(true);
        return await thrashed(qStr).unwrap().then((response) => {
            setThrashedData(response.data);
            dispatch(setResource({
                resource: resourceName,
                data: response.data,
                type: 'thrashed'
            }));
            setLoading(false);
            return response;
        });
    }, [thrashed]);

    const fetchAll = React.useCallback(async (qStr) => {
        if (resources.all[resourceName]) {
            setData(resources.all[resourceName]);
        }
        setLoading(true);
        return await all(qStr).unwrap().then((response) => {
            setData(response.data);
            dispatch(setResource({
                resource: resourceName,
                data: response.data,
                type: 'all'
            }));
            setLoading(false);
            return response;
        });
    }, [all]);

    const fetchData = React.useCallback(async (id, qStr) => {
        if (resources.detail[resourceName]) {
            setCurrent(resources.detail[resourceName]);
        }
        setLoading(true);
        return await show({ id, qStr }).unwrap().then((response) => {
            setCurrent(response);
            dispatch(setResource({
                resource: resourceName,
                data: response,
                type: 'detail'
            }));
            setLoading(false);
            return response;
        }).catch((error) => {
            if (error.status === 404) {
                nav('/404');
            }
        });
    }, [show]);

    const doStore = React.useCallback(async (data) => {
        setLoading(true);
        return await store(data).unwrap().then((response) => {
            setCurrent(response);
            toast.success(
                <DetailedToast
                    title='Successfully added'
                    message='The record has been successfully added'
                />
            );
            nav(`/dashboard/${kebabCaseName}/edit/${response?.data?.id}`);
            setLoading(false);
            return response;
        }).catch((e) => {
            setLoading(false);
            toast.error(
                <DetailedToast
                    title='Error'
                    message={e?.data?.message || 'An error occured'}
                />
            );
        });
    }, [store]);

    const doUpdate = React.useCallback(async (id, data) => {
        setLoading(true);
        return await update({ id, data }).unwrap().then((response) => {
            setCurrent(response);
            toast.success(
                <DetailedToast
                    title='Successfully updated'
                    message='The record has been successfully updated'
                />
            );
            setLoading(false);
            return response;
        }).catch((e) => {
            setLoading(false);
            toast.error(
                <DetailedToast
                    title='Error'
                    message={e?.data?.message || 'An error occured'}
                />
            );
        });
    }, [update]);

    const doDestroy = React.useCallback(async (id) => {
        setLoading(true);
        return await destroy(id).unwrap().then((response) => {
            setCurrent(response);
            toast.info(
                <DetailedToast
                    title='Successfully trashed'
                    message='The record has been successfully trashed'
                />
            )
            setLoading(false);
            return response;
        });
    }, [destroy]);

    const doRestore = React.useCallback(async (id) => {
        setLoading(true);
        return await restore(id).unwrap().then((response) => {
            setCurrent(response);
            toast.info(
                <DetailedToast
                    title='Successfully restored'
                    message='The record has been successfully restored'
                />
            )
            setLoading(false);
            return response;
        });
    }, [restore]);

    // STATES END ####################################################

    // EVENTS ########################################################
    const onToggleTable = (state) => {
        if (!state) state = TABLE_STATES[0];
        const idx = TABLE_STATES.indexOf(state);
        const nextIdx = idx + 1 === TABLE_STATES.length ? 0 : idx + 1;
        const nextState = TABLE_STATES[nextIdx];
        setNextTableState(nextState);
        setTableState(state);

        if (state === 'index') {
            setData([])
            return fetchDatas();
        } else if (state === 'thrashed') {
            return fetchThrashed();
        } else if (state === 'all') {
            setData([])
            return fetchAll();
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
            setData(data.filter(d => d.id !== id));
            dispatch(setResource({
                resource: resourceName,
                data: data.filter(d => d.id !== id),
                type: 'list'
            }));

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
            loading,
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