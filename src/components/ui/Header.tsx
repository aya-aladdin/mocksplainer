import Link from 'next/link';
import Logo from './Logo';
import { Button } from './Button';

const Header = () => {
  return (
    <header className="bg-card shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/chatbot" className="text-muted-foreground hover:text-primary">Chatbot Tutor</Link>
          <Link href="/mock-exam" className="text-muted-foreground hover:text-primary">Mock Exams</Link>
          <Link href="/flashcards" className="text-muted-foreground hover:text-primary">Flashcards</Link>
          <Link href="/level-test" className="text-muted-foreground hover:text-primary">Level Test</Link>
          <Link href="/question-bank" className="text-muted-foreground hover:text-primary">Question Bank</Link>
        </nav>
        <div className="flex items-center space-x-2">
          <Button variant="ghost">Login</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
