
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Referral } from './types';
import { MOCK_REFERRALS } from './data/mockData';
import { ReybanpacLogo } from './components/ReybanpacLogo';
import { getChatbotResponse } from './services/geminiService';

// ====================================================================================
// Reusable Components
// ====================================================================================

interface BottomNavProps {
  showEmergencyButton?: boolean;
}

const BottomNav: React.FC<BottomNavProps> = ({ showEmergencyButton }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { path: '/home', icon: 'home', label: 'Inicio' },
    { path: '/referrals', icon: 'groups', label: 'Referidos' },
    { path: '/chatbot', icon: 'smart_toy', label: 'bot JuniorPac' },
    { path: '/profile', icon: 'person', label: 'Perfil' },
  ];

  const isActive = (path: string) => {
      if (path === '/referrals') return location.pathname.startsWith('/referrals');
      return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20">
      {showEmergencyButton && (
        <div className="px-4 pb-4">
          <button className="flex w-full items-center justify-center gap-3 rounded-lg bg-danger py-3.5 text-center text-base font-bold text-white shadow-lg shadow-red-500/20">
            <span className="material-symbols-outlined">call</span>
            <span>Contacto de Emergencia</span>
          </button>
        </div>
      )}
      <nav className="border-t border-gray-200/80 bg-white/80 backdrop-blur-md dark:border-gray-700/80 dark:bg-background-dark/80">
        <div className="flex justify-around px-2 pb-2 pt-2">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button key={item.label} onClick={() => navigate(item.path)} className={`flex flex-1 flex-col items-center justify-end gap-1 rounded-lg py-1 ${active ? 'text-reybanpac-blue dark:text-sky-300' : 'text-gray-500 dark:text-gray-400'}`}>
                <span className={`material-symbols-outlined h-7 text-2xl ${active ? 'material-symbols-outlined-fill' : ''}`}>{item.icon}</span>
                <p className={`text-[11px] ${active ? 'font-bold' : 'font-medium'}`}>{item.label}</p>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};


// ====================================================================================
// Screen Components
// ====================================================================================

const SplashScreen: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const startTimer = setTimeout(() => setIsAnimating(true), 100);
    const endTimer = setTimeout(() => navigate('/login'), 3000);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-background-light dark:bg-background-dark transition-opacity duration-500 overflow-hidden">
      <ReybanpacLogo isAnimating={isAnimating} />
    </div>
  );
};


const LoginScreen: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-white dark:bg-[#121820] overflow-hidden font-manrope">
      {/* Background Illustration */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute bottom-0 left-0 right-0 h-1/2 w-full bg-center bg-no-repeat bg-cover opacity-10 dark:opacity-[0.07]"
          style={{backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAcXAaO_3ZySw0vCaYsbJLUpjMTmIjoUOfrJP3kwvHZ996Z3xsGVhUD-KmXFCoflOXp6f6sQn0T7Yro-2ZjiQCTmQAY29o7xpUVjtNqEJaKyAZlzGe3JAFqcOnrXVrnXGjiRNJfax3d2kRwdy4tWa8CeHXOMC-N_HJkLE_wjMIVYfDao3YR1Cg6ou8Z4Yw-GjisQ7VMqln6C28XZVNGv9mVTH38ZMmXEFd-NJkqwjoqmu4TPfKxNGYCEHQEKToz3dneYqYXAAP2j9zn")`}}
        ></div>
      </div>
      {/* Curved Blue Accent */}
      <div className="absolute -top-1/4 left-0 h-1/2 w-full -translate-x-1/4 scale-150 rounded-full bg-[#1A468C]/10 dark:bg-[#1A468C]/20 blur-3xl"></div>
      <div className="absolute -bottom-1/4 right-0 h-1/2 w-full translate-x-1/4 scale-150 rounded-full bg-[#1A468C]/10 dark:bg-[#1A468C]/20 blur-3xl"></div>
      
      <main className="relative z-10 flex w-full max-w-md flex-col items-center justify-center p-6 sm:p-8 overflow-y-auto">
        {/* Logo */}
        <div className="flex w-full justify-center pb-8">
            <div className="w-48">
                <div 
                    className="w-full bg-center bg-no-repeat bg-contain aspect-[3/1]" 
                    role="img"
                    aria-label="Reybanpac Logo"
                    style={{backgroundImage: 'url("https://reybanpac.com/wp-content/uploads/2021/08/logo_reybanpac.png")'}}>
                </div>
            </div>
        </div>
        
        {/* Headline Text */}
        <h1 className="text-[#121417] dark:text-white tracking-tight text-2xl sm:text-[28px] font-bold leading-tight px-4 text-center pb-8">Conectá tu talento con el futuro del campo.</h1>
        
        {/* Form */}
        <div className="w-full space-y-4">
          {/* Username Field */}
          <div>
            <label className="text-[#121417] dark:text-gray-300 text-base font-medium leading-normal pb-2 block">Usuario o Correo electrónico</label>
            <div className="flex w-full flex-1 items-stretch rounded-xl shadow-sm">
                <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121417] dark:text-white border border-[#dce0e5] dark:border-gray-600 bg-white/80 dark:bg-[#121820]/80 backdrop-blur-sm h-14 placeholder:text-[#657386] dark:placeholder-gray-500 p-[15px] text-base font-normal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A468C]" placeholder="Ingresa tu usuario" />
            </div>
          </div>
          {/* Password Field */}
          <div>
            <label className="text-[#121417] dark:text-gray-300 text-base font-medium leading-normal pb-2 block">Contraseña</label>
            <div className="flex w-full flex-1 items-stretch rounded-xl shadow-sm">
              <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-xl text-[#121417] dark:text-white border border-[#dce0e5] dark:border-gray-600 bg-white/80 dark:bg-[#121820]/80 backdrop-blur-sm h-14 placeholder:text-[#657386] dark:placeholder-gray-500 p-[15px] border-r-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A468C]" placeholder="Ingresa tu contraseña" type={showPassword ? "text" : "password"}/>
              <button onClick={() => setShowPassword(!showPassword)} className="text-[#657386] dark:text-gray-400 flex border border-[#dce0e5] dark:border-gray-600 bg-white/80 dark:bg-[#121820]/80 backdrop-blur-sm items-center justify-center px-[15px] rounded-r-xl border-l-0 cursor-pointer">
                <span className="material-symbols-outlined">{showPassword ? 'visibility' : 'visibility_off'}</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Login Button */}
        <div className="flex w-full px-0 py-6">
            <button onClick={() => navigate('/home')} className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 flex-1 bg-[#1A468C] text-white text-base font-bold tracking-[0.015em] shadow-lg shadow-[#1A468C]/30 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
                <span className="truncate">INGRESAR</span>
            </button>
        </div>
        
        {/* Create Account Link */}
        <div className="flex px-4 py-3">
            <button className="text-[#FEDD08] text-base font-bold leading-normal tracking-[0.015em] transition-transform duration-200 hover:scale-105">
                <span className="truncate">Crear cuenta nueva</span>
            </button>
        </div>
      </main>
    </div>
  );
};

const HomeScreen: React.FC = () => {
    const navigate = useNavigate();
    const carouselRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const { current } = carouselRef;
            const scrollAmount = current.clientWidth * 0.75;
            current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="w-full h-full flex flex-col font-body">
            <main className="flex-1 overflow-y-auto pb-40 bg-background-light dark:bg-background-dark">
                <div className="relative w-full bg-gradient-to-b from-[#005A9C] to-sky-400/20 dark:from-[#003d69] dark:to-sky-900/20 px-4 pt-4">
                    <div className="flex items-center justify-between pt-4">
                        <div className="flex h-12 w-12 shrink-0 items-center"></div>
                        <h1 className="font-heading text-xl font-bold tracking-tight text-white flex-1 text-center">Hola Samuel</h1>
                        <button className="flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent text-white">
                            <span className="material-symbols-outlined text-2xl">notifications</span>
                        </button>
                    </div>
                    <div className="h-16"></div>
                </div>

                <div className="w-full -mt-16 px-4">
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => navigate('/profile')} className="group flex flex-col gap-3 rounded-lg bg-[#005A9C] p-4 text-white shadow-md transition-transform duration-200 ease-in-out hover:scale-[1.03]">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                                <span className="material-symbols-outlined text-lg text-white">person</span>
                            </div>
                            <h2 className="font-heading text-lg font-bold leading-tight">Perfil Digital</h2>
                        </button>
                        <button onClick={() => navigate('/referrals')} className="group flex flex-col gap-3 rounded-lg bg-[#FFC72C] p-4 text-gray-900 shadow-md transition-transform duration-200 ease-in-out hover:scale-[1.03]">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10">
                                <span className="material-symbols-outlined text-lg text-gray-900">groups</span>
                            </div>
                            <h2 className="font-heading text-lg font-bold leading-tight">Referidos</h2>
                        </button>
                        <button onClick={() => navigate('/documents')} className="group flex flex-col gap-3 rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-gray-900 dark:text-white shadow-md transition-transform duration-200 ease-in-out hover:scale-[1.03]">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300/50 dark:bg-gray-700">
                                <span className="material-symbols-outlined text-lg text-gray-600 dark:text-gray-300">description</span>
                            </div>
                            <h2 className="font-heading text-lg font-bold leading-tight">Documentos</h2>
                        </button>
                        <button onClick={() => navigate('/chatbot')} className="group relative flex flex-col gap-3 rounded-lg bg-gray-100 dark:bg-gray-800 p-4 text-gray-900 dark:text-white shadow-md transition-transform duration-200 ease-in-out hover:scale-[1.03]">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300/50 dark:bg-gray-700">
                                <span className="material-symbols-outlined text-lg text-gray-600 dark:text-gray-300">smart_toy</span>
                            </div>
                            <h2 className="font-heading text-lg font-bold leading-tight">bot JuniorPac</h2>
                            <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#D81B60]">
                                <span className="text-[10px] font-bold text-white">2</span>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="flex items-center justify-between px-4">
                        <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">Novedades Reybanpac</h2>
                        <button className="text-sm font-semibold text-reybanpac-blue dark:text-sky-300">Ver más</button>
                    </div>
                    
                    <div className="relative mt-4 group">
                        {/* Left Arrow */}
                        <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-1">
                            <button 
                                onClick={() => scroll('left')}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white/80 shadow-md backdrop-blur-sm dark:border-gray-600 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                            >
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>
                        </div>

                        {/* Right Arrow */}
                        <div className="absolute inset-y-0 right-0 z-10 flex items-center pr-1">
                            <button 
                                onClick={() => scroll('right')}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white/80 shadow-md backdrop-blur-sm dark:border-gray-600 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700 transition-colors"
                            >
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </div>

                        <div 
                            ref={carouselRef}
                            className="news-carousel flex w-full flex-nowrap gap-2 px-4 snap-x snap-mandatory overflow-x-auto scroll-smooth"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            <style>{`.news-carousel::-webkit-scrollbar { display: none; }`}</style>
                            
                            <button className="group block w-[75%] flex-shrink-0 snap-center text-left">
                                <div className="flex flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-md">
                                    <img alt="Noticia sobre producción" className="h-32 w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS7NhxgEC3UbIw6LWZk5yHN7MaK5Iztni_tVECRZLrJMVel1eDGiysWaFXmBGFo9t8fMNy-nuv-ux_JBlNJatsBNe8uPbD5YVkNBPwXSyA5zS1mMCv3rSFN0MjUmH6y3PXipj9P3kS6KSMDV54u0NleGURPAiuTavV3YWSh6LFJUyah4T6XXq1hHob7lwWBfELr0GitJRQ17dKhveoQ0zM4l50PY6o0bsEU3uJxl8qT5St0P1HUDS90npqlOXg5UFVPgUzvePCynGs" />
                                    <div className="p-3">
                                        <h3 className="font-heading text-base font-bold leading-tight text-gray-900 dark:text-white">Nuevo Récord de Producción</h3>
                                        <p className="mt-1 font-body text-[13px] font-medium leading-snug text-gray-600 dark:text-gray-300">Alcanzamos un hito histórico en la producción de este trimestre.</p>
                                    </div>
                                </div>
                            </button>
                            
                            <button className="group block w-[75%] flex-shrink-0 snap-center text-left">
                                <div className="flex flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-md">
                                    <img alt="Noticia sobre programa de mentores" className="h-32 w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSZge-CaGuts1L_4OK7sMwos_giz5L1V89HGaDla5pTLGcrGMXi_qv13jXBzSx4eAZvl71GXvVAEIoq2BvPvCW3XZ7po4mNEfMTLimzJrliZefDyi45gUV-NGkG-nkMEA5jLOK-yHkQ35rv2heWBAFNa7C5-Zvqv5nJ0y68WyS-qy1ifKx49iAUMXQGuMNRnC2-V7TkgKADaiCQ3Dpffu8qC2iEUi155PfihchIqGO6zSOTlPQOhRPZAm36-Gzr7_qcTPVNJWphLv2" />
                                    <div className="p-3">
                                        <h3 className="font-heading text-base font-bold leading-tight text-gray-900 dark:text-white">Programa de Mentores</h3>
                                        <p className="mt-1 font-body text-[13px] font-medium leading-snug text-gray-600 dark:text-gray-300">Lanzamiento del programa JuniorPac para nuevos talentos.</p>
                                    </div>
                                </div>
                            </button>
                            
                            <button className="group block w-[75%] flex-shrink-0 snap-center text-left">
                                <div className="flex flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-md">
                                    <img alt="Noticia sobre iniciativas de sostenibilidad" className="h-32 w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM8pd9odrJ3rxkq-32zryqxcxGxxMsPZR9LV8EwXEQj9XHO72E624Tzs17w4zyJYG7X9bfEvPukSwTmKS6pEpBPCU_uAZ8OFp6WYtYMQ4M3twlX7k3AI7_5qMP50ZJsUJj07cj3Fz_pU3D1r4D_2DKV4MLfd8vTpm8eZ2Oj8GUKaW4EmKHgGdLRvRvphZr_BwOsmxdH9AWKhcyHd-sCHE_AchXPh_XrW0m40RkShLUkvZFO8fOHhRjynFOJkQG5h5EI6X8bpY4h3sW" />
                                    <div className="p-3">
                                        <h3 className="font-heading text-base font-bold leading-tight text-gray-900 dark:text-white">Sostenibilidad Primero</h3>
                                        <p className="mt-1 font-body text-[13px] font-medium leading-snug text-gray-600 dark:text-gray-300">Nuevas iniciativas para reducir nuestra huella de carbono.</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark font-manrope">
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="flex flex-col bg-[#004A99] dark:bg-[#004A99] p-4 pb-0 text-white">
          <div className="flex items-center h-12 justify-between">
            <button onClick={() => navigate('/home')} className="flex size-12 shrink-0 items-center justify-start -ml-2">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="flex w-12 items-center justify-end">
              <button className="flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent">
                <span className="material-symbols-outlined">notifications</span>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center bg-[#004A99] dark:bg-[#004A99] pt-0 p-4 pb-8">
          <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 border-4 border-white dark:border-background-light mb-4" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAxlBG8kZna6Bv_RezMeJbQdMQ7YU0uQncqb-hBKoeAoItRXmvcaqVnZoy8EmLe9OUarCf7Qe7hJohuB06naZQMQO6dIUpZHNVMZr9DuO-j_ouDPUOINnj4FwXj-p81TSrVHciwr8Qr1_MPxwwJSnqsHPc9ZYikt4Q_j1V8fFt7fDXf-VuURsuGbu_-g2q1iNy_P5leU852wD4Io5wkHhimZXOtCuO7ryqXFLSom0chVOQIfAURZC6Z341hT25binCGggh1nV5BcLjC")` }}></div>
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">Samuel Pincay</p>
            <p className="text-white/80 text-base font-normal leading-normal">Ingeniero Agropecuario – Administrador de Fincas</p>
          </div>
          <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-2 text-white/80 mt-4 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>business_center</span>
              <span>REYBANPAC</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>location_on</span>
              <span>Hacienda Sulema 2 (1 año)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>groups</span>
              <span>162 personas</span>
            </div>
          </div>
        </div>
        
        <main className="flex flex-col gap-6 p-4 -mt-6">
          <div className="flex flex-col bg-card-light dark:bg-card-dark rounded-lg overflow-hidden shadow-soft">
              {[
                  { icon: 'trending_up', label: 'Progreso en la Empresa' },
                  { icon: 'history', label: 'Actividad Reciente' },
                  { icon: 'folder_open', label: 'Mis documentos' },
                  { icon: 'workspace_premium', label: 'Trayectoria' },
              ].map((item, index, arr) => (
                  <button key={item.label} className={`flex items-center gap-4 px-4 min-h-14 justify-between py-3 w-full text-left ${index < arr.length - 1 ? 'border-b border-border-light dark:border-border-dark' : ''}`}>
                      <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center rounded-lg bg-[#004A99]/10 dark:bg-[#004A99]/30 shrink-0 size-10 text-[#004A99] dark:text-white"><span className="material-symbols-outlined">{item.icon}</span></div>
                          <p className="text-text-primary-light dark:text-text-primary-dark text-base font-medium leading-normal flex-1 truncate">{item.label}</p>
                      </div>
                      <span className="material-symbols-outlined text-text-secondary-light/50">chevron_right</span>
                  </button>
              ))}
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold">Logros e Insignias</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
                {[
                    { icon: 'groups', label: 'Trabajo en Equipo', color: 'bg-accent' },
                    { icon: 'security', label: 'Gestión de Seguridad', color: 'bg-accent' },
                    { icon: 'verified', label: 'Responsabilidad', color: 'bg-accent' },
                    { icon: 'school', label: 'Mentoría de Jóvenes', color: 'bg-mentor-legendary' },
                ].map(badge => (
                     <div key={badge.label} className="flex flex-col items-center gap-2">
                        <div className={`flex size-16 items-center justify-center rounded-full shadow-sm ${badge.color}`}>
                            <span className="material-symbols-outlined text-white" style={{ fontSize: '32px' }}>{badge.icon}</span>
                        </div>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium leading-tight">{badge.label}</p>
                    </div>
                ))}
            </div>
          </div>
          
          <div className="flex flex-col gap-3 p-4 rounded-lg bg-card-light dark:bg-card-dark shadow-soft">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-lg bg-[#004A99]/10 dark:bg-[#004A99]/30 shrink-0 size-10 text-[#004A99] dark:text-white">
                <span className="material-symbols-outlined">format_quote</span>
              </div>
              <p className="text-text-primary-light dark:text-text-primary-dark text-base font-bold leading-normal">Frases y valores destacados</p>
            </div>
            <div className="flex flex-col gap-2 text-sm italic text-text-secondary-light dark:text-text-secondary-dark">
              <p>"REYBANPAC es una gran escuela, las oportunidades siempre están."</p>
              <p>"Madrugar y la cultura del esfuerzo son claves, igual que la planificación."</p>
              <p>"Me gusta involucrar y motivar jóvenes, dándoles tareas accesibles antes de roles exigentes."</p>
              <p>"En este negocio el resultado cuenta más que el título; ser responsable y honesto abre oportunidades."</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};


const ReferralsScreen: React.FC = () => {
    const [filter, setFilter] = useState('Todos');
    const navigate = useNavigate();

    const filteredReferrals = MOCK_REFERRALS.filter(r => filter === 'Todos' || r.status === filter);

    const statusMap: { [key: string]: { color: string; bg: string } } = {
        'Pendiente': { color: 'text-pending', bg: 'bg-pending' },
        'Activo': { color: 'text-active', bg: 'bg-active' },
        'Avanzados': { color: 'text-certified', bg: 'bg-certified' },
    };

    const progressSteps = ['Registrado', 'Entrevistado', 'Contratado', 'Avanzados'];

    const getActiveStep = (progress: number) => {
        if (progress >= 100) return 3;
        if (progress >= 66) return 2;
        if (progress >= 33) return 1;
        return 0;
    }

    return (
        <div className="flex flex-col h-screen w-full bg-background-light dark:bg-background-dark font-manrope">
            <header className="flex items-center bg-corporate-blue p-4 pb-3 justify-between sticky top-0 z-10 flex-none">
                <button onClick={() => navigate('/home')} className="flex size-12 shrink-0 items-center justify-start text-white -ml-2">
                    <span className="material-symbols-outlined text-3xl">arrow_back</span>
                </button>
                <h1 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Recomienda y Gana</h1>
                <div className="flex size-12 shrink-0 items-center"></div>
            </header>
            <main className="flex-1 overflow-y-auto p-4 pb-24 space-y-4">
                <button onClick={() => navigate('/referrals/new')} className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 bg-banano-yellow text-corporate-blue text-lg font-bold tracking-[0.015em] shadow-md hover:opacity-90 transition-opacity">
                    <span className="truncate">Referir nuevo talento</span>
                </button>
                <div className="flex flex-col items-stretch justify-start rounded-xl shadow-soft dark:bg-card-dark bg-card-light p-4 gap-3">
                    <h2 className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold">Mis Recompensas</h2>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-banano-yellow !text-4xl">toll</span>
                        <p className="text-text-primary-light dark:text-text-primary-dark text-3xl font-bold">$150</p>
                    </div>
                </div>

                <div className='pt-4'>
                    <h2 className="text-text-primary-light dark:text-text-primary-dark text-xl font-bold mb-3">Mis Referidos</h2>
                    <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
                        {['Todos', 'Pendiente', 'Activo', 'Avanzados'].map(f => (
                            <button key={f} onClick={() => setFilter(f)} className={`flex h-9 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full px-4 ${filter === f ? 'bg-corporate-blue text-white' : 'bg-gray-200 dark:bg-card-dark'}`}>
                                {f !== 'Todos' && <div className={`h-2 w-2 rounded-full ${statusMap[f]?.bg}`}></div>}
                                <p className="text-sm font-medium">{f}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {filteredReferrals.map((referral, index) => {
                        const statusInfo = statusMap[referral.status];
                        const activeStep = getActiveStep(referral.progress);
                        return (
                            <button key={index} onClick={() => navigate(`/referrals/${referral.id}`)} className="flex flex-col gap-4 rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-4 text-left">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-text-primary-light dark:text-text-primary-dark">{referral.name}</p>
                                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{referral.date}</p>
                                    </div>
                                    <div className={`flex items-center gap-2 rounded-full px-3 py-1 ${statusInfo.bg}/20`}>
                                        <div className={`h-2 w-2 rounded-full ${statusInfo.bg}`}></div>
                                        <p className={`text-xs font-medium ${statusInfo.color}`}>{referral.status}</p>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <div className="relative h-2 w-full rounded-full bg-gray-200 dark:bg-background-dark">
                                        <div className="absolute top-0 left-0 h-2 rounded-full bg-corporate-blue" style={{ width: `${referral.progress}%` }}></div>
                                    </div>
                                    <div className="mt-2 grid grid-cols-4 text-center text-[10px] text-text-secondary-light dark:text-text-secondary-dark">
                                        {progressSteps.map((step, stepIndex) => (
                                            <span key={step} className={stepIndex === activeStep ? 'font-bold text-corporate-blue dark:text-accent' : ''}>{step}</span>
                                        ))}
                                    </div>
                                </div>
                            </button>
                        )
                    })}
                </div>
            </main>
        </div>
    );
};

const ReferTalentFormScreen: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        position: '',
        phone: '',
        email: '',
        relationshipType: 'Otra relación',
        acquaintanceTime: '',
        recommendationReason: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [isFormValid, setIsFormValid] = useState(false);

    const validate = useCallback(() => {
        const newErrors: { [key: string]: string | null } = {};

        if (!formData.fullName.trim() || formData.fullName.trim().length < 3 || !/^[a-zA-Z\s]+$/.test(formData.fullName)) {
            newErrors.fullName = 'Campo requerido. Solo letras y espacios, mínimo 3 caracteres.';
        }
        if (!formData.position.trim() || formData.position.trim().length < 2) {
            newErrors.position = 'Campo requerido, mínimo 2 caracteres.';
        }
        if (formData.phone && !/^\+?\d{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Formato numérico inválido (ej. 10 dígitos).';
        }
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Formato de email inválido.';
        }
        if (!formData.recommendationReason.trim()) {
            newErrors.recommendationReason = 'Este campo es requerido.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    useEffect(() => {
        setIsFormValid(validate());
    }, [formData, validate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setCvFile(e.target.files[0]);
        }
    };
    
    const handleSubmit = () => {
        if (isFormValid) {
            navigate('/referrals/confirmation');
        }
    };

    return (
        <div className="flex flex-col h-screen w-full bg-background-light dark:bg-background-dark font-manrope">
            <header className="flex items-center bg-corporate-blue p-4 pb-3 justify-between sticky top-0 z-10 flex-none">
                <button onClick={() => navigate('/referrals')} className="flex size-12 shrink-0 items-center justify-start text-white -ml-2">
                    <span className="material-symbols-outlined text-3xl">arrow_back</span>
                </button>
                <h1 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Referir Nuevo Talento</h1>
                <div className="flex size-12 shrink-0 items-center"></div>
            </header>
            <main className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-1 flex-col gap-6">
                    <p className="text-gray-600 dark:text-gray-300">Completa los datos de la persona que quieres referir. Los campos marcados con * son obligatorios.</p>
                    <form className="flex flex-1 flex-col gap-4">
                        {/* Full Name */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="fullName">Nombre completo *</label>
                            <input onChange={handleChange} value={formData.fullName} className={`w-full rounded-lg bg-white dark:bg-zinc-700 dark:text-white focus:border-corporate-blue focus:ring-corporate-blue ${errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-zinc-600'}`} id="fullName" placeholder="Ej: Juan Pérez" type="text"/>
                            {errors.fullName && <p className="text-xs text-danger">{errors.fullName}</p>}
                        </div>
                        {/* Position */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="position">Puesto o área para el que se le recomienda *</label>
                            <input onChange={handleChange} value={formData.position} className={`w-full rounded-lg bg-white dark:bg-zinc-700 dark:text-white focus:border-corporate-blue focus:ring-corporate-blue ${errors.position ? 'border-red-500' : 'border-gray-300 dark:border-zinc-600'}`} id="position" placeholder="Ej: Operario agrícola" type="text"/>
                            {errors.position && <p className="text-xs text-danger">{errors.position}</p>}
                        </div>
                         {/* Phone */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="phone">Número de teléfono</label>
                            <input onChange={handleChange} value={formData.phone} className={`w-full rounded-lg bg-white dark:bg-zinc-700 dark:text-white focus:border-corporate-blue focus:ring-corporate-blue ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-zinc-600'}`} id="phone" placeholder="Ej: +593 9 8765 4321" type="tel"/>
                            {errors.phone && <p className="text-xs text-danger">{errors.phone}</p>}
                        </div>
                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">Correo electrónico de contacto (Opcional)</label>
                            <input onChange={handleChange} value={formData.email} className={`w-full rounded-lg bg-white dark:bg-zinc-700 dark:text-white focus:border-corporate-blue focus:ring-corporate-blue ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-zinc-600'}`} id="email" placeholder="Ej: juan.perez@email.com" type="email"/>
                            {errors.email && <p className="text-xs text-danger">{errors.email}</p>}
                        </div>
                         {/* Relationship Section */}
                        <div className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4">
                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFEFC3] dark:bg-yellow-900/50"><span className="material-symbols-outlined text-[#F2A400] dark:text-yellow-400">groups</span></div>
                                <div>
                                    <h2 className="text-base font-bold text-gray-800 dark:text-gray-100">Relación con el Candidato</h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">Información sobre tu conexión con la persona</p>
                                </div>
                            </div>
                            {/* Relationship Type */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="relationshipType">Tipo de Relación *</label>
                                <select onChange={handleChange} value={formData.relationshipType} className="w-full rounded-lg border-gray-300 bg-white dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:border-corporate-blue focus:ring-corporate-blue" id="relationshipType">
                                    <option>Amigo</option><option>Colega</option><option>Familiar</option><option>Otra relación</option>
                                </select>
                            </div>
                             {/* Acquaintance Time */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="acquaintanceTime">Tiempo de Conocer al Candidato</label>
                                <select onChange={handleChange} value={formData.acquaintanceTime} className="w-full rounded-lg border-gray-300 bg-white dark:bg-zinc-700 dark:border-zinc-600 dark:text-white focus:border-corporate-blue focus:ring-corporate-blue" id="acquaintanceTime">
                                    <option value="">Seleccionar tiempo</option><option>Menos de 1 año</option><option>1-3 años</option><option>Más de 3 años</option>
                                </select>
                            </div>
                            {/* Recommendation Reason */}
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="recommendationReason">¿Por qué recomiendas a esta persona? *</label>
                                <textarea onChange={handleChange} value={formData.recommendationReason} className={`w-full rounded-lg bg-white dark:bg-zinc-700 dark:text-white focus:border-corporate-blue focus:ring-corporate-blue ${errors.recommendationReason ? 'border-red-500' : 'border-gray-300 dark:border-zinc-600'}`} id="recommendationReason" placeholder="Explica por qué consideras que esta persona sería una excelente adición al equipo de Reybanpac..." rows={4}></textarea>
                                {errors.recommendationReason && <p className="text-xs text-danger">{errors.recommendationReason}</p>}
                            </div>
                        </div>
                        {/* CV Upload */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="cv">Adjuntar CV (Opcional)</label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-zinc-700 hover:bg-gray-100 dark:border-zinc-600 dark:hover:border-zinc-500 dark:hover:bg-zinc-600" htmlFor="cv-upload">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {cvFile ? (
                                        <>
                                            <span className="material-symbols-outlined text-green-500">check_circle</span>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">{cvFile.name}</p>
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">cloud_upload</span>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click para cargar</span> o arrastra y suelta</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOC, DOCX (MAX. 5MB)</p>
                                        </>
                                    )}
                                    </div>
                                    <input onChange={handleFileChange} className="hidden" id="cv-upload" type="file" accept=".pdf,.doc,.docx"/>
                                </label>
                            </div>
                        </div>

                        <div className="mt-auto pt-4 pb-4">
                            <button onClick={handleSubmit} disabled={!isFormValid} className="flex w-full items-center justify-center overflow-hidden rounded-lg h-14 px-5 bg-banano-yellow text-corporate-blue text-lg font-bold leading-normal tracking-[0.015em] shadow-md disabled:opacity-50 disabled:cursor-not-allowed" type="button">
                                <span className="truncate">Enviar Referido</span>
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};


const ReferralConfirmationScreen: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="relative flex h-screen w-full flex-col bg-background-light dark:bg-background-dark font-manrope">
      <header className="flex items-center p-4 pb-2 justify-between sticky top-0 z-10 flex-none">
        <button onClick={() => navigate('/referrals')} className="flex size-12 shrink-0 items-center justify-start -ml-2">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Confirmación</h2>
      </header>
      <main className="flex flex-col flex-grow justify-center items-center px-4 text-center">
        <div className="mb-8">
          <svg fill="none" height="120" viewBox="0 0 120 120" width="120" xmlns="http://www.w3.org/2000/svg">
            <path d="M110.134 50.8447C110.134 44.8097 99.4192 34.6447 89.2842 27.0647C79.1492 19.4847 67.9342 15.1147 58.7492 15.1147C44.3842 15.1147 31.0642 22.8447 21.0142 35.8447C10.9642 48.8447 5.13423 65.3597 5.13423 81.3947C5.13423 87.4297 15.8492 97.5947 25.9842 105.175C36.1192 112.755 47.3342 117.125 56.5192 117.125C70.8842 117.125 84.2042 109.395 94.2542 96.3947C104.304 83.3947 110.134 66.8797 110.134 50.8447Z" stroke="#003366" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
            <path d="M110.134 50.8447C110.134 44.8097 99.4192 34.6447 89.2842 27.0647C79.1492 19.4847 67.9342 15.1147 58.7492 15.1147C44.3842 15.1147 31.0642 22.8447 21.0142 35.8447C10.9642 48.8447 5.13423 65.3597 5.13423 81.3947C5.13423 87.4297 15.8492 97.5947 25.9842 105.175C36.1192 112.755 47.3342 117.125 56.5192 117.125C70.8842 117.125 84.2042 109.395 94.2542 96.3947C104.304 83.3947 110.134 66.8797 110.134 50.8447Z" fill="#FFD600"></path>
            <path d="M37.8125 61.1667L54.125 77.5L86.75 44.8334" stroke="#003366" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold leading-tight tracking-tight pb-3">¡Referido enviado con éxito!</h1>
        <p className="text-base font-normal leading-normal max-w-md">
          Una vez que el referido sea confirmado por RRHH, su perfil aparecerá en tu sección de 'Mis Referidos'.
        </p>
      </main>
      <div className="flex justify-center w-full sticky bottom-0 bg-background-light dark:bg-background-dark pt-4">
        <div className="flex w-full flex-1 max-w-[480px] flex-col items-stretch gap-3 px-4 pb-6">
          <button onClick={() => navigate('/home')} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-corporate-blue text-white text-base font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Ir al Menú</span>
          </button>
          <button onClick={() => navigate('/referrals')} className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-transparent text-corporate-blue text-base font-bold leading-normal tracking-[0.015em] border-2 border-corporate-blue">
            <span className="truncate">Volver a Referidos</span>
          </button>
        </div>
      </div>
    </div>
  );
};


const ReferredProfileScreen: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const referral = MOCK_REFERRALS.find(r => r.id === Number(id));

    if (!referral) {
        return (
            <div className="flex items-center justify-center h-screen flex-col gap-4">
                <p className="text-lg text-gray-500">Referido no encontrado.</p>
                <button onClick={() => navigate('/referrals')} className="text-reybanpac-blue font-bold">Volver a Referidos</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen w-full bg-background-light dark:bg-background-dark font-body text-text-light dark:text-text-dark antialiased overflow-hidden">
            <header className="flex-none sticky top-0 z-20 flex items-center justify-between bg-reybanpac-blue px-4 py-3 text-white shadow-md">
                <button onClick={() => navigate('/referrals')} className="flex h-10 w-10 items-center justify-center">
                    <span className="material-symbols-outlined text-3xl">arrow_back</span>
                </button>
                <h1 className="font-heading text-xl font-bold tracking-tight">Perfil del Referido</h1>
                <div className="h-10 w-10"></div>
            </header>
            
            <main className="flex-1 overflow-y-auto">
                {/* Profile Header */}
                <div className="bg-card-light dark:bg-card-dark p-5 text-center shadow-soft">
                    <img alt={`Foto de perfil de ${referral.name}`} className="mx-auto h-24 w-24 rounded-full border-4 border-white dark:border-card-dark object-cover shadow-lg" src={referral.imageUrl || "https://via.placeholder.com/150"} />
                    <h2 className="font-heading mt-4 text-2xl font-bold text-reybanpac-blue dark:text-white">{referral.name}</h2>
                    <p className="mt-1 text-base font-medium text-gray-500 dark:text-gray-400">{referral.jobTitle}</p>
                    <p className="mt-0.5 text-sm text-gray-400 dark:text-gray-500">{referral.hireDate}</p>
                </div>

                {/* Message Input */}
                <div className="bg-background-light dark:bg-background-dark px-4 pb-4 pt-5">
                    <div className="relative flex items-center">
                        <textarea className="w-full resize-none rounded-full border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark py-3 pl-4 pr-14 text-sm text-text-light dark:text-text-dark placeholder-gray-400 focus:border-reybanpac-blue focus:ring-reybanpac-blue" placeholder="Escribe un mensaje..." rows={1}></textarea>
                        <button className="absolute right-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-reybanpac-blue text-white transition-colors hover:bg-reybanpac-blue/90">
                            <span className="material-symbols-outlined !text-2xl">send</span>
                        </button>
                    </div>
                </div>

                {/* Sections */}
                <div className="space-y-6 bg-background-light dark:bg-background-dark p-4 pt-2 pb-8">
                    {/* Meta Reybancash */}
                    <section className="rounded-xl bg-card-light dark:bg-card-dark p-4 shadow-soft">
                        <h3 className="font-heading text-lg font-bold text-text-light dark:text-text-dark">Meta Reybancash</h3>
                        <div className="mt-4">
                            <div className="relative h-2 w-full rounded-full bg-border-light dark:bg-border-dark">
                                <div className="absolute left-0 top-0 h-full rounded-full bg-banano-yellow" style={{ width: `${referral.progress}%` }}></div>
                                <div className="absolute -top-3.5 flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-card-dark shadow-md" style={{ paddingTop: '1px', left: `calc(${referral.progress}% - 20px)` }}>
                                    <span className="text-2xl">🪙</span>
                                </div>
                            </div>
                            <div className="mt-3 flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
                                <span>Contratación</span>
                                <span>1 año</span>
                            </div>
                        </div>
                    </section>

                    {/* Actividad Reciente */}
                    <section>
                        <h3 className="font-heading mb-3 px-1 text-lg font-bold text-text-light dark:text-text-dark">Actividad Reciente</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 rounded-xl bg-card-light dark:bg-card-dark p-4 shadow-soft">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                                    <span className="material-symbols-outlined text-green-600 dark:text-green-400">thumb_up</span>
                                </div>
                                <div>
                                    <p className="font-bold text-text-light dark:text-text-dark">Buen Trabajo</p>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Reconocimiento por iniciativa en la optimización de procesos de cosecha.</p>
                                    <p className="mt-2 text-xs text-gray-400">12 de Agosto, 2024</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 rounded-xl bg-card-light dark:bg-card-dark p-4 shadow-soft">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
                                    <span className="material-symbols-outlined text-danger">warning</span>
                                </div>
                                <div>
                                    <p className="font-bold text-text-light dark:text-text-dark">Alerta de Seguridad</p>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Incumplimiento menor del protocolo de uso de EPP. Se realizó retroalimentación.</p>
                                    <p className="mt-2 text-xs text-gray-400">25 de Julio, 2024</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    {/* Logros e Insignias */}
                    <section>
                        <h3 className="font-heading mb-3 px-1 text-lg font-bold text-text-light dark:text-text-dark">Logros e Insignias</h3>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="flex flex-col items-center justify-center rounded-xl bg-card-light dark:bg-card-dark p-3 shadow-soft">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-banano-yellow/20">
                                    <span className="material-symbols-outlined text-4xl text-banano-yellow">military_tech</span>
                                </div>
                                <p className="mt-2 text-xs font-bold text-text-light dark:text-text-dark">Trabajo en Equipo</p>
                            </div>
                            <div className="flex flex-col items-center justify-center rounded-xl bg-card-light dark:bg-card-dark p-3 shadow-soft">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-reybanpac-blue/20">
                                    <span className="material-symbols-outlined text-4xl text-reybanpac-blue">school</span>
                                </div>
                                <p className="mt-2 text-xs font-bold text-text-light dark:text-text-dark">Curso de Seguridad</p>
                            </div>
                            <div className="flex flex-col items-center justify-center rounded-xl bg-card-light dark:bg-card-dark p-3 shadow-soft opacity-40">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                                    <span className="material-symbols-outlined text-4xl text-gray-500">lock</span>
                                </div>
                                <p className="mt-2 text-xs font-bold text-gray-500">Puntualidad Perfecta</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
};

const MentoringScreen: React.FC = () => (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
        <div className="bg-primary p-4 text-white flex-none">
            <h1 className="text-xl font-bold">Mentoría</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4 pb-24">
            <h1 className="text-xl">Programa de Mentoría</h1>
        </div>
    </div>
);

const DocumentsScreen: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
            <div className="bg-primary p-4 text-white flex-none flex items-center gap-2">
                <button onClick={() => navigate('/home')}><span className="material-symbols-outlined">arrow_back</span></button>
                <h1 className="text-xl font-bold">Documentos</h1>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                <h1 className="text-xl">Mis Documentos</h1>
            </div>
        </div>
    );
};

const ChatbotScreen: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: any }[]>([
    { from: 'bot', text: '¡Hola! Soy JuniorPac, tu asistente virtual. ¿Cómo puedo ayudarte hoy?' },
    { from: 'user', text: '¿Cómo funciona el sistema de referidos?' },
    { 
        from: 'bot', 
        text: (
            <div className="flex flex-col gap-2 items-start w-full">
                <div className="w-full rounded-xl rounded-bl-none bg-light-gray dark:bg-gray-700 px-4 py-3 text-dark-gray dark:text-gray-200 shadow-custom">
                    <p className="text-base font-normal leading-normal">¡Claro! El sistema de referidos te permite ganar puntos y recompensas al recomendarnos talentos de tu comunidad.</p>
                </div>
                <div className="w-full rounded-xl rounded-bl-none bg-light-gray dark:bg-gray-700 px-4 py-3 text-dark-gray dark:text-gray-200 shadow-custom">
                    <p className="mb-1 text-base font-bold">1. Recomendar un nuevo talento:</p>
                    <p className="text-base font-normal leading-normal">Ingresas los datos de tu referido y el sistema genera un token único en blockchain para asegurar la transparencia.</p>
                </div>
                <div className="w-full rounded-xl rounded-bl-none bg-light-gray dark:bg-gray-700 px-4 py-3 text-dark-gray dark:text-gray-200 shadow-custom">
                    <p className="mb-1 text-base font-bold">2. Seguimiento del referido:</p>
                    <p className="text-base font-normal leading-normal">Puedes ver el estado de tu referido: <span className="font-semibold">Pendiente</span>, <span className="font-semibold">Activo</span> o <span className="font-semibold">Avanzado</span>.</p>
                </div>
                <div className="w-full rounded-xl rounded-bl-none bg-light-gray dark:bg-gray-700 px-4 py-3 text-dark-gray dark:text-gray-200 shadow-custom">
                    <p className="mb-1 text-base font-bold">3. Acumulación de puntos/recompensas:</p>
                    <p className="text-base font-normal leading-normal">Ganas puntos a medida que tu referido avanza en el proceso. Todo queda registrado de forma segura en blockchain.</p>
                </div>
                <div className="w-full rounded-xl rounded-bl-none bg-light-gray dark:bg-gray-700 px-4 py-3 text-dark-gray dark:text-gray-200 shadow-custom">
                    <p className="text-base font-normal leading-normal">¡Te invito a explorar la sección de 'Referidos' en el menú para comenzar!</p>
                </div>
            </div>
        )
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (textToSend.trim() === '' || isLoading) return;

    const userMessage = { from: 'user' as const, text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botResponseText = await getChatbotResponse(textToSend, messages.map(m => ({...m, text: typeof m.text === 'string' ? m.text : 'Complejo mensaje del bot'})));
      setMessages(prev => [...prev, { from: 'bot', text: botResponseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { from: 'bot', text: 'Lo siento, ocurrió un error. Inténtalo de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col group/design-root bg-background-light dark:bg-background-dark font-display">
      <div className="flex items-center bg-reybanpac-blue p-4 shadow-md shrink-0">
        <button onClick={() => navigate('/home')} className="text-white flex size-10 shrink-0 items-center justify-center mr-2">
          <span className="material-symbols-outlined text-3xl">arrow_back</span>
        </button>
        <div className="text-white flex size-10 shrink-0 items-center justify-center">
          <span className="material-symbols-outlined text-3xl">smart_toy</span>
        </div>
        <h1 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] flex-1">JuniorPac</h1>
      </div>
      
      <div className="flex-1 space-y-4 overflow-y-auto bg-white dark:bg-card-dark p-4">
        {messages.map((msg, index) => {
           const isSequence = index > 0 && messages[index-1].from === msg.from;
           
           return (
             <div key={index} className={`flex items-end gap-3 ${msg.from === 'user' ? 'justify-end' : ''}`}>
                {msg.from === 'bot' && (
                  <div className={`flex size-10 shrink-0 items-center justify-center rounded-full bg-light-gray dark:bg-gray-700 text-reybanpac-blue dark:text-white ${isSequence ? 'invisible' : ''} ${typeof msg.text !== 'string' ? 'self-start' : ''}`}>
                     <span className="material-symbols-outlined">smart_toy</span>
                  </div>
                )}
                
                <div className={`flex flex-1 flex-col gap-1 ${msg.from === 'user' ? 'items-end' : 'items-start'}`}>
                   {typeof msg.text === 'string' ? (
                       <div className={`max-w-[80%] rounded-xl px-4 py-3 shadow-custom ${
                         msg.from === 'user' 
                         ? 'rounded-br-none bg-reybanpac-blue text-white' 
                         : 'rounded-bl-none bg-light-gray dark:bg-gray-700 text-dark-gray dark:text-gray-200'
                       }`}>
                          <p className="text-base font-normal leading-normal whitespace-pre-wrap">{msg.text}</p>
                       </div>
                   ) : (
                       <div className="max-w-[80%]">
                           {msg.text}
                       </div>
                   )}
                </div>
  
                {msg.from === 'user' && (
                  <div className={`flex size-10 shrink-0 items-center justify-center rounded-full bg-reybanpac-blue text-white ${isSequence ? 'invisible' : ''}`}>
                     <span className="material-symbols-outlined">person</span>
                  </div>
                )}
             </div>
           );
        })}
        {isLoading && (
           <div className="flex items-end gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-light-gray dark:bg-gray-700 text-reybanpac-blue dark:text-white">
                  <span className="material-symbols-outlined">smart_toy</span>
              </div>
              <div className="max-w-[80%] rounded-xl rounded-bl-none bg-light-gray dark:bg-gray-700 px-4 py-3 text-dark-gray dark:text-gray-200 shadow-custom">
                  <p className="text-base font-normal leading-normal">Escribiendo...</p>
              </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white dark:bg-card-dark p-4 pt-2 shrink-0 border-t border-gray-200 dark:border-gray-700">
        <div className="mb-3 flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
           {['Beneficios', 'Capacitaciones', 'Permisos'].map(topic => (
              <button key={topic} onClick={() => handleSend(topic)} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-reybanpac-yellow px-4 py-2 hover:opacity-90 transition-opacity">
                  <p className="text-dark-gray text-sm font-medium leading-normal">{topic}</p>
              </button>
           ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input 
              className="w-full rounded-full border border-gray-300 dark:border-gray-600 bg-light-gray dark:bg-background-dark py-3 pl-5 pr-12 text-base text-dark-gray dark:text-white focus:border-reybanpac-blue focus:ring-reybanpac-blue focus:outline-none" 
              placeholder="Escribe tu mensaje..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <button 
              onClick={() => handleSend()}
              disabled={isLoading || input.trim() === ''} 
              className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-dark-gray/60 dark:text-white/60 hover:text-reybanpac-blue dark:hover:text-reybanpac-yellow disabled:opacity-50"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
          <button className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-reybanpac-blue text-white hover:bg-reybanpac-blue/90 transition-colors">
            <span className="material-symbols-outlined text-2xl">mic</span>
          </button>
        </div>
      </div>
    </div>
  );
};


const AppLayout: React.FC = () => {
    const location = useLocation();
    const showBottomNav = ['/home', '/referrals', '/profile', '/chatbot'].includes(location.pathname);
    const isHome = location.pathname === '/home';

    return (
        <div className="h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
            <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/home" element={<HomeScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/referrals" element={<ReferralsScreen />} />
                <Route path="/referrals/new" element={<ReferTalentFormScreen />} />
                <Route path="/referrals/confirmation" element={<ReferralConfirmationScreen />} />
                <Route path="/referrals/:id" element={<ReferredProfileScreen />} />
                <Route path="/chatbot" element={<ChatbotScreen />} />
                <Route path="/documents" element={<DocumentsScreen />} />
                <Route path="/mentoring" element={<MentoringScreen />} />
            </Routes>
            {showBottomNav && <BottomNav showEmergencyButton={isHome} />}
        </div>
    );
};

const App: React.FC = () => {
  return (
    <HashRouter>
        <AppLayout />
    </HashRouter>
  );
};

export default App;
