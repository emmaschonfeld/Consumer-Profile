const status=document.getElementById('status');
document.getElementById('approve').onclick=async()=>{try{const granted=await chrome.permissions.request({permissions:['history']});status.textContent=granted?'Approved. Return to Orbit and select Analyze history.':'Permission declined. No history accessed.'}catch(e){status.textContent=e.message}};
document.getElementById('revoke').onclick=async()=>{await chrome.permissions.remove({permissions:['history']});status.textContent='History permission revoked. Delete previously imported records in the dashboard.'};
