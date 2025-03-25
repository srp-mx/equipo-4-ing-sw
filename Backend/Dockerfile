FROM golang:1.24.0-bullseye AS builder
RUN mkdir -p /usr/bin/app
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY go.mod .
COPY go.sum .
RUN --mount=type=cache,target=/go/pkg/mod/ \
    --mount=type=bind,source=go.sum,target=go.sum \
    --mount=type=bind,source=go.mod,target=go.mod \
    go mod download -x
COPY . .
ENV GOCACHE=/root/.cache/go-build
RUN --mount=type=cache,target=/go/pkg/mod/ \
    --mount=type=cache,target="/root/.cache/go-build" \
    --mount=type=bind,target=. \
    go build -o /usr/bin/app/app

FROM ubuntu:22.04 AS runner
RUN mkdir /app
WORKDIR /app
COPY --from=builder /usr/bin/app/app .
ENTRYPOINT ["./app"]
