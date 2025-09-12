'use client';

import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/lib/firebase';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart, Loader2, MessageSquare, AlertTriangle } from 'lucide-react';
import { Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Message } from '@/lib/types';
import { format } from 'date-fns';

type ChartData = {
  date: string;
  user: number;
  assistant: number;
};

export default function AnalyticsPage() {
  const [user, loading] = useAuthState(auth);
  const [stats, setStats] = useState({ totalMessages: 0, userMessages: 0, assistantMessages: 0 });
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const fetchChatData = async () => {
        try {
          setIsLoading(true);
          const messagesRef = collection(firestore, 'chats');
          const q = query(messagesRef, where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);

          const messages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));

          const totalMessages = messages.length;
          const userMessages = messages.filter(m => m.role === 'user').length;
          const assistantMessages = totalMessages - userMessages;

          setStats({ totalMessages, userMessages, assistantMessages });

          const dailyData: { [key: string]: { user: number; assistant: number } } = {};

          messages.forEach(message => {
            if (message.createdAt) {
              const date = (message.createdAt as Timestamp).toDate();
              const formattedDate = format(date, 'MMM d');
              if (!dailyData[formattedDate]) {
                dailyData[formattedDate] = { user: 0, assistant: 0 };
              }
              if (message.role === 'user') {
                dailyData[formattedDate].user += 1;
              } else {
                dailyData[formattedDate].assistant += 1;
              }
            }
          });
          
          const sortedChartData = Object.keys(dailyData)
            .map(date => ({
              date,
              user: dailyData[date].user,
              assistant: dailyData[date].assistant,
            }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());


          setChartData(sortedChartData);
          setError(null);
        } catch (err) {
          console.error("Error fetching analytics data:", err);
          setError("Could not load chat analytics. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchChatData();
    } else if (!loading) {
      setIsLoading(false);
    }
  }, [user, loading]);

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Loading Analytics...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <AlertTriangle className="h-8 w-8 text-destructive" />
        <p className="ml-2">Please log in to view your analytics.</p>
      </div>
    );
  }
  
  if (error) {
     return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <AlertTriangle className="h-8 w-8 text-destructive" />
        <p className="ml-2">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-headline font-bold text-primary">Usage Analytics</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          An overview of your interaction with MedLax.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMessages}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.userMessages}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Responses Received</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.assistantMessages}</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-6 w-6 text-primary" />
            Chat Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="user" fill="hsl(var(--primary))" name="You" />
                  <Bar dataKey="assistant" fill="hsl(var(--accent))" name="Assistant" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
             <div className="text-center text-muted-foreground p-8">
                <p>No chat activity yet. Start a conversation in the chatbot!</p>
              </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
