SHELL := /usr/bin/env bash

.PHONY: client-dev server-start

client-dev:
	cd client && npm run dev

server-start:
	cd server && npm run start
