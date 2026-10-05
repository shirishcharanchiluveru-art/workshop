import React, { useState, useRef } from 'react';
import { 
  ScanLine, 
  Camera, 
  Upload, 
  RefreshCw, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Utensils, 
  Award,
  Zap
} from 'lucide-react';
import { uploadVisualScan } from '../api/client';
import { VisualScanResult } from '../types/produce';

export const VisualScannerPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState<VisualScanResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Camera stream state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.warn('Camera access denied or unavailable:', err);
      setErrorMsg('Camera access is not permitted or unavailable. Please use photo file upload.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      setIsCameraActive(false);
    }
  };

  const captureCameraPhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setPreview(dataUrl);
        stopCamera();
        runScanAnalysis(dataUrl);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        runScanAnalysis(base64);
      };
      reader.readAsDataURL(selected);
    }
  };

  const runScanAnalysis = async (imageBase64: string) => {
    setAnalyzing(true);
    setErrorMsg('');
    try {
      const result = await uploadVisualScan(imageBase64);
      setScanResult(result);
    } catch (err: any) {
      console.error('Scan analysis failed:', err);
      setErrorMsg(err.message || 'Failed to complete visual scan analysis');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Multimodal Gemini 2.5 Vision Diagnostics</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Visual Produce Camera & Photo Scanner</h1>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Snap a produce photo in the grocery aisle. Gemini Vision detects ripeness stages, skin micro-defects, hidden bruises, and optimal storage protocols.
        </p>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Camera & Upload Area */}
      <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-400" />
            Produce Camera Scanner Studio
          </h2>
          <div className="flex items-center gap-2">
            {!isCameraActive ? (
              <button
                onClick={startCamera}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Camera className="w-4 h-4" /> Live Camera
              </button>
            ) : (
              <button
                onClick={stopCamera}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors"
              >
                Stop Camera
              </button>
            )}
          </div>
        </div>

        {/* Video stream container */}
        {isCameraActive && (
          <div className="relative rounded-2xl overflow-hidden bg-black border border-slate-700">
            <video ref={videoRef} autoPlay playsInline className="w-full max-h-80 object-cover" />
            <canvas ref={canvasRef} className="hidden" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <button
                onClick={captureCameraPhoto}
                className="px-6 py-2.5 rounded-full bg-lime-500 hover:bg-lime-400 text-slate-950 font-extrabold text-xs shadow-glow-lime flex items-center gap-2"
              >
                <Zap className="w-4 h-4" /> Capture Photo Now
              </button>
            </div>
          </div>
        )}

        {/* File Dropzone */}
        {!isCameraActive && (
          <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500/60 rounded-2xl p-8 text-center space-y-4 transition-colors bg-slate-950">
            {preview ? (
              <div className="space-y-4">
                <img
                  src={preview}
                  alt="Produce scan"
                  className="max-h-64 mx-auto rounded-xl object-contain border border-slate-800"
                />
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => runScanAnalysis(preview)}
                    disabled={analyzing}
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors flex items-center gap-1.5"
                  >
                    {analyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    Re-Analyze Photo
                  </button>
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold">
                    Change Photo
                    <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                  </label>
                </div>
              </div>
            ) : (
              <label className="cursor-pointer block space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-sm font-bold text-white block">Drop Produce Image or Click to Upload</span>
                  <span className="text-xs text-slate-400 block mt-1">
                    Upload camera photos of tomatoes, peppers, squashes, leafy greens, or avocados.
                  </span>
                </div>
                <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
              </label>
            )}
          </div>
        )}
      </div>

      {/* Analysis Output Section */}
      {analyzing && (
        <div className="glass-card rounded-2xl p-8 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
          <h3 className="text-base font-bold text-white">Gemini Vision Multimodal Analysis in Progress...</h3>
          <p className="text-xs text-slate-400">Scanning skin cellular structure, color pigment depth, rot indicators, and firmness grade.</p>
        </div>
      )}

      {scanResult && !analyzing && (
        <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs text-slate-400 block uppercase font-semibold">Detected Vegetable</span>
              <h2 className="text-2xl font-bold text-white">{scanResult.vegetableIdentified}</h2>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-4 h-4" /> AI Confidence: {scanResult.confidenceScore}%
              </span>
            </div>

            <div className="flex items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Freshness Grade</span>
                <span className="text-3xl font-extrabold text-lime-400">{scanResult.freshnessGrade}</span>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Ripeness Stage</span>
                <span className="text-xs font-bold text-white">{scanResult.ripenessStage}</span>
              </div>
            </div>
          </div>

          {/* Detected Defects */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Surface Quality & Blemish Scan Report
            </h3>
            {scanResult.detectedDefects.length === 0 ? (
              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/30 text-xs text-emerald-300">
                ✓ Zero defects or bruising detected. Pristine store sample!
              </div>
            ) : (
              <div className="space-y-2">
                {scanResult.detectedDefects.map((def, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs flex items-center justify-between gap-3">
                    <div>
                      <strong className="text-white block">{def.type}</strong>
                      <span className="text-slate-400">{def.description}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      def.severity === 'Low'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {def.severity} Impact
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Storage & Recommended Recipes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-lime-400" /> Optimal Storage Protocol:
              </span>
              <p className="text-xs text-slate-300">{scanResult.storageRecommendation}</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Utensils className="w-4 h-4 text-emerald-400" /> Suggested Recipes:
              </span>
              <ul className="text-xs text-slate-300 list-disc list-inside space-y-0.5">
                {scanResult.recommendedRecipes.map((r, idx) => (
                  <li key={idx}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
