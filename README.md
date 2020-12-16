# OverView

I had some problems with the npm package mongoose-autopopulate if I use it on some nodejs frameworks. So I made this package if anybody had the same issues.

This is a package that automatically populates an object or a collection reference during the retrieval of the documents.

Currently, I have tried with two nodejs frameworks that would work with no problems( I hope XD ). I am not sure about the other frameworks yet and will be testing on them in the future.

# Instructions

To install the npm package run :

```
npm install mongoose-autopopulator
```

to import the package :

```
import { autoPopulateAllFields } from 'mongoose-autopopulator';
```

## Using Nestjs

In the app.module where you registered the mongodb, add the plugin similar to what the nestjs documentation mentioned.

For example :

```
MongooseModule.forRoot(
      'mongodb://localhost/db-name',
      {
        connectionFactory: (connection) => {

          connection.plugin(autoPopulateAllFields);

          return connection;
        },
      },
    ),
```

## Using Ts.ED

Add the plugin on each schema over the schema class as mentioned in the Ts.ED

for example :

```
@Model()
@MongoosePlugin(autoPopulateAllFields)
export class User{
    .
    .
    .
}
```
