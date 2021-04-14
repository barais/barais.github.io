---
layout: blog-post
title: Quelques éléments pour le TP sur AngularJS
description: Enoncé de TP sur AngularJS
place: Rennes, France
categories: [teaching, istic, m2, french]
published: true
---
Hello très chers étudiants,

Pour ce premier TP de GLI, nous allons étudier AngularJS. Pour la mise en place de l'environnement, la compilation, le lancement du serveur ..., nous utiliserons [maven](http://maven.apache.org/) pour la partie serveur, [npm](https://www.npmjs.org/) et [bower](http://bower.io/).

<!--more-->

### Etape -1: NodeJS

Installez la dernière version de nodejs

```bash
curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
```

Installez les paquets nodejs.

```bash
sudo apt-get install nodejs
#tester si npm est présent, 
npm -v
#sinon 
sudo apt-get install npm 
```

Créer le fichier ~/.npmrc

```bash
echo "prefix = $HOME/.node" > $HOME/.npmrc
```

Dans votre fichier ~/.bashrc,
Ajoutez les lignes suivantes. 

```bash
export PATH=$HOME/.node/bin:$PATH
export NODE_PATH=$NODE_PATH:/home/barais/.node/lib/node_modules/
```

Relancez votre terminal. 

Mettez à jour npm

```bash
npm install -g  npm
```


### Etape 0: Installation de bower

Si tout va bien, npm et node sont installés. (Voir post sur l'opération portable ou l'étape -1). 

```bash
npm install -g  bower
```

### Etape 1: Initialisation du projet

Dans le répertoire src/main/webapp de votre projet de TAA. 


```bash
bower install angular#1.2.26
```

Cette action télécharge angularjs et l'install dans votre projet. 


Téléchargez le fichier [posts.json](../../../docs/posts.json) suivant. 

```bash
wget http://olivier.barais.fr/docs/posts.json
```

Toujours dans le répértoire courant, créez le fichier html suivant. 

```html

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
	
```


Lancez un serveur web. A la racine de votre projet. 

```bash
npm install http-server -g
http-server #ou hs pour certaines versions
```

RDV sur [http://localhost:8080/app/index.html](http://localhost:8080/index.html)



### Etape 2: Partir d'un squelette de projet plus classique

Supprimer tout ce qui se trouve dans votre répertoire web-app

Installez compass

```bash
sudo gem update --system
sudo apt-get install ruby-dev
sudo gem install compass
```

Vérifiez les éléments nécessaire pour générer un projet avec yeoman

```bash
npm install -g grunt-cli bower yo generator-karma generator-angular
```


Make a new directory, and cd into it:

```bash
mkdir my-new-project && cd $_
```


Run yo angular, optionally passing an app name:

```bash
yo angular [app-name]
```

Run grunt for building and grunt serve for preview
```bash
grunt
grunt serve
```

Vous pouvez utilisez eclipse ou intelliJ pour éditer votre projet. 

[eclipse angular](http://marketplace.eclipse.org/content/angularjs-eclipse#.VEdV8XVtPUY)

[intelliJ angular](https://plugins.jetbrains.com/plugin/6971?pr=phpStorm)



### Etape 3: Construire l'IHM de votre application de faites en TAA à l'aide d'angularjs.


Have fun ;)

