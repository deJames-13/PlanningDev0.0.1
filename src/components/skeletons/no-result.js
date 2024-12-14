import noResult from 'src/assets/images/no-result.png'

export default function NoResult() {
    return (
        <div style={{
            padding: '2rem',
            minHeight: '300px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '1rem',
        }}>
            <img src={noResult} alt="No result found." />
            <h4 className="pt-3">No data available.</h4>
            <p className="text-body-secondary float-start">
                Cannot find existing information about this chart.&nbsp;
            </p>
        </div>
    )
}
