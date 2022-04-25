# FireFighter Monitor

This project connects a LoRa recieve script for the raspberry pi with a React GUI to display the location and vitals of firefighters or other first responders.

## Install

### In your desired directory, you can run:
```
git clone https://github.com/andiconi/FighterMonitor.git
cd FighterMonitor
```

### To install nvm and npm:
#### nvm: 
```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
#### Restart the terminal and then run:
```
nvm install v16.14.2
cd maps
```
#### This will install the necessary npm versions the GUI
```
npm install
```

## Installing the Virtual Enviorment

#### From FighterMonitor:
```
cd api
sudo pip install virtualenv
```
#### To activate the virtual enviorment:
```
source ./venv/bin/activate
```

## Installing Necessary Libraries into Venv
#### In the api folder activate the venv with:
```
source ./venv/bin/activate
```
#### Then install:
```
pip install -U Flask-SQLAlchemy
pip install -U flask-cors
```
#### Move the helper folder into the api folder
```
pip install RPi.GPIO
pip install spidev
```

## Installing The Tile Server

### To install Docker
```
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker pi
sudo chmod 666 /var/run/docker.sock
```

#### Then run:
```
docker pull tburnside/tileserver-gl-arm:1
```

## Running the Program
### Open 3 terminals all in the FighterMonitor folder

### Terminal 1: Tile Server
```
cd maps
docker run --rm -it -v $(pwd):/data -p 8080:80 tburnside/tileserver-gl-arm:1
```

### Terminal 2: Flask Backend

```
cd api
source ./venv/bin/activate
python3 api.py
```

### Terminal 3: Node Frontend
```
npm start
```

## Downloading Maps

#### To download compatible .mbtiles map files go to  [Maptiler.com](https://data.maptiler.com/downloads/planet/?_gl=1*de7grq*_ga*MTE0MTQ5MjAyNC4xNjUwNjY4Njkz*_ga_K4SXYBF4HT*MTY1MDY2ODY5Mi4xLjEuMTY1MDY2ODcwNC40OA..&_ga=2.156400568.2051668258.1650668693-1141492024.1650668693).