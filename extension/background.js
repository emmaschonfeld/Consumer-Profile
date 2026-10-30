export const allowed = (url) => {try {const u=new URL(url);return ((u.origin==='https://emmaschonfeld.github.io')||(u.origin==='http://localhost:5173')||(u.origin==='http://127.0.0.1:5173'))&&u.pathname.startsWith('/Consumer-Profile/')}catch{return false}};
export async function handle(message,sender,api){
 if(!allowed(sender.url))throw Error('Unauthorized dashboard origin or path.');
 if(message.type==='STATUS')return {granted:await api.permissions.contains({permissions:['history']})};
 if(message.type==='DISCONNECT'){await api.permissions.remove({permissions:['history']});return {revoked:true}}
 if(message.type!=='HISTORY')throw Error('Unsupported operation.');
 if(![7,30,90].includes(message.days))throw Error('Choose 7, 30, or 90 days.');
 if(!await api.permissions.contains({permissions:['history']}))throw Error('Open the Orbit toolbar popup to approve history permission first.');
 const endTime=Date.now(),startTime=endTime-message.days*86400000;
 const items=await api.history.search({text:'',startTime,endTime,maxResults:5000});
 const records=[];
 // Query visit events because HistoryItem.visitCount is lifetime and lastVisitTime is not a timeline.
 for(let i=0;i<items.length;i+=20){await Promise.all(items.slice(i,i+20).map(async item=>{let u;try{u=new URL(item.url);if(!['https:','http:'].includes(u.protocol))return;u.search='';u.hash='';u.username='';u.password=''}catch{return}const visits=await api.history.getVisits({url:item.url});for(const v of visits){if(v.visitTime>=startTime&&v.visitTime<=endTime)records.push({url:u.href,title:item.title||u.hostname,time:v.visitTime})}}))}
 return {records,truncated:items.length===5000,startTime,endTime};
}
if(globalThis.chrome?.runtime?.onMessageExternal)chrome.runtime.onMessageExternal.addListener((message,sender,sendResponse)=>{handle(message,sender,chrome).then(sendResponse).catch(e=>sendResponse({error:e.message}));return true});
