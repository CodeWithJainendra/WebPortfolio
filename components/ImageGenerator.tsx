import React, { useState } from 'react';
import SectionWrapper from './SectionWrapper';
import { GoogleGenAI } from '@google/genai';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
        },
      });

      if (response.generatedImages && response.generatedImages.length > 0) {
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        const url = `data:image/jpeg;base64,${base64ImageBytes}`;
        setImageUrl(url);
      } else {
        setError('Could not generate an image. Please try a different prompt.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating the image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper id="image-gen" title="AI Image Generator">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-lg text-slate-400 mb-8">
          Unleash your creativity! Describe an image you want to see, and let our AI bring it to life.
        </p>
        <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A futuristic city on Mars at sunset"
            required
            className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow text-slate-300 placeholder-slate-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg shadow-indigo-500/30 whitespace-nowrap"
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </form>

        <div className="w-full aspect-square bg-slate-800/50 border-2 border-dashed border-slate-700 rounded-lg flex items-center justify-center p-4">
          {loading && (
            <div className="flex flex-col items-center justify-center">
              <svg className="animate-spin h-10 w-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="mt-4 text-slate-400">Generating your masterpiece...</p>
            </div>
          )}
          {error && <p className="text-red-400">{error}</p>}
          {!loading && imageUrl && (
            <img src={imageUrl} alt={prompt} className="max-w-full max-h-full object-contain rounded-md" />
          )}
          {!loading && !imageUrl && !error && (
            <p className="text-slate-500">Your generated image will appear here.</p>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ImageGenerator;