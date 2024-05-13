To run this application below set up required.
Software needed:
a. python
b. node
c. mysql

Python Dependencies:
# install
pip install pipreqs

# Run in current directory
python -m  pipreqs.pipreqs .

Steps to run application:
1. create a mysql database carzo  using carzo_datadump.sql
2. install python requirements 
    a. cd carzo\app
    b. pip install -r requirements.txt
3. start flask app.
    a. cd carzo\app
    b. python app.py
4. start ui 
    a. npm start
