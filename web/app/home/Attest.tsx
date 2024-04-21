/* eslint-disable react-perf/jsx-no-new-function-as-prop */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState, useCallback } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SignProtocolClient, SpMode, OffChainSignType, OffChainRpc } from '@ethsign/sp-sdk';
import InputCheckbox from 'app/home/_components/InputCheckbox';
import InputText from 'app/home/_components/InputText';
import { useAccount } from 'wagmi';
import Button from '@/components/Button/Button';
import InputRadiobox from './_components/InputRadiobox';

export default function Main(props: any) {
  const [comment, setComment] = useState('');
  const [isFactCheck, setIsFactCheck] = useState(false);

  const [reference1, setReference1] = useState('');
  const [reference2, setReference2] = useState('');
  const [reference3, setReference3] = useState('');
  const [reference4, setReference4] = useState('');

  const [disabled, setDisabled] = useState(false);
  const [attestResult, setAttestResult] = useState('');
  const [hiddenResult, setHiddenResult] = useState(true);
  const [error, setError] = useState(''); // State for holding error messages
  const { isConnected, address } = useAccount();

  const attest = useCallback(async () => {
    if (!isConnected || !address) {
      setError('Please connect to the wallet first');
      return;
    }
    setDisabled(true);
    setError(''); // Clear previous errors
    const client = new SignProtocolClient(SpMode.OffChain, {
      signType: OffChainSignType.EvmEip712,
      // signType: OffChainSignType["evm-eip712"],
      rpcUrl: OffChainRpc.testnet,
      // account: props.account
      // account: privateKeyToAccount(privateKey), // optional
    });
    const schemaId = `${process.env.NEXT_PUBLIC_SIGN_PROTOCOL_SCHEMA_ID_FARCASTER}`;
    console.log('schemaId', schemaId);
    console.log('process env', process.env);
    try {
      const data = {
        castURL: props.castURL,
        castHash: props.castHash,
        castAuthorFID: props.castFID,
        attesterFID: 0,
        isFactCheck, // bool
        context: comment,
        reference1,
        reference2,
        reference3,
        reference4,
      };
      console.log('props', props);
      console.log('attest data', data);
      const result = await client.createAttestation({
        schemaId,
        data,
        indexingValue: 'xxx',
      });
      console.log('attest result', result);
      setDisabled(false);
      setAttestResult(result.attestationId);
      setHiddenResult(false);
      // return result
    } catch (e) {
      setDisabled(false);
      setError('An error occurred while creating the attestation. Please try again.'); // Set error message
      console.error(e);
      // return
    }
  }, [
    isConnected,
    address,
    props,
    isFactCheck,
    comment,
    reference1,
    reference2,
    reference3,
    reference4,
  ]);

  if (!props.cast) {
    return null;
  }

  // console.log(props.cast);
  // Todo:: validate the value
  return (
    <div className="container mx-auto flex flex-col gap-8 px-8 py-6">
      <p style={{ whiteSpace: 'pre-line' }}>{props.cast}</p>
      <InputText
        id="comment_content"
        placeholder="Input comment here(optional)"
        onChange={(evt) => {
          setComment(evt.target.value);
        }}
        disabled={false}
      />
      {/* <InputCheckbox
        id="isFactCheck"
        labelText="Is Fact Check"
        onChange={(evt) => {
          setIsFactCheck(evt.target.checked);
        }}
        disabled={false}
        checked={false}
      /> */}
      <InputRadiobox
        id="isFactCheck"
        labelText="Is the statement true or false?"
        onChange={(evt) => {
          setIsFactCheck(evt.target.checked);
        }}
        disabled={false}
        checked={true}>
      </InputRadiobox>
      <InputText
        id="reference1"
        placeholder="Input reference1 here(optional)"
        onChange={(evt) => {
          setReference1(evt.target.value);
        }}
        disabled={false}
      />
      <InputText
        id="reference2"
        placeholder="Input reference2 here(optional)"
        onChange={(evt) => {
          setReference2(evt.target.value);
        }}
        disabled={false}
      />
      <InputText
        id="reference3"
        placeholder="Input reference3 here(optional)"
        onChange={(evt) => {
          setReference3(evt.target.value);
        }}
        disabled={false}
      />
      <InputText
        id="reference4"
        placeholder="Input reference4 here(optional)"
        onChange={(evt) => {
          setReference4(evt.target.value);
        }}
        disabled={false}
      />
      <Button
        buttonContent={disabled ? 'Attesting' : 'Attest'}
        onClick={() => attest()}
        disabled={disabled}
      />
      <div hidden={hiddenResult}>
        <p>
          Success! Attestation Result:{' '}
          <a
            target="_blank"
            href={
              (process.env.NEXT_PUBLIC_SIGN_SCAN_URL as string) + '/attestation/' + attestResult
            }
          >
            {attestResult}
          </a>
        </p>
        <p>
          Use this link to share in Farcaster with Farcaster Frame:{' '}
          <a target="_blank" href={'/api/frame/' + attestResult + '/0'}>
            {`${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/frame/` + attestResult + '/0'}
          </a>
        </p>
      </div>
      {error && <p className="text-red-500">{error}</p>} {/* Display error messages */}
    </div>
  );
}
