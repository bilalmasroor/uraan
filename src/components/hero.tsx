import heroVideo from "../assets/Hero-video.mp4";
// If you're using Next.js with /public/assets, use src="/assets/Hero-video.mp4" instead.

export default function Hero() {
  return (
    <section aria-label="Hero video">
      <video
        className="block w-full h-auto"
        src={heroVideo}          // or "/assets/Hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        // poster="/assets/hero-poster.jpg" // optional fallback image
      />
    </section>
  );
}
