"use client";

import React, { useState, useRef, useEffect } from "react";
import { Radio, Play, Pause, Volume2, VolumeX, ExternalLink, Sparkles, ChevronDown, ChevronUp, Music } from "lucide-react";

interface RadioColchonPlayerProps {
  streamUrl?: string;
  title?: string;
  description?: string;
}

export function RadioColchonPlayer({
  streamUrl = "https://radiocolchon.com",
  title = "Radio Colchón",
  description = "Frecuencias y Música para Dormir",
}: RadioColchonPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fallback relaxing binaural sleep audio streams / tone generator
  // If streaming server direct stream is available, use it; otherwise fallback to relaxing ambient sleep audio
  const directAudioSource = "https://stream.zeno.fm/f3wvbbqmdg8uv"; // High availability ambient radio or fallback

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setAudioError(false);
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Audio play blocked or stream error:", err);
          // If direct audio stream fails, open radiocolchon.com
          window.open(streamUrl, "_blank");
        });
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <aside aria-label="Reproductor Radio Colchón" className="fixed bottom-6 left-6 z-40 max-w-sm transition-all duration-300">
      <audio
        ref={audioRef}
        src={directAudioSource}
        preload="none"
        onEnded={() => setIsPlaying(false)}
        onError={() => setAudioError(true)}
      />

      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-amber-500 to-indigo-600 rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse"></div>

        <div className="relative bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md border border-blue-500/30 text-white rounded-2xl shadow-2xl p-3.5 sm:p-4 w-[310px] sm:w-[340px]">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-700/60 pb-2 mb-2.5">
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-blue-600/30 text-blue-400 border border-blue-500/40">
                <Radio className={`w-4 h-4 ${isPlaying ? "animate-pulse text-amber-400" : "text-blue-300"}`} />
                {isPlaying && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black tracking-wide uppercase text-white">
                    {title}
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-red-500/20 text-red-400 border border-red-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse mr-1"></span> EN VIVO
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href={streamUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Abrir Radio Colchón en nueva pestaña"
                className="text-slate-400 hover:text-amber-300 p-1 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                aria-label={isMinimized ? "Expandir reproductor de radio" : "Minimizar reproductor de radio"}
                className="text-slate-400 hover:text-white p-1 transition-colors"
              >
                {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {!isMinimized && (
            <div className="space-y-3">
              {/* Description / Binaural indicator */}
              <p className="text-[11px] text-slate-300 flex items-center gap-1 leading-snug">
                <Sparkles className="w-3 h-3 text-amber-400 flex-shrink-0" />
                <span>{description}</span>
              </p>

              {/* Player Controls */}
              <div className="flex items-center justify-between gap-3 bg-slate-800/80 rounded-xl p-2 px-3 border border-slate-700/50">
                <button
                  type="button"
                  onClick={togglePlay}
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-bold transition-transform active:scale-95 shadow-md ${
                    isPlaying
                      ? "bg-amber-500 text-slate-950 hover:bg-amber-400"
                      : "bg-blue-600 text-white hover:bg-blue-500"
                  }`}
                  aria-label={isPlaying ? "Pausar Radio Colchón" : "Reproducir Radio Colchón"}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>

                {/* Animated Equalizer Wave */}
                <div className="flex-1 flex items-center justify-center gap-1 h-6 px-2">
                  {[40, 75, 100, 60, 90, 45, 80, 50, 70, 30].map((height, i) => (
                    <span
                      key={i}
                      className={`w-1 bg-gradient-to-t from-blue-500 to-amber-400 rounded-full transition-all duration-300 ${
                        isPlaying ? "animate-pulse" : "opacity-30"
                      }`}
                      style={{
                        height: isPlaying ? `${Math.max(15, (height * (i % 2 === 0 ? 1 : 0.7)))}%` : "20%",
                        animationDelay: `${i * 100}ms`,
                      }}
                    ></span>
                  ))}
                </div>

                {/* Volume Slider & Mute */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    aria-label="Control de volumen de Radio Colchón"
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                      if (isMuted) setIsMuted(false);
                    }}
                    className="w-14 h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>
              </div>

              {/* Station footer link */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                <span className="flex items-center gap-1">
                  <Music className="w-3 h-3 text-blue-400" />
                  <span>Streaming Psychoacoustic</span>
                </span>
                <a
                  href="https://radiocolchon.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline font-bold"
                >
                  radiocolchon.com ↗
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
