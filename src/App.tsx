import { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { translations, products } from './data';
import './index.css';

const BackgroundParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    const particleCount = 80;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        const h = Math.random() * 360;
        this.color = `hsla(${h}, 70%, 60%, 0.4)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas!.width) this.x = 0;
        else if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        else if (this.y < 0) this.y = canvas!.height;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener('resize', init);
    return () => window.removeEventListener('resize', init);
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" />;
};

// --- Pages ---

const Home = ({ t }: { t: any }) => (
  <div className="page-content animate-fade">
    <header className="hero container animate-fade">
      <div className="hero-content">
        <span className="hero-badge">{t.founderBadge}</span>
        <h1>{t.heroTitle}</h1>
        <p className="hero-subtitle">{t.heroSub}</p>
        <div className="hero-btns">
          <Link to="/products" className="btn-primary">{t.getStarted}</Link>
        </div>
      </div>
    </header>

    <section className="founder-section container glass animate-fade">
      <div className="founder-grid">
        <div className="founder-info">
          <span className="badge-outline">{t.founderTitle}</span>
          <h2>{t.founderName}</h2>
          <p className="founder-bio">{t.founderBio}</p>
          <div className="founder-stats">
            <div className="stat-item">
              <span className="stat-label">Computer Techniques Engineer</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Python Expert</span>
            </div>
          </div>
        </div>
        <div className="founder-visual">
          <div className="ai-brain-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-3.31 0-6-2.69-6-6 0-2.97 2.16-5.44 5-5.92V14h2v-5.92c2.84.48 5 2.95 5 5.92 0 3.31-2.69 6-6 6z"/>
            </svg>
          </div>
        </div>
      </div>
    </section>

    <section className="vision-section container glass animate-fade">
      <div className="vision-content">
        <h2>{t.visionTitle}</h2>
        <p>{t.visionText}</p>
      </div>
    </section>

    <section className="advice-grid container">
      <h2 className="section-title">{t.adviceTitle}</h2>
      <div className="advice-cards">
        <div className="advice-card glass">
          <div className="advice-icon">💡</div>
          <p>{t.advice1}</p>
        </div>
        <div className="advice-card glass">
          <div className="advice-icon">✨</div>
          <p>{t.advice2}</p>
        </div>
        <div className="advice-card glass">
          <div className="advice-icon">🌐</div>
          <p>{t.advice3}</p>
        </div>
        <div className="advice-card glass">
          <div className="advice-icon">💎</div>
          <p>{t.advice4}</p>
        </div>
      </div>
    </section>

    <section className="philosophy-section container">
      <div className="philosophy-card glass">
        <div className="philosophy-grid">
          <div className="philosophy-info">
            <h2>{t.philosophyTitle}</h2>
            <p>{t.philosophyText}</p>
          </div>
          <div className="innovation-box">
            <h3>{t.innovationTitle}</h3>
            <p>{t.innovationText}</p>
          </div>
        </div>
      </div>
    </section>

    <section className="about-section container glass">
      <div className="about-grid">
        <div className="about-info">
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutText}</p>
        </div>
        <div className="request-box">
          <h3>{t.requestProject}</h3>
          <p>{t.contact} 1998524</p>
          <a href="https://wa.me/9647882983339" className="btn-secondary">WhatsApp</a>
        </div>
      </div>
    </section>
  </div>
);

const Products = ({ t, lang }: { t: any, lang: string }) => (
  <div className="page-content animate-fade container">
    <h2 className="section-title">{t.products}</h2>
    <div className="product-grid">
      {products.map(product => (
        <Link to={`/product/${product.id}`} key={product.id} className="product-card-link">
          <div className="product-card">
            <div className="product-icon">{product.icon || '🚀'}</div>
            <h3>{lang === 'en' ? product.nameEn : product.nameAr}</h3>
            <p>{lang === 'en' ? product.descEn : product.descAr}</p>
            <div className="product-footer">
              <span className="price">{product.price}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

const ProductDetail = ({ t, lang }: { t: any, lang: string }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === Number(id));

  if (!product) return <div>Not Found</div>;

  const name = lang === 'en' ? product.nameEn : product.nameAr;
  const desc = lang === 'en' ? product.longDescEn : product.longDescAr;
  const features = lang === 'en' ? product.featuresEn : product.featuresAr;

  return (
    <div className="page-content animate-fade container">
      <button onClick={() => navigate(-1)} className="back-btn">← {t.back}</button>
      <div className="detail-card glass">
        <div className="detail-header">
          <div className="product-icon large">{product.icon || '🚀'}</div>
          <div className="detail-title-area">
            <h1>{name}</h1>
            <span className="detail-price">{product.price}</span>
          </div>
        </div>
        <div className="detail-body">
          <p className="long-desc">{desc}</p>
          <div className="features-section">
            <h3>{t.features}</h3>
            <ul>
              {features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
          <div className="detail-actions">
            <a href={`https://wa.me/9647882983338?text=Hello 1998524, I am interested in purchasing ${name}`} className="btn-primary" target="_blank" rel="noopener noreferrer">
              {t.buyNow}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Contact = ({ t }: { t: any }) => (
  <div className="page-content animate-fade container centered-page">
    <div className="contact-section-wrapper">
      <div className="contact-header-text">
        <h2>{t.contactTitle}</h2>
        <p>{t.contactSub}</p>
      </div>
      <div className="contact-bar glass animate-fade">
      <a href={`https://wa.me/964${t.whatsapp.substring(1)}`} className="contact-icon-btn" target="_blank" rel="noopener noreferrer" title="WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
      </a>
      <a href="mailto:en8ahmedjabbar@gmail.com" className="contact-icon-btn" title="Email">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
      </a>
      <a href={t.mapsUrl} className="contact-icon-btn" target="_blank" rel="noopener noreferrer" title="Location">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
      </a>
      <a href={`https://github.com/${t.github}`} className="contact-icon-btn" target="_blank" rel="noopener noreferrer" title="GitHub">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.152-1.11-1.459-1.11-1.459-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z"/></svg>
      </a>
    </div>
  </div>
</div>
);

function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const t = translations[lang];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.lang = lang;
  }, [theme, lang]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <Router>
      <div className="app">
        <BackgroundParticles />
        <div className="mouse-glow" style={{ 
          left: mousePos.x, 
          top: mousePos.y,
          background: theme === 'dark' ? 'rgba(250, 204, 21, 0.12)' : 'rgba(0, 112, 243, 0.08)'
        }}></div>

        <nav className={`magical-nav animate-fade ${!navVisible ? 'nav-hidden' : ''}`}>
          <div className="container nav-content">
            <Link to="/" className="logo-section">
              <div className="logo-glow"></div>
              <div className="interactive-logo">
                {"1998524".split("").map((char, index) => (
                  <span key={index} className="logo-digit" style={{ animationDelay: `${index * 0.1}s` }}>
                    {char}
                  </span>
                ))}
              </div>
            </Link>
            
            <div className="nav-main">
              <ul className="nav-links">
                <li><Link to="/">{t.home}<span className="nav-indicator"></span></Link></li>
                <li><Link to="/products">{t.products}<span className="nav-indicator"></span></Link></li>
                <li><Link to="/contact">{t.contact}<span className="nav-indicator"></span></Link></li>
              </ul>
            </div>

            <div className="nav-controls">
              <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="control-btn lang-btn">
                <div className="ai-glow-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
              </button>
              <button onClick={toggleTheme} className="control-btn theme-btn">
                <div className="ai-glow-icon">
                  {theme === 'light' ? 
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M10 2c-1.82 0-3.53.5-5 1.35C7.99 5.08 10 8.3 10 12s-2.01 6.92-5 8.65C6.47 21.5 8.18 22 10 22c5.52 0 10-4.48 10-10S15.52 2 10 2z"/></svg> 
                    : 
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>
                  }
                </div>
              </button>
            </div>
          </div>
        </nav>

        <main className="main-wrapper">
          <Routes>
            <Route path="/" element={<Home t={t} />} />
            <Route path="/products" element={<Products t={t} lang={lang} />} />
            <Route path="/product/:id" element={<ProductDetail t={t} lang={lang} />} />
            <Route path="/contact" element={<Contact t={t} />} />
          </Routes>
        </main>

      <style dangerouslySetInnerHTML={{ __html: `
          .main-wrapper {
            padding-top: 120px;
            min-height: calc(100vh - 150px);
          }
          .page-content {
            padding-bottom: 4rem;
          }
          .centered-page {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
          }

          /* Particles & Glow */
          .particles-canvas {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -2; pointer-events: none;
          }
          .mouse-glow {
            position: fixed; width: 600px; height: 600px; border-radius: 50%; transform: translate(-50%, -50%);
            pointer-events: none; z-index: -1; filter: blur(100px); transition: background 0.5s ease;
          }

          /* Animations */
          @keyframes float {
            0% { transform: translateX(-50%) translateY(0px); }
            50% { transform: translateX(-50%) translateY(-5px); }
            100% { transform: translateX(-50%) translateY(0px); }
          }
          .magical-nav {
            position: fixed; top: 1.5rem; left: 50%; transform: translateX(-50%); width: calc(100% - 3rem);
            max-width: 1200px; height: var(--nav-height); background: var(--nav-bg); backdrop-filter: blur(20px);
            border: 1px solid var(--border-color); border-radius: 24px; z-index: 1000;
            box-shadow: 0 10px 40px rgba(0,0,0,0.15); display: flex; align-items: center; 
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s;
            animation: float 4s ease-in-out infinite;
          }
          .magical-nav.nav-hidden {
            transform: translateX(-50%) translateY(-150%);
            opacity: 0;
          }
          .nav-content { display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 0 1.5rem; }
          .logo-section {
            position: relative;
            display: flex;
            align-items: center;
            text-decoration: none;
          }
          .nav-controls {
            display: flex;
            gap: 1.5rem;
          }
          .interactive-logo {
            display: flex;
            gap: 2px;
            perspective: 1000px;
          }
          .logo-digit {
            font-family: 'Tajawal', sans-serif;
            font-size: 2.2rem;
            font-weight: 900;
            color: var(--accent);
            display: inline-block;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
            text-shadow: 0 0 20px var(--accent-glow);
            animation: digitFloat 3s ease-in-out infinite alternate;
          }
          .logo-digit:hover {
            transform: scale(1.4) rotate(10deg) translateZ(50px);
            color: var(--text-primary);
            text-shadow: 0 0 30px var(--accent);
            z-index: 10;
          }
          @keyframes digitFloat {
            0% { transform: translateY(0); }
            100% { transform: translateY(-5px); }
          }

          .ai-glow-icon {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.3s;
          }
          .control-btn:hover .ai-glow-icon {
            transform: scale(1.1);
            filter: drop-shadow(0 0 8px var(--accent));
          }

          .logo-glow {
            position: absolute;
            width: 100px;
            height: 40px;
            background: var(--accent);
            filter: blur(40px);
            opacity: 0.15;
            border-radius: 50%;
            z-index: 0;
            pointer-events: none;
          }

          .nav-links { display: flex; gap: 2rem; list-style: none; }
          .nav-links a { color: var(--text-primary); font-family: 'Tajawal', sans-serif !important; font-weight: 700; text-decoration: none; position: relative; }
          .nav-indicator { position: absolute; bottom: -4px; left: 0; width: 0; height: 3px; background: var(--accent); transition: 0.3s; }
          .nav-links a:hover .nav-indicator { width: 100%; }

          .control-btn { width: 44px; height: 44px; border-radius: 12px; background: var(--bg-secondary); border: 1px solid var(--border-color); color: var(--text-primary); cursor: pointer; transition: 0.3s; }
          .control-btn:hover { border-color: var(--accent); transform: translateY(-2px); }

          .product-card-link { text-decoration: none; display: block; color: inherit; }
          .product-card { 
            background: var(--card-bg); 
            border: 1px solid var(--border-color); 
            padding: 1rem; 
            border-radius: 20px; 
            transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            height: 100%;
            cursor: pointer;
          }
          .product-card-link:hover .product-card { 
            transform: translateY(-5px) scale(1.02);
            border-color: var(--accent);
            box-shadow: 0 10px 20px rgba(0,0,0,0.3);
            background: rgba(255, 255, 255, 0.05);
          }
          .product-icon { font-size: 1.8rem; margin-bottom: 0.8rem; }
          .product-card h3 { font-size: 1.1rem; margin-bottom: 0.5rem; color: var(--accent); }
          .product-card p { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 1rem; }
          .product-footer { display: flex; justify-content: space-between; align-items: center; }
          .price { font-weight: 800; font-size: 1rem; color: var(--text-primary); }

          /* About & Request */
          .about-section { margin-top: 6rem; padding: 4rem; border-radius: 40px; }
          .about-grid { display: grid; grid-template-columns: 1fr 350px; gap: 4rem; align-items: center; }
          .about-info h2 { font-size: 2.8rem; margin-bottom: 1.5rem; color: var(--accent); }
          .about-info p { font-size: 1.2rem; line-height: 1.8; color: var(--text-secondary); }
          .request-box { 
            padding: 3rem; 
            background: var(--card-bg); 
            border-radius: 30px; 
            text-align: center; 
            border: 1px solid var(--accent);
            box-shadow: 0 10px 40px var(--accent-glow);
            transition: 0.4s;
          }
          .request-box:hover {
            transform: scale(1.02);
            box-shadow: 0 15px 50px var(--accent-glow);
          }
          .request-box h3 { font-size: 1.6rem; margin-bottom: 1rem; color: var(--text-primary); }
          .request-box p { font-size: 1rem; margin-bottom: 2rem; opacity: 0.8; }
          .btn-secondary {
            display: inline-block;
            padding: 1rem 2rem;
            background: var(--accent);
            color: #000;
            text-decoration: none;
            border-radius: 15px;
            font-weight: 800;
            transition: 0.3s;
          }
          .btn-secondary:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px var(--accent-glow);
          }

          /* Product Detail */
          .detail-card { padding: 3rem; border-radius: 30px; margin-top: 2rem; }
          .detail-header { display: flex; gap: 2rem; align-items: center; margin-bottom: 3rem; }
          .product-icon.large { font-size: 4rem; }
          .detail-title-area h1 { font-size: 3rem; margin-bottom: 0.5rem; }
          .detail-price { font-size: 1.5rem; color: var(--accent); font-weight: 800; }
          .long-desc { font-size: 1.2rem; line-height: 1.6; margin-bottom: 2.5rem; color: var(--text-secondary); }
          .features-section { margin-bottom: 3rem; }
          .features-section h3 { margin-bottom: 1.5rem; color: var(--accent); }
          .features-section ul { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
          .features-section li::before { content: '✓'; margin-inline-end: 10px; color: var(--accent); font-weight: 900; }
          .back-btn { background: none; border: none; color: var(--text-secondary); cursor: pointer; font-family: 'Tajawal'; font-size: 1.1rem; margin-bottom: 1rem; }

          /* Global Styles */
          .hero { padding: 6rem 0; text-align: center; }
          .hero h1 { font-size: 4.5rem; margin-bottom: 1.5rem; background: linear-gradient(45deg, var(--text-primary), var(--accent)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
          .section-title { 
            font-size: 2.2rem; 
            margin-bottom: 3rem; 
            color: var(--text-primary); 
            display: flex;
            align-items: center;
            gap: 1.5rem;
            white-space: nowrap;
          }
          .section-title::after {
            content: "";
            flex: 1;
            height: 1px;
            background: linear-gradient(90deg, var(--accent) 0%, transparent 100%);
            opacity: 0.5;
          }
          /* Contact Bar */
          .centered-page { display: flex; align-items: center; justify-content: center; min-height: 50vh; }
          .contact-section-wrapper { text-align: center; }
          .contact-header-text { margin-bottom: 3rem; }
          .contact-header-text h2 { font-size: 2.8rem; color: var(--accent); margin-bottom: 1rem; }
          .contact-header-text p { font-size: 1.2rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto; }
          .contact-bar { 
            display: flex; 
            gap: 2rem; 
            padding: 1.5rem 3rem; 
            border-radius: 100px; 
            border: 1px solid var(--border-color);
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px);
            margin: 0 auto;
            width: fit-content;
          }
          .contact-icon-btn { 
            width: 60px; 
            height: 60px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            background: var(--bg-secondary); 
            border: 1px solid var(--border-color);
            border-radius: 50%; 
            color: var(--accent); 
            transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            text-decoration: none;
          }
          .contact-icon-btn svg { width: 28px; height: 28px; transition: 0.3s; }
          .contact-icon-btn:hover { 
            background: var(--accent); 
            color: #000; 
            transform: translateY(-10px) scale(1.15); 
            box-shadow: 0 15px 30px var(--accent-glow);
            border-color: transparent;
          }
          .contact-icon-btn:hover svg { transform: rotate(10deg); }

          .product-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); 
            gap: 1.5rem; 
            margin-top: 2rem;
          }
          .product-card { background: var(--card-bg); border: 1px solid var(--border-color); padding: 2rem; border-radius: 20px; transition: 0.4s; }
          .product-card:hover { transform: translateY(-10px); border-color: var(--accent); box-shadow: 0 10px 30px var(--accent-glow); }
          .price { color: var(--accent); font-weight: 800; font-size: 1.2rem; }


          /* Vision & Advice */
          .vision-section { margin-top: 4rem; padding: 4rem; text-align: center; border-radius: 40px; }
          .vision-content h2 { font-size: 2.8rem; margin-bottom: 1.5rem; color: var(--accent); }
          .vision-content p { font-size: 1.25rem; line-height: 1.8; color: var(--text-secondary); max-width: 900px; margin: 0 auto; }

          .advice-grid { margin-top: 6rem; }
          .advice-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 3rem; }
          .advice-card { padding: 2.5rem; border-radius: 24px; text-align: center; transition: 0.4s; border: 1px solid var(--border-color); }
          .advice-card:hover { transform: translateY(-10px); border-color: var(--accent); box-shadow: 0 15px 35px var(--accent-glow); }
          .advice-icon { font-size: 3rem; margin-bottom: 1.5rem; display: block; }
          .advice-card p { font-size: 1.05rem; line-height: 1.6; font-weight: 600; color: var(--text-primary); }

          .philosophy-section { margin-top: 6rem; }
          .philosophy-card { padding: 4rem; border-radius: 40px; }
          .philosophy-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 4rem; align-items: center; }
          .philosophy-info h2 { font-size: 2.5rem; margin-bottom: 1.5rem; color: var(--accent); }
          .philosophy-info p { font-size: 1.15rem; line-height: 1.8; color: var(--text-secondary); }
          .innovation-box { padding: 2.5rem; background: var(--accent-glow); border-radius: 24px; border: 1px solid var(--accent); text-align: center; }
          .innovation-box h3 { font-size: 1.5rem; margin-bottom: 1rem; color: var(--text-primary); }
          .innovation-box p { font-size: 1rem; line-height: 1.6; opacity: 0.9; }

            .hero { padding: 8rem 0; text-align: center; position: relative; }
            .hero-badge { 
              display: inline-block; padding: 0.5rem 1.5rem; background: var(--accent-glow); 
              border: 1px solid var(--accent); color: var(--accent); border-radius: 100px; 
              font-size: 0.85rem; font-weight: 800; margin-bottom: 2rem; letter-spacing: 2px;
            }
            .hero h1 { font-size: 5rem; margin-bottom: 1.5rem; line-height: 1.1; }
            .hero-subtitle { font-size: 1.4rem; color: var(--text-secondary); max-width: 800px; margin: 0 auto 3rem; line-height: 1.6; }

            /* Founder Section */
            .founder-section { margin-top: 4rem; padding: 4rem; border-radius: 40px; overflow: hidden; position: relative; }
            .founder-grid { display: grid; grid-template-columns: 1fr 300px; gap: 4rem; align-items: center; }
            .badge-outline { 
              display: inline-block; padding: 0.4rem 1rem; border: 1px solid var(--border-color); 
              border-radius: 10px; color: var(--accent); font-size: 0.9rem; font-weight: 600; margin-bottom: 1.5rem; 
            }
            /* Global RGB Text Effect */
            h1, h2, h3, h4, h5, h6, 
            .founder-bio, .hero-subtitle, .vision-content p, 
            .philosophy-info p, .advice-card p, .long-desc,
            .contact-header-text p {
              background: linear-gradient(90deg, #22c55e, #eab308, #22c55e);
              background-size: 200% auto;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              animation: shine 4s linear infinite;
              display: inline-block; /* Required for some clip effects */
              width: 100%;
            }

            @keyframes shine {
              to { background-position: 200% center; }
            }

            .founder-bio { font-size: 1.25rem; line-height: 1.8; margin-bottom: 2.5rem; font-weight: 600; }
            .hero-subtitle { font-size: 1.4rem; max-width: 800px; margin: 0 auto 3rem; line-height: 1.6; }
            .founder-stats { display: flex; gap: 1.5rem; }
            .founder-visual { display: flex; justify-content: center; align-items: center; }
            .ai-brain-icon { width: 200px; height: 200px; color: var(--accent); filter: drop-shadow(0 0 30px var(--accent-glow)); animation: pulse 4s infinite; }
            @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.1); opacity: 1; } }

            /* Mobile Responsive Updates */
            @media (max-width: 768px) {
              .hero { padding: 4rem 1rem; }
              .hero h1 { font-size: 2.8rem; }
              .hero-subtitle { font-size: 1.1rem; }
              .founder-section { padding: 2rem 1.5rem; border-radius: 20px; }
              .founder-grid { grid-template-columns: 1fr; text-align: center; gap: 2rem; }
              .founder-stats { justify-content: center; flex-wrap: wrap; gap: 0.8rem; }
              .founder-info h2 { font-size: 2.2rem; }
              .founder-bio { font-size: 1.1rem; }
              .ai-brain-icon { width: 120px; height: 120px; }
              .section-title { font-size: 1.8rem; }
              .product-grid { grid-template-columns: 1fr; gap: 1rem; }
              .page-content { padding: 2rem 1rem; }
              .magical-nav { width: calc(100% - 2rem); top: 1rem; padding: 0.5rem 1rem; }
              .nav-links { display: none; } /* Already handled, but being explicit */
              .nav-controls { gap: 0.8rem; }
              .logo-digit { font-size: 1.8rem; }
            }
            @media (max-width: 480px) {
              .hero h1 { font-size: 2.2rem; }
              .founder-info h2 { font-size: 1.8rem; }
              .stat-item { width: 100%; }
            }
        ` }} />
      </div>
    </Router>
  );
}

export default App;
