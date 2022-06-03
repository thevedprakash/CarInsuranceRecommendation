from flask import Flask, jsonify
from flask_cors import CORS
from flask import request
import pyodbc
import pandas as pd
from pandas import DataFrame
import mysql.connector

from math import sqrt
import pickle

import sys
import os

import numpy as np
# from predictedPolicies_fn import classifier
# from getState_fn import classifier

import os
import sys

file_dir = os.path.dirname(__file__)
sys.path.append(file_dir)

from matched_users import most_similar_users

state_min = np.array([['AL', 'Alabama', '25/50/25'],
                      ['AK', 'Alaska', '50/100/25'],
                      ['AZ', 'Arizona', '15/30/10'],
                      ['AR', 'Arkansas', '25/50/15'],
                      ['CA', 'California', '15/30/5'],
                      ['CO', 'Colorado', '25/50/15'],
                      ['CT', 'Connecticut', '25/50/25[23]'],
                      ['DE', 'Delaware', '15/30/5'],
                      ['DC', 'District of Columbia', '10/25/5'],
                      ['FL', 'Florida', '0/0/10'],
                      ['GA', 'Georgia', '25/50/25'],
                      ['HI', 'Hawaii', '20/40/10'],
                      ['ID', 'Idaho', '25/50/15[24]'],
                      ['IL', 'Illinois', '20/40/15[25]'],
                      ['IN', 'Indiana', '25/50/25[26]'],
                      ['IA', 'Iowa', '20/40/15'],
                      ['KS', 'Kansas', '25/50/10'],
                      ['KY', 'Kentucky', '25/50/25[27]'],
                      ['LA', 'Louisiana', '15/30/25'],
                      ['ME', 'Maine', '50/100/25'],
                      ['MD', 'Maryland', '30/60/15 [28]'],
                      ['MA', 'Massachusetts', '20/40/5'],
                      ['MI', 'Michigan', '20/40/10'],
                      ['MN', 'Minnesota', '30/60/10'],
                      ['MS', 'Mississippi', '25/50/25'],
                      ['MO', 'Missouri', '25/50/10'],
                      ['MT', 'Montana', '25/50/10'],
                      ['NE', 'Nebraska', '25/50/25'],
                      ['NV', 'Nevada', '25/50/20[30]'],
                      ['NH', 'New Hampshire', 'N/A (Personal Responsibility Only)'],
                      ['NJ', 'New Jersey', '0/0/5'],
                      ['NM', 'New Mexico', '25/50/10'],
                      ['NY', 'New York', '25/50/10'],
                      ['NC', 'North Carolina', '30/60/25'],
                      ['ND', 'North Dakota', '25/50/25'],
                      ['OH', 'Ohio', '20/50/25'],
                      ['OK', 'Oklahoma', '25/50/25'],
                      ['OR', 'Oregon', '25/50/20'],
                      ['PA', 'Pennsylvania', '15/30/5'],
                      ['RI', 'Rhode Island', '25/50/25'],
                      ['SC', 'South Carolina', '25/50/25'],
                      ['SD', 'South Dakota', '25/50/25'],
                      ['TN', 'Tennessee', '25/50/10'],
                      ['TX', 'Texas', '30/60/25'],
                      ['UT', 'Utah', '25/65/15'],
                      ['VT', 'Vermont', '25/50/10'],
                      ['VA', 'Virginia', '25/50/20'],
                      ['WA', 'Washington', '25/50/10'],
                      ['WV', 'West Virginia', '20/40/10'],
                      ['WI', 'Wisconsin', '25/50/10'],
                      ['WY', 'Wyoming', '25/50/20']
                      ])
# Get State minimum Values
state_min_df = pd.DataFrame(state_min, columns=['State_code', 'State', 'Policy'])
state_min_df.drop(['State_code'], axis=1, inplace=True)
# cnxn = pyodbc.connect("Driver={SQL Server};Server=impc3065;Database=Carzo;UID=sa;PWD=123Welcome;")
mydb = mysql.connector.connect(user='root', password='123456',
                               host='localhost',
                               database='carzo',
                               use_pure=False)

app = Flask(__name__)
CORS(app)


class Predict:
    def __init__(self, name, age):
        self.nav_category = nav_category
        self.idv_category = idv_category
        self.owned = owned
        self.Parking_Space = Parking_Space
        self.Anti_Theft = Anti_Theft
        self.Commute = Commute
        self.Locality = Locality
        self.DL_Suspended = DL_Suspended
        self.State = State
        self.makeId = makeId
        self.modelId = modelId
        self.makeName = makeName
        self.usage = usage
        self.year = year
        self.price = price


@app.route('/')
def home():
    return 'Welcome !!!'


@app.route('/getCarMake')
def getCarMake():
    year = request.args.get('year')
    usage = request.args.get('usage')
    if usage != "":
        query = 'SELECT MakeID,MakeName FROM Cars_Master WHERE Year =' + year + ' AND  Cars_Master.Usage =\'' + usage + '\' GROUP BY MakeID,MakeName '
    else:
        query = 'SELECT MakeID,MakeName FROM Cars_Master WHERE Year =' + year + ' GROUP BY MakeID,MakeName '
    cars_df = get_db_data_mysql(query)
    return cars_df.to_json(orient='split')


@app.route('/getCarModel')
def getCarModel():
    modelId = request.args.get('modelId')
    year = request.args.get('year')
    usage = request.args.get('usage')
    query = 'SELECT ModelID,ModelName FROM Cars_Master WHERE Year =' + year + ' AND  Cars_Master.Usage =\'' + usage + '\' AND  MakeID = ' + modelId + ' AND ModelName != \'null\'\
    AND ModelName != \'NAME\' GROUP BY MakeID,MakeName,ModelID,ModelName'
    cars_df = get_db_data_mysql(query)
    return cars_df.to_json(orient='split')


@app.route('/getPrice')
def getPrice():
    modelId = request.args.get('modelId')
    makeId = request.args.get('makeId')
    usage = request.args.get('usage')
    year = request.args.get('year')
    query = 'SELECT * FROM Cars_Master WHERE Year =  ' + year + ' AND  MakeID =' + makeId + ' AND  ModelID =' + modelId + ' AND  Cars_Master.Usage =\'' + usage + '\''
    cars_df = get_db_data_mysql(query)
    return cars_df.to_json(orient='split')


def generate_new_user(input_dict):
    """
    Function returns the profile info for new User detail entered from front-end.

    Inputs :
    :params input_dict: Json-or Dict structure detail from Api

    """
    keys_list = list(input_dict.keys())
    value_list = list(input_dict.values())

    new_keys = []
    for key in zip(keys_list, value_list):
        if ((key[0] != "User_Id") & (key[0] != "State")):
            new_keys.append("_".join(key))

    state = input_dict['State']

    new_user_dict = {}

    new_user_profile_dict = {}
    '''
    Identified Error

    new_user_dict['User_Id'] = input_dict['User_Id']
    '''

    valid_keys = ['NAV_Category_I', 'NAV_Category_II', 'NAV_Category_III', 'NAV_Category_IV', 'NAV_Category_V',
                  'IDV_Category_I',
                  'IDV_Category_II', 'IDV_Category_III', 'IDV_Category_IV', 'IDV_Category_V', 'Owned_False',
                  'Owned_Yes',
                  'Parking_Space_IN', 'Parking_Space_OUT', 'Anti_Theft_No', 'Anti_Theft_Yes', 'Commute_Leisure',
                  'Commute_Work',
                  'Locality_Rural', 'Locality_Urban', 'DL_Suspended_No', 'DL_Suspended_Yes', 'usage_New', 'usage_Used',
                  'year_2013',
                  'year_2014', 'year_2015', 'year_2016', 'year_2017', 'year_2018', 'year_2019', 'year_2020']
    for key in valid_keys:
        if key in new_keys:
            new_user_profile_dict[key] = 1
        else:
            new_user_profile_dict[key] = 0

    new_user_dict[input_dict['User_Id']] = new_user_profile_dict

    return new_user_dict, state


def generate_recommendation(saved_user_dict, user_policy_dict, state_minimum_dict, new_user_dict, state, k):
    recommended_list = []
    person = list(new_user_dict.keys())[0]
    user_dict = saved_user_dict.copy()
    user_dict[person] = new_user_dict[person]

    topK_similar_user_list = most_similar_users(person, k, user_dict)
    # print("topK_similar_user_list : ", topK_similar_user_list)

    for value in topK_similar_user_list:
        recommended_list.extend(user_policy_dict[value[1]])

    # Inserting the state Minimum to recommended list.
    recommended_list.insert(0, state_minimum_dict[state])

    recommended_policies = list(set(recommended_list))
    return recommended_policies


@app.route('/predictions', methods=['POST'])
def getPredictions():
    content = request.json
    print("content i am here  : ",content)
    if content['usage'] == 'used':
        content['usage'] = 0
        usage = 'Used'
    else:
        content['usage'] = 1
        usage = 'New'

    # Data Paths Scpecified
    clean_data_path = './cleaned_data/'
    raw_data_path = './raw_data/'
    k = 3
    if int(content['annualsalary']) >= 400000:
        NAV_Category = 'V'
    elif int(content['annualsalary']) >= 300000 and int(content['annualsalary']) < 400000:
        NAV_Category = 'IV'
    elif int(content['annualsalary']) >= 200000 and int(content['annualsalary']) < 300000:
        NAV_Category = 'III'
    elif int(content['annualsalary']) >= 100000 and int(content['annualsalary']) < 200000:
        NAV_Category = 'II'
    elif int(content['annualsalary']) < 100000:
        NAV_Category = 'I'

    query = 'SELECT * FROM Cars_Master WHERE  MakeID =' + content['makeId'] + ' AND  ModelID =' + content[
        'modelId'] + ' AND  Cars_Master.Usage =\'' + usage + '\' AND  Year =  ' + content['caryear']
    cars_df = get_db_data_mysql(query)

    print("first_five :",cars_df.head(5))

    idv_value = cars_df.iloc[0][5]
    print("idv_value : ",idv_value )
    # idv_value = cars_df.iloc[0]['price']
    IDV_Category_Val = 5
    print("IDV_Category :", cars_df.iloc[0][IDV_Category_Val])
    # IDV_Category_Val =  'IDV_Category'
    # IDV_Category_Val
    if cars_df.iloc[0][IDV_Category_Val] == 'V':
        IDV_Category = 'V'
    elif cars_df.iloc[0][IDV_Category_Val] == 'IV':
        IDV_Category = 'IV'
    elif cars_df.iloc[0][IDV_Category_Val] == 'III':
        IDV_Category = 'III'
    elif cars_df.iloc[0][IDV_Category_Val] == 'II':
        IDV_Category = 'II'
    elif cars_df.iloc[0][IDV_Category_Val] == 'I':
        IDV_Category = 'I'


    if content['ownorlease'] == 'own':
        content['ownorlease'] = 'True'
        ownerShip = 'Owned'
    else:
        content['ownorlease'] = 'False'
        ownerShip = 'Leased'

    if content['parkcarhomeaddress']:
        content['parkcarhomeaddress'] = 'IN'
        parking = 'At Home'
    else:
        content['parkcarhomeaddress'] = 'OUT'
        parking = 'Outside Home'

    if content['primaryusage'] == 'working':
        content['primaryusage'] = 'Work'
    else:
        content['primaryusage'] = 'Leisure'

    content['locality'] = 1

    if content['DL_Suspended']:
        content['DL_Suspended'] = 'Yes'
    else:
        content['DL_Suspended'] = 'No'

    if len(content['Anti_Theft']) > 0:
        Anti_Theft = 'Yes'
    else:
        Anti_Theft = 'No'

    input_dict = {'User_Id': 50002,
                  'State': content['address']['state'],
                  'NAV_Category': NAV_Category,
                  'IDV_Category': IDV_Category,
                  'Owned': content['ownorlease'],
                  'Parking_Space': content['parkcarhomeaddress'],
                  'Anti_Theft': Anti_Theft,
                  'Commute': content['primaryusage'],
                  'Locality': 'Rural',
                  'DL_Suspended': content['DL_Suspended'],
                  'usage': usage,
                  'year': content['caryear']
                  }
    print(input_dict)
    with open(clean_data_path + 'user_profile_dict.pickle', 'rb') as handle:
        saved_user_dict = pickle.load(handle)
    with open(clean_data_path + 'user_policy_dict.pickle', 'rb') as handle:
        user_policy_dict = pickle.load(handle)
        user_policy_dict = pickle.load(handle)
    with open(clean_data_path + 'state_liabitity_dict.pickle', 'rb') as handle:
        state_minimum_dict = pickle.load(handle)
    new_user_dict, state = generate_new_user(input_dict)
    recommended_list = generate_recommendation(saved_user_dict, user_policy_dict, state_minimum_dict, new_user_dict,
                                               state, k)
    print("Recommended Policies for User {}.".format(input_dict['User_Id']))
    print(recommended_list)

    content_out = {
        'caryear': content['caryear'],
        'firstname': content['firstname'],
        'lastname': content['lastname'],
        'email': content['email'],
        'phoneNumber': content['phoneNumber'],
        'annualsalary': content['annualsalary'],
        'nav': NAV_Category,
        'idv': IDV_Category,
        'idv_value': str(idv_value),
        'makeName': cars_df.iloc[0][2],
        'modelName': cars_df.iloc[0][7],
        # 'makeName' : cars_df.iloc[0]['MakeName'],
        # 'modelName' : cars_df.iloc[0]['ModelName'],
        'usage': usage,
        'state': content['address']['state'],
        'commute': content['primaryusage'],
        'owned': content['ownorlease'],
        'parkingSpace': parking,
        'antiTheft': Anti_Theft,
        'predictions': list(recommended_list),
        'ownerShip': ownerShip,
        'year': content['caryear']
    }
    print("content_out : ",content_out)
    return jsonify(content_out)


def get_db_data_mysql(query):
    cnxn = mydb.cursor()
    cnxn.execute(query)
    cars_df = DataFrame(cnxn.fetchall())
    cnxn.close()
    return cars_df


def get_db_data_sql(query):
    return pd.read_sql_query(query, cnxn)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)