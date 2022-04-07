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


app = Flask(__name__)
CORS(app)





def impCalc(age_s, height_s, weight_s,sex_s, trueImp_s):
    age = float(age_s)
    height_in= float(height_s)
    weight_lb = float(weight_s)
    trueImp = float(trueImp_s)
    height = (height_in*2.54)
    weight = weight_lb/2.205
    FFM = (1.31 + ((0.61*(pow(height,2)))/(trueImp))+(0.25*weight))
    TBW_M = (2.447 - (0.09516*age) + (0.1074*height) + (0.3362*weight))
    TBW_F = (-2.097 + (0.1069*height) + (0.2466*weight))

    if(sex_s.lower() == "male"):
        return str((TBW_M/FFM)*100).split(".")[0]
    else:
        return str((TBW_F/FFM)*100).split(".")[0]

    

#########################################lora 

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
    {'counter': word[0],
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

class LoRaRcvCont(LoRa):
    def __init__(self, verbose=False):
        super(LoRaRcvCont, self).__init__(verbose)
        self.set_mode(MODE.SLEEP)
        self.set_dio_mapping([0] * 6)
        self.set_freq(434.0)

    def start(self):
        self.reset_ptr_rx()
        self.set_mode(MODE.RXCONT)
        while True:
            sleep(.5)
            sys.stdout.flush()

    def on_rx_done(self):
        self.clear_irq_flags(RxDone=1)
        print("\nReceived: ")
        payload =(bytes(self.read_payload(nocheck=True)).decode("utf-8", 'ignore'))
        #print("before filtering:", payload)
        try:
            newstr = format_data(payload)
            write_to_csv(payload)
            print(newstr)
            fighter1 = Fighter.query.get(1)
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
        self.set_mode(MODE.RXCONT)


        
lora = LoRaRcvCont(verbose=False)
lora.set_mode(MODE.STDBY)
lora.set_pa_config(pa_select=1)

date = datetime.now().strftime("%Y_%m_%d-%I.%M.%S_%p")
extension = ".csv"
filename = "firefighter1_" + str(date) + extension
fieldnames = ['counter', 'lat', 'long','HR',"SP02","Impedance"]
f1 = open(filename, "w", encoding='UTF8', newline='')
writer = csv.DictWriter(f1,fieldnames=fieldnames)
   
        
def loraProcess():
    try:
        writer.writeheader()
        lora.start()
        
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
    







###############################################





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

#change these to firefighter attributes
    def __str__(self):
        return f'{self.id}{self.hydration}{self.oxygen}{self.heartrate}{self.floor}{self.latitude}{self.longitude}{self.map}{self.age}{self.weight}{self.height}{self.sex}{self.name}'


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
        "name": fighter.name
    }
#read firefighter route
@app.route('/api/', methods=['GET'])
def index():
    return jsonify([*map(fighterSerializer,Fighter.query.all())])


#create firefigter route
@app.route('/api/create/', methods = ['POST'])
def create():
    request_data = json.loads(request.data)
    fighter = Fighter(name = request_data['name'], age = request_data['age'], height = request_data['height'], weight = request_data['weight'], sex = request_data['sex'])
    db.session.add(fighter)
    db.session.commit()
    fighter.map = ("map" + str(fighter.id))
    db.session.commit()
    return {'201': "Fighter added successfully!" }

@app.route('/api/<int:id>')
def show(id):
    return jsonify([*map(fighterSerializer,Fighter.query.filter_by(id=id))])



if __name__ == '__main__':
    p = Process(target=loraProcess)
    p.start()  
    app.run(debug=False, use_reloader=False)
    p.join()
