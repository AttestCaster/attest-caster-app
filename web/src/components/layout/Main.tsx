/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  SignProtocolClient,
  SpMode,
  OffChainSignType,
  OffChainRpc,
} from "@ethsign/sp-sdk";
import InputText from 'app/home/_components/InputText';
// import { clsx } from 'clsx';
import Button from "../Button/Button";


export default function Main(props) {
  
  const [comment, setComment] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [attestResult, setAttestResult] = useState([]);
  const [hiddenResult, setHiddenResult] = useState(true);

  if (!props.cast) {
    return <></>;
  }

  // function attest() {
  //   console.log(props.cast);
  //   console.log(comment);
  // }
  async function attest() {
    setDisabled(true);
    const client = new SignProtocolClient(SpMode.OffChain, {
      signType: OffChainSignType.EvmEip712,
      // signType: OffChainSignType["evm-eip712"],
      rpcUrl: OffChainRpc.testnet,
      // account: props.account
      // account: privateKeyToAccount(privateKey), // optional
    });
    const schemaId = `${process.env.NEXT_PUBLIC_SIGN_PROTOCOL_SCHEMA_ID_FARCASTER}`
    console.log('schemaId', schemaId)
    console.log('process env', process.env)
    try {
      const data = {
        castHash: props.castHash,
        authorFID: props.castFID,
        attesterFID: 0,
        attesterComment: comment,
        signature: 'test signature'
      }
      console.log('props', props)
      console.log('attest data', data)
      const result = await client.createAttestation({
        schemaId,
        data,
        indexingValue: "xxx",
      })
      console.log('attest result', result)
      setDisabled(false);
      setAttestResult(result?.attestationId);
      setHiddenResult(false);
      return result
    } catch (e) {
      setDisabled(false);
      console.error(e)
    }
  }

  function updateComment(event) {
    setComment(event.target.value);
  }

  // console.log(props.cast);
  return (<div className="container mx-auto flex flex-col gap-8 px-8 py-6">
    <p>{props.cast}</p>
    <InputText placeholder='Input comment here(optional)' onChange={updateComment}/>
    <Button buttonContent={disabled ? "Attesting": "Attest"} onClick={attest} disabled={disabled}/>
    <div hidden={hiddenResult}>Attestation Result: <a target="_blank" href={"https://testnet-scan.sign.global/attestation/" + attestResult.toString()}>{attestResult.toString()}</a></div>
  </div>);
}
