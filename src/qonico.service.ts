import axios from 'axios';
import _ from 'lodash';
import { createWalletFromMnemonic, Wallet, signTx, StdTx } from '@tendermint/sig';

export type BroadcastMode = 'async' | 'block' | 'sync';

export type ICoin = {
  denom: string,
  amount: string,
};

export type AccountDetails = {
  height: string,
  result: {
    type: string,
    value: {
      address: string,
      coins: ICoin[],
      public_key: string,
      account_number: number,
      sequence: number,
    },
  },
};

export type DataNode = {
  id: string,
  name: string,
  url: string,
};

const restServer = 'http://localhost:8010/proxy';
const chainId = 'qonico';

const successResponse = (result: any) => result.data;
const errorResponse = (result: any) => result;

export const getAccountDetails = async (restServer: string, address: string): Promise<AccountDetails> => {
  return axios.get(`${restServer}/auth/accounts/${address}`)
  .then(successResponse)
  .catch(errorResponse);
};

export const broadcast = async (restServer: string, tx: StdTx, mode: BroadcastMode = 'block') => {
  return axios.post(`${restServer}/txs`, {
    tx,
    mode,
  })
  .then(successResponse)
  .catch(errorResponse);
};

let _wallet: Wallet;

export const setWallet = (mnemonic: string, password?: string) => {
  _wallet = createWalletFromMnemonic(mnemonic, password);
}

export const getWalletAddress = () => _wallet && _wallet.address;

export const setOwner = async (url: string) => {
  if (!_wallet) {
    return;
  }

  const tx = _.get(await axios.post(`${url}/owner`, {
    owner: _wallet.address,
  }), 'data.tx');

  const accountDetails = _.get(await getAccountDetails(restServer, _wallet.address), 'result.value', {});
  const meta = {
    account_number: accountDetails.account_number.toString(),
    sequence: accountDetails.sequence.toString(),
    chain_id: chainId,
  };

  const stdTx = signTx(tx, meta, _wallet);

  const result = await axios.post(`${url}/owner/signed`, { stdTx })
  console.log(result);
};

export const register = async (url: string): Promise<DataNode | undefined> => {
  if (!_wallet) {
    return;
  }

  const dataNode: string = _.get(await axios.get(`${url}/wallet`), 'data.address', '');

  const tx = {
    fee:  {
        amount: [],
        gas:    '200000'
    },
    memo: 'Register new iot device',
    msg: [{
      type: 'cosmos-sdk/MsgSend',
      value: {
        from_address: _wallet.address,
        to_address: dataNode,
        amount: [
          {
            amount: '10',
            denom: 'qon',
          }
        ]
      }
    }]
  };

  const accountDetails = _.get(await getAccountDetails(restServer, _wallet.address), 'result.value', {});
  const meta = {
    account_number: accountDetails.account_number.toString(),
    sequence: accountDetails.sequence.toString(),
    chain_id: chainId,
  };

  const stdTx = signTx(tx, meta, _wallet);

  let result = await broadcast(restServer, stdTx);
  console.log(result);

  result = await setOwner(url);
  console.log(result);

  return {
    id: dataNode,
    name: dataNode,
    url,
  };
}

export const updateChannels = async (dataNode: string, id: string, variable: string) => {
  if (!_wallet) {
    return;
  }

  const tx = {
    fee:  {
        amount: [],
        gas:    '200000'
    },
    memo: 'Register new iot device',
    msg: [{
      type: 'datanode/UpdateChannels',
      value: {
        owner: _wallet.address,
        datanode: dataNode,
        channels: [{
          action: 'set',
          id,
          variable,
        }]
      }
    }]
  }

  const accountDetails = _.get(await getAccountDetails(restServer, _wallet.address), 'result.value', {});
  const meta = {
    account_number: accountDetails.account_number.toString(),
    sequence: accountDetails.sequence.toString(),
    chain_id: chainId,
  };

  const stdTx = signTx(tx, meta, _wallet);

  const result = await broadcast(restServer, stdTx);

  console.log(result);
}

export const getAccountBalance = () => {
  if (!_wallet) {
    return;
  }

  return axios.get(`${restServer}/bank/balances/${_wallet.address}`);
}

export const getDataNode = (dataNode: string) => {
  return axios.get(`${restServer}/datanode/${dataNode}`);
}

export const getRecords = async (dataNodeAddress: string) => {
  const channel = _.get(await getDataNode(dataNodeAddress), 'data.result.channels[0]');
  if (!channel) {
    return;
  }

  return _.get(await axios.get(`${restServer}/datanode/${dataNodeAddress}/records/${channel.id}/${Math.round(Date.now()/1000)}`), 'data.result', [])
    .map((r: any) => ({ ...r, channel: channel.id, variable: channel.variable }));
}