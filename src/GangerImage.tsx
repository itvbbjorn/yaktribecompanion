import React from 'react';
import scrunt from './data/scrunt.png';

interface Ganger {
    image?: string;
    name: string;
    type: string;
}

interface GangerImageProps {
    ganger: Ganger;
}

const GangerImage: React.FC<GangerImageProps> = ({ ganger }) => {
    const placeholderImage = scrunt;

    return (
        <img
            src={ganger.image || placeholderImage}
            alt={`${ganger.name} - ${ganger.type}`}
            style={{ maxWidth: '35%', maxHeight: '35%', marginRight: '16px', borderRadius: '8px' }}

        />
    );
};

export default GangerImage;