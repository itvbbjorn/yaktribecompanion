import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Stack } from '@mui/material';

interface XpDialogProps {
    open: boolean;
    onClose: () => void;
    xp: number;
    newxp: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

const XpDialog: React.FC<XpDialogProps> = ({ open, onClose, xp, newxp, onIncrement, onDecrement }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Experience</DialogTitle>
            <DialogContent>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                    <Button onClick={onDecrement} variant='contained' color="primary">-</Button>
                    <Typography variant="h6">{newxp !== xp ? `${newxp} (${xp})` : `${xp}`}</Typography>
                    <Button onClick={onIncrement} variant='contained' color="primary">+</Button>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default XpDialog;