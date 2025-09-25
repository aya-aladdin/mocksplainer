import { BookOpen } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <BookOpen className="h-8 w-8 text-primary" />
      <span className="ml-2 text-xl font-bold">IGCSE Prep</span>
    </div>
  );
};

export default Logo;
