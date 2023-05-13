FROM mambaorg/micromamba:latest

ENV DEBIAN_FRONTEND noninteractive

COPY --chown=$MAMBA_USER:$MAMBA_USER env.yaml /tmp/env.yaml

RUN micromamba install -y -n base -f /tmp/env.yaml \
    && micromamba clean -a -y

ARG MAMBA_DOCKERFILE_ACTIVATE=1

WORKDIR /app

COPY --chown=$MAMBA_USER:$MAMBA_USER libs libs/
COPY --chown=$MAMBA_USER:$MAMBA_USER pages pages/
COPY --chown=$MAMBA_USER:$MAMBA_USER favicon.ico .
COPY --chown=$MAMBA_USER:$MAMBA_USER index.html .
COPY --chown=$MAMBA_USER:$MAMBA_USER index.js .

ENTRYPOINT ["/usr/local/bin/_entrypoint.sh", "python", "-m", "http.server", "80"]