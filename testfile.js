var obj = JSON.parse($response.body);

obj.shadowrocket = "working";

$done({body: JSON.stringify(obj)});
