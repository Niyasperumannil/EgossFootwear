import React from 'react'
import CategoryCarousel from '../CategoryCarousel/CategoryCarousel'
import Navbar from '../Navbar'
import HeroBanner from '../HeroBanner/HeroBanner'
import LogoMarquee from '../LogoMarquee/LogoMarquee'
import DriftSneakers from '../DriftSneakers/DriftSneakers'
import WatchAndBuy from '../WatchAndBuy/WatchAndBuy'
import ZeroGravityHero from '../ZeroGravityHero/ZeroGravityHero'
import Footer from '../Footer/Footer'

function ConnectionHeader() {
  return (
    <>
    <Navbar />
      <CategoryCarousel />
      <HeroBanner />
      <LogoMarquee />
      <DriftSneakers />
      <WatchAndBuy />
      <ZeroGravityHero />
      <Footer />
    </>
  )
}

export default ConnectionHeader
