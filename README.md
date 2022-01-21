# RYTHMVIBES ~
<img width="40%" alt="Bildschirmfoto 2022-01-21 um 23 00 36" src="https://user-images.githubusercontent.com/28010466/150606039-114169c0-8659-4d12-939e-e1f87343a1c6.png"> 

Productive: https://jefrey776.github.io/rythmvibes/ \
Repository: https://github.com/Jefrey776/rythmvibes/
_________________________________________________________________________________________________________

## Available Scripts

In the project directory, you can run:
#### For first setup:
### `npm install`

#### Run App locally:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
_________________________________________________________________________________________________________

## DEVOPS PROZESSE

### Plan:
  - Der Planungsteil wurde in Clickup umgesetzt.
    https://app.clickup.com/24367494/v/b/s/42433245
  - Es wurden einzelne Tasks erstellt zugeteilt und nach Status gelabled.
  - Durch die git-Integration wird ein neuer Branch für eine Task erstellt.
 
### Code:
  #### Architektur:
  - react-three-fiber wird genutzt um three.js-Objekte als React-Componenten mit State zu rendern.
  - Web-Audio-API greift auf das Mikrofoninput zu und liest die Amplitude mithilfe von AudioNodes aus.
  - zustand informiert die Geometrieobjekte über Amplitudenwert.
  - Geometrie in GeoContainer gesammelt.
  - GeoContainer löscht und erstellt Geometrieobjekte.
  - Jedes Geometrieobjekt hat seinen eigenen State und rendert ein THREE.Mesh mit einer THREE.Geometry und einem THREE.Material.
  - Die Parameter werden von der Mikrofonamplitude beeinflusst und können mit einem controllerInterface manipuliert werden.

  #### Prozess:
  1. Den Remote-Branch auschecken ( Ich nutze GitHub Desktop )
  2. Task umsetzen
  3. Commit mit Beschreibung
  
### Build: 
   - Der Productionbuild wird mit 
   ### `npm predeploy`
   erstellt und kann mit 
   ### `npm start`
   lokal gehostet und getestet werden.
   
### Test:
  - Keine automatischen Tests.
  - Funktion wird lokal getestet.

### Release
  - Nicht behandelt
  
### Deploy:
  - Deploy über:
    ### `npm run deploy`
  - Wird über github-pages gehostet.
  
### Operate:
  - Nicht behandelt
  
### Feedback:
  - Feedback wird in Task eingetragen.
  - Beim nächsten Treffen/Discord-Meeting wird der aktuelle Stand und der nächste Schritt besprochen und geplant.


## Sources:
react-three-fiber: https://docs.pmnd.rs/react-three-fiber/ \
zustand: https://github.com/pmndrs/zustand \
Web-Audio-API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API \
githubpages: https://docs.github.com/en/pages \
three.js: https://threejs.org/docs/ \
react: https://reactjs.org/docs/getting-started.html \

Set-Up für Audiostream: https://stackoverflow.com/questions/33322681/checking-microphone-volume-in-javascript/64650826 by Morphasis

*This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).*

- Jounes Jedlaoui, Lilian Alice Drabinski, Mariam Barghout
