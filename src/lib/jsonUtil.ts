export function encodeJson(json: object) {
  // Encode to UInt8Array
  const u8Arr = new TextEncoder().encode(JSON.stringify(json));
  // convert to ascii
  const asciiStr = Array.from(u8Arr, (x) => String.fromCodePoint(x)).join('');
  // convert str to base64
  return btoa(asciiStr);
}

export function decodeJsonStr(base64Str: string) {
  // base64 to asciiStr
  const asciiStr = atob(base64Str);
  // asciiStr to UInt8Array
  const u8Arr = Uint8Array.from(asciiStr, (x) => x.codePointAt(0)!);
  
  const jsonStr = new TextDecoder().decode(u8Arr);

  return JSON.parse(jsonStr);
}