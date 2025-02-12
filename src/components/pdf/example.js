import React from "react";
import { useExampleQuery } from "src/states/api/reports";

const ExamplePDF = () => {
    const { data: pdfUrl, isLoading } = useExampleQuery();

    if (isLoading) return <p>Loading PDF...</p>;

    const handleView = () => {
        window.open(pdfUrl, "_blank");
    };

    return <button onClick={handleView}>View Example PDF</button>;
};

export default ExamplePDF;