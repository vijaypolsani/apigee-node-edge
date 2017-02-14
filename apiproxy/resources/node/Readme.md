# OTTO Bulk Asset Update

# Your swagger API in five steps

## 1. Install the swagger module

Install using npm. For complete instructions, see the [install](./docs/install.md) page.

```bash
$ npm install -g swagger
```

## 2. Create a new swagger project

Use the [CLI](./docs/cli.md) to create and manage projects. Learn more on the [quick start](./docs/quick-start.md) page.

```bash
$ swagger project create otto-api
```

## 3. Design your API in the Swagger Editor

The interactive, browser-based [Swagger Editor](http://editor.swagger.io/) is built in. It provides Swagger 2.0 validation and endpoint routing, generates docs on the fly, and consumes easy-to-read YAML.

```bash
$ swagger project edit
```

![screenshot of project editor](./docs/images/project-editor.png)

## 4. Write controller code in Node.js

Code your API's business logic in Node.js.

```js
function postChangeContractManager(req, res) {
    var name = req.swagger.params.name.value || 'stranger';
    var hello = util.format('Hello, %s', name);
    res.json(hello);
}
```

If you look at the Swagger file in the editor (shown in step 3 above), the `x-swagger-router-controller` element (line 17 in the editor screenshot) specifies the name of the controller file associated with the `/hello` path. For example:

```yaml
    paths:
        /hello:
            x-swagger-router-controller: cm
```

Controller source code is always placed in `./api/controllers`. So, the controller source file for this project is `./api/controllers/hello_world.js`.

The `operationId` element specifies which controller function to call. In this case (line 19), it is a function called `hello`. Learn [more](./docs/controllers.md).

## 5. Run the server

Run the project server.

```bash
$ npm start
```

## Now, call the API!

It just works!

```bash
PATCH
$ curl http://127.0.0.1:10010/api/assets

Body: Array of {
[{assetId, contactId}, {assetId, contactId}, ...]
}
Out: [204] OR [503]
```

## Now, call the DOCS!

It just works!

```bash
$ curl http://127.0.0.1:10010/docs
```
![Alt text](https://github.com/vijaypolsani/otto-api/blob/master/docs.png?raw=true "API DOCS")

# <a name="installation"></a>Installing the swagger module

See the [Installing swagger](./docs/install.md) for details.

# <a name="using"></a>Using the swagger module

Go to the [swagger module doc page](./docs/README.md). It includes all the information you need to get started.

# <a name="about"></a>About this project
1. Logging - Bunyan
2. Config File - nConf
3. API - Swagger
4. Async - Bluebird Promises
5. Server - Nodemon
6. Business Services: assets
Note: Default run with production Configuration File.
In local runtime add this: to package.json "start": "nodemon --debug app.js | bunyan -o short", 

# TODO
1. Handling oAuth Token Cache expiry and removal with try..catch
2. Issues when the end target URL is not reachable or having issues
3. Issues with Crucible Client calls Success/Error code&body when 204
4. assetid camelCase
5. Handling error codes
