import Lottie from 'lottie-react'
import headline from '../assets/headline.json'

// Intrinsic aspect ratio from the JSON: w: 1900, h: 300 → 1900/300
export default function Headline() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="relative w-full aspect-[1900/180]">
          <Lottie
            autoplay
            loop
            animationData={headline}
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
    </section>
  )
}

