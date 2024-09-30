import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import { Ganger } from './models/Ganger';
import { styled } from '@mui/system';
import { blueGrey } from '@mui/material/colors';

interface GangerStatsProps {
    ganger: Ganger;
}

// Create a custom styled TableCell with no padding
const CustomTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: blueGrey[900],
    padding: '0px 4px 0px 4px', // Adjust padding as needed
}));

const ShadedTableCell = styled(CustomTableCell)(({ theme }) => ({
    backgroundColor: blueGrey[800],
    padding: '0px 4px 0px 4px',
}));

const HeadStatsTableCell = styled(CustomTableCell)(({ theme }) => ({
    backgroundColor: blueGrey[600],
    padding: '0px 4px 0px 4px',
}));
const ShadedHeadStatsTableCell = styled(HeadStatsTableCell)(({ theme }) => ({
    backgroundColor: blueGrey[700],
    padding: '0px 4px 0px 4px',
}));

const GangerStats: React.FC<GangerStatsProps> = ({ ganger }) => {
    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <CustomTableCell><Typography variant="body2">M</Typography></CustomTableCell>
                        <ShadedTableCell><Typography variant="body2">WS</Typography></ShadedTableCell>
                        <CustomTableCell><Typography variant="body2">BS</Typography></CustomTableCell>
                        <ShadedTableCell><Typography variant="body2">S</Typography></ShadedTableCell>
                        <CustomTableCell><Typography variant="body2">T</Typography></CustomTableCell>
                        <ShadedTableCell><Typography variant="body2">W</Typography></ShadedTableCell>
                        <CustomTableCell><Typography variant="body2">I</Typography></CustomTableCell>
                        <ShadedTableCell><Typography variant="body2">A</Typography></ShadedTableCell>
                        <HeadStatsTableCell><Typography variant="body2">Ld</Typography></HeadStatsTableCell>
                        <ShadedHeadStatsTableCell><Typography variant="body2">Cl</Typography></ShadedHeadStatsTableCell>
                        <HeadStatsTableCell><Typography variant="body2">Wil</Typography></HeadStatsTableCell>
                        <ShadedHeadStatsTableCell><Typography variant="body2">Int</Typography></ShadedHeadStatsTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <CustomTableCell><Typography variant="body2">{ganger.m}</Typography></CustomTableCell>
                        <ShadedTableCell><Typography variant="body2">{ganger.ws}+</Typography></ShadedTableCell>
                        <CustomTableCell><Typography variant="body2">{ganger.bs}+</Typography></CustomTableCell>
                        <ShadedTableCell><Typography variant="body2">{ganger.s}</Typography></ShadedTableCell>
                        <CustomTableCell><Typography variant="body2">{ganger.t}</Typography></CustomTableCell>
                        <ShadedTableCell><Typography variant="body2">{ganger.w}</Typography></ShadedTableCell>
                        <CustomTableCell><Typography variant="body2">{ganger.i}+</Typography></CustomTableCell>
                        <ShadedTableCell><Typography variant="body2">{ganger.a}</Typography></ShadedTableCell>
                        <HeadStatsTableCell><Typography variant="body2">{ganger.ld}+</Typography></HeadStatsTableCell>
                        <ShadedHeadStatsTableCell><Typography variant="body2">{ganger.cl}+</Typography></ShadedHeadStatsTableCell>
                        <HeadStatsTableCell><Typography variant="body2">{ganger.wil}+</Typography></HeadStatsTableCell>
                        <ShadedHeadStatsTableCell><Typography variant="body2">{ganger.int}+</Typography></ShadedHeadStatsTableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GangerStats;