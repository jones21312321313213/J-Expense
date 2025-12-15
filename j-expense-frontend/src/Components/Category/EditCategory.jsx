import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { categoryService } from "../Services/CategoryService";

function EditCategory() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    // accept id via navigation state OR via URL param for robustness
    const state = location.state || {};
    const idFromState = state.id;
    const idFromUrl = params.id;
    const id = idFromState || idFromUrl;
    const name = state.name;
    const icon = state.icon;
    const type = state.type;
    const isDefault = state.isDefault;

    const [categoryName, setCategoryName] = React.useState(name || "");
    const [categoryType, setCategoryType] = React.useState(type || "Expense");
    const [isDefaultState, setIsDefaultState] = React.useState(Boolean(isDefault));
    const [iconPath, setIconPath] = React.useState(icon || "");
    const [saving, setSaving] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        // populate local state from navigation state when available
        setCategoryName(name || "");
        setCategoryType(type || "Expense");
    }, [name, type]);

    // If the user navigated here without full state but provided an id, fetch it
    React.useEffect(() => {
        let mounted = true;
        (async () => {
            if ((!name || !type) && id) {
                try {
                    setLoading(true);
                    const cat = await categoryService.getCategoryById(id);
                    if (!mounted) return;
                    setCategoryName(cat.category_name || "");
                    setCategoryType(cat.category_type || "Expense");
                    setIsDefaultState(Boolean(cat.is_global));
                    setIconPath(cat.iconPath || cat.icon_path || "");
                } catch (err) {
                    console.error('Failed to load category for edit:', err);
                } finally {
                    setLoading(false);
                }
            }
        })();
        return () => { mounted = false; };
    }, [id, name, type]);

    // If we arrived here with no id and no state, it's likely misuse of the route; redirect back
    React.useEffect(() => {
        if (!id && !name && !type && !iconPath && !loading) {
            alert('Missing category id; returning to categories.');
            navigate('/app/category-details');
        }
    }, [id, name, type, iconPath, loading, navigate]);

    const containerStyle = {
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
        background: "linear-gradient(135deg, #c7e8ff, #ffe6cc)",
        width: "700px",          
        minHeight: "600px",     
        boxSizing: "border-box",
        borderRadius: "20px",   
        margin: "50px auto",    
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)", 
    };


    const backStyle = {
        alignSelf: "flex-start",
        fontSize: "24px",
        cursor: "pointer",
        marginBottom: "10px",
        fontWeight: "300",
    };

    const titleStyle = {
        fontSize: "48px",
        fontWeight: "600",
        marginBottom: "10px",
    };

    const labelStyle = {
        fontSize: "18px",
        fontWeight: "500",
        marginTop: "10px",
        borderBottom: "1px solid #000",
        width: "200px",
        textAlign: "center",
        paddingBottom: "5px",
    };

    const imageStyle = {
        width: "150px",
        height: "150px",
        marginTop: "20px",
        borderRadius: "14px",
        objectFit: "contain",
        border: "3px solid black",
        padding: "10px",
    };

    const noteStyle = {
        fontSize: "10px",
        marginTop: "5px",
        opacity: 0.7,
    };

    const buttonStyle = {
        marginTop: "20px",
        padding: "10px 40px",
        backgroundColor: "#ddd",
        borderRadius: "10px",
        border: "none",
        cursor: "pointer",
        fontWeight: "600",
    };

    return (
        <div style={containerStyle}>
            {/* BACK BUTTON */}
            <div style={backStyle} onClick={() => navigate(-1)}>
                &lt;
            </div>

            {/* PAGE TITLE */}
            <h2 style={titleStyle}>Categories</h2>

            {/* SUBTITLE */}
            <div style={{ fontSize: "18px", marginBottom: "10px" }}>Edit category</div>

            {/* NAME */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
            ) : isDefaultState ? (
                <div style={labelStyle}>{name || categoryName || "Name"} <span style={{fontSize:12, marginLeft:8, color:'#666'}}>(default)</span></div>
            ) : (
                <input
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    style={{ ...labelStyle, borderBottom: '1px solid #333', padding: '8px' }}
                />
            )}

            {/* ICON */}
            <img src={iconPath || icon} alt={name || categoryName} style={imageStyle} />

            <p style={noteStyle}>(upload image if custom categories)</p>

            {/* TYPE */}
            {isDefault ? (
                <div style={{ marginTop: 12 }}>{type}</div>
            ) : (
                <select value={categoryType} onChange={(e) => setCategoryType(e.target.value)} style={{ marginTop: 12 }}>
                    <option>Expense</option>
                    <option>Income</option>
                    <option>Savings</option>
                </select>
            )}

            {/* SAVE BUTTON */}
            <button
                style={{ ...buttonStyle, opacity: isDefaultState ? 0.6 : 1, cursor: isDefaultState ? 'not-allowed' : 'pointer' }}
                disabled={isDefaultState || saving || loading}
                onClick={async () => {
                    if (isDefaultState) return alert('Default categories cannot be edited.');
                    if (!categoryName.trim()) return alert('Name cannot be empty');
                    setSaving(true);
                    try {
                        if (!id) throw new Error('Missing category id');
                        const token = localStorage.getItem('token');
                        if (!token) throw new Error('Not authenticated');
                        const res = await categoryService.updateCategory(id, { category_name: categoryName, category_type: categoryType });
                        // set a quick flag so the list refreshes when we go back
                        sessionStorage.setItem('categoriesNeedRefresh', 'true');
                        navigate(-1);
                    } catch (err) {
                        console.error('Failed to save category:', err);
                        const msg = (err && err.message) ? err.message : String(err);
                        if (msg.includes('403')) {
                            alert('Failed to save category: not authorized. Default categories cannot be edited or you may not be the owner.');
                        } else if (msg.includes('401') || msg.toLowerCase().includes('not authenticated')) {
                            alert('Failed to save category: you must be logged in.');
                        } else {
                            alert('Failed to save category: ' + msg);
                        }
                    } finally {
                        setSaving(false);
                    }
                }}
            >
                {saving ? 'Saving...' : 'Save changes'}
            </button>
        </div>
    );
}

export default EditCategory;
