# UI5 with UI5 Web Components

This is a monorepo showcasing how to use UI5 Web Components in UI5.

See the corresponding blog post at ... explaining all them concepts underneath.

## overview

The monorepo contains 2 (visually) identical UI5 applications and 1 UI5 library:

-   `packages/ui5-app-xmlcontrols`: UI5 app that-we-used-to-know with standard UI5 controls
-   `packages/ui5-app-webcomponents`: UI5 app with UI5 Web Components, embedded via custom control "bridges"
-   `packages/ui5-webcomponents-lib`: UI5 library exposing UI5 Web Components as custom control "bridges"

## run it

you need `yarn` for this - it allows the dependencies from `ui5-app-webcomponents` to `ui5-webcomponents-lib` to be resolved without additional effort (with the help of `yarn`'s workspaces feature).

```bash
# install npm dependencies,
# do all the linking

$> yarn


# starts (in this order)
# - a build of selected UI5 web components as UI5 custom controls,
#   wrapped into and exposed as a UI5 library "ui5webc"
#
# - http://localhost:8081 - self-contained traditional UI5 app
#   - proxy at /proxy to https://latest-openui5.rikosjett.com
#   - proxy at /backend to OData v4 TripIt service
#
# - http://localhost:8082 - self-contained UI5 app w/ UI5 web omponents
#   - proxy at /proxy to https://latest-openui5.rikosjett.com
#   - proxy at /backend to OData v4 TripIt service

$> yarn start
```

## hack the web components and apps

```bash
# there's also
# - a separate command to watch
#   `packages/ui5-webcomponents-lib` for changes
#   so you can further develop the "bridges"
#   independent of the UI5 applications

# - http://localhost:9081 - debug sources, traditional UI5 app
#   - proxy at /proxy to https://latest-openui5.rikosjett.com
#   - proxy at /backend to OData v4 TripIt service
#
# - http://localhost:9082 - debug sources, self-contained UI5 app w/ UI5 web omponents
#   - proxy at /proxy to https://latest-openui5.rikosjett.com
#   - proxy at /backend to OData v4 TripIt service
#   - live reload upon source changes

$> yarn start:dev
```

## license

This work is licensed under the Derived Beer-ware License:

When you like this stuff, buy [@vobu](https://twitter.com/vobu) a beer or buy [@pmuessig](https://twitter.com/pmuessig) a coke when you see them.
