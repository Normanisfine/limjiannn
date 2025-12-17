'use client';

export default function LinkPage() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-4">
      {/* Background similar to the main page */}
      <div className="fixed top-0 left-0 h-screen w-full z-[-2] pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-900/20 rounded-full -translate-y-48 translate-x-48"></div>
      </div>

      <div className="w-full max-w-7xl h-full flex flex-col gap-4 pt-20 pb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            MRI Final Presentation
          </h1>
          <a
            href="/"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Home
          </a>
        </div>

        <div className="text-white">
          <p className="text-sm md:text-base">
            <span className="text-gray-400">Direct link: </span>
            <a
              href="https://docs.google.com/presentation/d/1nr_l18EP10iq4dmFR5bg97Z1Y6HWB1pMoPAsGeODnLA/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline transition-colors break-all"
            >
              https://docs.google.com/presentation/d/1nr_l18EP10iq4dmFR5bg97Z1Y6HWB1pMoPAsGeODnLA/edit?usp=sharing
            </a>
          </p>
        </div>

        <div className="flex-1 w-full bg-white rounded-lg shadow-2xl overflow-hidden">
          <iframe
            src="https://docs.google.com/presentation/d/1nr_l18EP10iq4dmFR5bg97Z1Y6HWB1pMoPAsGeODnLA/embed?start=false&loop=false&delayms=3000"
            className="w-full h-full"
            allowFullScreen
            title="MRI Final Presentation"
          />
        </div>
      </div>
    </div>
  );
}
