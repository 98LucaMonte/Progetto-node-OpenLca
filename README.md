# Demo OpenLca
## Caso studio per laurea triennale 

## Lo scopo
Il cuore del progetto consiste nell’implementazione di un’applicazione web che semplifichi l’utilizzo del software openLca in modo tale che anche utenti non esperti del settore possano utilizzare tale sistema a partire dalla lettura dei dati, il calcolo di un Product System e molto altro ancora.

## Suddivisione file
All'interno della cartella gdt server/Tesi sono presenti: 
- Un DockerFile per far partire il Server IPC offerto dal team di sviluppatori di GreenDelta. Tale file si fa partire attraverso prima il comando:
	- **docker build -t gdt-server .** da eseguire da terminale nella stessa directory del Dockerfile e poi dal comando, 

	- **docker run -p 3000:8080 -v $HOME/openLCA-data-1.4:/app/data --rm -d gdt-server -db case_study** Attenzione però per farlo funzionare è necessario un docker engine come ad esempio quello offerto da Docker Desktop e inoltre serve l'applicazione OpenLca necessaria per andare a permettere la connessione al Database.  
	- Qui di seguito è riportata la repository di GreenDelta in cui ho preso queste informazioni: https://github.com/GreenDelta/gdt-server/
	
- Il file server.js che è il file che fa partire l'applicazione attraverso il comando **node ./server.js** Attenzione è necessario avere node.

-  Il file di configurazione tsconfig.json che mi permette di configurare il compilatore TypeScript.

- I file package.json e package-lock.json che indicano la varie dipendenze della mia applicazione.
 
All'interno della directory gdt server/Tesi/public è presente lo sviluppo del progetto suddiviso in diversi file. 

 1. Il file index.html in cui viene costruita la pagina web che verrà visualizzata.
 2. La directory ts in cui è presente il codice Typescript che si divide in ulteriori directory che sono:
	- frontend/template in cui sviluppo la parte grafica dell'applicazione,
	
	- backend in cui sviluppo di richieste al server-IPC che viene fatto partire attraverso il DockerFile presente nella cartella Tesi. Qui di seguito mostro il link al file della repository in cui sono indicati gli endpoint in cui mi posso collegare: https://github.com/GreenDelta/gdt-server/blob/main/src/main/java/org/openlca/gdt/server/Server.java
	
	- La cartella logic in cui sono implementate la logica di funzionamento di come calcolare un Product System, di come crearlo e di come creare un pdf del report del calcolo di quest'ultimo (purtroppo questa funzionalità non è ancora funzionante per problemi di import di librerie esterne in TypeScript),
	
	- La cartella model in cui sono presenti dei modelli su come debbano essere formati i dati come Product System, Process, Flow, Exchange per poter comunicare con gli endpoint offerti dal Server-IPC,
	
3. css e img in cui sono presenti semplicemente del css e delle immagini per la grafica.

4. dist in cui si trova il codice JavaScript che viene compilato dal compilatore di Typescript,
 
5. Rest-client in cui è presente un tentativo non funzionante di connessione al database di OpenLca che vada a saltare l'ostacolo posto dal server-IPC in cui si possono fare "solo" le richieste agli endpoint indicati dal team di sviluppatori di GreenDelta.
