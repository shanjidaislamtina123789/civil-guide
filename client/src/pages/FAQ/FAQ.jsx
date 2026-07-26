import React, { useState, useEffect } from 'react';

const defaultFaqs = [
  { id: '1', q: 'How long does e-passport processing take?', a: 'Regular processing takes 15 to 21 working days.' },
  { id: '2', q: 'Can I apply for NID correction online?', a: 'Yes, via the official NID portal NIDW.' },
];

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [userQuestion, setUserQuestion] = useState('');

  useEffect(() => {
    const savedFaqs = JSON.parse(localStorage.getItem('appFaqs')) || defaultFaqs;
    setFaqs(savedFaqs);
  }, []);

  const handleAskQuestion = (e) => {
    e.preventDefault();
    if (!userQuestion) return;

    const newFaq = {
      id: Date.now().toString(),
      q: userQuestion,
      a: 'Pending admin review/answer.'
    };

    const updated = [...faqs, newFaq];
    setFaqs(updated);
    localStorage.setItem('appFaqs', JSON.stringify(updated));
    setUserQuestion('');
    alert('Your question has been submitted!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 min-h-[75vh]">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Frequently Asked Questions</h1>

      {/* Question Submission Form */}
      <form onSubmit={handleAskQuestion} className="mb-8 bg-orange-50 p-4 rounded-2xl flex gap-3">
        <input
          type="text"
          placeholder="Ask a question..."
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          className="flex-1 text-xs p-3 rounded-xl border border-orange-200 focus:outline-none"
          required
        />
        <button type="submit" className="bg-orange-600 text-white text-xs font-bold px-5 py-3 rounded-xl shrink-0">
          Ask Question
        </button>
      </form>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white border rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-sm text-gray-800">{faq.q}</h3>
            <p className="text-xs text-gray-500 mt-2">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;