import Link from 'next/link';

const FeatureCard = ({ title, description, href }: { title: string, description: string, href: string }) => (
  <Link href={href} className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <h2 className="text-xl font-bold mb-2">{title}</h2>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </Link>
);

export default function Home() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Welcome to IGCSE Prep</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">Your all-in-one platform for IGCSE success.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard 
          title="Chatbot Tutor" 
          description="Ask questions and get clear explanations on any IGCSE topic."
          href="/chatbot"
        />
        <FeatureCard 
          title="Mock Exam Generator" 
          description="Create custom exam papers with real-style questions."
          href="/mock-exam"
        />
        <FeatureCard 
          title="Flashcards System" 
          description="Generate flashcards for key definitions, formulas, and concepts."
          href="/flashcards"
        />
        <FeatureCard 
          title="Level Tester" 
          description="Test your understanding and get topic recommendations."
          href="/level-test"
        />
        <FeatureCard 
          title="Personalised Question Bank" 
          description="Practice questions that adapt to your learning pace."
          href="/question-bank"
        />
      </div>
    </div>
  );
}
