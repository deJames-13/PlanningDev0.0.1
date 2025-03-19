import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useGetDepsMutation } from 'src/states/api/charts.js'
import { setResource } from 'src/states/slices/resources.js'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

export default function SectorNavList() {
    const dispatch = useDispatch()
    const departmentsList = useSelector((state) => state?.resources?.list?.departmentsList || {});
    const roles = useSelector((state) => state.auth.roles);
    const [getDeps, { isLoading }] = useGetDepsMutation()
    const [list, setList] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const userHasAdminRole = roles?.some(role => ['admin', 'super-admin'].includes(role));
        setIsAdmin(false && userHasAdminRole);

        setList(departmentsList)
        getDeps().unwrap().then((res) => {
            setList(res.data)
            dispatch(setResource({
                resource: 'departmentsList',
                data: res.data,
                type: 'list'
            }))
        })
    }, [roles])

    // Helper function to sort sectors alphabetically by name
    const sortSectorsAlphabetically = (sectors) => {
        if (!sectors || !sectors.length) return [];
        return [...sectors].sort((a, b) => a.name.localeCompare(b.name));
    }

    // Handler for when a drag operation ends
    const handleDragEnd = (result) => {
        const { destination, source, type } = result;

        // If dropped outside a droppable area or in the same position
        if (!destination ||
            (destination.droppableId === source.droppableId &&
                destination.index === source.index)) {
            return;
        }

        // Clone the current list to avoid direct state mutation
        let newList = [...list];

        if (type === 'department') {
            // Rearrange departments at root level
            const [removed] = newList.splice(source.index, 1);
            newList.splice(destination.index, 0, removed);

            // Update indices based on new positions
            newList = newList.map((item, index) => {
                if (item.type === 'division' || item.type === 'department') {
                    return { ...item, index };
                }
                return item;
            });

            // Update the state
            setList(newList);

            // Send updates to the server for departments that changed position
            const updatePromises = newList
                .filter(item => item.type === 'division' || item.type === 'department')
                .map((item, idx) => {
                    return axios.put(`/api/departments/${item.id}`, {
                        ...item,
                        index: idx
                    });
                });

            Promise.all(updatePromises)
                .then(() => console.log('Department indices updated'))
                .catch(error => console.error('Error updating department indices:', error));
        }
    };

    // Render a department and its children
    const renderDepartment = (item, index) => {
        if (item.type === 'division') {
            // Sort sectors alphabetically
            const sortedSectors = sortSectorsAlphabetically(item.sectors);

            return (
                <Draggable
                    key={item.id}
                    draggableId={`dept-${item.id}`}
                    index={index}
                    isDragDisabled={!isAdmin}
                >
                    {(provided) => (
                        <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="pl-3 fw-bold text-uppercase pt-3"
                        >
                            <div className="d-flex align-items-center">
                                {isAdmin && (
                                    <span
                                        {...provided.dragHandleProps}
                                        className="me-2 drag-handle"
                                        style={{ cursor: 'grab', color: '#aaa' }}
                                    >
                                        ⋮⋮
                                    </span>
                                )}
                                <span className='text-primary'>{item.name}</span>
                            </div>

                            {/* Render sectors in alphabetical order */}
                            {sortedSectors?.length > 0 &&
                                <ul>
                                    {sortedSectors.map((sector, idx) => (
                                        <li key={idx} className="pl-20 fw-normal text-capitalize">
                                            <a href={`/sectors/${sector.slug}`}>{sector.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            }

                            {/* Render child departments */}
                            {item?.children?.length > 0 &&
                                <ul className="pl-3 mt-2">
                                    {item.children.map((child, idx) => renderDepartment(child, `child-${idx}`))}
                                </ul>
                            }
                        </li>
                    )}
                </Draggable>
            );
        }

        if (item.type === 'department') {
            // Sort sectors alphabetically
            const sortedSectors = sortSectorsAlphabetically(item.sectors);

            return (
                <Draggable
                    key={item.id}
                    draggableId={`dept-${item.id}`}
                    index={index}
                    isDragDisabled={!isAdmin}
                >
                    {(provided) => (
                        <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="pl-20 text-uppercase"
                        >
                            <div className="d-flex align-items-center">
                                {isAdmin && (
                                    <span
                                        {...provided.dragHandleProps}
                                        className="me-2 drag-handle"
                                        style={{ cursor: 'grab', color: '#aaa' }}
                                    >
                                        ⋮⋮
                                    </span>
                                )}
                                <span className='text-primary'>{item.name}</span>
                            </div>

                            {/* Render sectors in alphabetical order */}
                            {sortedSectors?.length > 0 &&
                                <ul>
                                    {sortedSectors.map((sector, idx) => (
                                        <li key={idx} className="pl-20 fw-normal text-capitalize">
                                            <a href={`/sectors/${sector.slug}`}>{sector.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            }

                            {/* Render child departments */}
                            {item?.children?.length > 0 &&
                                <ul className="pl-3 mt-2">
                                    {item.children.map((child, idx) => renderDepartment(child, `child-${idx}`))}
                                </ul>
                            }
                        </li>
                    )}
                </Draggable>
            );
        }

        return (
            <li key={index} className="pl-20 fw-normal text-capitalize">
                <a href={`/sectors/${item.slug}`}>{item.name}</a>
            </li>
        );
    }

    return (
        <div className="sector-nav-list h-100 p-lg-5 mt-lg-5">
            <h3></h3>
            <hr />
            {isLoading && (
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="departments" type="department">
                    {(provided) => (
                        <ul
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {list?.length > 0 &&
                                list
                                    .filter(item => item.type === 'division' || item.type === 'department')
                                    .map((item, index) => renderDepartment(item, index))
                            }
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>

            {/* Render non-draggable sectors */}
            {list?.length > 0 &&
                <ul>
                    {list
                        .filter(item => item.type !== 'division' && item.type !== 'department')
                        .map((item, index) => renderDepartment(item, `sector-${index}`))
                    }
                </ul>
            }
        </div>
    )
}
