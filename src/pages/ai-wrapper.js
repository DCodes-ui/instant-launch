import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('/api/openai/chat', { message });
      setResponse(res.data.response);
    } catch (error) {
      console.error(error);
      setResponse('Es gab einen Fehler bei der Kommunikation mit der API.');
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (text) => {
    setMessage(text);
  };

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-4 bg-gray-800 shadow-md">
        <h1 className="text-2xl font-bold">OpenAI Chat</h1>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl flex flex-col md:flex-row bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <div className="w-full md:w-1/3 bg-gray-700 p-4">
            <button 
              onClick={() => handleButtonClick('How to use Ollama?')} 
              className="bg-gray-600 p-2 rounded w-full text-left"
            >
              How to use Ollama?
            </button>
            <button 
              onClick={() => handleButtonClick('Top ideas to build in AI using no-code tools')} 
              className="mt-2 bg-gray-600 p-2 rounded w-full text-left"
            >
              Top ideas to build in AI using no-code tools
            </button>
            <button 
              onClick={() => handleButtonClick('Best platform for using LLMs in cloud through API')} 
              className="mt-2 bg-gray-600 p-2 rounded w-full text-left"
            >
              Best platform for using LLMs in cloud through API
            </button>
          </div>
          <div className="w-full md:w-2/3 p-4">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                className="p-2 bg-gray-600 rounded"
                placeholder="Geben Sie Ihre Nachricht ein"
              />
              <button type="submit" disabled={loading} className="bg-green-500 p-2 rounded">
                {loading ? 'Senden...' : 'Senden'}
              </button>
            </form>
            {response && (
              <div className="mt-4 bg-gray-700 p-4 rounded">
                <strong>Antwort:</strong>
                <p>{response}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}