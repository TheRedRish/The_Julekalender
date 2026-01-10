SHELL := /usr/bin/env bash

.PHONY: client-dev server-start server-opendb

client-dev:
	cd client && npm run dev

server-start:
	cd server && npm run start

server-opendb:
	cd server && sqlite3 src/data/theJulekalender.db