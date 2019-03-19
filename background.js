function tlsCallback(details) {
  browser.webRequest.getSecurityInfo(details.requestId, {}).then(results => {
    var certs = results.certificates;
    if (certs) {
      window.certInfo = [];
      certs.forEach(cert => {
        console.log(cert.subject, cert.fingerprint.sha1);
        window.certInfo.push({CN: parseCommonName(cert.subject), SHA1: cert.fingerprint.sha1});
      });
    }
  });
}

function parseCommonName(subject) {
  const CN = 'CN=';
  const sep = ',';

  const startIndex = subject.indexOf(CN) + CN.length;
  const endIndex = subject.indexOf(sep, startIndex);
  
  return subject.substring(startIndex, endIndex);
}
//CN=www.example.org,OU=Technology,O=Internet Corporation for Assigned Names and Numbers,L=Los Angeles,ST=California,C=US

browser.webRequest.onHeadersReceived.addListener(tlsCallback, {urls: ["https://*/"]}, ["blocking"]);
