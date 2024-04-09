'use client';
import Footer from '@/components/layout/footer/Footer';
import Guide from './_components/Guide';
import HomeHeader from './_components/HomeHeader';
import WhyUseIt from './_components/WhyUseIt';
import Main from '@/components/layout/Main';
import React, { useState } from "react";

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */

export default function HomePage() {
  const [cast, setCast] = useState("")

  return (
    <>
      <HomeHeader setCast={setCast} />
      <Main cast={cast} />
      <Footer />
    </>
  );
}
