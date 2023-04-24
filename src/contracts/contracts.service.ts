import { Injectable } from '@nestjs/common';
import { DefenderRelayProvider, DefenderRelaySigner } from 'defender-relay-client/lib/ethers';
import { ethers } from 'ethers';
import { WONKA_1155_ABI, WONKA_1155_CONTRACT_ADDRESS } from './configData';

@Injectable()
export class ContractsService {
  async mint(tokenId:number,quantity:number,dni:number,email:string,firstName:string,lastName:string){
    try {
      const credentials = { apiKey: process.env.API_KEY_DEFENDER, apiSecret: process.env.API_SECRET_DEFENDER };
    const provider = new DefenderRelayProvider(credentials);
    const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });
    const erc20 = new ethers.Contract(WONKA_1155_CONTRACT_ADDRESS, WONKA_1155_ABI, signer);
    const tx= await erc20.functions.nonCryptoMint(tokenId,quantity,dni,email,firstName,lastName);
    return tx;
    } catch (error) {
       throw error;
    }
    
  }
}
