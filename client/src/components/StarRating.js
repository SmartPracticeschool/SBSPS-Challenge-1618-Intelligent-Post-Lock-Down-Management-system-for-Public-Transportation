import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Footer from './footer';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});



export default function HoverRating(props) {
  const [value, setValue] = React.useState(props.value);
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();
  console.log(props);



  return (
    <div className={classes.root}>

      <Rating
        readOnly={props.readOnly}
        name={props.name}
        value={props.comp === "give" ? value : props.value}
        precision={0.5}
        onChange={(event, newValue) => {
          props.onChangeP(newValue);
          setValue(newValue);

        }}
        onChangeActive={(event, newHover) => {

          setHover(newHover);

        }}
      />
      {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}

    </div>
  );
}
