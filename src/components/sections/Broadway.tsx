'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { motion } from 'framer-motion';
import { Theater, X, Music, Drama, Star } from 'lucide-react';

const broadwayShows = [
    { src: '/assets/broadway/magnets.jpeg', title: 'Broadway Magnets', venue: 'Collection' },
    { src: '/assets/broadway/wicked.jpeg', title: 'Wicked', venue: 'Gershwin Theatre' },
    { src: '/assets/broadway/hamilton.jpeg', title: 'Hamilton', venue: 'Richard Rodgers Theatre' },
    { src: '/assets/broadway/hamilton_lottery.jpeg', title: 'Hamilton Lottery', venue: 'Richard Rodgers Theatre' },
    { src: '/assets/broadway/hadestown.jpeg', title: 'Hadestown', venue: 'Walter Kerr Theatre' },
    { src: '/assets/broadway/sunset_boulavard.jpeg', title: 'Sunset Boulevard', venue: 'St. James Theatre' },
    { src: '/assets/broadway/sunset_boulavard2.jpeg', title: 'Sunset Boulevard', venue: 'St. James Theatre' },
    { src: '/assets/broadway/cabaret_entrance.jpeg', title: 'Cabaret', venue: 'Kit Kat Club' },
    { src: '/assets/broadway/cabaret_eva.jpeg', title: 'Cabaret', venue: 'Kit Kat Club' },
    { src: '/assets/broadway/molin_rouge.jpeg', title: 'Moulin Rouge!', venue: 'Al Hirschfeld Theatre' },
    { src: '/assets/broadway/dead_outlaw.jpeg', title: 'The Dead Outlaw', venue: 'Minetta Lane Theatre' },
    { src: '/assets/broadway/roomates.jpeg', title: 'The Roommate', venue: 'Booth Theatre' },
    { src: '/assets/broadway/roomates_2.jpeg', title: 'The Roommate', venue: 'Booth Theatre' },
    { src: '/assets/broadway/boop.jpeg', title: 'Boop!', venue: 'Marquis Theatre' },
    { src: '/assets/broadway/boop2.jpeg', title: 'Boop!', venue: 'Marquis Theatre' },
    { src: '/assets/broadway/boop3.jpeg', title: 'Boop!', venue: 'Marquis Theatre' },
    { src: '/assets/broadway/flee_market.jpeg', title: 'Flea Market', venue: '' },
    { src: '/assets/broadway/dbh.jpeg', title: 'Dear Evan Hansen', venue: 'Music Box Theatre' },
    { src: '/assets/broadway/mhe_card.jpeg', title: 'MHE Card', venue: '' },
    { src: '/assets/broadway/playbills.jpeg', title: 'Playbills Collection', venue: 'Collection' },
];

export default function Broadway() {
    const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; venue: string } | null>(null);

    return (
        <SectionWrapper id="broadway" className="flex flex-col justify-center container mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Theater className="text-accent" size={40} />
                    <h2 className="text-3xl md:text-5xl font-bold text-glow">
                        BROADWAY
                    </h2>
                </div>
                <p className="text-lg text-foreground/70 font-light max-w-2xl mx-auto">
                    A glimpse into my love for theater and the magic of Broadway shows
                </p>
            </div>

            {/* Shows I've Watched */}
            <div className="max-w-5xl mx-auto mb-16">
                <h3 className="text-3xl font-bold text-center text-primary mb-12">Shows I've Watched</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Musicals */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-primary/5 to-transparent p-6 rounded-2xl border border-white/5"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Music className="text-primary" size={28} />
                            <h4 className="text-2xl font-bold text-primary">Musicals</h4>
                        </div>
                        <ul className="space-y-2.5">
                            <li className="flex items-start gap-3 text-foreground/80 hover:text-foreground transition-colors">
                                <span className="text-yellow-400 mt-1">⭐</span>
                                <div>
                                    <span className="font-semibold text-yellow-400">Hadestown</span>
                                    <span className="text-xs text-foreground/50 ml-2">(All-time favorite)</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-2 text-foreground/80 hover:text-foreground transition-colors">
                                <span className="text-primary mt-1">♪</span>
                                <span>Maybe Happy Ending</span>
                            </li>
                            <li className="flex items-start gap-2 text-foreground/80 hover:text-foreground transition-colors">
                                <span className="text-primary mt-1">♪</span>
                                <span>Gypsy <span className="text-xs text-foreground/50">(starring Audra McDonald)</span></span>
                            </li>
                            <li className="flex items-start gap-2 text-foreground/80 hover:text-foreground transition-colors">
                                <span className="text-primary mt-1">♪</span>
                                <span>Sunset Boulevard</span>
                            </li>
                            <li className="flex items-start gap-2 text-foreground/80 hover:text-foreground transition-colors">
                                <span className="text-primary mt-1">♪</span>
                                <span>Death Becomes Her</span>
                            </li>
                            <li className="flex items-start gap-2 text-foreground/80 hover:text-foreground transition-colors">
                                <span className="text-primary mt-1">♪</span>
                                <span>MJ The Musical</span>
                            </li>
                            <li className="flex items-start gap-2 text-foreground/80 hover:text-foreground transition-colors">
                                <span className="text-primary mt-1">♪</span>
                                <span>Wicked</span>
                            </li>
                            <li className="flex items-start gap-2 text-foreground/80 hover:text-foreground transition-colors">
                                <span className="text-primary mt-1">♪</span>
                                <span>Hamilton</span>
                            </li>
                            <li className="flex items-start gap-2 text-foreground/80 hover:text-foreground transition-colors">
                                <span className="text-primary mt-1">♪</span>
                                <span>Heathers: The Musical</span>
                            </li>
                            <li className="flex items-start gap-2 text-foreground/80 hover:text-foreground transition-colors">
                                <span className="text-primary mt-1">♪</span>
                                <span>Cabaret at the Kit Kat Club</span>
                            </li>
                            <li className="flex items-start gap-2 text-foreground/80 hover:text-foreground transition-colors">
                                <span className="text-primary mt-1">♪</span>
                                <span>Moulin Rouge! The Musical</span>
                            </li>
                            <li className="flex items-start gap-2 text-foreground/80 hover:text-foreground transition-colors">
                                <span className="text-primary mt-1">♪</span>
                                <span>Dead Outlaw</span>
                            </li>
                            <li className="flex items-start gap-2 text-foreground/80 hover:text-foreground transition-colors">
                                <span className="text-primary mt-1">♪</span>
                                <span>Floyd Collins</span>
                            </li>
                            <li className="flex items-start gap-2 text-foreground/80 hover:text-foreground transition-colors">
                                <span className="text-primary mt-1">♪</span>
                                <span>Aladdin</span>
                            </li>
                            <li className="flex items-start gap-2 text-foreground/80 hover:text-foreground transition-colors">
                                <span className="text-primary mt-1">♪</span>
                                <span>The Great Gatsby</span>
                            </li>
                            <li className="flex items-start gap-2 text-foreground/80 hover:text-foreground transition-colors">
                                <span className="text-primary mt-1">♪</span>
                                <span>Real Women Have Curves: The Musical</span>
                            </li>
                            <li className="flex items-start gap-2 text-foreground/80 hover:text-foreground transition-colors">
                                <span className="text-primary mt-1">♪</span>
                                <span>Hell's Kitchen</span>
                            </li>
                            <li className="flex items-start gap-2 text-foreground/80 hover:text-foreground transition-colors">
                                <span className="text-primary mt-1">♪</span>
                                <span>Just in Time</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Plays */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-secondary/5 to-transparent p-6 rounded-2xl border border-white/5"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Drama className="text-secondary" size={28} />
                            <h4 className="text-2xl font-bold text-secondary">Plays</h4>
                        </div>
                        <ul className="space-y-2.5">
                            <li className="flex items-start gap-2 text-foreground/80 hover:text-foreground transition-colors">
                                <span className="text-secondary mt-1">▸</span>
                                <span>The Roommate</span>
                            </li>
                            <li className="flex items-start gap-2 text-foreground/80 hover:text-foreground transition-colors">
                                <span className="text-secondary mt-1">▸</span>
                                <span>Stranger Things: The First Shadow</span>
                            </li>
                            <li className="flex items-start gap-2 text-foreground/80 hover:text-foreground transition-colors">
                                <span className="text-secondary mt-1">▸</span>
                                <span>Harry Potter and the Cursed Child</span>
                            </li>
                        </ul>

                        {/* All-time Favorite Callout */}
                        <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <Star className="text-yellow-400" size={20} />
                                <p className="text-sm font-bold text-yellow-400 uppercase tracking-wide">All-Time Favorite</p>
                            </div>
                            <p className="text-2xl font-bold text-foreground">Hadestown</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Photo Gallery - Horizontal Scroll */}
            <div className="mb-16">
                <h3 className="text-2xl font-bold text-center text-secondary mb-8">Photo Gallery</h3>
                <div className="relative max-w-7xl mx-auto">
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent snap-x snap-mandatory">
                        {broadwayShows.map((show, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.02 }}
                                whileHover={{ scale: 1.05 }}
                                className="relative flex-shrink-0 w-72 h-72 md:w-80 md:h-80 rounded-xl overflow-hidden border border-white/10 shadow-lg cursor-pointer group snap-center"
                                onClick={() => setSelectedImage(show)}
                            >
                                <Image
                                    src={show.src}
                                    alt={show.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4">
                                    <p className="text-white font-bold text-base text-center">{show.title}</p>
                                    {show.venue && <p className="text-white/70 text-sm text-center">{show.venue}</p>}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <p className="text-center text-foreground/40 text-sm mt-4">← Scroll to explore more photos →</p>
                </div>
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X size={32} />
                    </button>
                    <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center">
                        <div className="relative w-full h-full">
                            <Image
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-white font-bold text-xl">{selectedImage.title}</p>
                            {selectedImage.venue && <p className="text-white/70 text-base">{selectedImage.venue}</p>}
                        </div>
                    </div>
                </motion.div>
            )}
        </SectionWrapper>
    );
}
