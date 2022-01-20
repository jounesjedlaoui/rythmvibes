# RYTHMVIBES ~
A music Visualizer build with react-three-fiber and Web Audio API.

Allow the app access to your microfone and turn up the volume!
Productive: https://jefrey776.github.io/rythmvibes/

*This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).*
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

### Code:
  - react-three-fiber wird genutzt um three.js-Objekte als React-Componenten mit State zu rendern.
  - Web-Audio-API greift auf das Mikrofoninput zu und liest die Amplitude mithilfe von AudioNodes aus.
  - zustand informiert die Geometrieobjekte über Amplitudenwert.
  - Geometrie in GeoContainer gesammelt.
  - GeoContainer löscht und erstellt Geometrieobjekte.
  - Jedes Geometrieobjekt hat seinen eigenen State und rendert ein THREE.Mesh mit einer THREE.Geometry und einem THREE.Material.
  - Die Parameter werden von der Mikrofonamplitude beeinflusst und können mit einem controllerInterface manipuliert werden.

### Build: 
  - Productionbuild wird mit npm erstellt.
### Test:
  - der Productionbuild wird mit 
    ### `npm predeploy`
    erstellt und kann mit 
    ### `npm start`
    lokal gehostet und getestet.
### Release
  - Nicht behandelt
### Deploy:
  - Deploy über:
    ### `npm run deploy`
### Operate:
### Monitor:


## Sources:
react-three-fiber: https://docs.pmnd.rs/react-three-fiber/ \
zustand: https://github.com/pmndrs/zustand \
Web-Audio-API: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API \
githubpages: https://docs.github.com/en/pages \
