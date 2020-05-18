import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  const { balance = 0 } = props;
  let mappedBalance;
  if (balance === 0) {
    mappedBalance = balance;
  } else if (balance > 999999999999999) {
    mappedBalance = Math.floor(balance/10000000000000)/100 + 'B';
  } else if (balance > 999999999999) {
    mappedBalance = Math.floor(balance/10000000000)/100 + 'M';
  } else if (balance > 999999999) {
    mappedBalance = Math.floor(balance/10000000)/100 + 'K';
  } else if (balance > 999999) {
    mappedBalance = Math.floor(balance/10000)/100;
  } else if (balance > 999) {
    mappedBalance = Math.floor(balance/10)/100 + 'm';
  } else {
    mappedBalance = balance + 'u';
  }

  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Balance</Title>
      <Typography component="p" variant="h4">
        $ { mappedBalance }
      </Typography>
      {/* <Typography color="textSecondary" className={classes.depositContext}>
        on 15 March, 2019
      </Typography> */}
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}