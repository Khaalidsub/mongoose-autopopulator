export function autoPopulateAllFields(schema: any) {
  let paths = "";
  let arrayPaths = "";
  let arrayLength: any[] = [];

  schema.eachPath(function process(pathname: string, schemaType: any) {
    if (pathname == "_id") return;

    if (schemaType.options.type[0]) {
      if (schemaType.options.type[0].ref) {
        arrayPaths += " " + pathname;
        arrayLength.push(schemaType.options.type.length);
      }
    }
    if (schemaType.options.ref) paths += " " + pathname;
  });

  for (const document of arrayLength) {
    schema.pre("find", arrayHandler);
    schema.pre("findOne", arrayHandler);
    schema.pre("save", arrayHandler);
    schema.pre("update", arrayHandler);
    schema.pre("updateOne", arrayHandler);
    schema.pre("findById", arrayHandler);
  }

  schema.pre("find", handler);
  schema.pre("findOne", handler);
  schema.pre("save", handler);
  schema.pre("update", handler);
  schema.pre("updateOne", handler);
  schema.pre("findById", handler);

  function handler(next: any) {
    //@ts-ignore
    this.populate(paths);
    next();
  }
  function arrayHandler(next: any) {
    //@ts-ignore
    this.populate(arrayPaths);
    next();
  }
}
