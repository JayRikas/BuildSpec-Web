/* global document, innerWidth */
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import { chromium } from '@playwright/test';
const load = async path => {
 const source=await readFile(path,'utf8');
 const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText;
 return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
};
const legal=await load('src/content/legal.ts');
if(process.argv[2]){
 const canonical=await load(process.argv[2]);
 for(const key of ['LEGAL_LAST_UPDATED','PRIVACY_POLICY_VERSION','TERMS_VERSION','LEGAL_CONTACT','PRIVACY_SECTIONS','TERMS_SECTIONS']){
  if(JSON.stringify(legal[key])!==JSON.stringify(canonical[key]))throw Error(`Canonical mismatch: ${key}`);
 }
 console.log('Canonical source comparison: exact match for all headings, paragraphs, versions, date and contact');
}
const browser=await chromium.launch({channel:'msedge',headless:true});
for(const javaScriptEnabled of [true,false]){
 const context=await browser.newContext({javaScriptEnabled});const page=await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [1440,390,360]){
  await page.setViewportSize({width,height:900});
  for(const route of ['privacy','terms']){
   const sections=route==='privacy'?legal.PRIVACY_SECTIONS:legal.TERMS_SECTIONS;
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


