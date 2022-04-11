from api import db
db.create_all()
from api import Fighter
fighter = Fighter(hydration = "75", oxygen = "99", heartrate = "65", floor = "4", latitude = "39.68014", longitude = "-75.75125", map = "map1", name = "Ben Weinel", age = "21", height = "72", weight = "200", sex = "male")
db.session.add(fighter)
db.session.commit()
