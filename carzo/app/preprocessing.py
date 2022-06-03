"""
Import necessary in-built libraries
"""
# Setting Jupyter Notebook Display style

# from IPython.core.display import display, HTML
# display(HTML("<style>.container { width:100% !important; }</style>"))

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler

import matplotlib.pyplot as plt
# Only to be used in jupyter notebook to embedded the plots and figures created with notebook
# %matplotlib inline
import seaborn as sns

from math import sqrt

import pandas as pd

# Setting Jupyter Notebook display parameters

# pd.set_option('display.max_columns', 1000)
# pd.set_option('display.max_rows', 500)
# pd.set_option('display.width', 1000)
# pd.set_option('display.max_colwidth', -1)


import numpy  as np

import time
import pprint
import glob
import os
import pickle



"""
Import necessary modules
"""



def clean_data(raw_path,clean_path,file_name):
    """
    Function to clean the master file data.

    Inputs :

    :param raw_path : path for location of the raw data.
    :param clean_path : path where processed data will be saved.
    :param file_name : master data file name.

    Output :
    :return :  cleaned and  processed data.

    """
    pass

def generate_user_profile(path,file_name):

    """
    Function to generate user profile dictionary based on master data fields.
    Inputs
    :param path: path where the processed master data is placed.
    :param file_name: processed master data file name.

    Output :
    :return : user profile in a dictionary format.
    """

    # Reading the master data as a dataframe.
    master_data = pd.read_csv(path+file_name)

    # Selecting Attributes to build user profile.

    user_profile_cols = ['User_Id', 'NAV_Category', 'IDV_Category', 'Owned', 'Parking_Space', 'Anti_Theft', 'Commute',\
                         'Locality', 'DL_Suspended', 'usage', 'year', 'Price', ]
    df_user = master_data[user_profile_cols]

    # # Normalizing the prices for the car price

    # data = df_user['Price'].values
    # scaler.fit(data.reshape(-1,1))
    # data_tranformed = scaler.transform(data.reshape(-1,1))

    # # Adding the additional normalized price column
    # df_user['Normalized_price'] = data_tranformed

    # Converting year as a object data type to use value of year as a feature
    df_user['year'] = df_user['year'].astype('str')

    df_user.drop(columns=['Price'], inplace=True)

    # Creating a deep copy of user profile and applying the transformation
    df = df_user.copy(deep=True)

    # Generate one-hot encodings for the user_df
    df = pd.get_dummies(df)

    # Setting User_Id as the index value
    df.set_index('User_Id', inplace=True)

    # Creating a user dictionary with User_Id as a key and columns from user_df and there corresponding row value as a nested dict.

    user_dict = {}
    for index in df.index:
        user_detail_dict = {}
        for cols in df.columns:
            user_detail_dict[cols] = df.loc[index, cols]
        user_dict[index] = user_detail_dict

    # Saving dictonary generated

    with open(path + 'user_profile_dict.pickle', 'wb') as handle:
        pickle.dump(user_dict, handle, protocol=pickle.HIGHEST_PROTOCOL)


    return user_dict

def generate_user_purchase_record(path,file_name):

    """
    Function to generate user purchase records dictionary based on master data fields.

    Inputs :
    :param path: path where the processed master data is placed.
    :param file_name: processed master data file name.

    Output :
    :return : user purchase records in a dictionary format.

    """

    # Reading the master data as a dataframe.
    master_data = pd.read_csv(path + file_name)

    # Selecting the Covergae policies offered.

    purchased_policy_cols = ['User_Id', 'Comp', 'Collision', 'Car Rental', 'Umbrella', 'PIP', 'Med', 'Gap']

    df_purchased_records = master_data[purchased_policy_cols]

    # Imputing Nan values with sting 'Not Availed'

    df_purchased_records.fillna('Not Availed', inplace=True)

    # Setting User_Id as the index value
    df_purchased_records.set_index('User_Id', inplace=True)

    # Creating a user purchase record dictionary with User_Id as a key and policies purchased as a list values for the users.

    user_policy_dict = {}
    for index in df_purchased_records.index:
        #     print(index)
        user_policy_list = []
        for cols in df_purchased_records.columns:
            if df_purchased_records.loc[index, cols] != 'Not Availed':
                user_policy_list.append(df_purchased_records.loc[index, cols])
        user_policy_dict[index] = user_policy_list

    # Saving dictonary generated

    with open(path + 'user_policy_dict.pickle', 'wb') as handle:
        pickle.dump(user_policy_dict, handle, protocol=pickle.HIGHEST_PROTOCOL)


    return user_policy_dict


def state_minimum_lability(raw_path,clean_path,file_name):

    """
    Function to generate a dictionary of state prescribe minimum laibility insurance.

    Inputs :
    :param raw_path: path for location of the raw data.
    :param clean_path: path where processed data will be saved.
    :param file_name: state minimum lability file name.

    Outputs :
    :return: state minimum laibility dictionary

    """

    # Reading the statewise insurance minimum requirement data as a dataframe.
    raw_minimum_insurance_required = pd.read_excel(raw_path + file_name)

    # print(raw_minimum_insurance_required.columns)

    # Cleaning data for column 'Full List of Minimum Car Insurance Required By Law in State and Exceptions'
    raw_minimum_insurance_required.iloc[:, -1] = raw_minimum_insurance_required.iloc[:, -1].apply(
        lambda x: ";".join(x.split("/n")))

    # Generating list of Unique States
    state_list = list(raw_minimum_insurance_required['State'].unique())

    # Filtering columns for the dictionary creation.
    raw_minimum_insurance_required = raw_minimum_insurance_required[['State', "Minimum insurance Requirements"]]

    # Setting "S.No." as a index value
    raw_minimum_insurance_required.set_index("State",inplace=True)


    # Creating a statewise insurance minimum requirement dictionary with User_Id as a key and with minimum required insurance as a value.

    state_liabitity_dict = {}
    for state in state_list:
        state_liabitity_dict[state] = raw_minimum_insurance_required.loc[state, 'Minimum insurance Requirements']

    # Saving dictonary generated

    with open(clean_path + 'state_liabitity_dict.pickle', 'wb') as handle:
        pickle.dump(state_liabitity_dict, handle, protocol=pickle.HIGHEST_PROTOCOL)

    return state_liabitity_dict


if __name__ == "__main__":


    # Data Paths Scpecified
    clean_data_path = '../cleaned_data/'
    raw_data_path = '../raw_data/'

    print("Files in clean_data_path : ",os.listdir(clean_data_path))

    print("Files in raw_data_path : ",os.listdir(raw_data_path))

    user_profile_dict = generate_user_profile(clean_data_path, 'cleaned_datamaster_data.csv')
    user_purchase_dict = generate_user_purchase_record(clean_data_path, 'cleaned_datamaster_data.csv')

    state_minimum_dict = state_minimum_lability(raw_data_path, clean_data_path, 'statewise_insurance_min_req.xlsx')

    print("No. of Users profile  : ",len(user_profile_dict.keys()))

    print("No. of User purchased profile : ",len(user_purchase_dict.keys()))

    print("No. of states : ",len(state_minimum_dict))
