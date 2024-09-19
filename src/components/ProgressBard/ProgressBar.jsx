const ProgressBar = ({ progress }) => (
    <div style={{ width: '100%', backgroundColor: '#e0e0df', borderRadius: '2px' }}>
        <div style={{
            width: `${progress}%`,
            height: '10px',
            backgroundColor: progress > 50 ? '#76c7c0' : '#ff4c4c',
            borderRadius: '2px',
            transition: 'width 0.2s ease-in'
        }} />
    </div>
);

export default ProgressBar;
