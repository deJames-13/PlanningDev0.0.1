import { useState } from 'react'
import Swal from 'sweetalert2'

const DEL_BY_OPTIONS = [
    { label: 'Year', value: 'year' },
    { label: 'Status', value: 'status' },
]
const STATUS_OPTIONS = [
    { label: 'published', value: 'published' },
    { label: 'draft', value: 'draft' },
    { label: 'pending delete', value: 'pending delete' },
    { label: 'pending restore', value: 'pending restore' },
    // { label: 'pending publish', value: 'pending publish' },

]
export default function BatchActions({
    delFunction = async () => { },
    resFunction = async () => { },
    delStatusFunction = async () => { },
    resStatusFunction = async () => { },
    isRestoring = false,
}) {
    const [delBy, setDelBy] = useState('year')
    const [year, setYear] = useState(new Date().getFullYear())
    const [status, setStatus] = useState('')

    const restoreByStatus = async (status) => {
        if (!status) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Status',
                text: 'Select a status to restore!',
            })
            return
        }

        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to restore all the data with status ${status}. This action cannot be undone!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, restore it!',
            cancelButtonText: 'No, cancel!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await resStatusFunction({ status: status })
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: `All data with status ${status} has been restored!`,
                    })
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                }
            }
        });
    }

    const delByStatus = async (status) => {
        if (!status) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Status',
                text: 'Select a status to delete!',
            })
            return
        }

        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete all the data with status ${status}. This action cannot be undone!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                return delStatusFunction({ status: status }).then((response) => {
                    if (response.error?.status === 404) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Not Found',
                            text: `No data found with status ${status}!`,
                        })
                        return
                    }
                    if (response.error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        })
                        return
                    }
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: `All data with status ${status} has been deleted!`,
                    })
                })
            }
        });
    }

    const handleRestoreBy = async (year, isStatus = false) => {
        if (isStatus) {
            return restoreByStatus(status)
        }

        if (!year) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Year',
                text: 'Select a year to restore!',
            })
            return
        }

        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to restore all the data for the year ${year}. This action cannot be undone!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, restore it!',
            cancelButtonText: 'No, cancel!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await restoreByYear({ year: year })
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: `All data for the year ${year} has been restored!`,
                    })
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                }
            }
        });
    }

    const handleDelBy = async (year, isStatus = false) => {
        if (isStatus) {
            return delByStatus(status)
        }

        if (!year) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Year',
                text: 'Select a year to delete!',
            })
            return
        }

        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete all the data for the year ${year}. This action cannot be undone!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                return delFunction({ year: year }).then((response) => {
                    if (response.error?.status === 404) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Not Found',
                            text: `No data found for the year ${year}!`,
                        })
                        return
                    }
                    if (response.error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        })
                        return
                    }
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: `All data for the year ${year} has been deleted!`,
                    })
                })
            }
        });

    }


    return (
        <div className="my-4">
            <div className="d-flex align-items-center">
                <div className="me-2">
                    <select
                        className="form-select"
                        value={delBy}
                        onChange={(e) => setDelBy(e.target.value)}
                    >
                        {DEL_BY_OPTIONS.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                {delBy === 'year' && (
                    <div className="me-2">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                    </div>
                )}
                {delBy === 'status' && (
                    <div className="me-2">
                        <select
                            className="form-select"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            {STATUS_OPTIONS.map((option, index) => {

                                if (option.value === 'pending restore' && !isRestoring) {
                                    return null
                                }
                                if (option.value === 'pending delete' && isRestoring) {
                                    return null
                                }

                                return (
                                    <option key={index} value={option.value} style={{
                                        textTransform: 'capitalize',
                                    }}>{option.label}</option>
                                )
                            })}
                        </select>
                    </div>
                )}
                {
                    isRestoring ? (
                        <div>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => handleRestoreBy(year, delBy === 'status')}
                            >
                                Restore
                            </button>
                        </div>
                    ) : (
                        <div>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleDelBy(year, delBy === 'status')}
                            >
                                Delete
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
