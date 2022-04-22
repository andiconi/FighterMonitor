from api import db
## This script creates and fills the database 

db.create_all()
from api import Fighter
fighter = Fighter(hydration = "58", oxygen = "99", heartrate = "73", floor = "1", latitude = "39.68011", longitude = "-75.75111", map = "map1", name = "Ben Weinel", age = "21", height = "72", weight = "200", sex = "male")
db.session.add(fighter)
db.session.commit()

fighter1 = Fighter(hydration = "62", oxygen = "99", heartrate = "68", floor = "3", latitude = "39.68022", longitude = "-75.75122", map = "map2", name = "RJ Dawson", age = "21", height = "72", weight = "200", sex = "male")
db.session.add(fighter1)
db.session.commit()

fighter2 = Fighter(hydration = "60", oxygen = "100", heartrate = "75", floor = "3", latitude = "39.68033", longitude = "-75.75133", map = "map3", name = "Will Shahan", age = "21", height = "72", weight = "200", sex = "male")
db.session.add(fighter2)
db.session.commit()

fighter3 = Fighter(hydration = "59", oxygen = "98", heartrate = "76", floor = "2", latitude = "39.68044", longitude = "-75.75144", map = "map4", name = "Shell Shetti", age = "21", height = "72", weight = "200", sex = "male")
db.session.add(fighter3)
db.session.commit()

fighter4 = Fighter(hydration = "47", oxygen = "100", heartrate = "100", floor = "3", latitude = "39.68055", longitude = "-75.75155", map = "map5", name = "Fireman 5", age = "21", height = "72", weight = "200", sex = "male")
db.session.add(fighter4)
db.session.commit()

fighter5 = Fighter(hydration = "60", oxygen = "100", heartrate = "65", floor = "1", latitude = "39.68066", longitude = "-75.75166", map = "map6", name = "Fireman 6", age = "21", height = "72", weight = "200", sex = "male")
db.session.add(fighter5)
db.session.commit()

fighter6 = Fighter(hydration = "58", oxygen = "98", heartrate = "70", floor = "2", latitude = "39.68077", longitude = "-75.75177", map = "map7", name = "Fireman 7", age = "21", height = "72", weight = "200", sex = "male")
db.session.add(fighter6)
db.session.commit()

fighter7 = Fighter(hydration = "63", oxygen = "99", heartrate = "78", floor = "3", latitude = "39.68088", longitude = "-75.75188", map = "map8", name = "Fireman 8", age = "21", height = "72", weight = "200", sex = "male")
db.session.add(fighter7)
db.session.commit()

fighter8 = Fighter(hydration = "60", oxygen = "99", heartrate = "79", floor = "1", latitude = "39.68099", longitude = "-75.75199", map = "map9", name = "Fireman 9", age = "21", height = "72", weight = "200", sex = "male")
db.session.add(fighter8)
db.session.commit()

fighter9 = Fighter(hydration = "59", oxygen = "100", heartrate = "69", floor = "1", latitude = "39.68000", longitude = "-75.75100", map = "map10", name = "Fireman 10", age = "21", height = "72", weight = "200", sex = "male")
db.session.add(fighter9)
db.session.commit()

