/**
 * Created by Kobi on 4/20/2016.
 */
'use strict';


export default plop => {
  plop.setGenerator('directive', {
    description: 'Create a directive',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your directive?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'www/app/directives/{{dashCase name}}/{{dashCase name}}.controller.js',
        templateFile: 'plop/directive/controller.hbs'
      },
      {
        type: 'add',
        path: 'www/app/directives/{{dashCase name}}/{{dashCase name}}.html',
        templateFile: 'plop/directive/html.hbs'
      },
      {
        type: 'add',
        path: 'www/app/directives/{{dashCase name}}/{{dashCase name}}.less',
        templateFile: 'plop/directive/less.hbs'
      }
    ]
  })
};

