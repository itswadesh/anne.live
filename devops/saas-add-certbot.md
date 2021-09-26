## Add Subdomain / wildcard SSL

`sudo certbot --server https://acme-v02.api.letsencrypt.org/directory -d *.misiki.in --manual --preferred-challenges dns-01 certonly`
