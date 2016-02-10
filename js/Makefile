PLOVR_VERSION=4.1.1
PLOVR=plovr.jar

.PHONY: all plovr build serve

all: serve

plovr: $(PLOVR)
$(PLOVR):
	rm -f plovr.jar
	wget --no-check-certificate https://github.com/bolinfest/plovr/releases/download/v$(PLOVR_VERSION)/plovr.jar
serve:
	java -jar $(PLOVR) serve -p 9810 tithe-maps-debug.json inittool.json home.json
build:
	java -jar $(PLOVR) build tithe-maps.json > deploy/tithe-maps.js
	java -jar $(PLOVR) build inittool.json > deploy/inittool.js
	java -jar $(PLOVR) build home.json > deploy/home.js
lint:
	fixjsstyle --strict -r ./src
	gjslint --strict -r ./src
soyweb:
	java -jar $(PLOVR) soyweb --dir .
