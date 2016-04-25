/**
 * Created by Kobi on 4/20/2016.
 */
'use strict';


export default plop => {
  plop.setGenerator('view', {
    description: 'Create a new screen and his components',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your view?'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'www/app/{{dashCase name}}/{{dashCase name}}.controller.js',
        templateFile: 'plop/view/controller.hbs'
      },
      {
        type: 'add',
        path: 'www/app/{{dashCase name}}/{{dashCase name}}.html',
        templateFile: 'plop/view/html.hbs'
      },
      {
        type: 'add',
        path: 'www/app/{{dashCase name}}/{{dashCase name}}.less',
        templateFile: 'plop/view/less.hbs'
      }
    ]
  })
};

