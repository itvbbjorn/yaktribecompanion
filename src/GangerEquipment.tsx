import React from 'react';
import { Typography, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Weapon } from './models/Weapons';
import { styled } from '@mui/system';
import { blueGrey } from '@mui/material/colors';

interface GangerEquipmentProps {
    equipment: { name: string; qty: number }[];
    weapons: { [key: string]: Weapon };
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
    return (
        <>
            {/* <Typography variant="caption"><strong>Weapons:</strong></Typography> */}
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
                        {equipment.filter(eq => weapons[normalizeName(eq.name)]).map(eq => (
                            <TableRow key={eq.name}>
                                <ShadedTableCell><Typography variant="caption">{eq.qty > 1 ? eq.qty : ''} {eq.name}</Typography></ShadedTableCell>
                                <CustomTableCell><Typography variant="caption">{weapons[normalizeName(eq.name)].rng_s}/{weapons[normalizeName(eq.name)].rng_l}</Typography></CustomTableCell>
                                <ShadedTableCell><Typography variant="caption">{weapons[normalizeName(eq.name)].acc_s}/{weapons[normalizeName(eq.name)].acc_l}</Typography></ShadedTableCell>
                                <CustomTableCell><Typography variant="caption">{weapons[normalizeName(eq.name)].str}</Typography></CustomTableCell>
                                <ShadedTableCell><Typography variant="caption">{weapons[normalizeName(eq.name)].ap}</Typography></ShadedTableCell>
                                <CustomTableCell><Typography variant="caption">{weapons[normalizeName(eq.name)].dmg}</Typography></CustomTableCell>
                                <ShadedTableCell><Typography variant="caption">{weapons[normalizeName(eq.name)].am}</Typography></ShadedTableCell>
                                <CustomTableCell>
                                    <Typography variant="caption">
                                        {weapons[normalizeName(eq.name)].traits.map((trait, index) => (
                                            <React.Fragment key={trait}>
                                                <Typography variant='caption' color='primary' onClick={() => handleTraitClick(trait)} style={{ cursor: 'pointer' }}>
                                                    {trait}
                                                </Typography>
                                                {index < weapons[normalizeName(eq.name)].traits.length - 1 && ', '}
                                            </React.Fragment>
                                        ))}
                                    </Typography>
                                </CustomTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Divider style={{ margin: '8px 0' }} />
            <Typography variant="caption"><strong>Equipment:</strong></Typography>
            {equipment.filter(eq => !weapons[normalizeName(eq.name)]).map(eq => (
                <div key={eq.name}>
                    <Typography variant="caption">{eq.name} ({eq.qty})</Typography>
                </div>
            ))}
        </>
    );
};

export default GangerEquipment;