import React from 'react';

interface DividerProps {
    color?: string;
    thickness?: string;
    margin?: string;
}

const Divider: React.FC<DividerProps> = ({ color = '#000', thickness = '1px', margin = '10px 0' }) => {
    const dividerStyle = {
        borderTop: `${thickness} solid ${color}`,
        margin: margin
    };

    return <div style={dividerStyle}></div>;
};

export default Divider;
