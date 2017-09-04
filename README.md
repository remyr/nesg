# NESG - Node Express Server Generator
[![npm version](https://badge.fury.io/js/nesg.svg)](https://badge.fury.io/js/nesg)

A node CLI to generator skeleton for express application.
The generator is based on a modules.json file at the root of your project.

## Description

`$ nesg generate [option]`

## Options

    --help                           Print this help text and exit
    --version                        Print program version and exit
    --modules                        Generate all files for modules defined in modules.json file
    --models                         Generate only models for all modules
    --controllers                    Generate only controlelrs for all modules
    --routes                         Generate only routes for all modules

### Example

`modules.json` file example

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
This is the result of the generator with the `modules.json` file example.
An example of the generation is available [here](https://github.com/remyr/nesg/tree/master/example).

    src/
    |__ modules/
        |__ client/
        |   |__controllers/
        |   |  |__ client.controller.js
        |   |__ models/
        |   |   |__ client.model.js
        |   |__ routes/
        |       |__ client.routes.js
        |__ index.js
        
