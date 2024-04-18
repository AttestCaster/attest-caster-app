/* eslint-disable react-perf/jsx-no-new-function-as-prop */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState, useCallback } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import {
    SignProtocolClient,
    SpMode,
    OffChainSignType,
    OffChainRpc,
} from "@ethsign/sp-sdk";
import InputText from 'app/home/_components/InputText';
import { useAccount } from 'wagmi';
import Button from '@/components/Button/Button';

export default function Main(props: any) {

    const [comment, setComment] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [attestResult, setAttestResult] = useState('');
    const [hiddenResult, setHiddenResult] = useState(true);
    const [error, setError] = useState(''); // State for holding error messages
    const { isConnected, address } = useAccount();


    const attest = useCallback(async () => {
        if (!isConnected || !address) {
            setError('Please connect to the wallet first')
            return
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
        const schemaId = `${process.env.NEXT_PUBLIC_SIGN_PROTOCOL_SCHEMA_ID_FARCASTER}`
        console.log('schemaId', schemaId)
        console.log('process env', process.env)
        try {
            const data = {
                castHash: props.castHash,
                authorFID: props.castFID,
                attesterFID: 0,
                attesterComment: comment,
                signature: 'test signature' // Todo:  check signature
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
            setAttestResult(result.attestationId);
            setHiddenResult(false);
            // return result
        } catch (e) {
            setDisabled(false);
            setError('An error occurred while creating the attestation. Please try again.'); // Set error message
            console.error(e)
            // return
        }
    }, [isConnected, address, props, comment])

    const updateComment = (event: any) => {
        setComment(event.target.value);
    }

    if (!props.cast) {
        return null;
    }
    
    // console.log(props.cast);
    return (<div className="container mx-auto flex flex-col gap-8 px-8 py-6">
        <p>{props.cast}</p>
        <InputText
            id='comment_content'
            placeholder='Input comment here(optional)'
            onChange={updateComment}
            disabled={false}
        />
        <Button buttonContent={disabled ? "Attesting" : "Attest"} onClick={() => attest()} disabled={disabled} />
        <div hidden={hiddenResult}>
            <p>Success! Attestation Result: <a target="_blank" href={"https://testnet-scan.sign.global/attestation/" + attestResult}>{attestResult}</a></p>
            <p>Use this link to share in Farcaster with Farcaster Frame: <a target="_blank" href={"/api/frame/" + attestResult + '/metadata'}>{"http://localhost:3000/api/frame/" + attestResult + '/metadata'}</a></p>
        </div>
        {error && <p className="text-red-500">{error}</p>} {/* Display error messages */}
    </div>);
}
