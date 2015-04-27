.PHONY: all clean

all:
	cc -o sonar sonar.c -lwiringPi -lrt
	npm install

clean:
	rm -f sonar
	rm -rf node_modules/
