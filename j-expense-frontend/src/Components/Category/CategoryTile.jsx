/**
 * CategoryTile Component
 * ----------------------
 * This component renders a single category tile that can be used in a category selector UI.
 * 
 * Props:
 * - `name` (string): The display name of the category.
 * - `icon` (string, optional): URL of the icon image to display. If not provided, a default SVG icon is shown.
 * - `bgColor` (string, optional): Background color of the icon box. Default is '#e0e0e0'.
 * - `textColor` (string, optional): Color of the category name text. Default is 'black'.
 * - `onClick` (function, optional): Callback function invoked when the tile is clicked. If not provided, tile is not clickable.
 * 
 * Features:
 * 1. Displays an icon inside a square box with customizable background and border.
 * 2. Shows the category name below the icon.
 * 3. Supports a click event if `onClick` is provided.
 * 4. Default SVG icon is rendered if no `icon` URL is provided.
 * 
 * Styling:
 * - Flexbox is used to center icon and text vertically.
 * - Fixed width and height for icon box to maintain consistent layout.
 * - Text is centered below the icon.
 */



function CategoryTile({ name, icon, bgColor = '#e0e0e0', textColor = 'black', onClick }) {
    const tileStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px',
        margin: '10px',
        width: '100px',
        cursor: onClick ? 'pointer' : 'default',
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
        <div style={tileStyle} onClick={onClick}>
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
