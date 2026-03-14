

let obj = {};

if(typeof $response == "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  obj.headers = $request.headers;
}else {
  let body = JSON.parse(typeof $response != "undefined" && $response.body || null);
  if(body && body.subscriber) {
    let date = {"expires_date": "2999-01-01T00:00:00Z","original_purchase_date":"2021-01-01T00:00:00Z","purchase_date": "2021-01-01T00:00:00Z","ownership_type": "PURCHASED","store": "app_store"};
    let subscriber = body.subscriber;
    const newObj = Object.fromEntries(Object.entries($request.headers).map(([k, v]) => [k.toLowerCase(), v]));
    let bundle_id = newObj["x-client-bundle-id"]?newObj["x-client-bundle-id"]:newObj["user-agent"].match(/^[%a-zA-Z0-9]+/)[0];
    const list = [
      {"app_name":"G%20E%20I%20S%20T","bundle_id":"com.memorado.app","product_id":"com.memorado.subscription.yearly.v1","entitlements":["memorado_premium"],"version":"7.7.0"}
   ];  
   for(let data of list){
     if(bundle_id == data.bundle_id || bundle_id == data.app_name){
       let product_id = data.product_id;
       let entitlements = data.entitlements;
       subscriber.subscriptions[(product_id)] = date;
       for (let entitlement of entitlements) {
         subscriber.entitlements[(entitlement)] = date;        
         subscriber.entitlements[(entitlement)].product_identifier = product_id; 
       }
       break; 
     }   
   }
   obj.body = JSON.stringify(body);
  }
}

$done(obj);
