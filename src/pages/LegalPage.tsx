import { useEffect } from 'react';
import { LEGAL_LAST_UPDATED, PRIVACY_POLICY_VERSION, TERMS_VERSION, PRIVACY_SECTIONS, TERMS_SECTIONS } from '../content/legal';

export function LegalPage({kind}:{kind:string}) {
  const privacy = kind === 'privacy';
  const title = privacy ? 'Privacy Policy' : 'Terms of Use';
  const version = privacy ? PRIVACY_POLICY_VERSION : TERMS_VERSION;
  const sections = privacy ? PRIVACY_SECTIONS : TERMS_SECTIONS;
  useEffect(() => {
    document.title = `${title} | BuildSpec`;
    const description = `BuildSpec ${title}. Version ${version}. Last updated ${LEGAL_LAST_UPDATED}.`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://buildspec.eu/${kind}`);
    for (const prefix of ['og', 'twitter']) {
      const attribute = prefix === 'og' ? 'property' : 'name';
      document.querySelector(`meta[${attribute}="${prefix}:title"]`)?.setAttribute('content', `${title} | BuildSpec`);
      document.querySelector(`meta[${attribute}="${prefix}:description"]`)?.setAttribute('content', description);
    }
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', `https://buildspec.eu/${kind}`);
  }, [kind, title, version]);
  return <article className="legal wrap">
    <a className="back-link" href="/">← Back to BuildSpec</a>
    <h1>{title}</h1>
    <div className="legal-meta"><p>Last updated {LEGAL_LAST_UPDATED}</p><p>Version {version}</p></div>
    {sections.map(section => <section key={section.heading}>
      <h2>{section.heading}</h2>
      {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    </section>)}
  </article>;
}
