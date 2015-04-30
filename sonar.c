#include <stdio.h>
#include <time.h>
#include <wiringPi.h>

#define TRIGGER_PIN 23
#define ECHO_PIN 24
#define MIN_DISTANCE 0
#define MAX_DISTANCE 200

long pulseIn(int pin, int value) {
    struct timespec start, end;
    while (digitalRead(pin) != value);
    clock_gettime(CLOCK_MONOTONIC, &start);
    while (digitalRead(pin) == value);
    clock_gettime(CLOCK_MONOTONIC, &end);

    return end.tv_nsec - start.tv_nsec;
}

int main() {
    long nanoPulseWidth, lastGood = MIN_DISTANCE, distance;
    setvbuf(stdout, NULL, _IOLBF, NULL);
    wiringPiSetupGpio();
    pinMode(TRIGGER_PIN, OUTPUT);
    pinMode(ECHO_PIN, INPUT);

    while (1) {
        digitalWrite(TRIGGER_PIN, LOW);
        delayMicroseconds(2);

        digitalWrite(TRIGGER_PIN, HIGH);
        delayMicroseconds(10);

        digitalWrite(TRIGGER_PIN, LOW);
        nanoPulseWidth = pulseIn(ECHO_PIN, 1);
        distance = (nanoPulseWidth * 0.001) / 58.2;
        if (distance >= MIN_DISTANCE && distance <= MAX_DISTANCE) {
            lastGood = distance;
        }

        printf("%ld\n", lastGood);

        delay(50);
    }

    return 0;
}
