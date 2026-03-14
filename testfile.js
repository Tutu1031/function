var headers = $request.headers;

headers["shadowrocket-test"] = "hello";

$done({headers});
