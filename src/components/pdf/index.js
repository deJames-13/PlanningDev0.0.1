import { useState } from 'react';

export const usePDFViewer = (action, params = null) => {
    const [getPdf, { loading: isLoading }] = action();

    const handleView = async () => {
        try {
            const res = await getPdf(params).unwrap();
            if (res) {
                window.open(res, '_blank');
            }
        } catch (error) {
            console.error('Error fetching PDF:', error);
        } finally {
            console.log('PDF fetched');
        }
    };

    return { isLoading, handleView };
};

export default function PDFViewer({
    action = () => { },
    params = null,
    title = "View Report"
}) {
    // action is mutation function
    const [getPdf, { loading: isLoading }] = action();

    const handleView = () => {
        getPdf(params).unwrap().then((res) => {
            if (!res) return;
            window.open(res, '_blank');
        })
    };


    if (isLoading) return <p>Loading PDF...</p>;

    return (
        <button
            style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "10px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
            }}
            onClick={handleView}>
            {title}
        </button>
    )
}
