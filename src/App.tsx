import './styles/globals.css'
import { SmoothScrollProvider } from '@/components/animation/SmoothScrollProvider'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { IdentityFoundation } from '@/components/sections/IdentityFoundation'
import { Skills } from '@/components/sections/Skills'
import { WorkCraft } from '@/components/sections/WorkCraft'
import { PathAndEvidence } from '@/components/sections/PathAndEvidence'
import { OpenCommunication } from '@/components/sections/Contact'
import { ParticleField } from '@/components/effects/ParticleField'
import { NoiseOverlay } from '@/components/effects/NoiseOverlay'
import { MagneticCursor } from '@/components/effects/MagneticCursor'

export function App() {
  return (
    <SmoothScrollProvider>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navigation />
      <main id="main-content">
        <Hero />
        <IdentityFoundation />
        <Skills />
        <WorkCraft />
        <PathAndEvidence />
        <OpenCommunication />
      </main>
      <Footer />
      <ParticleField />
      <NoiseOverlay />
      <MagneticCursor />
    </SmoothScrollProvider>
  )
}
