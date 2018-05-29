install:
	npm install

run:
	npx parcel ./src/index.html

build:
	npx parcel build ./src/index.html --public-url ./ --no-minify --no-cache --detailed-report

clean:
	rm -rf dist .cache node_modules
