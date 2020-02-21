FROM jhipster/jhipster:latest

USER root

RUN apt-get update && \
    apt-get install maven -y

USER jhipster