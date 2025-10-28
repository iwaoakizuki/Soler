
import React, { useState, useMemo, useRef } from 'react';
import { PlanetData } from './types';
import { planets as planetData } from './constants';

// --- SVG Icon Components ---

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>
);

const PauseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0v-12a.75.75 0 01.75-.75zm9 0a.75.75 0 01.75.75v12a.75.75 0 01-1.5 0v-12a.75.75 0 01.75-.75z" clipRule="evenodd" />
    </svg>
);

const ResetIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-4.991-2.691V5.25a3.375 3.375 0 00-3.375-3.375H8.25a3.375 3.375 0 00-3.375 3.375v3.692m14.25 0a3.375 3.375 0 01-3.375 3.375H8.25a3.375 3.375 0 01-3.375-3.375" />
  </svg>
);


// --- UI Components ---

interface PlanetProps {
  planet: PlanetData;
  onClick: (planet: PlanetData) => void;
  isSelected: boolean;
}

const Planet: React.FC<PlanetProps> = ({ planet, onClick, isSelected }) => {
  const planetStyle: React.CSSProperties = {
    width: `${planet.size}px`,
    height: `${planet.size}px`,
  };

  const ringStyle: React.CSSProperties = {
    width: `${planet.size * 2.2}px`,
    height: `${planet.size * 2.2}px`,
    borderWidth: `${Math.max(1, planet.size / 10)}px`,
  };

  return (
    <div
      className={`relative flex items-center justify-center cursor-pointer group`}
      style={{ width: `${planet.size}px`, height: `${planet.size}px` }}
      onClick={() => onClick(planet)}
    >
      <div
        className={`absolute rounded-full transition-all duration-300 ${planet.color} ${planet.hoverColor} group-hover:shadow-2xl group-hover:shadow-white/20`}
        style={{ ...planetStyle, transform: isSelected ? 'scale(1.2)' : 'scale(1)' }}
      ></div>
      {planet.name === 'Saturn' && (
        <div 
          className="absolute rounded-full border-yellow-200/50 transform rotate-45"
          style={{ ...ringStyle, transform: 'rotateX(70deg) rotateZ(-10deg)' }}
        ></div>
      )}
    </div>
  );
};

interface InfoPanelProps {
  planet: PlanetData | null;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ planet, onClose }) => {
  const panelClasses = useMemo(() => {
    return `fixed bottom-0 right-0 md:top-0 md:bottom-auto m-4 p-6 bg-slate-900/80 backdrop-blur-md rounded-2xl text-white shadow-2xl shadow-blue-500/10 transition-transform duration-500 ease-in-out w-[calc(100%-2rem)] max-w-md
    ${planet ? 'translate-x-0 translate-y-0' : 'translate-y-[120%] md:translate-y-0 md:translate-x-[120%]'}`;
  }, [planet]);
  
  return (
    <div className={panelClasses}>
      {planet && (
        <>
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
            <CloseIcon className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-8 h-8 rounded-full ${planet.color}`}></div>
            <h2 className="text-3xl font-bold tracking-wider">{planet.name}</h2>
          </div>
          <div className="space-y-4 text-slate-300 max-h-[60vh] md:max-h-none overflow-y-auto pr-2">
            <p>{planet.description}</p>
            <div>
              <h3 className="font-semibold text-lg text-cyan-300 mb-1">Fun Fact</h3>
              <p className="italic">{planet.funFact}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};


interface ControlsProps {
    isPaused: boolean;
    onTogglePause: () => void;
    speed: number;
    onSpeedChange: (newSpeed: number) => void;
    onResetView: () => void;
}

const Controls: React.FC<ControlsProps> = ({ isPaused, onTogglePause, speed, onSpeedChange, onResetView }) => {
    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md p-3 rounded-full shadow-lg flex items-center gap-4 text-white z-20">
            <button onClick={onTogglePause} className="p-2 hover:bg-slate-700 rounded-full transition-colors" title={isPaused ? "Play" : "Pause"}>
                {isPaused ? <PlayIcon className="w-6 h-6" /> : <PauseIcon className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-2">
                <label htmlFor="speed-control" className="text-sm sr-only">Speed</label>
                <span className="text-sm">Speed: {speed.toFixed(1)}x</span>
                <input 
                    id="speed-control"
                    type="range" 
                    min="0.1" 
                    max="10" 
                    step="0.1" 
                    value={speed}
                    onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                    className="w-24 md:w-32 accent-cyan-400"
                    onWheel={(e) => e.stopPropagation()}
                />
            </div>
            <button onClick={onResetView} className="p-2 hover:bg-slate-700 rounded-full transition-colors" title="Reset View">
                <ResetIcon className="w-6 h-6" />
            </button>
        </div>
    );
};

interface SolarSystemProps {
  planets: PlanetData[];
  onPlanetClick: (planet: PlanetData) => void;
  isPaused: boolean;
  speed: number;
  selectedPlanetId: string | null;
}

const SolarSystem: React.FC<SolarSystemProps> = ({ planets, onPlanetClick, isPaused, speed, selectedPlanetId }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center scale-50 sm:scale-75 md:scale-90 lg:scale-100 transition-transform duration-500">
      <div className="relative w-[1300px] h-[1300px] flex items-center justify-center">
        {/* Sun */}
        <div className="absolute w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full shadow-[0_0_50px_10px_rgba(252,211,77,0.5)]"></div>

        {planets.map((planet) => {
          const animationDuration = planet.orbitalPeriod / speed;
          return (
            <div
              key={planet.id}
              className="absolute top-1/2 left-1/2 rounded-full border border-white/10"
              style={{
                width: `${planet.orbitalRadius * 2}px`,
                height: `${planet.orbitalRadius * 2}px`,
                transform: 'translate(-50%, -50%)',
                animation: `spin ${animationDuration}s linear infinite`,
                animationPlayState: isPaused ? 'paused' : 'running',
              }}
            >
              <div
                className="absolute top-1/2 -translate-y-1/2"
                style={{
                  width: `${planet.size}px`,
                  height: `${planet.size}px`,
                }}
              >
                <Planet planet={planet} onClick={onPlanetClick} isSelected={selectedPlanetId === planet.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Main App Component ---

const StarryBackground = () => (
    <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08)_0%,transparent_20%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.07)_0%,transparent_15%),radial-gradient(circle_at_50%_70%,rgba(255,255,255,0.09)_0%,transparent_10%),radial-gradient(circle_at_10%_80%,rgba(255,255,255,0.06)_0%,transparent_12%),radial-gradient(circle_at_90%_90%,rgba(255,255,255,0.1)_0%,transparent_20%)]"></div>
    </div>
);


export default function App() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1.0);

  // State for zoom and pan
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });

  // Refs for panning logic
  const isPanning = useRef(false);
  const lastPanPoint = useRef({ x: 0, y: 0 });
  const wasPanning = useRef(false);
  const viewRef = useRef<HTMLDivElement>(null);

  const handlePlanetClick = (planet: PlanetData) => {
    // Prevent selecting a planet if the user was just panning
    if (wasPanning.current) {
        return;
    }
    setSelectedPlanet(planet);
  };

  const handleClosePanel = () => {
    setSelectedPlanet(null);
  };
  
  const handleTogglePause = () => {
    setIsPaused(prev => !prev);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  // --- Zoom and Pan Handlers ---

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const zoomSpeed = 0.001;
    const newZoom = Math.max(0.3, Math.min(5, zoom - e.deltaY * zoomSpeed * zoom));
    
    if (viewRef.current) {
        // Zoom towards the mouse cursor
        const rect = viewRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const newPanX = mouseX - (mouseX - pan.x) * (newZoom / zoom);
        const newPanY = mouseY - (mouseY - pan.y) * (newZoom / zoom);

        setZoom(newZoom);
        setPan({ x: newPanX, y: newPanY });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Ignore right-clicks
    e.preventDefault();
    e.stopPropagation();

    isPanning.current = true;
    wasPanning.current = false;
    lastPanPoint.current = { x: e.clientX, y: e.clientY };
    
    if (e.currentTarget) {
      (e.currentTarget as HTMLElement).style.cursor = 'grabbing';
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    isPanning.current = false;
    if (e.currentTarget) {
      (e.currentTarget as HTMLElement).style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning.current) return;

    const deltaX = e.clientX - lastPanPoint.current.x;
    const deltaY = e.clientY - lastPanPoint.current.y;
    
    if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
      wasPanning.current = true;
    }

    setPan(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));

    lastPanPoint.current = { x: e.clientX, y: e.clientY };
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <main 
        className="relative w-full h-screen overflow-hidden bg-black font-sans cursor-grab"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        >
        <StarryBackground />
        
        <div className="absolute top-4 left-4 text-white z-10 pointer-events-none">
            <h1 className="text-2xl md:text-4xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-400">
                Solar System
            </h1>
            <p className="text-sm text-slate-400">Drag to pan, scroll to zoom</p>
        </div>

        <div
            ref={viewRef}
            className="w-full h-full"
            style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                willChange: 'transform',
            }}
        >
            <SolarSystem 
                planets={planetData} 
                onPlanetClick={handlePlanetClick}
                isPaused={isPaused}
                speed={speed}
                selectedPlanetId={selectedPlanet?.id || null}
            />
        </div>
        
        <InfoPanel planet={selectedPlanet} onClose={handleClosePanel} />

        <Controls 
            isPaused={isPaused}
            onTogglePause={handleTogglePause}
            speed={speed}
            onSpeedChange={handleSpeedChange}
            onResetView={handleResetView}
        />
    </main>
  );
}
