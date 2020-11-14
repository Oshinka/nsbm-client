import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 345,
    maxWidth: 345,
    margin: 10,
    transition: 'transform 450ms'
  },
  // '&:hover root': {transform: scale(1.08)},
  media: {
    height: 300,
  },
});

export default function LecturerCard({ name, avatar, position }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={avatar}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            { name }
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            { position }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
