import React, { useEffect, useState } from 'react';
import { Typography, Divider, Button, IconButton, Stack, Accordion, AccordionSummary, AccordionDetails, Box, Grid, Paper, Fade, AccordionSlots } from '@mui/material';
import { Ganger } from './models/Ganger';
import weaponsData from './data/Weapons.json';
import weaponTraitsData from './data/WeaponTraits.json';
import skillsData from './data/Skills.json';
import { Weapon } from './models/Weapons';
import TraitDescriptionModal from './TraitDescriptionModal';
import SkillDescriptionModal from './SkillDescriptionModal';
import GangerStats from './GangerStats';
import GangerEquipment from './GangerEquipment';
import GangerImage from './GangerImage';
import { RunCircleOutlined, RunCircle, Add, AirlineSeatFlat, LocalFireDepartment, PersonSearch, LocalBar, Language, Psychology, HeartBroken, AutoFixOff, VisibilityOff, NotificationsOff, Man, Woman, AirlineSeatFlatOutlined } from '@mui/icons-material';
import statusesData from './data/Statuses.json';
import StatusDialog from './StatusDialog';
import StatusDescriptionDialog from './StatusDescriptionDialog';
import { Status } from './models/Status';
import XpDialog from './XpDialog';
import { blueGrey } from '@mui/material/colors';

interface GangerCardProps {
    ganger: Ganger;
    gangType: string;
}

interface WeaponTrait {
    name: string;
    description: string;
}

interface Skill {
    name: string;
    description: string;
}

const iconMapping: { [key: string]: React.ElementType } = {
    LocalFireDepartment,
    Psychology,
    HeartBroken,
    AutoFixOff,
    VisibilityOff,
    NotificationsOff,
    PersonSearch,
    LocalBar,
    Language
};



const GangerCard: React.FC<GangerCardProps> = ({ ganger, gangType }) => {
    const [gangerState, setGangerState] = useState<Ganger>({
        ...ganger,
        gameStatus: Array.isArray(ganger.gameStatus) ? ganger.gameStatus : [],
        newxp: ganger.xp
    });
    const [weapons, setWeapons] = useState<{ [key: string]: Weapon }>({});
    const [selectedTrait, setSelectedTrait] = useState<WeaponTrait | null>(null);
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [isTraitModalOpen, setIsTraitModalOpen] = useState(false);
    const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
    const [isActivated, setIsActivated] = useState(false);
    const [isOutOfAction, setIsOutOfAction] = useState(false);
    const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
    const [statuses, setStatuses] = useState<Status[]>([]);
    const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
    const [isStatusDescriptionDialogOpen, setIsStatusDescriptionDialogOpen] = useState(false);
    const [isXpDialogOpen, setIsXpDialogOpen] = useState(false);
    const [expanded, setExpanded] = useState<boolean>(false);

    useEffect(() => {
        const weaponMap: { [key: string]: Weapon } = {};
        weaponsData.forEach((weapon: Weapon) => {
            weaponMap[weapon.name.toLowerCase().replace(/\*+$/, '')] = weapon;
        });

        const timer = setTimeout(() => {
            setExpanded(true);
        }, 4000); // Wait for 1 second before expanding the accordion
        setWeapons(weaponMap);
        setStatuses(statusesData);
        return () => clearTimeout(timer); // Cleanup the timer on component unmount

    }, []);



    const toggleActivation = () => {
        setIsOutOfAction(false);
        setIsActivated(!isActivated);

    };

    const toggleOutOfAction = () => {
        setIsActivated(false);
        setIsOutOfAction(!isOutOfAction);

    }

    const normalizeName = (name: string) => name.toLowerCase().replace(/\*+$/, '');

    const handleXpClick = () => {
        setIsXpDialogOpen(true);
    };
    const handleXpDialogClose = () => {
        setIsXpDialogOpen(false);
    };

    const handleIncrementXp = () => {
        setGangerState((prevState) => ({
            ...prevState,
            newxp: (parseInt(prevState.newxp) + 1).toString()
        }));
    };

    const handleDecrementXp = () => {
        setGangerState((prevState) => ({
            ...prevState,
            newxp: (parseInt(prevState.newxp) - 1).toString()
        }));
    };
    const handleTraitClick = (traitName: string) => {
        const normalizedTraitName = traitName.replace(/\(\d+\)$/, '(X)');
        const trait = weaponTraitsData.traits.find((t: WeaponTrait) => t.name.toLowerCase() === normalizedTraitName.toLowerCase());
        setSelectedTrait(trait || null);
        setIsTraitModalOpen(!isTraitModalOpen);
    };

    const handleSkillClick = (skillName: string) => {
        let foundSkill: Skill | null = null;

        for (const category in skillsData.skills) {
            const skills = skillsData.skills[category as keyof typeof skillsData.skills];
            const skill = skills.find((s: Skill) => s.name.toLowerCase() === skillName.toLowerCase());
            if (skill) {
                foundSkill = skill;
                break;
            }
        }

        setSelectedSkill(foundSkill);
        setIsSkillModalOpen(!isSkillModalOpen);
    };

    const handleAddStatusClick = () => {
        setIsStatusDialogOpen(true);
    };

    const handleStatusSelect = (status: Status) => {
        setGangerState((prevState) => ({
            ...prevState,
            gameStatus: [...prevState.gameStatus, status]
        }));
        setIsStatusDialogOpen(false);
    };
    const handleStatusIconClick = (status: Status) => {
        setSelectedStatus(status);
        setIsStatusDescriptionDialogOpen(true);
    };

    const handleStatusDescriptionDialogClose = () => {
        setIsStatusDescriptionDialogOpen(false);
    };

    const handleRemoveStatus = (statusToRemove: Status) => {
        setGangerState((prevState) => ({
            ...prevState,
            gameStatus: prevState.gameStatus.filter(status => status !== statusToRemove)
        }));
    };

    const renderStatusIcons = () => {
        const columns = [];
        const maxIconsPerColumn = 3;
        const numColumns = Math.ceil(gangerState.gameStatus.length / maxIconsPerColumn);

        for (let col = 0; col < numColumns; col++) {
            columns.push(
                <Grid item key={col}>
                    <Stack direction="column" spacing={0}>
                        {gangerState.gameStatus.slice(col * maxIconsPerColumn, (col + 1) * maxIconsPerColumn).map((status, index) => {
                            const IconComponent = iconMapping[status.icon];
                            return (
                                <IconButton color='warning' key={index} title={status.description} onClick={() => handleStatusIconClick(status)}>
                                    {IconComponent ? <IconComponent /> : null}
                                </IconButton>
                            );
                        })}
                    </Stack>
                </Grid>
            );
        }

        return columns;
    };

    const renderOverlay = () => {
        if (isActivated && !isOutOfAction) {
            return (
                <Fade in={isActivated} timeout={500}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(128, 128, 128, 0.5)', // Solid gray overlay
                            zIndex: 1,
                            pointerEvents: 'none'
                        }}
                    />
                </Fade>
            );
        }
        else if (!isActivated && !isOutOfAction) {
            return (
                <Fade in={isActivated} timeout={500}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(128, 128, 128, 0.5)', // Solid gray overlay
                            zIndex: 1,
                            pointerEvents: 'none'
                        }}
                    />
                </Fade>
            );
        }
        else if (isOutOfAction && !isActivated) {
            return (
                <Fade in={isOutOfAction} timeout={500}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(141, 71, 71, 0.5)', // Solid red overlay
                            zIndex: 1,
                            pointerEvents: 'none'
                        }}
                    />
                </Fade>
            );
        }
        else if (!isOutOfAction && !isActivated) {
            return (
                <Fade in={isOutOfAction} timeout={500}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'rgba(141, 71, 71, 0.5)', // Solid red overlay
                            zIndex: 1,
                            pointerEvents: 'none'
                        }}
                    />
                </Fade>
            );
        }

        return null;
    };

    return (
        <Paper style={{ padding: '8px', backgroundColor: blueGrey[900] }}>
            <Accordion
                expanded={expanded}
                slotProps={{ transition: { timeout: 2000 } }}
                slots={{ transition: Fade as AccordionSlots['transition'] }}
                sx={[
                    expanded
                        ? {
                            '& .MuiAccordion-region': {
                                height: 'auto',
                            },
                            '& .MuiAccordionDetails-root': {
                                display: 'block',
                            },
                        }
                        : {
                            '& .MuiAccordion-region': {
                                height: 0,
                            },
                            '& .MuiAccordionDetails-root': {
                                display: 'none',
                            },
                        },
                ]}
            >
                <Box sx={{ position: 'relative' }}>
                    {renderOverlay()}
                    <AccordionSummary
                        expandIcon={
                            gangType.toLowerCase().includes('escher')
                                ? <Woman sx={{ transform: 'rotate(180deg)' }} />
                                : <Man sx={{ transform: 'rotate(180deg)' }} />
                        }
                        aria-controls={`${ganger.ganger_id}-content`}
                        id={`${ganger.ganger_id}-header`}
                        style={{ backgroundColor: blueGrey[900] }}
                        onClick={() => setExpanded(!expanded)}
                    >


                        <Stack direction={'row'} alignItems={'center'} display={'flex'} justifyContent="space-between" width="100%">
                            <Stack>
                                <Typography variant="h6">{ganger.name} </Typography>
                                <Typography variant='body2'>{ganger.type}</Typography>
                            </Stack>
                            <Box flexGrow={1} />

                            <Typography variant="caption" align="center">{ganger.cost}cr</Typography>

                        </Stack>


                    </AccordionSummary>
                </Box>
                <Box sx={{ position: 'relative' }}>
                    {renderOverlay()}
                    <AccordionDetails style={{ backgroundColor: blueGrey[900] }}>
                        <Stack direction={'row'} alignItems={'center'} display={'flex'} justifyContent="space-between">
                            <Stack direction={'row'}>
                                <GangerImage ganger={ganger} />
                                <Button
                                    variant='contained'
                                    style={{ backgroundColor: blueGrey[700], color: 'white' }}
                                    onClick={handleXpClick}
                                >

                                    <Stack>
                                        <Typography variant="caption">XP:</Typography>
                                        <Typography variant="h6" align="center">
                                            {gangerState.newxp !== gangerState.xp ? `${gangerState.newxp} (${gangerState.xp})` : `${gangerState.xp}`}
                                        </Typography>
                                    </Stack>

                                </Button>

                            </Stack>
                            <Stack direction={'row'} alignItems={'center'} spacing={0}>
                                {renderStatusIcons()}
                                <Stack alignItems={'right'} spacing={0}>
                                    <IconButton onClick={toggleActivation} color={"primary"}>
                                        {isActivated ? <RunCircle /> : <RunCircleOutlined />}
                                    </IconButton>
                                    <IconButton color='error' onClick={toggleOutOfAction}>
                                        {isOutOfAction ? <AirlineSeatFlat /> : <AirlineSeatFlatOutlined />}
                                    </IconButton>
                                    <IconButton onClick={handleAddStatusClick} color='primary'>
                                        <Add />
                                    </IconButton>
                                </Stack>

                            </Stack>
                        </Stack>
                        <GangerStats ganger={ganger} />
                        <Divider style={{ margin: '8px 0' }} />
                        <GangerEquipment
                            equipment={ganger.equipment}
                            weapons={weapons}
                            normalizeName={normalizeName}
                            handleTraitClick={handleTraitClick}
                        />
                        <Divider style={{ margin: '8px 0' }} />
                        <Typography variant="caption"><strong>Skills:</strong> {ganger.skills.map((skill, index) => (
                            <React.Fragment key={skill}>
                                <Typography variant='caption' color='primary' onClick={() => handleSkillClick(skill)} style={{ cursor: 'pointer' }}>
                                    {skill}
                                </Typography>
                                {index < ganger.skills.length - 1 && ', '}
                            </React.Fragment>
                        ))}</Typography>
                        <Divider style={{ margin: '8px 0' }} />
                        <Typography variant="caption"><strong>Injuries:</strong> {ganger.injuries.join(', ')}</Typography>
                        <Divider style={{ margin: '8px 0' }} />
                        <Typography variant="caption"><strong>Notes:</strong> {ganger.notes}</Typography>
                        <TraitDescriptionModal
                            open={isTraitModalOpen}
                            onClose={() => setIsTraitModalOpen(false)}
                            trait={selectedTrait}
                        />
                        <SkillDescriptionModal
                            open={isSkillModalOpen}
                            onClose={() => setIsSkillModalOpen(false)}
                            skill={selectedSkill}
                        />
                        <StatusDialog
                            open={isStatusDialogOpen}
                            onClose={() => setIsStatusDialogOpen(false)}
                            onSelectStatus={handleStatusSelect}
                            statuses={statuses} // Pass the statuses here
                        />
                        <StatusDescriptionDialog
                            open={isStatusDescriptionDialogOpen}
                            onClose={handleStatusDescriptionDialogClose}
                            status={selectedStatus}
                            onRemoveStatus={handleRemoveStatus} // Pass the remove handler here
                        />
                        <XpDialog
                            open={isXpDialogOpen}
                            onClose={handleXpDialogClose}
                            xp={parseInt(gangerState.xp)}
                            newxp={parseInt(gangerState.newxp)}
                            onIncrement={handleIncrementXp}
                            onDecrement={handleDecrementXp}
                        />

                    </AccordionDetails >
                </Box>
            </Accordion >
        </Paper>
    );
};

export default GangerCard;