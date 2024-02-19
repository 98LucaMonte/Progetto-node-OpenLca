import * as mysql from 'mysql2';
export class Db {
    connection;
    constructor() {
        this.connection = mysql.createConnection({
            host: '127.0.0.1',
            port: 3000,
            database: 'dbopenlca'
        });
    }
    avviaConnessione() {
        this.connection.connect((err) => {
            if (err) {
                return console.error('Errore di connessione: ' + err.message);
            }
            console.log('Connessione riuscita al db.');
        });
    }
}
