import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Status {
    name: string;
    description: string;
    icon: string; // Add the icon property
}

interface StatusDialogProps {
    open: boolean;
    onClose: () => void;
    onSelectStatus: (status: Status) => void;
    statuses: Status[]; // Accept statuses as a prop
}

const StatusDialog: React.FC<StatusDialogProps> = ({ open, onClose, onSelectStatus, statuses }) => {
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

    const handleStatusClick = (status: Status) => {
        setSelectedStatus(status);
        setConfirmationOpen(true);
    };

    const handleConfirm = () => {
        if (selectedStatus) {
            onSelectStatus(selectedStatus);
        }
        setConfirmationOpen(false);
        onClose();
    };

    const handleCancel = () => {
        setConfirmationOpen(false);
    };

    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Select Status</DialogTitle>
                <DialogContent>
                    {statuses.map((status) => (
                        <Accordion key={status.name}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`${status.name}-content`}
                                id={`${status.name}-header`}
                            >
                                <Button onClick={() => handleStatusClick(status)} color="primary">{status.name}</Button>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant={'body2'}>{status.description}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmationOpen} onClose={handleCancel}>
                <DialogTitle>Confirm Status Selection</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to give this fighter the status {selectedStatus?.name}?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">Cancel</Button>
                    <Button onClick={handleConfirm} color="primary">Confirm</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default StatusDialog;