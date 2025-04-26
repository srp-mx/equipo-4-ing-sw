FROM golang:1.24.0-bullseye AS runner

RUN mkdir -p /usr/bin/app /usr/src/app

WORKDIR /usr/src/app

COPY go.mod go.sum ./
COPY .air.toml ./


RUN --mount=type=cache,target=/go/pkg/mod/ \
    --mount=type=bind,source=go.sum,target=go.sum \
    --mount=type=bind,source=go.mod,target=go.mod \
    go mod download -x

RUN go install github.com/air-verse/air@latest

COPY . .

EXPOSE 3000

ENTRYPOINT ["air"]
