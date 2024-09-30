import React from 'react';
import { Modal,Typography, Box } from '@mui/material';

interface SkillDescriptionModalProps {
    open: boolean;
    onClose: () => void;
    skill: { name: string; description: string } | null;
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

const SkillDescriptionModal: React.FC<SkillDescriptionModalProps> = ({ open, onClose, skill }) => {
    if (!skill) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h6">{skill.name}</Typography>
                <Typography variant="body2">{skill.description}</Typography>
            </Box>
        </Modal>
    );
};

export default SkillDescriptionModal;