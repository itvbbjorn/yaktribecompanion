import React, { useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Divider } from '@mui/material';
import { Weapon } from './models/Weapons';
import { styled } from '@mui/system';
import { blueGrey } from '@mui/material/colors';
import equipmentData from './data/Equipment.json'; // Assuming the JSON file is in the same directory

interface GangerEquipmentProps {
    equipment: { name: string; qty: number }[];
    weapons: { [key: string]: Weapon[] }; // Updated to handle multiple profiles
    normalizeName: (name: string) => string;
    handleTraitClick: (traitName: string) => void;
}

const CustomTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: blueGrey[900],
    padding: '0px 4px 0px 4px', // Adjust padding as needed
}));

const ShadedTableCell = styled(CustomTableCell)(({ theme }) => ({
    backgroundColor: blueGrey[800],
    padding: '0px 4px 0px 4px',
}));

const GangerEquipment: React.FC<GangerEquipmentProps> = ({ equipment, weapons, normalizeName, handleTraitClick }) => {
    const [open, setOpen] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState<any>(null);

    const handleClickOpen = (equipmentName: string) => {
        const normalizedName = normalizeName(equipmentName);
        const equipmentDetails = equipmentData.find(eq => normalizeName(eq.Name) === normalizedName);
        setSelectedEquipment(equipmentDetails);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedEquipment(null);
    };

    // Separate equipment into weapons and non-weapons
    const weaponEquipment = equipment.filter(eq => weapons[normalizeName(eq.name)]);
    const nonWeaponEquipment = equipment.filter(eq => !weapons[normalizeName(eq.name)]);

    return (
        <>
            <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <ShadedTableCell><Typography variant="caption">Wpn</Typography></ShadedTableCell>
                        <CustomTableCell><Typography variant="caption">Rng</Typography></CustomTableCell>
                        <ShadedTableCell><Typography variant="caption">Acc</Typography></ShadedTableCell>
                        <CustomTableCell><Typography variant="caption">S</Typography></CustomTableCell>
                        <ShadedTableCell><Typography variant="caption">AP</Typography></ShadedTableCell>
                        <CustomTableCell><Typography variant="caption">D</Typography></CustomTableCell>
                        <ShadedTableCell><Typography variant="caption">Am</Typography></ShadedTableCell>
                        <CustomTableCell><Typography variant="caption">Traits</Typography></CustomTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {weaponEquipment.map(eq => {
                        const weaponProfiles = weapons[normalizeName(eq.name)];
                        return weaponProfiles.map((weapon, index) => (
                            <TableRow key={`${eq.name}-${index}`}>
                                <ShadedTableCell>
                                    <Typography variant="caption">
                                        {eq.qty > 1 ? eq.qty : ''} {eq.name} {weapon.profileName ? `- ${weapon.profileName}` : ''}
                                    </Typography>
                                </ShadedTableCell>
                                <CustomTableCell><Typography variant="caption">{weapon.rng_s}/{weapon.rng_l}</Typography></CustomTableCell>
                                <ShadedTableCell><Typography variant="caption">{weapon.acc_s}/{weapon.acc_l}</Typography></ShadedTableCell>
                                <CustomTableCell><Typography variant="caption">{weapon.str}</Typography></CustomTableCell>
                                <ShadedTableCell><Typography variant="caption">{weapon.ap}</Typography></ShadedTableCell>
                                <CustomTableCell><Typography variant="caption">{weapon.dmg}</Typography></CustomTableCell>
                                <ShadedTableCell><Typography variant="caption">{weapon.am}</Typography></ShadedTableCell>
                                <CustomTableCell>
                                    <Typography variant="caption">
                                        {weapon.traits.map(trait => (
                                            <Typography variant='caption' color='primary' key={trait} onClick={() => handleTraitClick(trait)}>{trait} </Typography>
                                        ))}
                                    </Typography>
                                </CustomTableCell>
                            </TableRow>
                        ));
                    })}
                </TableBody>
            </Table>
        </TableContainer>

            <Divider style={{ margin: '20px 0' }} />

            <Typography variant="h6">Other Equipment</Typography>
            <ul>
                {nonWeaponEquipment.map(eq => (
                    <li key={eq.name}>
                        <Typography variant="caption">
                            {eq.qty > 1 ? eq.qty : ''} <a href="#" onClick={() => handleClickOpen(eq.name)}>{eq.name}</a>
                        </Typography>
                    </li>
                ))}
            </ul>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{selectedEquipment?.Name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {selectedEquipment?.Details?.Description || 'No description available.'}
                    </DialogContentText>
                    {selectedEquipment?.Details?.Credits && (
                        <DialogContentText>
                            Credits: {selectedEquipment.Details.Credits}
                        </DialogContentText>
                    )}
                    {selectedEquipment?.Details?.Rarity && (
                        <DialogContentText>
                            Rarity: {selectedEquipment.Details.Rarity}
                        </DialogContentText>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default GangerEquipment;