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
    marginTop: 10,
    marginBottom: 30,
    boxShadow: '0 4px 6px 4px rgba(156, 156, 156, .5)',
    transition: 'transform 450ms'
  },
  // '&:hover, &root': {transform: LinearScale},
  media: {
    height: 200,
  },
});

export default function StudentCard(props) {
  const classes = useStyles();

  function truncate(str, n) {
      return str?.length>n ? str.substr(0, n-1)+'...' : str;
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.student.avatar}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            { props.student.name }
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            { props.student.position }
          </Typography><hr />
          <Typography variant="body2" color="textSecondary" component="p">
            { truncate(props.student.comment, 250) }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
