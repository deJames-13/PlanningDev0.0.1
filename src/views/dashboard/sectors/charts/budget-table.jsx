import React from 'react';

const BudgetTable = ({ data, horizontal = false }) => {
    if (!data || data.length === 0) {
        return <></>;
    }

    const headers = Object.keys(data[0]);

    return (
        <div className="w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                {horizontal ? (
                    // Horizontal (Transposed) View
                    <>
                        <thead className="bg-gray-50">
                            <tr>
                                {/* <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                >
                                    Attribute
                                </th> */}
                                {/* {data.map((_, index) => (
                                    <th
                                        key={index}
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                    >
                                        Row {index + 1}
                                    </th>
                                ))} */}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {headers.map((header) => (
                                <tr key={header}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {header.charAt(0).toUpperCase() + header.slice(1)}
                                    </td>
                                    {data.map((row, index) => (
                                        <td
                                            key={index}
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                        >
                                            {row[header]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </>
                ) : (
                    // Default Vertical View
                    <>
                        <thead className="bg-gray-50">
                            <tr>
                                {headers.map((header) => (
                                    <th
                                        key={header}
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                                    >
                                        {header.charAt(0).toUpperCase() + header.slice(1)}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((row, index) => (
                                <tr key={index}>
                                    {headers.map((header) => (
                                        <td
                                            key={header}
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                                        >
                                            {row[header]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </>
                )}
            </table>
        </div>
    );
};

export default BudgetTable;
