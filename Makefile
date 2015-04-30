.PHONY: all clean

sonar:
	cc -o sonar sonar.c -lwiringPi -lrt

all: sonar
	npm install

clean:
	rm -f sonar
	rm -rf node_modules/
