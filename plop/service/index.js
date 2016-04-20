/**
 * Created by Kobi on 4/20/2016.
 */
'use strict';

export default plop => {
  plop.setGenerator('service', {
    description: 'Create a client service',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your service?'
      }
    ],
    actions:
    [{
      type: 'add',
      path: 'www/app/services/{{name}}.service.js',
      templateFile: 'plop/service/service.hbs'
    }]
  })
};
