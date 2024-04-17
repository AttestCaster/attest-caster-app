/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client';

import { useEffect, useCallback, useState } from 'react';
import {
  IndexService
} from "@ethsign/sp-sdk";
import Banner from '@/components/layout/banner/banner';
import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import Main from '@/components/layout/Main';
import AttestationHistory from './_components/AttestationHistory';

export type HistoryRecord = {
  attestTimestamp: string,
  attestationId: string,
  attester: string,
  chainId: string,
  data: string,
  id: string
}

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function AttestationHistoryPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [historyRows, setHistoryRows] = useState<HistoryRecord[]>([]);
  // const [formRefresh, setFormRefresh] = useState();

  const getHistory = useCallback(async () => {
    // const client = new SignProtocolClient(SpMode.OffChain, {
    //   signType: OffChainSignType.EvmEip712,
    //   // signType: OffChainSignType["evm-eip712"],
    //   rpcUrl: OffChainRpc.testnet,
    //   // account: props.account
    //   // account: privateKeyToAccount(privateKey), // optional
    // });
    const indexService = new IndexService("testnet");

    const schemaId = `${process.env.NEXT_PUBLIC_SIGN_PROTOCOL_SCHEMA_ID_FARCASTER}`
    console.log('schemaId', schemaId)
    try {
      const page = 1
      const result = await indexService.queryAttestationList({
        schemaId,
        attester: '0x47F7EA0dd4418AA1cec00786F5C47623aC37bA42',
        page,
      })
      console.log('query result', result)
      // const records: HistoryRecord[] = result.rows
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      if (result.rows) {
        setHistoryRows(result.rows)
      }
    } catch (e) {
      console.error(e)
    }
    // return result
  }, [])
  
  useEffect(() => {
    setIsMounted(true);
    getHistory();

  }, [getHistory]);

  //  Fix hydration issues
  if (!isMounted) {
    return null;
  }

  // const getHistory = async () => {
  //   const signScanAPI = 'https://testnet-rpc.sign.global/api'
  //   const schemaId = process.env.NEXT_PUBLIC_SIGN_PROTOCOL_SCHEMA_ID_FARCASTER
  //   try {
  //     const response = await axios.get(signScanAPI + '/scan/search' + '&hash=' + castHash.toString()); //Todo:: verify format
  //     if (response.status = 200) {
  //       return response.data
  //     } else {
  //       console.error('faild to get cast by id', fid, castHash, response)
  //       return {}
  //     }
  //   } catch (error) {
  //     console.error(error)
  //     throw new Error('Failed to get Casts By Id')
  //   }

  // }

  

  return (
    <>
      <Header />
      <Main>
        <Banner pageName="Attestation" pageUrl="attestation-history" />
        <AttestationHistory historyRows={historyRows} />
      </Main>
      <Footer />
    </>
  );
}
