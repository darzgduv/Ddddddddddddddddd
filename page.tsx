'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import { reasonedAnswer } from '@/ai/flows/reasoned-answer';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Bot, Cpu, Loader2, Sparkles, User, Terminal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SplashScreen } from '@/components/splash-screen';
import { SecondSplashScreen } from '@/components/second-splash-screen';

type ViewState = 'splash1' | 'splash2' | 'main';

export default function Home() {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [view, setView] = useState<ViewState>('splash1');
  const answerRef = useRef<HTMLDivElement>(null);

  const { toast } = useToast();

  useEffect(() => {
    if (view === 'splash1') {
      const timer = setTimeout(() => {
        setView('splash2');
      }, 7000); // 7 seconds for first splash
      return () => clearTimeout(timer);
    }
    if (view === 'splash2') {
      const timer = setTimeout(() => {
        setView('main');
      }, 5000); // 5 seconds for second splash
      return () => clearTimeout(timer);
    }
  }, [view]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setProgress(10); // Start with a bit of progress
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 95 ? 95 : prev + 5));
      }, 500);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (answer && answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [answer]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    setIsLoading(true);
    setAnswer('');
    
    try {
      const result = await reasonedAnswer({ question });
      setProgress(100);
      setAnswer(result.answer);
    } catch (error) {
      console.error('Error getting answer:', error);
      toast({
        variant: 'destructive',
        title: 'حدث خطأ في النظام',
        description: 'فشل الاتصال بالواجهة العصبية. يرجى المحاولة مرة أخرى.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (view === 'splash1') {
    return <SplashScreen />;
  }
  
  if (view === 'splash2') {
    return <SecondSplashScreen />;
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4 selection:bg-primary/30 font-body antialiased bg-background">
      <header className="w-full max-w-5xl flex justify-center items-center gap-4 py-16">
        <Cpu className="h-12 w-12 md:h-20 md:w-20 text-primary text-glow" />
        <h1 className="text-6xl md:text-8xl font-black font-headline text-glow tracking-widest uppercase">
          RAGHAD
        </h1>
      </header>

      <main className="w-full max-w-4xl flex-1 flex flex-col gap-10 pb-10">
        <div className="glass-card">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4">
               <Terminal className="h-8 w-8 text-primary" />
               <h2 className="text-3xl font-bold tracking-wider font-headline">مدخل الاستعلام</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              أدخل استفسارك في الواجهة العصبية للحصول على إجابات آنية.
            </p>
              <Textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="...اكتب سؤالك هنا، على سبيل المثال، ما هي أحدث النظريات حول الثقوب الدودية؟"
                className="w-full min-h-[140px] text-lg p-4 rounded-xl bg-input border-2 border-border focus-visible:ring-primary focus-visible:ring-2 focus-visible:border-transparent transition-all duration-300"
                disabled={isLoading}
              />
            <div className="mt-6 flex justify-start">
              <Button type="submit" disabled={isLoading || !question.trim()} size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-xl font-bold shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105 transform">
                {isLoading ? (
                  <>
                    <Loader2 className="ml-3 h-6 w-6 animate-spin" />
                    ...جاري المعالجة
                  </>
                ) : (
                  <>
                    <Sparkles className="ml-3 h-6 w-6" />
                    أرسل الاستعلام
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {isLoading && (
          <div className="w-full px-1 flex flex-col items-center gap-4">
             <div className="w-full max-w-md">
                <Progress value={progress} className="w-full h-2.5 rounded-full bg-secondary [&>div]:bg-gradient-to-r [&>div]:from-accent [&>div]:to-primary" />
             </div>
            <p className="text-md text-center text-muted-foreground animate-pulse">...جاري إنشاء اتصال بالشبكة العصبية</p>
          </div>
        )}

        {answer && !isLoading && (
          <div ref={answerRef} className="animate-in fade-in-0 slide-in-from-bottom-10 duration-700">
            <div className="glass-card p-6 md:p-8 flex flex-col gap-6">
              <div className="flex items-center gap-4 border-b border-border/50 pb-4">
                <div className="flex-shrink-0 p-3 bg-muted rounded-full border border-border">
                  <User className="h-7 w-7 text-primary" />
                </div>
                <p className="font-semibold text-xl text-foreground">{question}</p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-primary rounded-full shadow-lg shadow-primary/30 border border-purple-300">
                  <Bot className="h-7 w-7 text-primary-foreground" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="font-body text-xl text-muted-foreground leading-relaxed whitespace-pre-wrap">{answer}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="py-10 text-center text-muted-foreground/50 text-sm">
        <p>Powered by Firebase & Genkit // Future-UI-Protocol v3.0</p>
      </footer>
    </div>
  );
}
