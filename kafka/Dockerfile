#FROM debian:stretch-slim
FROM openjdk:jre

RUN \
  apt-get update; \
  apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
  ; \
  rm -rf /var/lib/apt/lists/*; \
  rm -rf /src/*.deb

ENV KAFKA_LOCATION "eu"
ENV KAFKA_VERSION 2.0.0
ENV KAFKA_SHA1 9d2592305119f96758f153167cf979fcaf9f391a

RUN curl -o kafka.tar.gz -fSL "https://www-${KAFKA_LOCATION}.apache.org/dist/kafka/${KAFKA_VERSION}/kafka_2.11-${KAFKA_VERSION}.tgz" \
  && echo "$KAFKA_SHA1 *kafka.tar.gz" | sha1sum -c - \
  && mkdir -p /usr/local/kafka/ \
  && tar -xzf "kafka.tar.gz" -C /usr/local/kafka/ --strip-components=1 \
  && rm "kafka.tar.gz"

WORKDIR "/usr/local/kafka"
CMD ["/usr/local/kafka/bin/kafka-server-start.sh", "config/server.properties"]
