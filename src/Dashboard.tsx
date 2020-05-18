import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  AccountBalanceWallet as WalletIcon,
  Refresh as RefreshIcon,
} from '@material-ui/icons';
import { MainListItems, ActionListItems, ActionList } from './SideMenuItems';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import Records from './Records';
import AddNewDataNode from './AddNewDataNode';
import AddExistingDataNode from './AddExistingDataNode';
import SetMnemonic from './SetMnemonic';
import AddChannel from './AddChannel';
import {
  setWallet,
  getWalletAddress,
  register,
  DataNode,
  getAccountBalance,
  updateChannels,
  getRecords,
} from './qonico.service';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [openNew, setOpenNew] = React.useState(false);
  const [openExisting, setOpenExisting] = React.useState(false);
  const [openMnemonic, setOpenMnemonic] = React.useState(false);
  const [openAddChannel, setOpenAddChannel] = React.useState(false);
  const [dataNodes, setDataNodes] = useState<DataNode[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [mainDisplay, setMainDisplay] = useState('dashboard');
  const [records, setRecords] = useState<any[]>([]);

  const walletAddress = getWalletAddress();

  useEffect(() => {
    if (mainDisplay !== 'dashboard') {
      getRecords(mainDisplay)
      .then(records => setRecords(records || []));
    }
  }, [mainDisplay])

  console.log(records);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const onActionClick = {
    AddNewDataNode: () => setOpenNew(true),
    AddExistingDataNode: () => setOpenExisting(true),
  };

  const handleNewClose = async (url?: string) => {
    setOpenNew(false);
    if (url && url.length) {
      const dataNode = await register(url);
      if (dataNode && !dataNodes.some(dn => dn.id === dataNode.id)) {
        setDataNodes([...dataNodes, dataNode]);
      }
    }
  }

  const handleExistingClose = (address?: string) => {
    setOpenExisting(false);
    if (address && address.length) {
      if (!dataNodes.some(dn => dn.id === address)) {
        setDataNodes([...dataNodes, { id: address, name: address, url: '' }]);
      }
    }
  }

  const handleMnemonicClose = (mnemonic?: string) => {
    setOpenMnemonic(false);
    if (mnemonic && mnemonic.length) {
      try {
        setWallet(mnemonic);
        refreshBalance();
      } catch (err) {
        console.error(err);
      }
    }
  }

  const handleAddChannelClose = async (channel?: string, variable?: string) => {
    setOpenAddChannel(false);
    if (channel && variable) {
      try {
        await updateChannels(mainDisplay, channel, variable);
      } catch (err) {
        console.error(err);
      }
    }
  }

  const refreshBalance = async () => {
    const result = await getAccountBalance();
    if (result?.status === 200 && result?.data?.result?.length) {
      setBalance(+result.data.result[0].amount);
    }
  }

  return (
    <div className={classes.root}>
      <AddNewDataNode open={openNew} onClose={handleNewClose} />
      <AddExistingDataNode open={openExisting} onClose={handleExistingClose} />
      <SetMnemonic open={openMnemonic} onClose={handleMnemonicClose} />
      <AddChannel open={openAddChannel} onClose={handleAddChannelClose} />
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          { mainDisplay === 'dashboard' ?
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Dashboard
              <div style={{fontSize: '.6em', color: '#CCC'}}>{walletAddress || ''}</div>
            </Typography>
            :
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              { mainDisplay }
            </Typography>
          }
          <IconButton color="inherit" onClick={() => setOpenMnemonic(true)}>
            <WalletIcon />
          </IconButton>
          <IconButton color="inherit" onClick={refreshBalance}>
            <RefreshIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><MainListItems dataNodes={dataNodes} onClick={setMainDisplay}/></List>
        <Divider />
        <List><ActionListItems onClick={(action) => onActionClick[action]()}/></List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        { mainDisplay === 'dashboard' ? 
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <Deposits balance={balance}/>
                </Paper>
              </Grid>
              {/* Recent Orders */}
              {/* <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Orders />
                </Paper>
              </Grid> */}
            </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        :
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} style={{textAlign: 'right'}}>
              <Button variant="contained" color="primary" onClick={() => setOpenAddChannel(true)}>Add Channel</Button>
            </Grid>
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>
                <Chart rows={records}/>
              </Paper>
            </Grid>
            {/* Recent Records */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Records rows={records}/>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      }
      </main>
    </div>
  );
}