import AsciiBackground from '@/components/AsciiBackground';
import Hero from '@/sections/Hero';
import TerminalGrid from '@/sections/TerminalGrid';

export default function Home() {
  return (
    <main>
      {/* ASCII Background - only visible in terminal section */}
      <AsciiBackground />
      
      {/* Hero Section - Editorial, on solid background */}
      <Hero />
      
      {/* Terminal Grid Section - with ASCII bg */}
      <TerminalGrid />
    </main>
  );
}
