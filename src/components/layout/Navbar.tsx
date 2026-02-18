'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Education', id: 'education' },
    { name: 'Research', id: 'research' },
    { name: 'Internship', id: 'internship' },
    { name: 'Projects', id: 'projects' },
    { name: 'Broadway', id: 'broadway' },
    { name: 'Contact', id: 'contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        setIsOpen(false);
        const event = new CustomEvent('scroll-to-section', { detail: id });
        window.dispatchEvent(event);
    };

    return (
        <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.0, delay: 0.8, ease: "easeOut" }}
            className={cn(
                'fixed top-0 left-0 right-0 z-[100] transition-all duration-300',
                scrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'
            )}
        >
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                <motion.button
                    onClick={() => scrollToSection('hero')}
                    whileHover={{ scale: 1.05, textShadow: "0 0 8px rgba(6, 182, 212, 0.4)" }}
                    className="text-xl font-bold tracking-wider text-primary transition-all duration-300"
                >
                    MINGJIAN LI
                </motion.button>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => scrollToSection(link.id)}
                            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative group py-1"
                        >
                            {link.name}
                            <motion.div
                                className="absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left"
                                initial={{ scaleX: 0 }}
                                whileHover={{ scaleX: 1 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                        </button>
                    ))}
                </nav>

                {/* Mobile Nav Toggle */}
                <button
                    className="md:hidden text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
                    >
                        <nav className="flex flex-col p-4 gap-4">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => scrollToSection(link.id)}
                                    className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors p-2 text-left"
                                >
                                    {link.name}
                                </button>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
