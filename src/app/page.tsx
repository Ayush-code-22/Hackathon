import Chat from '@/components/chat';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-4 md:p-6">
      <div className="w-full max-w-4xl mx-auto">
        <Chat />
      </div>
    </div>
  );
}
