type ScreenshotName = '01-garage' | '02-car-overview' | '03-factory-spec' | '04-timeline' | '06-parking-lot';
const screens: Record<ScreenshotName, { width: number; height: number; alt: string }> = {
 '01-garage': {width:1036,height:2047,alt:'BuildSpec My Garage showing Nissan Silvia and BMW M4 vehicle cards with modifications and service records.'},
 '02-car-overview': {width:1030,height:2046,alt:'BMW M4 overview in BuildSpec, with build progress, modification and service actions, and recent activity.'},
 '03-factory-spec': {width:1038,height:2049,alt:'BuildSpec Factory Spec for a 2016 BMW M4, showing identity, engine and drivetrain records.'},
 '04-timeline': {width:1024,height:2047,alt:'BuildSpec Build Journal with dated service and modification entries for a project car.'},
 '06-parking-lot': {width:1028,height:2046,alt:'BuildSpec Parking Lot feed showing a Subaru Impreza public build and the Clean reaction.'},
};
export function ProductScreenshot({name,caption,priority=false,secondary=false}:{name:ScreenshotName;caption:string;priority?:boolean;secondary?:boolean}){
 const screen=screens[name];
 return <figure className={`product-screenshot${secondary?' secondary':''}`}><div className="screenshot-frame"><img src={`/screenshots/${name}-800.webp`} srcSet={`/screenshots/${name}-400.webp 400w, /screenshots/${name}-800.webp 800w`} sizes="(max-width: 600px) calc(100vw - 56px), 340px" width={screen.width} height={screen.height} alt={screen.alt} loading={priority?'eager':'lazy'} fetchPriority={priority?'high':'auto'} decoding="async"/></div><figcaption>{caption}</figcaption></figure>;
}
