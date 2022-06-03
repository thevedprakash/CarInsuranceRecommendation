"""
Import necessary in-built libraries
"""

from math import sqrt
import pickle

import sys
import os


"""
Import necessary modules
"""
from preprocessing import generate_user_profile
from preprocessing import generate_user_purchase_record

from similarity import similarity_score
from similarity import pearson_correlation

def most_similar_users(person, number_of_users,user_dict):
    """
    Function returns the number_of_users (similar persons) for a given specific person.

    Inputs :
    :param person: User_Id of the for whom we want to make recommendation
    :param number_of_users: Number of top-k similar user for specified User.
    :param user_dict : User profile dict to compute similarity

    Output :

    :return: tuple of similarity score and User Id. of top-K number of users (similar persons) for a given specific person.

    """

    scores = [(pearson_correlation(person, other_person,user_dict), other_person) for other_person in user_dict if
              other_person != person]

    # scores = [(similarity_score(person, other_person,user_dict), other_person) for other_person in user_dict if
    #           other_person != person]

    # print("scores : ", scores)

    # Sort the similar persons so that highest scores person will appear at the first
    scores.sort()
    scores.reverse()

    print("scores : ", scores)

    return scores[0:number_of_users]

if __name__ == "__main__":
    # Data Paths Scpecified
    clean_data_path = '../cleaned_data/'
    raw_data_path = '../raw_data/'

    with open(clean_data_path + 'user_profile_dict.pickle', 'rb') as handle:
        user_profile_dict = pickle.load(handle)

    print(most_similar_users(2120, 4,user_profile_dict))