import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import chatMockup from '@/lib/chat-mockup.png';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary leading-tight">
            AI-Powered Health Awareness Chatbot
          </h1>
          <p className="text-lg text-muted-foreground">
            Get instant, reliable health information and symptom analysis. Your personal health assistant is here to help, anytime.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/chatbot">Try the Chatbot</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
        <div>
          <Image
            src="https://picsum.photos/seed/laptop/600/400"
            alt="Chatbot mockup on a laptop screen"
            width={600}
            height={400}
            className="rounded-lg shadow-2xl mx-auto"
            data-ai-hint="laptop computer"
          />
        </div>
      </div>
    </div>
  );
}
