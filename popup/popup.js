 
document.getElementById('verify').addEventListener('click', () => {
  fetch("https://www.grc.com/fingerprints.htm?domain=example.com", {credentials: 'omit'})
    .then(response => response.text())
    .then(text => {
      var parser = new DOMParser();
      var doc = parser.parseFromString(text, "text/html");
      var hash = doc.querySelector('table.chart tr:nth-child(2) td:nth-child(4)');
      document.getElementById('verifiedHash').textContent = hash.textContent;
      checkHashes();
    });
});

function checkHashes() {
  const h1 = document.getElementById('verifiedHash').textContent.trim();
  const h2 = document.getElementById('certHash').textContent.trim();
  if (h1 === h2) { //TODO case-insensitive comparison (or better yet: non-string comparison)
    console.log("MATCH");
    document.getElementById('result').textContent = "✔️";
  } else {
    console.warn("NO MATCH");
    document.getElementById('result').textContent = "❌";
  }
}

browser.runtime.getBackgroundPage().then(bgPage => {
  bgPage.certInfo.forEach(cert => {
    console.log(cert);
    browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
      const tab = tabs[0];
      console.log("includes:", tab.url, cert.CN);
      if (tab.url.includes(cert.CN)) {
        console.log("yes it includes");
        document.getElementById('certHash').textContent = cert.SHA1;
      }
    });
  });
});
