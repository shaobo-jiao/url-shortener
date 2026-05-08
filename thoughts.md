URL Shortner

Endpoints:
- POST /api/short-urls/: creates a short url for given orig url
- GET /{code}: loads and redirects to orig url 

Entity: ShortUrl { Id, OriginalUrl, Code, ExpiresAt }

create short url
- input: orig url, expiry date
- flow: create and save obj to auto populate ID => get base62 code => save 

access via short url
- input: short url with code
- flow: load from db, if exists and hasn't expire, redirect


--- 
next phase:
- stats: click count (another table, e.g. Click obj);
- put stats in background service: GET => find orig url => redirect => meanwhile, ask bg service to save click stats (ClickEvent => Click obj)


future:
- validation?
- caching, rate limiting
