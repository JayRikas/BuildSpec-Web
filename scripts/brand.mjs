import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
await mkdir('public/brand', {recursive:true});
await sharp('brand-assets/BuildSpec new.png').trim().resize({width:640}).webp({quality:90}).toFile('public/brand/buildspec-logo.webp');
await sharp('brand-assets/BuildSpec icon.png').trim().resize({width:180,height:180,fit:'contain',background:'#101216'}).png().toFile('public/brand/apple-touch-icon.png');
await sharp('brand-assets/BuildSpec icon.png').trim().resize({width:48,height:48,fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).png().toFile('public/brand/favicon.png');
