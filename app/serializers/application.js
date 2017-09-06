import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalize(modelClass, resourceHash) {
    console.log(modelClass, resourceHash);
  //   var data = {
  //     id: resourceHash.id,
  //     type: modelClass.modelName,
  //     attributes: resourceHash['_embedded'][modelClass.modelName]
  //   };
  //   return { data: data };
  // }
    return resourceHash['_embedded']
  }
});
