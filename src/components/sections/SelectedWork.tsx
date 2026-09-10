const highlights = [
 {
  title: 'DanceNet3D',
  category: '3D reconstruction',
  description: 'A multi-view dance dataset with 3D Gaussian Splatting reconstructions and AR/VR playback.',
  note: 'CVPR 2026 3DMV Workshop · Best Paper Award',
  href: '#research-3d',
  action: 'View research',
 },
 {
  title: 'World Action Models',
  category: 'Robot learning & 3D geometry',
  description: 'Integrating scene geometry into robotic action prediction through parameter-efficient adapters.',
  note: 'FastWAM · VGGT-Ω · LIBERO',
  href: '#research-wam',
  action: 'View research',
 },
 {
  title: 'MRI Reconstruction',
  category: 'Medical imaging',
  description: 'Reconstructing high-quality MR images from undersampled data with deep learning.',
  note: 'FastMRI · Variational networks · Diffusion models',
  href: '#research-mri',
  action: 'View research',
 },
 {
  title: 'Broadway',
  category: 'Beyond research',
  description: 'A seat in the theatre: favorite shows, collected Playbills, and memories from Broadway.',
  note: 'All-time favorite · Hadestown',
  href: '#broadway',
  action: 'Explore Broadway',
 },
];

export default function SelectedWork() {
 return (
  <section id="work" className="section shell selected-work">
   <div className="section-heading">
    <h2>Highlights</h2>
   </div>
   <div className="work-grid">
    {highlights.map((project, index) => (
     <a key={project.href} className="work-card" href={project.href}>
      <div className="work-card-top">
       <span>{project.category}</span>
       <span aria-hidden="true">0{index + 1}</span>
      </div>
      <h3>{project.title}</h3>
      <p className="work-card-description">{project.description}</p>
      <p className="work-card-note">{project.note}</p>
      <span className="work-card-link">{project.action} <span aria-hidden="true">↗</span></span>
     </a>
    ))}
   </div>
  </section>
 );
}
