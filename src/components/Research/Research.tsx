import React from 'react';
import Image from 'next/image';
import { FileText, ExternalLink, Award } from 'lucide-react';

export default function Research() {
  return (
    <div className="flex flex-col items-start text-left self-stretch w-full">
      <h1 className="self-start text-3xl md:text-4xl text-cyan-100 mb-5 uppercase tracking-wider text-shadow font-extrabold">
        Research
      </h1>

      {/* Research Areas */}
      <div className="w-full mb-8">
        <h2 className="text-2xl text-cyan-100 mb-4 font-bold">Research Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 rounded-lg p-4 border border-white/20 backdrop-blur-sm">
            <h3 className="text-cyan-200 font-semibold mb-2">3D Reconstruction</h3>
            <p className="text-cyan-100 text-sm">Computer vision techniques for 3D modeling and reconstruction from images, focusing on autonomous navigation and augmented reality applications</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 border border-white/20 backdrop-blur-sm">
            <h3 className="text-cyan-200 font-semibold mb-2">MRI & Deep Learning</h3>
            <p className="text-cyan-100 text-sm">Medical imaging research focusing on fastMRI techniques for accelerated magnetic resonance imaging, reducing scan times while maintaining image quality</p>
          </div>
        </div>
      </div>

      {/* Research Experience */}
      <div className="w-full mb-8">
        <h2 className="text-2xl text-cyan-100 mb-4 font-bold">Research Experience</h2>
        
        <div className="bg-white/10 rounded-[10px] shadow-lg border border-white/20 backdrop-blur-sm p-6">
          <div className="flex-grow">
            <h3 className="text-xl text-cyan-100 font-bold mb-2">Dynamic 3D Scene Reconstruction with 3D Gaussian Splatting </h3>
            <div className="flex justify-between items-center mb-3">
              <div className="flex gap-4">
                <span className="text-yellow-300 font-semibold">
                  <span className="font-semibold">Advisor: </span> 
                  <a href="https://engineering.nyu.edu/faculty/yao-wang" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-200 transition-colors underline">
                    Prof. Yao Wang
                  </a>
                </span>
                <span className="text-yellow-300 font-semibold">
                  <span className="font-semibold">Lab: </span> 
                  <a href="https://wp.nyu.edu/videolab//" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-200 transition-colors underline">
                    NYU Video Lab
                  </a>
                </span>
              </div>
              <span className="text-cyan-200 font-semibold">
                <span className="font-semibold">Duration:</span> May 2025 - Present
              </span>
            </div>
            <p className="text-cyan-200 mb-3">
              Research on building a pipeline for reconstructing dynamic 3D scenes from multiple camera viewpoints.
            </p>
            
            <div className="mb-4">
              <ul className="list-disc pl-6 text-cyan-200 space-y-1">
                <li> Ongoing output: a benchmark dataset with multiview, multiframe human dancer sequences, including building
                a full pipeline for raw data processing, 3D Gaussian construction, mesh reconstruction, and parameter tuning.</li>
                <li>Replicating and comparing multiple 3D Gaussian methods (Dynamic Gaussian, 4DGS, Gaussian Surfel, 2DGS,
                  SUGAR, etc.) on the dataset, achieving high-quality visual outputs (PSNR &gt; 35).</li>
                <li>Evaluating mesh reconstruction techniques such as SDF, Poisson reconstruction, Marching Cubes, and
                tetrahedralization to improve geometric consistency.</li>
                <li> Benchmarking human body models including SMPL, supported by OpenPose keypoint detection, to assess
                accuracy and robustness for pose estimation tasks.</li>
              </ul>
            </div>

            <div className="mb-4">
              <a 
                href="/assets/poster_vl.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-yellow-300 hover:text-yellow-200 transition-colors font-medium bg-yellow-500/20 px-3 py-2 rounded-lg border border-yellow-400/30 hover:bg-yellow-500/30"
              >
                <FileText className="w-4 h-4" />
                View Research Poster
              </a>
            </div>

            {/* Pipeline Image */}
            <div className="mb-4 w-full max-w-2xl">
              <Image
                src="/assets/vl_pipeline.png"
                alt="VL Pipeline - Data Preprocess and Training (4D Gaussian Splatting)"
                width={640}
                height={384}
                className="w-full h-auto rounded-lg border border-white/20"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-sm font-medium">Computer Vision</span>
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-sm font-medium">Camera Modeling</span>
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-sm font-medium">3D Gaussian Splatting</span>
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-sm font-medium">PyTorch</span>
            </div>
          </div>
        </div>
      </div>

      {/* Research Skills */}
      <div className="w-full">
        <h2 className="text-2xl text-cyan-100 mb-4 font-bold">Research Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-lg p-4 border border-white/20 backdrop-blur-sm text-center">
            <h4 className="text-cyan-200 font-semibold mb-2">Programming</h4>
            <p className="text-cyan-100 text-sm">Python, C++, MATLAB</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 border border-white/20 backdrop-blur-sm text-center">
            <h4 className="text-cyan-200 font-semibold mb-2">Frameworks</h4>
            <p className="text-cyan-100 text-sm">PyTorch, OpenCV, NumPy</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 border border-white/20 backdrop-blur-sm text-center">
            <h4 className="text-cyan-200 font-semibold mb-2">Medical Imaging</h4>
            <p className="text-cyan-100 text-sm">fastMRI, k-space</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 border border-white/20 backdrop-blur-sm text-center">
            <h4 className="text-cyan-200 font-semibold mb-2">Deep Learning Models</h4>
            <p className="text-cyan-100 text-sm">Diffusion, Transformer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
