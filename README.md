# resin-sonar

This application uses an external ultrasonic sensor (HC-SR04 is the one I'm using) connected to the Raspberry Pi to calculate its distance from the nearest object. You can see it in action [here](https://vine.co/v/e7QgnvTr2lv), where it detects when my balcony door is opened and sends me an SMS message. It also has a little webpage that shows you the that distance in realtime.

## How to use
You will need to create a resin application, connect your device, and push this code to the application. If you haven't done this kind of thing before, have a look at [these instructions](https://github.com/resin-io/text2speech/blob/master/README.md#how-to-use).

You will also need to set some environment variables for this to work correctly.

* `PORT`: the port where the webpage should run
* `TRIGGER_PIN`: uses GPIO numbering
* `ECHO_PIN`: uses GPIO numbering
* `TWILIO_ACCOUNT_SID`
* `TWILIO_AUTH_TOKEN`
* `TWILIO_FROM_NUMBER`
* `TWILIO_TO_NUMBER`
* `WARNING_DISTANCE`: the maximum distance (in cm) the sensor can detect before notifying you

Enjoy!
