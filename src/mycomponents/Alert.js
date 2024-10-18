import React from 'react';

function Alert(props) {
    const capitalize = (word) => {
        if (word === "danger") {
            word = "error";
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

    const getAlertStyle = (type) => {
        switch (type) {
            case 'success':
                return 'bg-green-100 text-green-700 border-green-400';
            case 'error':
            case 'danger':  // Map 'danger' to 'error'
                return 'bg-red-100 text-red-700 border-red-400';
            case 'warning':
                return 'bg-yellow-100 text-yellow-700 border-yellow-400';
            case 'info':
                return 'bg-blue-100 text-blue-700 border-blue-400';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-400';
        }
    };

    return (
        <div style={{ 
            height: '64px', 
            position: 'fixed', 
            top: '80px', 
            right: '20px', // Positioning it towards the right
            width: '30%', 
            zIndex: '50' 
        }}>
            {props.alert && (
                <div className={`border-l-4 p-4 ${getAlertStyle(props.alert.type)} rounded-lg shadow-lg`} role="alert">
                    <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
                </div>
            )}
        </div>
    );
}

export default Alert;
