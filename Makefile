.PHONY: all clean

all:
	cc -o sonar sonar.c -lwiringPi
	npm install

clean:
	rm -f sonar
	rm -rf node_modules/
