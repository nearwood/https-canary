# HTTPS Canary

Wondering if your ISP is jumping in on your TLS connections?

This loads the certificate fingerprint of the site you are visiting,
and can then verify that against the fingerprint obtained via a trusted 3rd party.

Currently uses (read: scrapes) GRC.com's [fingerprinting page](https://www.grc.com/fingerprints.htm).

Not to be confused with: https://tlscanary.mozilla.org/

## TODO

- [x] When cname matches tab URL use that sha1
- [x] Click verify to request from GRC
- [x] Show green thing if good, red thing if bad
- [ ] It's not pretty
- [ ] The code is not pretty
