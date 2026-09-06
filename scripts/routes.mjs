import { readFile, writeFile, mkdir } from 'node:fs/promises';
const html=await readFile('dist/index.html','utf8');
for(const route of ['privacy','terms']){
 await mkdir(`dist/${route}`,{recursive:true});
 const title=route==='privacy'?'Privacy':'Terms';
 await writeFile(`dist/${route}/index.html`,html.replaceAll('BuildSpec — Project Car Garage',`${title} — BuildSpec`).replaceAll('https://buildspec.eu/"',`https://buildspec.eu/${route}"`).replaceAll("BuildSpec keeps your project car's modifications, maintenance, expenses, factory specification, photos and build history in one place.",`${title} documentation for BuildSpec is being prepared for public release.`));
}
