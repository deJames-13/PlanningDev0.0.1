import * as changeCase from "change-case";
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import DetailedToast from 'src/components/toast/detail';
import { setResource } from 'src/states/slices/resources.js';
import resourceEndpoints from 'src/states/api/resources.js';

import useIsPermitted from 'src/hooks/useIsPermitted';

const TABLE_STATES = ['index', 'thrashed'];

export default function useResource(resourceName, isPublic = false) {
    const nav = useNavigate();
    const { roles } = useSelector((state) => state.auth);
    const isPermitted = useIsPermitted({ roles: roles || [], currentResource: resourceName }) || isPublic;
    const dispatch = useDispatch();
    const resources = useSelector((state) => state?.resources || {});

    // MUTATIONS ########################################################
    const camelCaseName = changeCase.camelCase(resourceName);
    const kebabCaseName = changeCase.kebabCase(resourceName);
    const pascalCaseName = changeCase.pascalCase(resourceName);
    const snakeCaseName = changeCase.snakeCase(resourceName);
    const capitalizeName = changeCase.capitalCase(resourceName);
    const resource = resourceEndpoints;

    const [index] = resource[`use${pascalCaseName}IndexMutation`]();
    const [thrashed] = resource[`use${pascalCaseName}ThrashedMutation`]();
    const [all] = resource[`use${pascalCaseName}AllMutation`]();
    const [show] = resource[`use${pascalCaseName}ShowMutation`]();
    const [store] = resource[`use${pascalCaseName}StoreMutation`]();
    const [update] = resource[`use${pascalCaseName}UpdateMutation`]();
    const [destroy] = resource[`use${pascalCaseName}DestroyMutation`]();
    const [restore] = resource[`use${pascalCaseName}RestoreMutation`]();
    const [exports] = resource[`use${pascalCaseName}ExportMutation`]();
    // MUTATIONS END ####################################################

    // STATES ########################################################
    const [data, setData] = React.useState([]);
    const [meta, setMeta] = React.useState({});
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
            setMeta(response.meta);
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
            setMeta(response.meta);
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
            setMeta(response.meta);
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
            // nav(`/dashboard/${kebabCaseName}/edit/${response?.data?.id}`);
            nav(`/dashboard/${kebabCaseName}/table`);
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
            nav(`/dashboard/${kebabCaseName}/table`);
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
            if (response?.message) {
                toast.info(
                    <DetailedToast
                        title='Info'
                        message={response.message}
                    />
                );
            }
            else if (response?.messages) {
                toast.info(
                    <DetailedToast
                        title='Info'
                        message={response.messages.map((m, i) => <p key={i}>{m}</p>)}
                    />
                );
            }
            else {
                toast.info(
                    <DetailedToast
                        title='Successfully restored'
                        message='The record has been successfully deleted'
                    />
                )
            }
            setLoading(false);
            return response;
        });
    }, [destroy]);

    const doRestore = React.useCallback(async (id) => {
        setLoading(true);
        return await restore(id).unwrap().then((response) => {
            setCurrent(response);
            if (response?.message) {
                toast.info(
                    <DetailedToast
                        title='Info'
                        message={response.message}
                    />
                );
            }
            else if (response?.messages) {
                toast.info(
                    <DetailedToast
                        title='Info'
                        message={response.messages.map((m, i) => <p key={i}>{m}</p>)}
                    />
                );
            }
            else {
                toast.info(
                    <DetailedToast
                        title='Successfully restored'
                        message='The record has been successfully restored'
                    />
                )
            }
            setLoading(false);
            return response;
        });
    }, [restore]);

    const doExport = React.useCallback(async ({
        id = 'all', type = "xlsx"
    }) => {
        setLoading(true);
        return await exports({ id, type }).unwrap().then((response) => {
            const link = document.createElement('a');
            const fileName = `${snakeCaseName}_${id}_${new Date().toISOString()}` + (type === 'csv' ? '.csv' : '.xlsx');

            link.href = response;
            link.setAttribute('download', fileName); // or any other extension
            document.body.appendChild(link);
            link.click();
            link.remove();
            setLoading(false);
            return response;
        }).catch((e) => {
            console.log(e);
            setLoading(false);
            let message = e?.message || e?.data?.message || 'An error occured';
            if (e.status === 404) {
                message = 'No record found';
            }
            toast.error(
                <DetailedToast
                    title='Error'
                    message={message}
                />
            );
        });
    }, [exports]);

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
            fetchData(id);
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
            fetchThrashed();
            setData(data.filter(d => d.id !== id));
            dispatch(setResource({
                resource: resourceName,
                data: data.filter(d => d.id !== id),
                type: 'thrashed'
            }));
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
            doRestore,
            doExport
        },
        // STATES
        states: {
            resourceEndpoints,
            data,
            meta,
            current,
            selected,
            thrashedData,
            table,
            tableState,
            nextTableState,
            loading,
            setMeta,
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