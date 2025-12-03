function CategoryTile({ name, icon, bgColor = '#e0e0e0', textColor = 'black' }) {
    const tileStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
        margin: '10px',
        width: '100px',
        cursor: 'pointer',
        textAlign: 'center'
    };

    const iconBoxStyle = {
        width: '60px',
        height: '60px',
        backgroundColor: bgColor,
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid black',
        marginBottom: '5px',
        overflow: 'hidden'
    };

    const textStyle = {
        fontSize: '14px',
        fontWeight: 'normal',
        color: textColor
    };

    return (
        <div style={tileStyle}>
            <div style={iconBoxStyle}>
                {icon ? (
                    <img src={icon} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" viewBox="0 0 24 24">
                        <path d="M15.46 9.53l.87.87L18 8.73l-1.6-1.6-.94.94zm-1.88 5.76l-1.74 1.74-2.83-2.83 1.74-1.74 2.83 2.83zM18 5.86L15.17 3H6c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V7.41L18 5.86zM15 19H6V5h8.04L15 6.04V19z"/>
                    </svg>
                )}
            </div>
            <div style={textStyle}>{name}</div>
        </div>
    );
}

export default CategoryTile;
