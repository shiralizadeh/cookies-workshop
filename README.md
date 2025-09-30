# Cookies Workshop

## Setup

- Generate Local SSL Certificates

```shell
openssl req -x509 -sha256 -nodes -newkey rsa:2048 -days 365 -keyout localhost.key -out localhost.crt
```

- Setup loopback interface to response to `127.0.0.2`

```shell
sudo ifconfig lo0 alias 127.0.0.2 up
```

- Map IPs to domains in `/etc/hosts` file

```shell
127.0.0.1    victim.local
127.0.0.2    attacker.local
```

## Start

```shell
cd victim-app
npm start
```

```shell
cd attacker-app
npm start
```
