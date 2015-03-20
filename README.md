# IoTClnt
The Internet Of Things Client is a test project to prepare a raspberry device to function as a standalone unit.

# Installation instruction.

## Step 1: Install forever globally
* npm install -g forever

## Step 2: Install the git repository in the following path
* /home/pi/iotclnt

## Step 3: Copy the daemon script to /etc/init.d
* cp /home/pi/iotclnt/iotclnt /etc/init.d
* cd /etc/init.d
* chmod +x iotclnt

## Step 4: Add the daemon to the rc.local
* sudo nano /etc/rc.local
* Add on an empty row: /usr/bin/sudo service iotclnt start

