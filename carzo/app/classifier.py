import pandas as pd
import tensorflow as tf
import numpy as np
import sklearn
import os
from sklearn.model_selection import train_test_split

data = pd.read_csv("D:\RecommendationSystem\Vechicle_Insurance_Recommendation\clean_data\master_data.csv")
data_original = pd.read_csv("D:\RecommendationSystem\Vechicle_Insurance_Recommendation\clean_data\master_data.csv")

data.drop(['User_Id'],axis=1,inplace=True)
data.drop(['makeId'],axis=1,inplace=True)
data.drop(['year'],axis=1,inplace=True)
data.drop(['Price'],axis=1,inplace=True)
data.drop(['modelId'],axis=1,inplace=True)
data.drop(['modelName'],axis=1,inplace=True)
data.drop(['makeName'],axis=1,inplace=True)

data['NAV_Category'] = pd.factorize(data['NAV_Category'])[0]
data['IDV_Category'] = pd.factorize(data['IDV_Category'])[0]
data['Owned'] = pd.factorize(data['Owned'])[0]
data['Parking_Space'] = pd.factorize(data['Parking_Space'])[0]
data['Anti_Theft'] = pd.factorize(data['Anti_Theft'])[0]
data['Commute'] = pd.factorize(data['Commute'])[0]
data['Locality'] = pd.factorize(data['Locality'])[0]
data['DL_Suspended'] = pd.factorize(data['DL_Suspended'])[0]
data['State'] = pd.factorize(data['State'])[0]
data['usage'] = pd.factorize(data['usage'])[0]

data.loc[data.Comp == 'Comprehensive Coverage','Comp'] = 1
data.loc[data.Collision == 'Collision Coverage','Collision'] = 1
data.loc[data['Car Rental'] == 'Car Rental I','Car Rental'] = 1
data.loc[data.Umbrella == 'Personal Umbrella Coverage','Umbrella'] = 1
data.loc[data.PIP == 'Personal Injury Protection','PIP'] = 1
data.loc[data.Med == 'Med Pay','Med'] = 1
data.loc[data.Gap == 'Gap Insurance','Gap'] = 1

data['Comp'] = data['Comp'].fillna(0)
data['Collision'] = data['Collision'].fillna(0)
data['Car Rental'] = data['Car Rental'].fillna(0)
data['Umbrella'] = data['Umbrella'].fillna(0)
data['PIP'] = data['PIP'].fillna(0)
data['Med'] = data['Med'].fillna(0)
data['Gap'] = data['Gap'].fillna(0)

nav_category = tf.feature_column.numeric_column('NAV_Category')
idv_category = tf.feature_column.numeric_column('IDV_Category')
owned = tf.feature_column.numeric_column('Owned')
parking_space = tf.feature_column.numeric_column('Parking_Space')
anti_theft = tf.feature_column.numeric_column('Anti_Theft')
commute = tf.feature_column.numeric_column('Commute')
locality = tf.feature_column.numeric_column('Locality')
dl_suspended = tf.feature_column.numeric_column('DL_Suspended')
state = tf.feature_column.numeric_column('State')
usage = tf.feature_column.numeric_column('usage')

feature_cols = [nav_category,idv_category,owned,parking_space,anti_theft,commute,locality,dl_suspended,state,usage]

X_data = data.drop(["Liability Coverage","Comp","Collision","Car Rental","Umbrella","PIP","Med","Gap","Policy"],axis=1)
X_data=X_data.astype('int')


dir_path = os.path.dirname('D:/RecommendationSystem/Vechicle_Insurance_Recommendation/Project/carzo/app/models/')

def predictedPolicies_fn(x_test):
    predict_list = []
    policies = ['Comp','Collision','Car Rental','Umbrella','PIP','Med','Gap']
    for policy in policies:
        lables = data[policy]  
        x_train,x_test,y_train,y_test = train_test_split(X_data,lables,test_size=0.10,random_state=101)
        input_func = tf.estimator.inputs.pandas_input_fn(x=x_train,y=y_train,batch_size=100,num_epochs=1000,shuffle=True)    
        model=tf.estimator.LinearClassifier(feature_columns=feature_cols,n_classes=2)
        model.train(input_fn=input_func,steps=1000)          
        pred_input_func = tf.estimator.inputs.pandas_input_fn(x=x_test,batch_size=1,num_epochs=1,shuffle=False)
        predictions = list(model.predict(input_fn=pred_input_func))    
        predict_list.append([policy,predictions[0]['class_ids'][0]])    
    return predict_list

def getState_fn(stateName):    
    data_original['State_fact'] = pd.factorize(data_original['State'])[0]    
    temp_df = data_original.loc[data_original['State'] == stateName]    
    print(temp_df.iloc[0]['State_fact'])
    return temp_df.iloc[0]['State_fact']
