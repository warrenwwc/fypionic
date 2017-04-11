function GenRSAKeyPair() {
  return window.crypto.subtle.generateKey(
      {
          name: "RSASSA-PKCS1-v1_5",
          modulusLength: 2048, //can be 1024, 2048, or 4096
          publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
          hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
      },
      true, //whether the key is extractable (i.e. can be used in exportKey)
      ["sign", "verify"] //can be any combination of "sign" and "verify"
  );
}

function getPublicKey(key) {
  return window.crypto.subtle.exportKey(
      "spki", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
      key.publicKey //can be a publicKey or privateKey, as long as extractable was true
  );
}

function getPrivateKey(key) {
  return window.crypto.subtle.exportKey(
      "pkcs8", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
      key.privateKey //can be a publicKey or privateKey, as long as extractable was true
  )
}

function signData(privateKey, data) {
  return window.crypto.subtle.sign(
      {
          name: "RSASSA-PKCS1-v1_5",
      },
      privateKey, //from generateKey or importKey above
      data //ArrayBuffer of data you want to sign
  )
}

function verifyData(publicKey, signature, data) {
  return window.crypto.subtle.verify(
      {
          name: "RSASSA-PKCS1-v1_5",
      },
      publicKey, //from generateKey or importKey above
      signature, //ArrayBuffer of the signature
      data //ArrayBuffer of the data
  )
}

function exportKey(key) {
  return window.crypto.subtle.exportKey(
      "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
      key //can be a publicKey or privateKey, as long as extractable was true
  )
}

function importKey(jwk, type) {
  return window.crypto.subtle.importKey(
      "jwk", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
      jwk,
      {   //these are the algorithm options
          name: "RSASSA-PKCS1-v1_5",
          hash: {name: "SHA-256"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
      },
      false, //whether the key is extractable (i.e. can be used in exportKey)
      [type] //"verify" for public key import, "sign" for private key imports
  )
}


function str2ab(str)
{
  var bytes = new Uint8Array(str.length);
  for (var iii = 0; iii < str.length; iii++)
  {
    bytes[iii] = str.charCodeAt(iii);
  }

  return bytes;
}

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function buf2hex(buffer) { // buffer is an ArrayBuffer
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

function spkiToPEM(keydata){
    var keydataS = arrayBufferToString(keydata);
    var keydataB64 = window.btoa(keydataS);
    //var keydataB64Pem = formatAsPem(keydataB64);
    return keydataB64;
}

function arrayBufferToString( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return binary;
}

function formatAsPem(str) {
    var finalString = '-----BEGIN PUBLIC KEY-----\n';

    while(str.length > 0) {
        finalString += str.substring(0, 64) + '\n';
        str = str.substring(64);
    }

    finalString = finalString + "-----END PUBLIC KEY-----";

    return finalString;
}

const sortByKeys = object => {
  const keys = Object.keys(object)
  const sortedKeys = _.sortBy(keys)

  return _.fromPairs(
    _.map(sortedKeys, key => [key, object[key]])
)
};
