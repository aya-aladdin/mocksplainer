import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          IGCSE Prep
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/chatbot" className="hover:text-gray-500">Chatbot Tutor</Link></li>
            <li><Link href="/mock-exam" className="hover:text-gray-500">Mock Exams</Link></li>
            <li><Link href="/flashcards" className="hover:text-gray-500">Flashcards</Link></li>
            <li><Link href="/level-test" className="hover:text-gray-500">Level Test</Link></li>
            <li><Link href="/question-bank" className="hover:text-gray-500">Question Bank</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
