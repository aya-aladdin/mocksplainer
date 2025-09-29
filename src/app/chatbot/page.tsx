"use client";

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { BlockMath, InlineMath } from 'react-katex';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const suggestionPrompts = [
    { prompt: 'Explain Brownian motion', short: 'Explain Brownian motion', icon: '🔬' },
    { prompt: "What are the main themes in 'To Kill a Mockingbird'?", short: 'Analyze themes in "To Kill a Mockingbird"', icon: '📚' },
    { prompt: 'Help me solve this quadratic equation: x^2 - 5x + 6 = 0', short: 'Solve a quadratic equation', icon: '🧮' },
    { prompt: 'Summarize the process of photosynthesis', short: 'Summarize photosynthesis', icon: '🌿' },
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (prompt: string) => {
    if (!prompt.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: prompt }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) throw new Error('API response was not ok.');

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Error fetching chat response:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
    setInput('');
  };

  const startWithPrompt = (prompt: string) => {
    setInput(prompt);
    handleSendMessage(prompt);
  };

  return (
    <main className="mx-auto flex h-[calc(100vh-4rem)] max-w-4xl flex-col p-4">
      {messages.length === 0 ? (
        <div className="flex flex-grow flex-col items-center justify-center text-center">
          <div className="mb-12">
            <h1 className="text-6xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
              Hello!
            </h1>
            <h2 className="text-2xl text-muted">How can I help you today?</h2>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-4">
            {suggestionPrompts.map(({ prompt, short, icon }) => (
              <div key={prompt} onClick={() => startWithPrompt(prompt)} className="relative min-h-[100px] cursor-pointer rounded-xl bg-gray-100 p-4 transition-colors hover:bg-gray-200">
                <p className="font-medium">{short}</p>
                <div className="absolute bottom-3 right-3 rounded-full bg-white p-2 text-xl shadow-md">{icon}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-grow overflow-y-auto pr-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-4 my-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 text-center font-bold text-white flex items-center justify-center">✨</div>}
              <div className={`max-w-xl rounded-2xl px-4 py-2 ${msg.role === 'user' ? 'bg-blue-100 text-ink' : 'bg-transparent'}`}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  components={{
                    math: ({ value }) => <BlockMath math={value} />,
                    inlineMath: ({ value }) => <InlineMath math={value} />,
                    // Add custom styling for other elements if needed
                    p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2" {...props} />,
                    code: ({node, inline, ...props}) => 
                      inline ? <code className="bg-gray-200 rounded-sm px-1 py-0.5" {...props} /> : <pre className="bg-gray-800 text-white p-3 rounded-md my-2 overflow-x-auto"><code {...props} /></pre>
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
              {msg.role === 'user' && <div className="h-8 w-8 flex-shrink-0 rounded-full bg-purple-600 text-center font-bold text-white flex items-center justify-center">U</div>}
            </div>
          ))}
           {isLoading && (
            <div className="flex gap-4 my-4 justify-start">
              <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 text-center font-bold text-white flex items-center justify-center">✨</div>
              <div className="max-w-xl rounded-2xl px-4 py-2">
                <div className="animate-pulse flex space-x-2">
                    <div className="rounded-full bg-gray-300 h-3 w-3"></div>
                    <div className="rounded-full bg-gray-300 h-3 w-3"></div>
                    <div className="rounded-full bg-gray-300 h-3 w-3"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-4 flex items-center rounded-full bg-gray-100 p-2 shadow-inner">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a prompt here"
          className="flex-grow bg-transparent px-4 text-ink placeholder-muted focus:outline-none"
        />
        <button type="submit" disabled={isLoading} className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-xl text-white transition-colors hover:bg-accent-hover disabled:bg-gray-400">
          ➤
        </button>
      </form>
    </main>
  );
}
