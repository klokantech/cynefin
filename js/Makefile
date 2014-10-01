# plovr from https://registry.npmjs.org/plovr/-/plovr-1.0.1.tgz
PLOVR = ./plovr-1.0.1.jar

.PHONY: build

all: serve

serve:
	java -jar $(PLOVR) serve -p 9810 tithe-maps-debug.json
build:
	java -jar $(PLOVR) build tithe-maps.json > deploy/tithe-maps.js
lint:
	fixjsstyle --strict -r ./src
	gjslint --strict -r ./src
soyweb:
	java -jar $(PLOVR) soyweb --dir .
