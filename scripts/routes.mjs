import { readFile, writeFile, mkdir } from 'node:fs/promises';
import ts from 'typescript';
const source = await readFile('src/content/legal.ts', 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const legal = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const html = await readFile('dist/index.html', 'utf8');
const escape = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
for (const route of ['privacy', 'terms']) {
  const privacy = route === 'privacy';
  const title = privacy ? 'Privacy Policy' : 'Terms of Use';
  const version = privacy ? legal.PRIVACY_POLICY_VERSION : legal.TERMS_VERSION;
  const sections = privacy ? legal.PRIVACY_SECTIONS : legal.TERMS_SECTIONS;
  const description = `BuildSpec ${title}. Version ${version}. Last updated ${legal.LEGAL_LAST_UPDATED}.`;
  // Include the exact policy in initial HTML for direct requests and indexing without JavaScript.
  const document = `<main id="main"><article class="legal wrap"><a class="back-link" href="/">← Back to BuildSpec</a><h1>${title}</h1><div class="legal-meta"><p>Last updated ${legal.LEGAL_LAST_UPDATED}</p><p>Version ${version}</p></div>${sections.map(section => `<section><h2>${escape(section.heading)}</h2>${section.paragraphs.map(p => `<p>${escape(p)}</p>`).join('')}</section>`).join('')}</article></main>`;
  const page = html.replaceAll('BuildSpec — Project Car Garage', `${title} | BuildSpec`)
    .replaceAll('https://buildspec.eu/"', `https://buildspec.eu/${route}"`)
    .replaceAll("BuildSpec keeps your project car's modifications, maintenance, expenses, factory specification, photos and build history in one place.", description)
    .replace('<div id="root"></div>', `<div id="root">${document}</div>`);
  await mkdir(`dist/${route}`, { recursive: true });
  await writeFile(`dist/${route}/index.html`, page);
}
