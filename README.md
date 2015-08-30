cu-ui-v2
========

> example CU-UI structure

---

Installation
------------

Clone this repository:

```sh
git clone https://github.com/Mehuge/cu-ui-v2.git
```

Then run `init-dev.cmd`

Alternatively you can run all the setup commands manually:

```
# install development packages
npm install

# clone libraries
git clone https://github.com/Mehuge/cu-components lib/cu-components

# install all module and library dependencies/definitions
gulp install
```

---

Development
-----------

To develop the UI you have the following commands (provided by build-tools):

#### `gulp install`

This will ensure all the modules/libraries have their dependencies installed properly.
It also generates `.csproj` files for integration with VS

#### `gulp publish`

This will build all the modules/libraries into the `publish` directory ready for testing in the client.

#### `gulp server`

This will start a server to preview all the modules/libraries. It will also inject a fake `cuAPI` into all pages,
so things don't break outside of the client.

#### `gulp %MODULE%`

This will publish a specific module, e.g. `gulp character` will publish the `character` module.

#### `gulp %MODULE%::%TASK`

This will allow you to run a gulp task on a specific module, e.g. `gulp character::watch` will start watching the
character module for changes.
