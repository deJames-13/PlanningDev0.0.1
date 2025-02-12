import React from "react";
import { useExampleQuery } from "src/states/api/reports";

const ExamplePDF = () => {
    const { data: pdfUrl, isLoading } = useExampleQuery();

    if (isLoading) return <p>Loading PDF...</p>;

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "report.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return <button onClick={handleDownload}>Download Example PDF</button>;
};

export default ExamplePDF;
