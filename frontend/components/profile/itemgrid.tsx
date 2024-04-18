import { Card, CardActionArea, CardMedia, Typography } from '@mui/material';
import React from 'react';

const ItemBox = ({ imageUrl, linkUrl, title }) => (
  <Card sx={{ maxWidth: 345, m: 2 }}>
    <CardActionArea component="a" href={linkUrl} target="_blank" rel="noopener noreferrer">
      <CardMedia
        component="img"
        height="140"
        image={imageUrl}
        alt={title}
      />
      <Typography gutterBottom className = 'text-black-500 text-xl'>
        {title}
      </Typography>
    </CardActionArea>
  </Card>
);
