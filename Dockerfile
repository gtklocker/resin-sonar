FROM resin/rpi-raspbian:jessie

RUN apt-get update \
    # dependencies for wiringpi
	&& apt-get install -y git-core gcc make \
    # dependencies for rpi-sonar
    && apt-get install -y nodejs npm

RUN git clone git://git.drogon.net/wiringPi \
    && cd wiringPi \
    && ./build

ADD . /app

RUN cd /app \
    && make

CMD ["nodejs", "/app/server.js"]
