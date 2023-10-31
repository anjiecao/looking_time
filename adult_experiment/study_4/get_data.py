#import numpy as np
#import scipy.stats as stats
#import pandas as pd
import json
import re

import pymongo as pm

pswd = "mctbfra3d7hc9qy7f63t"


conn = pm.MongoClient('mongodb://stanford:' + pswd + '@127.0.0.1')
#conn = pm.MongoClient('mongodb://stanford:' + pswd + 'localhost:27017/')
db = conn['pokebaby']
col = db["study_4"]

for db_name in conn.list_database_names():
  print(db_name)
  for coll_name in db.list_collection_names():
    print(coll_name)
