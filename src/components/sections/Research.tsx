import Image from 'next/image';
import MediaPlayer from '@/components/ui/MediaPlayer';
import DanceVideo from '@/components/ui/DanceVideo';

const danceVideos = ['AttitudePromenade', 'BartSimpson', 'BiancaGolden_Chimee', 'Chacha', 'HouseFootworkAdvanced', 'RobertRubama_RussiaCostume'];
const unityFeatures = [
 'Real-time sequence playback with transport controls',
 'Play, Pause, Loop modes with adjustable speed (0.1x - 5x)',
 'Batch conversion of PLY files to optimized assets',
 'VR/AR support for Quest 3, Vive, Varjo and more',
 'Interactive timeline and frame-by-frame scrubbing',
];
const unrealFeatures = [
 'Memory-efficient streaming with bounded VRAM (60MB for unlimited lengths)',
 'Built-in playback UI with keyboard controls (P, comma, period)',
 'Full transport controls: Play, Pause, Stop, frame scrubbing',
 'Multi-sequence playlist with runtime switching',
 'Native VR support with immersive display capabilities',
];

export default function Research() {
 return (
  <section id="research" className="section shell research-section">
   <h2>Research</h2>
<article id="research-wam" className="wam-research" aria-labelledby="wam-title">
                    <p className="meta">September 2026 – Present</p>
                    <h3 id="wam-title">Integrating World Action Models with 3D Geometry</h3>
                    <p className="wam-advisors">Advisors: Prof. Lingjie Liu and Chen Wang (PhD student)</p>
                    <ul className="wam-contributions">
                        <li>
                            <strong>3D feature fusion.</strong> Researching geometry-conditioned models of the current scene for robotic manipulation policies, built on FastWAM and VGGT-Ω. Integrating point clouds or scene features extracted from dual-view RGB images into action prediction, with an end-to-end workflow for feature caching, adapter training, and closed-loop simulation.
                        </li>
                        <li>
                            <strong>Parameter-efficient training.</strong> Implemented point-cloud and scene-feature adapters that map geometry into 32 conditioning tokens. With the geometry encoder and policy backbone frozen, trained adapters with 2.38 million and 4.30 million parameters using flow matching loss, and completed a comparative study of the two geometric representations.
                        </li>
                        <li>
                            <strong>Ablation evaluation.</strong> Completed 350 closed-loop evaluations across seven configurations and 10 LIBERO tasks, comparing real, shuffled, and zeroed geometry inputs, as well as an adapter-disabled baseline. Used paired action losses and stage-by-stage timing to evaluate the contribution of geometry and its online computational overhead.
                        </li>
                    </ul>
                </article>
   <section id="publications" className="research-publication" aria-labelledby="publication-heading">
    <h3 id="publication-heading">Publications</h3>
    <p className="publication-title">&quot;DanceNet3D: A 3D Dance Dataset with Multi-View Videos and 3DGS Reconstructions.&quot;</p>
    <p>Shihang Wei*, <strong>Mingjian Li*</strong>, Ran Gong, Yueyu Hu, Yao Wang.</p>
    <p className="research-note">CVPR 2026 3DMV Workshop · Best Paper Award<br/>* Equal contribution</p>
    <div className="research-links">
     <a href="https://nyuvideolab.github.io/DanceNet3D/dataset" target="_blank" rel="noopener noreferrer">Project Page ↗</a>
     <a href="https://scholar.google.com/citations?user=w8Brnx0AAAAJ" target="_blank" rel="noopener noreferrer">Google Scholar ↗</a>
    </div>
   </section>

   <article id="research-3d" className="research-article">
    <h3>NYU Video Lab: 3D Dancing Human Reconstruction Dataset</h3>
    <p className="research-note">Computer Vision · 3DGS · PyTorch · Camera Calibration · Unity AR/VR · Unreal Engine</p>
    <div className="research-prose">
     <p>A benchmark dataset with multiview, multiframe human dancer sequences, including building a full pipeline for raw data processing, 3D Gaussian construction with PSNR ≈ 34.</p>
     <p>Unity player integrated with AR/VR capabilities for real-time 3D Gaussian Splatting visualization, enabling interactive playback on mobile devices with seamless cross-platform deployment.</p>
     <p>Unreal Engine plugin with native VR support for immersive 3D reconstruction visualization, featuring high-performance rendering and interactive VR display capabilities for enhanced spatial understanding.</p>
    </div>
    <div className="research-links"><a href="https://nyuvideolab.github.io/DanceNet3D/dataset" target="_blank" rel="noopener noreferrer">View DanceNet3D Dataset ↗</a></div>

    <div id="dance-examples" className="research-examples">
     <h4>3D Reconstruction Examples</h4>
     <div className="dance-gallery" tabIndex={0} role="region" aria-label="Dance reconstruction videos">
      {danceVideos.map(name => <figure key={name}>
       <DanceVideo src={`/assets/dance_videos/${name}.webm`} poster={`/assets/dance_videos/${name}_poster.jpg`} label={name.replace(/_/g, ' ')}/>
       <figcaption>{name.replace(/_/g, ' ')}</figcaption>
      </figure>)}
     </div>
     <p className="research-note gallery-hint">Scroll to explore all six sequences. Use the video controls to pause.</p>
    </div>

    <section className="research-demo" aria-labelledby="unity-heading">
     <div className="research-demo-media"><MediaPlayer src="/assets/unity_ar_display.mp4" poster="/assets/unity_ar_display-poster.webp" label="Unity AR/VR Display"/></div>
     <div>
      <h4 id="unity-heading">Unity AR/VR Display</h4>
      <p>A Unity plugin for streaming and playing back animated 3D Gaussian Splatting sequences in real time, with AR and VR support.</p>
      <ul className="research-feature-list">{unityFeatures.map(feature => <li key={feature}>{feature}</li>)}</ul>
      <div className="research-links"><a href="https://github.com/Normanisfine/Unity_Stream_GS" target="_blank" rel="noopener noreferrer">View GitHub Repository ↗</a></div>
     </div>
    </section>

    <section className="research-demo" aria-labelledby="unreal-heading">
     <div className="research-demo-media"><MediaPlayer src="/assets/unreal_display.mp4" poster="/assets/unreal_display-poster.webp" label="Unreal Engine Display"/></div>
     <div>
      <h4 id="unreal-heading">Unreal Engine Display</h4>
      <p>A production-ready Unreal Engine plugin for streaming and rendering animated 3D Gaussian Splatting sequences with native VR integration.</p>
      <ul className="research-feature-list">{unrealFeatures.map(feature => <li key={feature}>{feature}</li>)}</ul>
     </div>
    </section>
   </article>

   <article id="research-mri" className="research-article">
    <h3>Deep Learning Based Accelerated MR Image Reconstruction</h3>
    <p className="research-note">Deep Learning · MRI · PyTorch · CUDA · FastMRI · Diffusion Models</p>
    <div className="research-links">
     <a href="https://github.com/Normanisfine/IVP_MRI_Final" target="_blank" rel="noopener noreferrer">GitHub Repository ↗</a>
     <a href="/assets/mri_report.pdf" target="_blank" rel="noopener noreferrer">Research Report ↗</a>
     <a href="/assets/mri_presentation.pptx" target="_blank" rel="noopener noreferrer">Presentation ↗</a>
    </div>
    <div className="research-prose">
     <p>Research on deep learning–based magnetic resonance (MR) image reconstruction, aiming to accelerate scan times by reconstructing high-quality images from undersampled k-space data.</p>
     <p>Comprehensive evaluation study of supervised, self-supervised, and zero-shot learning approaches using CNN, UNet, and diffusion-based models (Variational Networks, Score-based Diffusion Models) on the FastMRI dataset.</p>
    </div>
    <h4>Technical Achievements & Results</h4>
    <ul className="research-feature-list">
     <li><strong>VarNet Implementation:</strong> Achieved PSNR of 34.62 ± 3.78 dB with 4× acceleration and 0.24s inference time per slice</li>
     <li><strong>Score-Based Diffusion:</strong> Implemented SENSE parallel imaging achieving 12.5× speedup (from 30,000 to 2,000 evaluations)</li>
     <li><strong>Multi-GPU HPC:</strong> Refined PyTorch/CUDA implementations with distributed training achieving 4× speedup in performance</li>
     <li><strong>Systematic Evaluation:</strong> Tested 7 checkpoints to identify optimal model (epoch 50) with best generalization performance</li>
    </ul>
    <h4>Image Reconstruction Pipeline</h4>
    <div className="mri-comparison">
     <figure><Image src="/assets/mri_undersampled.jpeg" alt="Undersampled MRI" width={400} height={400}/><figcaption><strong>Undersampled</strong><span>Low-quality input</span></figcaption></figure>
     <p className="mri-model-label">Deep Learning Model<span>UNet / Diffusion</span><span aria-hidden="true">→</span></p>
     <figure><Image src="/assets/mri_recovered.jpeg" alt="Recovered MRI" width={400} height={400}/><figcaption><strong>Recovered</strong><span>High-quality output</span></figcaption></figure>
    </div>
   </article>
  </section>
 );
}
