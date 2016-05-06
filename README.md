# HomemadeIonic

## Tools and Frameworks: (client side only)

npm

bower

ionic (with cordova)

angularjs

for debug purpose android sdk


## getting started commands to see screen (on ionic CLI)

ionic serve

ionic serve --lab

ionic run android

## Directives

### hmd-bottom-screen

Enables you to stick stuff to the bottom of the screen (like the 'Submit Review' button)

```html
<hmd-bottom-screen>
	<!-- You put your stuff inside the directive -->
	<button class="button button-block button-calm" ng-click="submitReview()">
		Submit Review
	</button>
</hmd-bottom-screen>
```

## ElasticSearch installation

### Install ElasticSearch on your computer

1. goto https://www.elastic.co/downloads/elasticsearch
2. download the "ZIP" option
3. extract it on your preffered location =] (I prefer D:\Program Files\elasticsearch-*version*)

### Configuring ElasticSearch

You must be wondering why you don't see a thing on the main screen...
It's probably because you haven't configured your elasticsearch server yet

### Well so how do I do it?

It's simple! 

lets just say you installed elasticsearch on folder X (and you start your elasticsearch on path X\bin\elasticsearch)

1. copy our configuration file - that can be found on 'repo\server\recommendation\elastic-configuration\elasticsearch.yml'
2. paste in to X\config (and replace the existing elasticsearch.yml file)
3. restart the elasticsearch server

## Location

### Our google api key

For GeoCoding - AIzaSyCTeACumPhF6_Pvfea5HlfclZMKwM3q-7s
For GeoLocation - AIzaSyDiCceFFKku46mqoskN7ItYqWX5Rg9_SUI (probably not needed)
