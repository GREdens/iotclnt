# IoTClnt
The Internet Of Things Client is a test project to prepare a raspberry device to function as a standalone unit.

# Installation instruction.

## Step 1: Update and upgrade OS
* sudo apt-get update && sudo apt-get upgrade

## Step 2: Update and upgrade NodeJS
* wget http://node-arm.herokuapp.com/node_latest_armhf.deb
* sudo dpkg -i node_latest_armhf.deb 

## Step 3: Install node-gyp globally
* sudo npm install node-gyp -g

## Step 4: Install forever globally
* npm install -g forever

## Step 5: Install the git repository in the following path
* /home/pi/iotclnt

## Step 6: Install all node dependencies
* npm install

## Step 6: Copy the daemon script to /etc/init.d
* cp /home/pi/iotclnt/iotclnt /etc/init.d
* cd /etc/init.d
* chmod +x iotclnt

## Step 7: Add the daemon to the rc.local
* sudo nano /etc/rc.local
* Add on an empty row: /usr/bin/sudo service iotclnt start
