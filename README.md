# NESG - Node Express Server Generator

A node command line interface to generator skeleton for express application.
The generator is based on a modules.json file

#### Exemple of modules.json file

```json
{
  "modulesPath": "src/modules",
  "modules": [
    {
      "name": "client",
      "models": [
        {
          "name": "Client",
          "url": "/client",
          "crud": {
            "create": true,
            "read": true,
            "update": true,
            "delete": true
          }
        }
      ]
    }
  ]
}
```

The command line will read file and create the module folder in path declared in the key `modulesPath`.

After that, the following structure will be generated from this modules.json file:

```
src/
-> modules/
    -> client/
        -> controllers/
            -> client.controller.js
    -> models/
        -> client.model.js
    -> routes/
        -> client.routes.js
    -> index.js
```
