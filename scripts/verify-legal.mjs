/* global document, innerWidth */
import { readFile, realpath } from 'node:fs/promises';
import ts from 'typescript';
import { chromium } from '@playwright/test';
const load = async path => {
 const source=await readFile(path,'utf8');
 const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
 return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
};
const canonicalPath=process.argv[2];
if(!canonicalPath)throw Error('An external canonical legal.ts path is required. Usage: node scripts/verify-legal.mjs D:/BuildSpec/apps/mobile/lib/legal.ts');
if(await realpath(canonicalPath)===await realpath('src/content/legal.ts'))throw Error('Canonical source must be external, not the website copy');
const canonicalSource=await readFile(canonicalPath,'utf8');
const websiteSource=await readFile('src/content/legal.ts','utf8');
// Only normalize platform line endings; no trimming, filtering or selected exports.
if(canonicalSource.replaceAll('\r\n','\n')!==websiteSource.replaceAll('\r\n','\n'))throw Error('Full canonical source mismatch: website must mirror the entire mobile legal.ts');
const canonical=await load(canonicalPath);
const legal=await load('src/content/legal.ts');
if(JSON.stringify(Object.keys(legal))!==JSON.stringify(Object.keys(canonical)))throw Error('Canonical export names differ');
for(const key of Object.keys(canonical)){
 if(JSON.stringify(legal[key])!==JSON.stringify(canonical[key]))throw Error(`Canonical mismatch: ${key}`);
}
console.log('Full external canonical source and every export match, including Community Guidelines');
const browser=await chromium.launch({channel:'msedge',headless:true});
for(const javaScriptEnabled of [true,false]){
 const context=await browser.newContext({javaScriptEnabled});const page=await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [1440,390,360]){
  await page.setViewportSize({width,height:900});
  for(const route of ['privacy','terms']){
   const sections=route==='privacy'?canonical.PRIVACY_SECTIONS:canonical.TERMS_SECTIONS;
   const title=route==='privacy'?'Privacy Policy':'Terms of Use';
   // GitHub Pages resolves directory routes with a trailing-slash redirect; Vite preview needs it explicitly without JS.
   await page.goto(`http://127.0.0.1:4173/${route}${javaScriptEnabled ? '' : '/'}`);
   const actual=await page.locator('.legal section').evaluateAll(nodes=>nodes.map(n=>({heading:n.querySelector('h2').textContent,paragraphs:[...n.querySelectorAll('p')].map(p=>p.textContent)})));
   if(JSON.stringify(actual)!==JSON.stringify(sections))throw Error(`Rendered wording mismatch ${route}`);
   if(await page.title()!==`${title} | BuildSpec`)throw Error('Wrong title');
   if(await page.locator('link[rel="canonical"]').getAttribute('href')!==`https://buildspec.eu/${route}`)throw Error('Wrong canonical');
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
   if(overflow)throw Error('Legal overflow');
   if(javaScriptEnabled){await page.screenshot({path:`qa/legal-${route}-${width}.png`,fullPage:true});}
   console.log(`${route} ${width}px JS=${javaScriptEnabled}: complete exact text, metadata and no overflow`);
  }
 }
 if(javaScriptEnabled){
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('footer').getByRole('link',{name:'Privacy',exact:true}).click();
  await page.getByRole('heading',{name:'Privacy Policy',exact:true}).waitFor();
  await page.locator('footer').getByRole('link',{name:'Terms',exact:true}).click();
  await page.getByRole('heading',{name:'Terms of Use',exact:true}).waitFor();
  console.log('Footer legal navigation passed');
 }
 if(errors.length)throw Error(errors.join('\n'));await context.close();
}
await browser.close();
