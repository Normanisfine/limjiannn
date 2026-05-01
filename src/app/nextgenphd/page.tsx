import type { Metadata } from 'next';


const SLIDES_PRESENTATION_URL =
    'https://docs.google.com/presentation/d/1OFJThx-hf_BWA2lkCD6mzuvSoH3heb5oIdVOFNOSw7c/edit?usp=sharing';

const SLIDES_EMBED_URL =
    'https://docs.google.com/presentation/d/1OFJThx-hf_BWA2lkCD6mzuvSoH3heb5oIdVOFNOSw7c/embed';

export const metadata: Metadata = {
    title: 'NextGen PhD | Mingjian Li',
    description: 'NextGen PhD presentation (Google Slides)',
};

export default function NextGenPhdPage() {
    return (
        <main className="min-h-screen pb-16 pt-24 md:pt-28">
            <div className="container mx-auto max-w-6xl px-4 md:px-8">
                <header className="mb-8">
                    <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.3em] text-primary/70">
                        Presentation
                    </p>
                    <h1 className="mb-4 text-3xl font-bold text-glow md:text-4xl">
                        NextGen PhD
                    </h1>
                    <a
                        href={SLIDES_PRESENTATION_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary underline-offset-4 hover:underline"
                    >
                        Open in Google Slides
                    </a>
                </header>

                <div className="glass-card relative w-full overflow-hidden rounded-xl pt-[56.25%]">
                    <iframe
                        src={SLIDES_EMBED_URL}
                        title="NextGen PhD presentation"
                        className="absolute inset-0 h-full w-full border-0"
                        allowFullScreen
                    />
                </div>
            </div>
        </main>
    );
}
