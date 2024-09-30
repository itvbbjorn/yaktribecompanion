import React from 'react';
import { Modal, Typography, Box } from '@mui/material';

interface TraitDescriptionModalProps {
    open: boolean;
    onClose: () => void;
    trait: { name: string; description: string } | null;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const TraitDescriptionModal: React.FC<TraitDescriptionModalProps> = ({ open, onClose, trait }) => {
    if (!trait) return null;

    return (
        <Modal open={open} onClose={onClose} >
            <Box sx={style}>
                <Typography variant="h6">{trait.name}</Typography>
                <Typography variant="body2">{trait.description}</Typography>
            </Box>
        </Modal>
    );
};

export default TraitDescriptionModal;