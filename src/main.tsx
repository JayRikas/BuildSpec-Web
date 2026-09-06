import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Header, Footer } from './components/Layout';
import { Landing } from './sections/Landing';
import { LegalPage } from './pages/LegalPage';
import './styles/site.css';
const path=window.location.pathname.replace(/\/$/,'') || '/';
createRoot(document.getElementById('root')!).render(<StrictMode><Header/><main id="main">{path==='/'?<Landing/>:path==='/privacy'||path==='/terms'?<LegalPage kind={path.slice(1)}/>:<section className="legal wrap"><p className="eyebrow">404</p><h1>This page isn't in the garage.</h1><a className="button" href="/">Back to BuildSpec</a></section>}</main><Footer/></StrictMode>);
