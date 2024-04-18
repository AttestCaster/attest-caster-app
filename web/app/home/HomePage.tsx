'use client';
import React, { useState } from "react";
import { useAccount } from 'wagmi'
import Footer from '@/components/layout/footer/Footer';
import Main from '@/components/layout/Main';
import HomeHeader from './_components/HomeHeader';
import Attest from './Attest';

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */

export default function HomePage() {
  const [cast, setCast] = useState("")
  const [castURL, setCastURL] = useState("")

  const [castFID, setCastFID] = useState(0)
  const [castHash, setCastHash] = useState("")
  const account = useAccount()

  return (
    <>
      <HomeHeader castURL={castURL} setCast={setCast} setCastFID={setCastFID} setCastHash={setCastHash} setCastURL={setCastURL}/>
      <Main>
        <Attest castURL={castURL} cast={cast} castFID={castFID} castHash={castHash} account={account} />
      </Main>
      <Footer />
    </>
  );
}
