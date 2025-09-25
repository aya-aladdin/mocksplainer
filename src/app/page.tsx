import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { BookOpen, FileText, Brain, MessageSquare, Star } from 'lucide-react';

const features = [
  {
    title: "Chatbot Tutor",
    description: "Ask questions and get clear explanations on any IGCSE topic.",
    href: "/chatbot",
    icon: <MessageSquare className="h-8 w-8 text-primary" />
  },
  {
    title: "Mock Exam Generator",
    description: "Create custom exam papers with real-style questions.",
    href: "/mock-exam",
    icon: <FileText className="h-8 w-8 text-primary" />
  },
  {
    title: "Flashcards System",
    description: "Generate flashcards for key definitions, formulas, and concepts.",
    href: "/flashcards",
    icon: <Brain className="h-8 w-8 text-primary" />
  },
  {
    title: "Level Tester",
    description: "Test your understanding and get topic recommendations.",
    href: "/level-test",
    icon: <BookOpen className="h-8 w-8 text-primary" />
  },
  {
    title: "Personalised Question Bank",
    description: "Practice questions that adapt to your learning pace.",
    href: "/question-bank",
    icon: <Star className="h-8 w-8 text-primary" />
  },
];

const FeatureCard = ({ title, description, href, icon }: { title: string, description: string, href: string, icon: React.ReactNode }) => (
  <Link href={href} className="block hover:shadow-lg transition-shadow rounded-lg">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  </Link>
);

export default function Home() {
  return (
    <div>
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold mb-4">Master Your IGCSEs</h1>
        <p className="text-xl text-muted-foreground mb-8">Your all-in-one platform for effective revision and exam preparation.</p>
        <Button size="lg">Get Started</Button>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>
    </div>
  );
}
