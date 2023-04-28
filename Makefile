build-wasm:
	( cd wasm/ && GOOS=js GOARCH=wasm go build -o ../src/assets/devfile.wasm )

deploy:
	ng deploy --base-href="/devfile-lifecycle/"
