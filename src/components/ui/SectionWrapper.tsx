import React from 'react';
export default function SectionWrapper({ children, id, className }: {children: React.ReactNode; id?: string; className?: string; delay?: number}) {
 return <section id={id} className={`section shell legacy-section ${className ?? ''}`}><div>{children}</div></section>;
}
