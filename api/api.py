from unicodedata import name
from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from time import sleep
from helper.LoRa import *
from helper.board_config import BOARD
from datetime import datetime
import csv
from multiprocessing import Process, Value

## This file handles all stored data. It stores and serves firefighter class objects as well as handling LoRa transmission and Impedence calculations



app = Flask(__name__)
CORS(app)



## This function calculates hydration based on age height weight and sex and impednece 

def impCalc(age_s, height_s, weight_s,sex_s, trueImp_s):
    age = float(age_s)
    height_in= float(height_s)
    weight_lb = float(weight_s)
    trueImp = float(trueImp_s)
    height = (height_in*2.54)
    weight = weight_lb/2.205
    #FFM = (1.31 + ((0.61*(pow(height,2)))/(trueImp))+(0.25*weight))
    TBW_M = (8.399 + (0.396*pow(height,2))/(trueImp) + (0.143*weight))
    TBW_F = (8.315 + (0.382*pow(height,2))/(trueImp) + (0.105*weight))

    if(sex_s.lower() == "male"):
        return str((TBW_M/weight)*100).split(".")[0]
    else:
        return str((TBW_F/weight)*100).split(".")[0]

    

####### LoRa Scripts start Here #######
#RJ needs to comment this
BOARD.setup()

def write_to_csv(payload):
    word = payload.split()
    num1=float(word[1])
    num3 = int(word[0])
    word[1] = num1/10000000
    num2=float(word[2])
    word[2] = num2/10000000
    word[0] = num3
    word[0] = str(word[0])
    word[1] = str(word[1])
    word[2] = str(word[2])
    word[3] = str(word[3])
    word[4] = str(word[4])
    word[5] = str(word[5])
    # csv data
    rows = [
    {'ID': word[0],
    'lat': word[1],
    'long': word[2],
    'HR': word[3],
    "SP02": word[4],
    "Impedance": word[5]}]
    writer.writerows(rows)

def format_data(data):
    word = data.split()
    num1=float(word[1])
    num3 = int(word[0])
    word[1] = num1/10000000
    num2=float(word[2])
    word[2] = num2/10000000
    word[0] = num3
    word[0] = str(word[0])
    word[1] = str(word[1])
    word[2] = str(word[2])
    word[3] = str(word[3])
    word[4] = str(word[4])
    word[5] = str(word[5])
    return word

class LoRaPing(LoRa):
    def __init__(self, verbose=False):
        super(LoRaPing, self).__init__(verbose)
        self.set_mode(MODE.SLEEP)
        self.set_pa_config(pa_select=1,max_power=15,output_power=10)
        self.set_freq(434.0)
        #self.set_coding_rate(4)
        self.set_bw(7)
        self.set_spreading_factor(11)
        self.set_ocp_trim(240)
        self.set_agc_auto_on(0)
        self.set_lna(4,3)

    def on_tx_done(self):
        #print("in TX")
        #self.set_mode(MODE.STDBY)
        self.clear_irq_flags(TxDone=1) # clear txdone IRQ flag

    
    def on_rx_timeout(self):
        #global isTimedout
        #print("Timed out\n")
        #isTimedout = True
        #print(self.get_irq_flags())
        self.clear_irq_flags(RxTimeout=1)
    
    def on_rx_done(self):
        self.clear_irq_flags(RxDone=1)
        print("\nReceived: ")
        payload =(bytes(self.read_payload(nocheck=True)).decode("utf-8", 'ignore'))
        #print("before filtering:", payload)
        try:
            newstr = format_data(payload)
            write_to_csv(payload)
            print(newstr)
            fighter1 = Fighter.query.filter_by(deviceLink=newstr[0]).first()
            fighter1.hydration = impCalc(fighter1.age, fighter1.height, fighter1.weight, fighter1.sex, newstr[5]) 
            fighter1.oxygen = newstr[4]
            fighter1.heartrate = newstr[3]
            #fighter1.floor = newstr[1]
            fighter1.latitude = newstr[1]
            fighter1.longitude = newstr[2]
            db.session.commit()
        except:
            pass
        self.set_mode(MODE.SLEEP)
        self.reset_ptr_rx()

def main():
#global isTimedout
    while True:
        Ids = Fighter.query.order_by(Fighter.deviceLink).all()
        for ID in Ids:
            print(ID.deviceLink)
            #wU = True
            #print("\nIN MAIN")
            #print(lora.get_irq_flags())
            data = [int(hex(ord(c)), 0) for c in ID.deviceLink] 
            #print("pinging: " + ID.deviceLink)
            lora.write_payload(data)
            lora.set_mode(MODE.TX)
            lora.set_dio_mapping([0] * 6) 
            lora.set_mode(MODE.RXSINGLE) 
            #while wU == True:
            #    print(isTimedout)
            #    if (isTimedout):
            #        wU = False
            #        print ("in if")
            #        isTimedout = False
            #    break
            sys.stdout.flush()
            sleep(2.1)
        
lora = LoRaPing(verbose=False)
lora.set_mode(MODE.STDBY)
lora.set_pa_config(pa_select=1)

date = datetime.now().strftime("%Y_%m_%d-%I.%M.%S_%p")
extension = ".csv"
filename = "firefighter1_" + str(date) + extension
fieldnames = ['ID', 'lat', 'long','HR',"SP02","Impedance"]
f1 = open(filename, "w", encoding='UTF8', newline='')
writer = csv.DictWriter(f1,fieldnames=fieldnames)
   
        
def loraProcess():
    try:
        writer.writeheader()
        main()
        
    except KeyboardInterrupt:
        f1.close()
        sys.stdout.flush()
        print("")
        sys.stderr.write("KeyboardInterrupt\n")
        
    finally:
        loop=0
        sys.stdout.flush()
        print("")
        lora.set_mode(MODE.SLEEP)
        BOARD.teardown()
    







####### LoRa Scripts end Here #######



## Configuring database

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///fighters.db"
db = SQLAlchemy(app)
class Fighter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    hydration = db.Column(db.Text, nullable=True)
    oxygen = db.Column(db.Text, nullable=True)
    heartrate = db.Column(db.Text, nullable=True)
    floor = db.Column(db.Text, nullable=True)
    latitude = db.Column(db.Text, nullable=True)
    longitude = db.Column(db.Text, nullable=True)
    map = db.Column(db.Text, nullable=True)
    age = db.Column(db.Text, nullable=True)
    weight = db.Column(db.Text, nullable=True)
    height = db.Column(db.Text, nullable=True)
    sex = db.Column(db.Text, nullable=True)
    name = db.Column(db.Text, nullable=True)
    deviceLink = db.Column(db.Text, nullable=True)


    def __str__(self):
        return f'{self.id}{self.hydration}{self.oxygen}{self.heartrate}{self.floor}{self.latitude}{self.longitude}{self.map}{self.age}{self.weight}{self.height}{self.sex}{self.name}{self.deviceLink}'


def fighterSerializer(fighter):
    return {
        'id': fighter.id,
        "hydration": fighter.hydration,
        "oxygen": fighter.oxygen,
        "heartrate": fighter.heartrate,
        "floor": fighter.floor,
        "latitude": fighter.latitude,
        "longitude": fighter.longitude,
        "map": fighter.map,
        "age": fighter.age,
        "weight": fighter.weight,
        "height": fighter.height,
        "sex": fighter.sex,
        "name": fighter.name,
        "deviceLink": fighter.deviceLink
    }

#read firefighters route
@app.route('/api/', methods=['GET'])
def index():
    return jsonify([*map(fighterSerializer,Fighter.query.all())])


#create firefigter route
@app.route('/api/create/', methods = ['POST'])
def create():
    request_data = json.loads(request.data)
    fighter = Fighter(name = request_data['name'], age = request_data['age'], height = request_data['height'], weight = request_data['weight'], sex = request_data['sex'], deviceLink = request_data['deviceLink'] )
    db.session.add(fighter)
    db.session.commit()
    fighter.map = ("map" + str(fighter.id))
    db.session.commit()
    return {'201': "Fighter added successfully!" }

#read one firefighter route
@app.route('/api/<int:id>')
def show(id):
    return jsonify([*map(fighterSerializer,Fighter.query.filter_by(id=id))])

@app.route('/api/<int:id>', methods = ['POST'])
def delete(id):
    request_data = json.loads(request.data)
    Fighter.query.filter_by(id=request_data['id']).delete()
    db.session.commit()

    return {'204': 'Deleted successfully'}

if __name__ == '__main__':
    p = Process(target=loraProcess)
    p.start()  
    app.run(debug=False, use_reloader=False)
    p.join()
