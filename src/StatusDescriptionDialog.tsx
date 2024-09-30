// StatusDescriptionDialog.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { Status } from './models/Status';

interface StatusDescriptionDialogProps {
    open: boolean;
    onClose: () => void;
    status: Status | null;
    onRemoveStatus: (status: Status) => void; // Add this prop
}

const StatusDescriptionDialog: React.FC<StatusDescriptionDialogProps> = ({ open, onClose, status, onRemoveStatus }) => {
    if (!status) return null;

    const handleRemoveClick = () => {
        onRemoveStatus(status);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{status.name}</DialogTitle>
            <DialogContent>
                <Typography>{status.description}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleRemoveClick} color="error">Remove Status</Button>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default StatusDescriptionDialog;