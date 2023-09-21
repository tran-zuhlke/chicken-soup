FROM node:18.16.0 AS build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
USER node
WORKDIR /usr/src/app
COPY --chown=node:node . /usr/src/app/

ARG APPLICATION_VERSION
ARG BASE_PATH_PREFIX

# Specifying the base path prefix for all app routes to be routed correctly to
# the central nginx proxy that is used in all deployed environments
RUN cd frontend && \
    npm ci  && \
    VITE_APPLICATION_VERSION=${APPLICATION_VERSION} \
    VITE_BASE_PATH_PREFIX=${BASE_PATH_PREFIX} \
    npm run build

RUN cd backend && \
    npm ci  && \
    npm run build


FROM node:18.16.0-bullseye-slim
ENV NODE_ENV production
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/backend/node_modules /usr/src/app/backend/node_modules
COPY --chown=node:node --from=build /usr/src/app/backend/dist /usr/src/app/backend/dist
COPY --chown=node:node --from=build /usr/src/app/frontend/dist /usr/src/app/frontend/dist

EXPOSE 3000
CMD ["dumb-init", "node", "backend/dist/src/main"]
