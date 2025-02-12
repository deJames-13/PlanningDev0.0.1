import React from 'react'

export default function PDFViewer({ action = () => { }, params = null }) {
    const {
        data: pdfUrl = "",
        isLoading = false
    } = action(params);

    const handleView = () => {
        window.open(pdfUrl, "_blank");
    };


    if (isLoading) return <p>Loading PDF...</p>;

    return (
        <button onClick={handleView}>View Example PDF</button>
    )
}
