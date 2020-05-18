import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Records(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Records</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Channel</TableCell>
            <TableCell>Variable</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Misc</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows?.map((row) => (
            <TableRow key={row.ts}>
              <TableCell>{moment(row.ts*1000).format('YYYY/MM/DD hh:mm:ss')}</TableCell>
              <TableCell>{row.channel}</TableCell>
              <TableCell>{row.variable}</TableCell>
              <TableCell>{row.value/1000}</TableCell>
              <TableCell>{row.misc}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}