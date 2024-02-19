#import mysql.connector
#from mysql.connector import errorcode


config = {
  'user': 'root',
  'password': '',
  'host': '127.0.0.1',
  'port': 3306,
  'database': 'case_study',
  'raise_on_warnings': True
}


import os
import jaydebeapi

# Trova il percorso relativo del file JAR del driver JDBC
jarFile = os.path.join(os.path.dirname(__file__), './lib/derby.jar')
# Definisci il driver JDBC e l'URL di connessione al database
driver = 'org.apache.derby.jdbc.ClientDriver'
url = 'jdbc:derby://localhost:3306/case_study'

def connessione_db():
    try:
        print("Prova connessione")
        #cnx = mysql.connector.connect(**config)
        conn = jaydebeapi.connect(driver, url,jarFile)
        print("Connessione Riuscita")
        #cnx.close()
        conn.close
        print("Connessione Chiusa")
    except Exception as err:
        #if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
       #     print("Something is wrong with your user name or password")
       # elif err.errno == errorcode.ER_BAD_DB_ERROR:
        #    print("Database does not exist")
        #else:
            print("Errore")
            print(err)
            
connessione_db()