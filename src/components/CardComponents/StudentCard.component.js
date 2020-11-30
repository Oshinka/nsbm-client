import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './card.css';

const useStyles = makeStyles({
  root: {
    minWidth: 345,
    maxWidth: 345,
    marginTop: 10,
    marginBottom: 30,
    boxShadow: '0 4px 6px 4px rgba(156, 156, 156, .5)',
    transition: 'transform 450ms'
  },
  media: {
    height: 200,
  },
});

export default function StudentCard({ name, avatar, position, comment }) {
  const classes = useStyles();
  const isDark = useSelector(state => state.isDark);

  function truncate(str, n) {
      return str?.length>n ? str.substr(0, n-1)+'...' : str;
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={avatar}
          title="Contemplative Reptile"
        />
        <CardContent className={`${isDark && 'darkCardMode'}`}>
          <Typography gutterBottom variant="h5" component="h2">
            { name }
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            { position }
          </Typography><hr />
          <Typography variant="body2" color="textSecondary" component="p">
            { truncate(comment, 250) }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
