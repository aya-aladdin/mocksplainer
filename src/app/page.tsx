"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const featureTabsData = [
  { id: 'flashcards', label: 'AI Flashcards', content: 'Instantly convert your notes into smart, interactive flashcards to supercharge your revision.' },
  { id: 'ai-tutor', label: 'AI Tutor', content: 'Get unstuck with a personal AI tutor that provides clear explanations for any concept, anytime.' },
  { id: 'mock-tests', label: 'Generated Mocks', content: 'Generate complete, exam-style mock tests on any topic, complete with detailed IGCSE mark schemes.' },
];

const accordionData = [
    { title: 'IGCSE', image: '/img/blue.png', content: 'Comprehensive resources tailored specifically for the IGCSE curriculum, ensuring you cover every topic in depth.' },
    { title: 'A-Level', image: '/img/pink.png', content: 'Master advanced concepts with our expert-written guides and exam-style questions for your A-Level subjects.' },
    { title: 'IB (International Baccalaureate)', image: '/img/yellow.png', content: 'Navigate the IB Diploma Programme with confidence using our specialized notes, flashcards, and mock tests.' },
];

export default function LandingPage() {
  const [activeFeatureTab, setActiveFeatureTab] = useState('flashcards');
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [accordionImage, setAccordionImage] = useState(accordionData[0].image);
  const [heroStyle, setHeroStyle] = useState({ opacity: 1, transform: 'scale(1)' });

  const featureNavRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  // Effect for feature tab indicator
  useEffect(() => {
    const activeTabEl = featureNavRef.current?.querySelector<HTMLButtonElement>('.active-tab');
    if (activeTabEl && indicatorRef.current) {
      indicatorRef.current.style.left = `${activeTabEl.offsetLeft}px`;
      indicatorRef.current.style.width = `${activeTabEl.offsetWidth}px`;
    }
  }, [activeFeatureTab]);

  // Effect for infinite scroller
  useEffect(() => {
    if (scrollerRef.current) {
      const scrollerInner = scrollerRef.current;
      const scrollerContent = Array.from(scrollerInner.children);
      scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true) as HTMLElement;
        duplicatedItem.setAttribute("aria-hidden", "true");
        scrollerInner.appendChild(duplicatedItem);
      });
    }
  }, []);

  // Effect for hero scroll animation
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 0.6; // 60vh

      if (scrollY < heroHeight) {
        const scrollFraction = scrollY / (heroHeight / 2);
        const scale = Math.max(0.8, 1 - scrollFraction * 0.2);
        const opacity = Math.max(0, 1 - scrollFraction * 1.5);
        setHeroStyle({ transform: `scale(${scale})`, opacity });
      } else {
        setHeroStyle({ opacity: 0, transform: 'scale(0.8)' });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAccordionClick = (index: number) => {
    if (activeAccordion === index) return;
    setActiveAccordion(index);
    setAccordionImage(accordionData[index].image);
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-white/70 px-5 py-1.5 backdrop-blur-md backdrop-saturate-125">
        <div className="flex items-center gap-2 text-xl font-medium text-ink">
          <span>IGCSE MockSplainer</span>
        </div>
        <Link href="/login" className="rounded border border-gray-300 px-2.5 py-1 text-sm text-ink hover:bg-gray-100">Sign In</Link>
      </header>

      <main>
        <div className="relative">
          <div className="sticky top-0 grid h-[60vh] place-items-center text-center">
            <div className="container px-4 md:px-0" style={heroStyle}>
              <h1 className="text-5xl font-bold max-w-3xl mx-auto">Exam-specific revision,<br />made by trusted examiners</h1>
              <p className="text-muted">Real expertise. Real results. On average, our resources help students go up 2 grades.</p>
              <div className="mt-4 flex flex-col items-center gap-3">
                <div className="relative flex w-full max-w-md items-center rounded-xl border border-white/70 bg-white/50 shadow-lg backdrop-blur-sm">
                  <input type="email" className="flex-grow bg-transparent py-4 pl-4 pr-36 focus:outline-none" placeholder="Enter your email" />
                  <Link href="/register" className="absolute right-2 rounded-lg bg-accent px-6 py-2 font-semibold text-white shadow-ring hover:bg-accent-hover">Get Started</Link>
                </div>
                <Link href="/chatbot" className="rounded-lg border border-gray-300 bg-transparent px-6 py-3 font-semibold hover:bg-gray-100">Try our AI</Link>
              </div>
            </div>
          </div>

          <div className="relative z-10 bg-[#f3f4f4]">
            <div className="container mx-auto max-w-[1300px] py-12 px-4 md:px-0">
              <nav ref={featureNavRef} className="relative mx-auto flex max-w-md justify-center rounded-full bg-gray-200/70 p-1">
                {featureTabsData.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFeatureTab(tab.id)}
                    className={`feature-tab relative z-10 flex-1 rounded-full px-4 py-3 text-sm font-semibold transition-colors ${activeFeatureTab === tab.id ? 'active-tab text-ink' : 'text-muted'}`}
                  >
                    {tab.label}
                  </button>
                ))}
                <div ref={indicatorRef} className="feature-tab-indicator absolute top-1 h-[calc(100%-0.5rem)] rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg transition-all duration-500 ease-in-out" />
              </nav>
              <div className="relative mt-6 min-h-[40px] text-center">
                {featureTabsData.map(tab => (
                  <div key={tab.id} className={`absolute w-full transition-opacity duration-500 ${activeFeatureTab === tab.id ? 'opacity-100' : 'opacity-0'}`}>
                    <p>{tab.content}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="scroller w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
              <ul ref={scrollerRef} className="flex w-max animate-scroll gap-4 py-4">
                {['Cambridge', 'IGCSE', 'IB', 'A-Levels', 'Edexcel', 'OCR', 'AQA'].map(tag => (
                  <li key={tag} className="rounded-md bg-panel px-8 py-4 text-muted shadow-sm">{tag}</li>
                ))}
              </ul>
            </div>

            <div className="container mx-auto max-w-[1300px] py-16 px-4 md:px-0">
              <h2 className="text-2xl font-bold">Why it works</h2>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="card rounded-xl border border-border bg-panel p-6 shadow-sm">
                  <h3 className="font-bold">Revise only what you need to</h3>
                  <p className="text-muted">Enjoy the relief and reassurance that every revision guide is written specifically for that syllabus so you only revise what you need to know.</p>
                  <p className="mt-4 text-muted italic">“Never felt so relieved in my life”</p>
                </div>
                <div className="card rounded-xl border border-border bg-panel p-6 shadow-sm">
                  <h3 className="font-bold">Test yourself and check progress</h3>
                  <p className="text-muted">Feel empowered and confident going into exams knowing that you’ve covered all the topics and have a greater understanding of each subject.</p>
                  <p className="mt-4 text-muted italic">“The tailored level of questions builds so much confidence within my students”</p>
                </div>
                <div className="card rounded-xl border border-border bg-panel p-6 shadow-sm">
                  <h3 className="font-bold">Improve answer by answer</h3>
                  <p className="text-muted">Gain certainty that you’re answering questions that get maximum marks, from model answers for every question, explained by an expert examiner or teacher.</p>
                  <p className="mt-4 text-muted italic">“I went from a 6-7-7 in Year 10 to 9-9-9 for my real exams, only because of your superb resources”</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="border-y-2 border-border bg-[#f7f4f4] py-16">
            <h2 className="text-center text-2xl font-bold">What are you studying?</h2>
            <div className="mx-auto mt-8 grid max-w-[1300px] grid-cols-1 items-stretch border-y-2 border-border md:border-x-2 md:grid-cols-2">
                <div className="relative min-h-[450px] overflow-hidden">
                    {accordionData.map((item, index) => (
                        <Image key={index} src={item.image} alt="Curriculum feature image" fill style={{objectFit: 'cover'}} className={`transition-opacity duration-1000 ${accordionImage === item.image ? 'opacity-100' : 'opacity-0'}`} />
                    ))}
                </div>
                <div className="flex flex-col justify-center border-l-2 border-border">
                    {accordionData.map((item, index) => (
                        <div key={index} className={`accordion-item ${activeAccordion === index ? 'active' : ''}`}>
                            <button onClick={() => handleAccordionClick(index)} className="flex w-full items-center justify-between p-6 text-left">
                                <h3 className={`text-xl transition-colors ${activeAccordion === index ? 'font-semibold text-ink' : 'font-medium text-muted'}`}>{item.title}</h3>
                                <span className={`text-3xl font-light text-muted transition-transform ${activeAccordion === index ? 'rotate-45 text-ink' : ''}`}>+</span>
                            </button>
                            <div className={`overflow-hidden transition-[max-height,padding] duration-500 ease-in-out ${activeAccordion === index ? 'max-h-40 pb-6' : 'max-h-0'}`}>
                                <p className="px-6 text-muted">{item.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className="bg-panel py-12">
            <div className="container mx-auto max-w-[1300px] px-4 md:px-0">
                <h2 className="text-center text-5xl font-bold">Our Features</h2>
                <div className="mt-12 grid min-h-[400px] grid-cols-1 border border-border md:grid-cols-3">
                    {/* Feature Box: Tutor */}
                    <div className="group relative cursor-pointer overflow-hidden border-b border-border p-8 md:border-b-0 md:border-r">
                        <div className="absolute inset-0 transform bg-cover bg-center opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ backgroundImage: "url('/img/v3.png')", filter: 'blur(20px) saturate(150%) brightness(1.1)', transform: 'scale(1.1)' }}></div>
                        <div className="relative flex h-full flex-col justify-between text-ink transition-colors duration-500 group-hover:text-white">
                            <h3 className="text-2xl font-semibold">AI Chatbot Tutor</h3>
                            <div>
                                <p className="transition-transform duration-500 group-hover:-translate-y-8">Ask questions and get clear explanations on any topic.</p>
                                <Link href="/chatbot" className="absolute bottom-0 font-semibold text-blue-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100">Learn more &rarr;</Link>
                            </div>
                        </div>
                    </div>
                    {/* Feature Box: Flashcards */}
                    <div className="group relative cursor-pointer overflow-hidden border-b border-border p-8 md:border-b-0 md:border-r">
                        <div className="absolute inset-0 transform bg-cover bg-center opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ backgroundImage: "url('/img/v1.png')", filter: 'blur(20px) saturate(150%) brightness(1.1)', transform: 'scale(1.1)' }}></div>
                        <div className="relative flex h-full flex-col justify-between text-ink transition-colors duration-500 group-hover:text-white">
                            <h3 className="text-2xl font-semibold">AI Flashcards System</h3>
                            <div>
                                <p className="transition-transform duration-500 group-hover:-translate-y-8">Generate flashcards for quick revision of key concepts.</p>
                                <Link href="/flashcards" className="absolute bottom-0 font-semibold text-blue-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100">Learn more &rarr;</Link>
                            </div>
                        </div>
                    </div>
                    {/* Feature Box: Mocks */}
                    <div className="group relative cursor-pointer overflow-hidden p-8">
                        <div className="absolute inset-0 transform bg-cover bg-center opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ backgroundImage: "url('/img/v2dark.png')", filter: 'blur(20px) saturate(150%) brightness(1.1)', transform: 'scale(1.1)' }}></div>
                        <div className="relative flex h-full flex-col justify-between text-ink transition-colors duration-500 group-hover:text-white">
                            <h3 className="text-2xl font-semibold">AI Mock Test Generator</h3>
                            <div>
                                <p className="transition-transform duration-500 group-hover:-translate-y-8">Create exam-style tests on any topic, complete with detailed mark schemes.</p>
                                <Link href="/tests" className="absolute bottom-0 font-semibold text-blue-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100">Learn more &rarr;</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <footer className="bg-ink py-12 text-gray-400">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
                    {/* Footer Columns */}
                    <div>
                        <h4 className="font-bold text-panel">Home</h4>
                        <ul><li><Link href="/">Home</Link></li><li><Link href="/register">Resources</Link></li></ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-panel">Resources</h4>
                        <ul><li><Link href="/register">Learning Hub</Link></li><li><Link href="/register">Past Papers</Link></li></ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-panel">Members</h4>
                        <ul><li><Link href="/login">Log in</Link></li></ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-panel">Company</h4>
                        <ul><li><Link href="/">About us</Link></li><li><Link href="/">Terms</Link></li><li><Link href="/">Privacy</Link></li></ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-panel">Subjects</h4>
                        <ul><li><Link href="/register">Biology</Link></li><li><Link href="/register">Chemistry</Link></li><li><Link href="/register">Physics</Link></li></ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-panel">Follow us</h4>
                        <ul><li><a href="https://tiktok.com">TikTok</a></li><li><a href="https://instagram.com">Instagram</a></li></ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm md:flex md:justify-between">
                    <p>&copy; 2025 mocksplainer Ltd. All Rights Reserved.</p>
                    <p>IBO was not involved in the production of, and does not endorse, the resources created by mocksplainer.</p>
                </div>
            </div>
        </footer>
      </main>
    </>
  );
}