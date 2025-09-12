'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { Send, Languages, Bot, User, AlertTriangle, Lightbulb, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getSymptomAnalysis } from '@/lib/actions';
import type { Message } from '@/lib/types';
import type { SymptomCheckerOutput } from '@/ai/flows/symptom-checker';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/lib/firebase';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';


const languages = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'हिन्दी' },
  { value: 'bn', label: 'বাংলা' },
  { value: 'te', label: 'తెలుగు' },
  { value: 'mr', label: 'मराठी' },
  { value: 'ta', label: 'தமிழ்' },
  { value: 'gu', label: 'ગુજરાતી' },
  { value: 'kn', label: 'ಕನ್ನಡ' },
  { value: 'ml', label: 'മലയാളം' },
  { value: 'pa', label: 'ਪੰਜਾਬੀ' },
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [language, setLanguage] = useState('en');
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [user, loading] = useAuthState(auth);

  // Load messages from Firestore
  useEffect(() => {
    if (user) {
      const messagesRef = collection(firestore, 'chats');
      const q = query(
        messagesRef,
        where('userId', '==', user.uid),
        orderBy('createdAt')
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const userMessages: Message[] = [];
        querySnapshot.forEach((doc) => {
          userMessages.push({ id: doc.id, ...doc.data() } as Message);
        });
        setMessages(userMessages);
      });

      return () => unsubscribe();
    } else if (!loading) {
      // Clear messages if user logs out
      setMessages([]);
    }
  }, [user, loading]);

  const AssistantMessage = ({ content }: { content: SymptomCheckerOutput }) => (
    <div className="space-y-4">
      <Card className="border-primary/50 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-primary">
            <FileText className="h-5 w-5" />
            Likely Causes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{content.likelyCauses}</p>
        </CardContent>
      </Card>
      <Card className="border-accent/50 bg-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-accent-foreground">
            <Lightbulb className="h-5 w-5 text-accent" />
            Recommended Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{content.recommendedActions}</p>
        </CardContent>
      </Card>
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{content.disclaimer}</p>
        </CardContent>
      </Card>
    </div>
  );

  const handleSubmit = async (formData: FormData) => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Not Logged In',
        description: 'You must be logged in to use the chatbot.',
      });
      return;
    }

    const symptoms = formData.get('symptoms') as string;
    if (!symptoms.trim()) return;

    const newUserMessage = {
      role: 'user',
      content: symptoms,
      userId: user.uid,
      createdAt: serverTimestamp(),
    };
    
    // Save user message to Firestore
    const messagesRef = collection(firestore, 'chats');
    await addDoc(messagesRef, newUserMessage);

    formRef.current?.reset();

    startTransition(async () => {
      const result = await getSymptomAnalysis(formData);
      if (result.success && result.data) {
        const newAssistantMessage = {
          role: 'assistant',
          content: result.data,
          userId: user.uid,
          createdAt: serverTimestamp(),
        };
        // Save assistant message to Firestore
        await addDoc(messagesRef, newAssistantMessage);
      } else {
        toast({
          variant: 'destructive',
          title: 'An error occurred',
          description: result.error,
        });
        // Here you might want to remove the user's message if the assistant fails
      }
    });
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('div');
       if (scrollElement) {
         scrollElement.scrollTo({
           top: scrollElement.scrollHeight,
           behavior: 'smooth',
         });
       }
    }
  }, [messages]);

  return (
    <Card className="w-full h-[calc(100vh-8rem)] md:h-[calc(100vh-10rem)] flex flex-col shadow-2xl rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <Bot className="h-6 w-6 text-primary" />
          <CardTitle className="text-lg font-headline">AI Symptom Checker</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Languages className="h-4 w-4 text-muted-foreground" />
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[120px] h-8 text-xs">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.value} value={lang.value} className="text-xs">
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="p-6 space-y-6">
            {!user && !loading && (
              <div className="text-center text-muted-foreground p-8">
                <p>Please log in to start a conversation.</p>
              </div>
            )}
            {user && messages.length === 0 && !loading && (
              <div className="text-center text-muted-foreground p-8">
                <p>Welcome to MedLax!</p>
                <p className="text-sm">Describe your symptoms to get started.</p>
              </div>
            )}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback>
                      <Bot className="h-5 w-5 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-md rounded-xl p-4 shadow-sm ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border'
                  }`}
                >
                  {typeof message.content === 'string' ? (
                    <p className="text-sm">{message.content}</p>
                  ) : (
                    <AssistantMessage content={message.content as SymptomCheckerOutput} />
                  )}
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isPending && (
              <div className="flex items-start gap-4 justify-start">
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback>
                      <Bot className="h-5 w-5 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="max-w-md rounded-xl p-4 shadow-sm bg-card border flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin"/>
                    <p className="text-sm text-muted-foreground">Thinking...</p>
                  </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <div className="border-t p-4 bg-card">
        <form ref={formRef} action={handleSubmit} className="flex items-center gap-2">
          <input type="hidden" name="language" value={language} />
          <Textarea
            name="symptoms"
            placeholder="For example: 'I have a headache and a slight fever...'"
            className="flex-1 resize-none"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                formRef.current?.requestSubmit();
              }
            }}
            disabled={isPending || !user}
          />
          <Button type="submit" size="icon" disabled={isPending || !user}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}
