import React from 'react';
import Summarizer from './components/Summarizer';

export default function App() {
  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-start">
      <h1 className="text-2xl font-bold mb-4">DevBlog AI - Обобщаване на текст</h1>
      <Summarizer />
    </div>
  );
}
