import React from 'react';
import moment from 'moment';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

export default function Chart(props) {
  const { rows } = props;
  const theme = useTheme();

  const data = rows.map(r => ({
    time: r.ts*1000,
    amount: r.value/1000,
  }));

  const tickFormatter = (unixTime) => {
    console.log(unixTime);
    console.log(moment(unixTime).format('HH:mm'));
    return moment(unixTime).format('HH:mm');
  };

  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis 
            dataKey="time"
            domain = {['auto', 'auto']}
            stroke={theme.palette.text.secondary}
            tickFormatter = {tickFormatter}
            type = 'number'
          />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              { props.rows?.length ? props.rows[0].variable : ''}
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}