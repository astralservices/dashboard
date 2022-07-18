FROM node:16 AS build

WORKDIR /build

COPY . /build
ADD ./src /build

RUN yarn install

RUN yarn build

FROM denoland/deno:alpine

WORKDIR /app

COPY --from=build /build/dist/* /app/
COPY --from=build /build/server.deno.js /app/
COPY --from=build /build/package.json /app/

RUN ls /app

RUN deno run --allow-net --allow-read --allow-write --allow-env --allow-run /app/server.deno.js