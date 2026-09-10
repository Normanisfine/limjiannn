 'use client';
import {useRef, useState} from 'react';
import Image from 'next/image';
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
 const gallery = useRef<HTMLDivElement>(null);
 const dialog = useRef<HTMLDialogElement>(null);
 const [selected, setSelected] = useState(broadwayShows[0]);
 const scroll = (direction:number) => gallery.current?.scrollBy({left:direction * gallery.current.clientWidth * .8, behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
 return <section id="broadway" className="broadway section"><div className="shell"><div className="section-heading"><div><p className="meta">Away from the keyboard</p><h2>A seat in the theatre.</h2></div><p>A glimpse into my love for theater and the magic of Broadway shows</p></div><div className="broadway-intro"><p>Broadway</p><p>All-time favorite <strong>Hadestown ♡</strong></p></div><div className="gallery-controls"><h3>Photo gallery</h3><div><button onClick={() => scroll(-1)} aria-label="Previous Broadway photos">←</button><button onClick={() => scroll(1)} aria-label="Next Broadway photos">→</button></div></div><div className="gallery" ref={gallery} tabIndex={0} aria-label="Broadway photo gallery">{broadwayShows.map((show,index) => <figure key={show.src}><button aria-label={`Enlarge ${show.title} photo ${index+1}`} onClick={() => {setSelected(show);dialog.current?.showModal();}}><Image src={show.src} alt={show.title} width={480} height={600} loading="lazy"/></button><figcaption><strong>{show.title}</strong><span>{show.venue || 'Broadway memories'}</span></figcaption></figure>)}</div><details className="show-list"><summary>Shows I&apos;ve Watched <span aria-hidden="true">＋</span></summary><div><section><h3>Musicals</h3><ul>
                            <li>
                                <span>⭐</span>
                                <div>
                                    <span>Hadestown</span>
                                    <span>(All-time favorite)</span>
                                </div>
                            </li>
                            <li>
                                <span>♪</span>
                                <span>Maybe Happy Ending</span>
                            </li>
                            <li>
                                <span>♪</span>
                                <span>Gypsy <span>(starring Audra McDonald)</span></span>
                            </li>
                            <li>
                                <span>♪</span>
                                <span>Sunset Boulevard</span>
                            </li>
                            <li>
                                <span>♪</span>
                                <span>Death Becomes Her</span>
                            </li>
                            <li>
                                <span>♪</span>
                                <span>MJ The Musical</span>
                            </li>
                            <li>
                                <span>♪</span>
                                <span>Wicked</span>
                            </li>
                            <li>
                                <span>♪</span>
                                <span>Hamilton</span>
                            </li>
                            <li>
                                <span>♪</span>
                                <span>Heathers: The Musical</span>
                            </li>
                            <li>
                                <span>♪</span>
                                <span>Cabaret at the Kit Kat Club</span>
                            </li>
                            <li>
                                <span>♪</span>
                                <span>Moulin Rouge! The Musical</span>
                            </li>
                            <li>
                                <span>♪</span>
                                <span>Dead Outlaw</span>
                            </li>
                            <li>
                                <span>♪</span>
                                <span>Floyd Collins</span>
                            </li>
                            <li>
                                <span>♪</span>
                                <span>Aladdin</span>
                            </li>
                            <li>
                                <span>♪</span>
                                <span>The Great Gatsby</span>
                            </li>
                            <li>
                                <span>♪</span>
                                <span>Real Women Have Curves: The Musical</span>
                            </li>
                            <li>
                                <span>♪</span>
                                <span>Hell&apos;s Kitchen</span>
                            </li>
                            <li>
                                <span>♪</span>
                                <span>Just in Time</span>
                            </li>
                        </ul></section><section><h3>Plays</h3><ul>
                            <li>
                                <span>▸</span>
                                <span>The Roommate</span>
                            </li>
                            <li>
                                <span>▸</span>
                                <span>Stranger Things: The First Shadow</span>
                            </li>
                            <li>
                                <span>▸</span>
                                <span>Harry Potter and the Cursed Child</span>
                            </li>
                        </ul></section></div></details><dialog ref={dialog} className="photo-dialog" aria-label={selected.title} onClick={event => {if(event.target === event.currentTarget)dialog.current?.close();}}><button className="dialog-close" autoFocus onClick={() => dialog.current?.close()} aria-label="Close photo">×</button><Image src={selected.src} alt={selected.title} width={1000} height={1200}/><p>{selected.title} · {selected.venue}</p></dialog></div></section>;
}
