import { Injectable } from '@nestjs/common';
import {
  DefenderRelayProvider,
  DefenderRelaySigner,
} from 'defender-relay-client/lib/ethers';
import { ethers } from 'ethers';
import { WONKA_1155_ABI, WONKA_1155_CONTRACT_ADDRESS } from './configData';

@Injectable()
export class ContractsService {
  async mint(
    tokenId: number,
    quantity: number,
    dni: number,
    email: string,
    firstName: string,
    lastName: string,
  ) {
    try {
      const credentials = {
        apiKey: process.env.API_KEY_DEFENDER,
        apiSecret: process.env.API_SECRET_DEFENDER,
      };
      const provider = new DefenderRelayProvider(credentials);
      const signer = new DefenderRelaySigner(credentials, provider, {
        speed: 'fast',
      });
      const erc20 = new ethers.Contract(
        WONKA_1155_CONTRACT_ADDRESS,
        WONKA_1155_ABI,
        signer,
      );
      const tx = await erc20.functions.nonCryptoMint(
        tokenId,
        quantity,
        dni,
        email,
        firstName,
        lastName,
      );
      return tx;
    } catch (error) {
      throw error;
    }
  }
  async totalSupply() {
    try {
      const credentials = {
        apiKey: process.env.API_KEY_DEFENDER,
        apiSecret: process.env.API_SECRET_DEFENDER,
      };
      const provider = new DefenderRelayProvider(credentials);
      const signer = new DefenderRelaySigner(credentials, provider, {
        speed: 'fast',
      });
      const erc20 = new ethers.Contract(
        WONKA_1155_CONTRACT_ADDRESS,
        WONKA_1155_ABI,
        signer,
      );
      const totalSuply1 = erc20.functions.totalSupply(0);
      const totalSuply2 = erc20.functions.totalSupply(1);
      const totalSuply3 = erc20.functions.totalSupply(2);
      const totalSuply4 = erc20.functions.totalSupply(3);
      const totalSuply5 = erc20.functions.totalSupply(4);
      const promiseMain = await Promise.all([
        totalSuply1,
        totalSuply2,
        totalSuply3,
        totalSuply4,
        totalSuply5,
      ]);
  
      const totalSupplyAcum = Number(promiseMain[0][0]._hex)+Number(promiseMain[1][0]._hex)+Number(promiseMain[2][0]._hex)+Number(promiseMain[3][0]._hex)+Number(promiseMain[4][0]._hex);

      return {
        totalSupply:totalSupplyAcum
      };
    } catch (error) {
      throw error;
    }
  }
}
