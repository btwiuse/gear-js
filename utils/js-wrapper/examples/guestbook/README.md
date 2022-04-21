# Guestbook wrapper example

1. Build program and wrapper

```sh
make build
make wasm-proc
```

2. Generate js package using wasm-bindgen

```sh
# For web
make bindgen-web

# For nodejs
make bindgen-node
```

3. Generate wrapper

```sh
# For web
make wrap-web

# For nodejs
make wrap-node
```