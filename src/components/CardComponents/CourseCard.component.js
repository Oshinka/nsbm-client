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
    boxShadow: '0 0px 4px 2px rgba(156, 156, 156, .5)',
  },
  media: {
    height: 300,
  },
  title: {
    padding: 5,
  },
});

export default function CourseCard({title, image}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            align='center'
            className={classes.title}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}