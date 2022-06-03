"""
Import necessary in-built libraries
"""

from math import sqrt
import pickle
import pprint

import sys
import os


"""
Import necessary modules
"""
from preprocessing import generate_user_profile
from preprocessing import generate_user_purchase_record

from similarity import similarity_score
from similarity import pearson_correlation

from matched_users import most_similar_users


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

    valid_keys = ['NAV_Category_I', 'NAV_Category_II', 'NAV_Category_III', 'NAV_Category_IV', 'NAV_Category_V', 'IDV_Category_I',
                         'IDV_Category_II', 'IDV_Category_III', 'IDV_Category_IV', 'IDV_Category_V', 'Owned_False', 'Owned_Yes',
                         'Parking_Space_IN', 'Parking_Space_OUT', 'Anti_Theft_No', 'Anti_Theft_Yes', 'Commute_Leisure', 'Commute_Work',
                         'Locality_Rural', 'Locality_Urban', 'DL_Suspended_No', 'DL_Suspended_Yes', 'usage_New', 'usage_Used', 'year_2013',
                         'year_2014', 'year_2015', 'year_2016', 'year_2017', 'year_2018', 'year_2019', 'year_2020']
    for key in valid_keys:
        if key in new_keys:
            new_user_profile_dict[key] = 1
        else:
            new_user_profile_dict[key] = 0

    new_user_dict[input_dict['User_Id']] = new_user_profile_dict


    return new_user_dict, state


def generate_recommendation(saved_user_dict,user_policy_dict,state_minimum_dict,new_user_dict,state,k):


    recommended_list = []

    person = list(new_user_dict.keys())[0]
    user_dict = saved_user_dict.copy()
    user_dict[person] = new_user_dict[person]

    topK_similar_user_list = most_similar_users(person,k,user_dict)
    print("topK_similar_user_list : ",topK_similar_user_list)

    for value in topK_similar_user_list:
        recommended_list.extend(user_policy_dict[value[1]])

    # Inserting the state Minimum to recommended list.
    recommended_list.insert(0,state_minimum_dict[state])

    recommended_policies = list(set(recommended_list))
    return recommended_policies

if __name__ == "__main__":
    # Data Paths Scpecified
    clean_data_path = '../cleaned_data/'
    raw_data_path = '../raw_data/'

    k = 1

    input_dict = {'User_Id': 78158,
                  'State': 'Oklahoma',
                  'NAV_Category': 'I',
                  'IDV_Category': 'IV',
                  'Owned': 'False',
                  'Parking_Space': 'OUT',
                  'Anti_Theft': 'Yes',
                  'Commute': 'Work',
                  'Locality': 'Urban',
                  'DL_Suspended': 'No',
                  'usage': 'New',
                  'year': '2019',
                  }



    with open(clean_data_path + 'user_profile_dict.pickle', 'rb') as handle:
        saved_user_dict = pickle.load(handle)

    with open(clean_data_path + 'user_policy_dict.pickle', 'rb') as handle:
        user_policy_dict = pickle.load(handle)

    with open(clean_data_path + 'state_liabitity_dict.pickle', 'rb') as handle:
        state_minimum_dict = pickle.load(handle)

    new_user_dict, state = generate_new_user(input_dict)


    recommended_list = generate_recommendation(saved_user_dict,user_policy_dict,state_minimum_dict, new_user_dict, state, k)

    print("Recommended Policies for User {}.".format(input_dict['User_Id']))

    print(recommended_list)
