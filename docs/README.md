# bHooman

![alt bHooman Project](https://media.giphy.com/media/L4fB9di7ekn3F5PXaW/giphy.gif)

## Intro
----

bHooman es una aplicación que busca crear una comunidad para compartir, crear e incentivar las buenas acciones que podemos hacer cada día por otros y por el planeta, de forma desinteresada y recordándonos ser más humanos cada día. 

## Functional Description
---
- Ver la lista completa de acciones
- Filtrar buenas acciones, según descripción, tiempo requerido, dinero requerido.
- Añadir buenas acciones a su lista de favoritas
- Elminar buenas acciones de su lista de favoritas
- Crear buenas acciones propias, configurarlas para que sean privadas o públicas para incluirlas en la lista pública disponible
- Modificar las buenas acciones que ha creado
- Eliminar las buenas acciones que ha creado
- Agendar las buenas acciones de cada día
- Modificar las agendas que ha programado
- Eliminar las agendas que ha programado
- Configurar las notificaciones a recibir
- Agregar otros usuarios a su lista de seguidos
- Buscar usuarios por nombre de perfil
- Ver la lista de usuarios seguidos
- Ver el perfil otros usuarios
- Eliminar usuarios de su lista de seguidos

### Use Cases
![alt Use Cases](./images/useCases.png)

### Flow Charts

#### Schedule Act
![alt Schedule Act Diagram](./images/scheduleDiagram.jpg)

#### Create Act
![alt Create Act Diagram](./images/createDiagram.jpg)

#### Add Favorite
![alt Add Favorite Diagram](./images/addFavDiagram.jpg)

### User Interface (UI)
___

#### Landing
![alt Landing Interface](./images/user-interface/landing.jpg)

#### Register
![alt Register Interface](./images/user-interface/register.jpg)

#### Home
![alt Home Interface](./images/user-interface/home.jpg)

##### Home - Schedule
![alt Schedule Interface](./images/user-interface/schedule.jpg)

#### My Acts 
##### My Acts - scheduled
![alt My Scheduled Acts Interface](./images/user-interface/myActs-scheduled.jpg)

##### My Acts - creations
![alt My Created Acts Interface](./images/user-interface/myActs-creations.jpg)

###### My Acts - creations - create
![alt Create Act Interface](./images/user-interface/myActs-create.jpg)

###### My Acts - creations - edit
![alt Edit Act Interface](./images/user-interface/myActs-edit.jpg)

###### My Acts - creations - delete
![alt Delete Act Interface](./images/user-interface/myActs-delete.jpg)

##### My Acts - favorites
![alt My Favorites Acts Interface](./images/user-interface/myActs-favorites.jpg)

#### Community
![alt Community Interface](./images/user-interface/community.jpg)

##### Community - Search
![alt Search Community Interface](./images/user-interface/community-search.jpg)

##### Community - Other User Profile
![alt Community Profile Interface](./images/user-interface/community-userProfile.jpg)

#### Profile
![alt Profile Interface](./images/user-interface/profile.jpg)

##### Profile- Update Profile
![alt Update Profile Interface](./images/user-interface/profile-updateProfile.jpg)

##### Profile- Update Password
![alt Update Password Interface](./images/user-interface/profile-updatePassword.jpg)

##### Profile- Delete Account
![alt Delete Account Interface](./images/user-interface/profile-deleteAccount.jpg)

##### Profile- Activity
![alt Activity Interface](./images/user-interface/profile-activity.jpg)


## Technical Description
---

### Blocks

![alt Blocks Diagram](./images/blocks.jpg)

### Data Model

#### Schemas

user
- username (String, required, unique)
- email (String, required, unique)
- password (String, required)
- favs ([ObjectId: Action])
- notifications (Boolean, required, default: false)
- following ([ObjectId: User])
- follower ([ObjectId: User])

actions
- description (String, required)
- public (Boolean, required, default: false)
- requiredTime (Number, required)
- requiredBudget ( Number, required)
- author (ObjectId: User, required)

schedules
- user (ObjectId: User, required)
- action (ObjectId: Action, required)
- date (Date, required)
- repeat (String ['once', 'daily', 'weekly', 'biweekly', 'monthly', 'none'], default: 'once', required)
- completed ([Date])

![alt Data Model](./images/ERDiagram.jpg)


### Technologies
- Javascript
- React
- CSS
- Sass
- HTML
- Express
- Mongo
- Node


------------------------------------

# TASK LIST

## Docs
- ~~DONE introduce the project, describe it (.5h)~~

### Functional Description
- ~~DONE create use cases diagram (.25h)~~ 
- ~~DONE create wireframes in figma (alt excalidraw) (3h)~~
- ~~DONE create wireframes in README (images) (1h)~~

### Techincal Description
- ~~DONE create blocks diagram (.5h)~~
- ~~DONE create data model in paper (1h)~~
- ~~DONE create data model in diagrams.net (E/R) (1h)~~
- ~~DONE create data model in README (images) (1h)~~

## Server

### Data
- ~~DONE create mongoose schemas and models (2h)~~
- ~~DONE create populate.js to test my models (1h)~~
- ~~DONE populate database with actions~~

### Logic
- ~~DONE create logic methods (20h)~~
- ~~DONE test logic methods in demo.js (4h)~~

### API
- ~~DONE create .env (0.1h)~~
- ~~DONE create helpers (1h)~~
- ~~DONE create index.js (1h)~~
- ~~DONE create handlers(2h)~~
- ~~DONE test with Insomnia (1h)~~

## Client

### App Logic
- ~~DONE create App logics (3h)~~
- ~~DONE test with snippets(2h)~~

### App
- ~~DONE  create main views (components) (1h)~~
- ~~DONE mechanize navigations (.5h)~~


# TASK LIST
- Testing
- Feedback
- Manejo de errores
- Calendario
- Notificaciones Push
- Vista Actividad Usuario (gráficos)
- Validación repeticiones al crear acciones públicas