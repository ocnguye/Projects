import React from 'react';
import Featured from './featured';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Home: React.FC = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid xs={2}>
                </Grid>
                <Grid xs={8}>
                        <Featured />
                </Grid>
                <Grid xs={2}>
                </Grid>
                <Grid xs={10}>
                    <Item>xs=4</Item>
                </Grid>
                <Grid xs={10}>
                    <Item>xs=4</Item>
                </Grid>
            </Grid>
      </Box>
    );
};

export default Home;
