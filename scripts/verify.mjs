/* global document, innerWidth, scrollTo */
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('qa',{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
for(const width of [1440,1024,768,390,360]){
 await page.setViewportSize({width,height:900});
 for(const route of ['/','/privacy','/terms']){
 await page.goto(`http://127.0.0.1:5173${route}`);await page.waitForTimeout(900);
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 if(overflow)throw new Error(`Overflow at ${width} ${route}`);
 if(await page.locator('h1').count()!==1)throw new Error('Heading hierarchy');
 if(route==='/'){
 for(const img of await page.locator('.product-screenshot img').all()){
  await img.scrollIntoViewIfNeeded();
  await img.evaluate(async el=>{await el.decode();if(!el.naturalWidth)throw new Error('Screenshot did not load');});
 }
 await page.evaluate(()=>scrollTo(0,0));
 await page.screenshot({path:`qa/home-${width}.png`,fullPage:true});
 await page.screenshot({path:`qa/viewport-${width}.png`});
 {for(const selector of ['.hero','#features','.garage-layout','#parking-lot','.final-statement']){
  await page.locator(selector).screenshot({style:'.header,.skip{visibility:hidden!important}',path:`qa/${selector.replace(/[.#]/g,'')}-${width}.png`});
 }}
 console.log('Product screenshots loaded: '+width+'px');
}
 if(width===390&&route!=='/')await page.screenshot({path:`qa/${route.slice(1)}-390.png`,fullPage:true});
 console.log(`${width}px ${route}: no overflow, one h1`);
 }
}
await page.setViewportSize({width:390,height:844});await page.goto('http://127.0.0.1:5173/');
await page.getByRole('button',{name:'Menu'}).click();await page.getByRole('navigation',{name:'Main navigation'}).getByRole('link',{name:'Garage',exact:true}).click();
if(await page.getByRole('button',{name:'Menu'}).getAttribute('aria-expanded')!=='false')throw new Error('Menu did not close');
await page.getByRole('button',{name:'Menu'}).click();await page.keyboard.press('Escape');
if(await page.getByRole('button',{name:'Menu'}).getAttribute('aria-expanded')!=='false')throw new Error('Escape failed');
await page.emulateMedia({reducedMotion:'reduce'});await page.goto('http://127.0.0.1:5173/');
console.log('Mobile navigation, Escape, reduced motion render: passed');
if(errors.length)throw new Error(errors.join('\n'));
console.log('No browser runtime errors');await browser.close();


