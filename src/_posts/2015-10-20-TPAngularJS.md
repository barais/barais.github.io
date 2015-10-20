---
layout: blog-post
title: Quelques éléments pour le TP sur AngularJS
place: Rennes, France
categories: [teaching, ISTIC, M2, french]
---
Hello très chers étudiants,

Pour ce premier TP de GLI, nous allons étudier AngularJS. Pour la mise en place de l'environnement, la compilation, le lancement du serveur ..., nous utiliserons [maven](http://maven.apache.org/) pour la partie serveur, [npm](https://www.npmjs.org/) et [bower](http://bower.io/).

<!--more-->

###Etape -1: NodeJS###
Installez nodejs

{% highlight bash %}
sudo apt-add-repository ppa:chris-lea/node.js
{% endhighlight %}
Rechargez la liste des paquets ;
{% highlight bash %}
sudo apt-get update
{% endhighlight %}
Installez les paquets nodejs.
{% highlight bash %}
sudo apt-get install nodejs
#tester si npm est présent, 
npm -v
#sinon 
sudo apt-get install npm 
{% endhighlight %}



###Etape 0: Installation de bower###
Si tout va bien, npm et node sont installés. (Voir post sur l'opération portable ou l'étape -1). 

{% highlight bash %}
sudo npm install -g  bower
{% endhighlight %}

###Etape 1: Initialisation du projet###

Dans le répertoire src/main/webapp de votre projet de TAA. 


{% highlight bash %}
bower install angular#1.2.26
{% endhighlight %}

Cette action télécharge angularjs et l'install dans votre projet. 

Allez dans le répertoire app nouvellement créé.

Téléchargez le fichier [posts.json](../../../docs/posts.json) suivant. 
Dans le répertoire app
{% highlight bash %}
wget http://olivier.barais.fr/docs/posts.json
{% endhighlight %}

Toujours dans le répértoire app, créez le fichier html suivant. 

{% highlight html %}
{% raw  %}
<!doctype html>
<html lang="en" ng-app id="ng-app">
	<head>    
		<script src="bower_components/angular/angular.min.js"></script>
		<script>
		function PostsCtrlAjax($scope, $http)
		{

		$http({method: 'GET', url: 'posts.json'}).success(function(data) {
		$scope.posts = data;
		});
		}
		</script>
		<style>
		body{font-family:arial; font-size:12px;padding:10px;}
		.postBody{ width:550px; border-bottom:dashed 2px #dedede}
		.postBody a{color:#333333;text-decoration:none}
		.postBody a:hover{color:#006699;background-color:#dedede}
		.time{margin:10px 0px 10px 0px; color:#006699; }
		</style>
	</head>

	<body >
		<h1>Parsing JSON with Angular JS Tutorial</h1>   
			<div id="ng-app" ng-app ng-controller="PostsCtrlAjax">  
			<div ng-repeat="post in posts" class='postBody'>
			<h2><a href='{{post.url}}'>{{post.title}}</a></h2>
			<div class='time'>{{post.time}} - {{post.author}} </div>
			<p>{{post.description}}</p>
			<img ng-src="{{post.banner}}" style='width:550px'/>
			</div>
			</div>
	</body>
</html>
	{% endraw  %}
{% endhighlight %}


Lancez un serveur web. A la racine de votre projet. 

{% highlight bash %}
sudo  npm install http-server -g
http-server
{% endhighlight %}

RDV sur [http://localhost:8080/app/index.html](http://localhost:8080/app/index.html)



###Etape 2: Partir d'un squelette de projet plus classique###

Supprimer tout ce qui se trouve dans votre répertoire web-app

Installez compass

{% highlight bash %}
gem update --system
gem install compass
{% endhighlight %}

Vérifiez les éléments nécessaire pour générer un projet avec yeoman

{% highlight bash %}
npm install -g grunt-cli bower yo generator-karma generator-angular
{% endhighlight %}


Make a new directory, and cd into it:

{% highlight bash %}
mkdir my-new-project && cd $_
{% endhighlight %}


Run yo angular, optionally passing an app name:

{% highlight bash %}
yo angular [app-name]
{% endhighlight %}

Run grunt for building and grunt serve for preview
{% highlight bash %}
grunt
grunt serve
{% endhighlight %}

Vous pouvez utilisez eclipse ou intelliJ pour éditer votre projet. 

[eclipse angular](http://marketplace.eclipse.org/content/angularjs-eclipse#.VEdV8XVtPUY)

[intelliJ angular](https://plugins.jetbrains.com/plugin/6971?pr=phpStorm)



###Etape 3: Construire l'IHM de votre application de faites en TAA à l'aide d'angularjs.###


Have fun ;)

