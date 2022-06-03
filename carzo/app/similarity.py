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



def similarity_score(person1, person2,user_dict):
    """
    Function returns ratio Euclidean distance score of person1 and person2

    Inputs:
    :param person1: User_Id of person1 must be integer value
    :param person2 : User_Id of person2 must be integer value
    :param user_dict : User profile dict to compute similarity

    Output :
    :return: ratio Euclidean distance score of person1 and person2

    """

    common_attributes = {}  # To get both rated items by person1 and person2

    for item in user_dict[person1]:
        if item in user_dict[person2]:
            common_attributes[item] = 1

        # Conditions to check they both have an common rating items
        if len(common_attributes) == 0:
            return 0

        # Finding Euclidean distance
        sum_of_eclidean_distance = []

        for item in user_dict[person1]:
            if item in user_dict[person2]:
                sum_of_eclidean_distance.append(pow(user_dict[person1][item] - user_dict[person2][item], 2))
        sum_of_eclidean_distance = sum(sum_of_eclidean_distance)

        return 1 / (1 + sqrt(sum_of_eclidean_distance))

def pearson_correlation(person1, person2,user_dict):

    """
    Function returns pearson's correlation score of person1 and person2

    Inputs:
    :param person1: User_Id of person1 must be integer value
    :param person2: User_Id of person2 must be integer value
    :param user_dict : User profile dict to compute similarity

    Output :
    :return: pearson's correlation score of person1 and person2

    """

    # To get both rated items
    common_attributes = {}
    for item in user_dict[person1]:
        if item in user_dict[person2]:
            common_attributes[item] = 1

    number_of_ratings = len(common_attributes)

    # Checking for number of ratings in common
    if number_of_ratings == 0:
        return 0

    # Add up all the preferences of each user
    person1_preferences_sum = sum([user_dict[person1][item] for item in common_attributes])
    person2_preferences_sum = sum([user_dict[person2][item] for item in common_attributes])

    # Sum up the squares of preferences of each user
    person1_square_preferences_sum = sum([pow(user_dict[person1][item], 2) for item in common_attributes])
    person2_square_preferences_sum = sum([pow(user_dict[person2][item], 2) for item in common_attributes])

    # Sum up the product value of both preferences for each item
    product_sum_of_both_users = sum([user_dict[person1][item] * user_dict[person2][item] for item in common_attributes])

    # Calculate the pearson score
    numerator_value = product_sum_of_both_users - (
                person1_preferences_sum * person2_preferences_sum / number_of_ratings)
    denominator_value = sqrt(
        (person1_square_preferences_sum - pow(person1_preferences_sum, 2) / number_of_ratings) * (
                    person2_square_preferences_sum - pow(person2_preferences_sum, 2) / number_of_ratings))
    if denominator_value == 0:
        return 0
    else:
        r = numerator_value / denominator_value
        return r

if __name__ == "__main__":

    # Data Paths Scpecified
    clean_data_path = '../cleaned_data/'
    raw_data_path = '../raw_data/'

    with open(clean_data_path + 'user_profile_dict.pickle', 'rb') as handle:
        user_profile_dict = pickle.load(handle)

    print(similarity_score(3158, 2120,user_profile_dict))
    print(pearson_correlation(3158, 2120,user_profile_dict))