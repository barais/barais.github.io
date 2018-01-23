---
layout: blog-post
title: Quelques éléments pour le TP sur AngularJS
place: Rennes, France
categories: [teaching, istic, m2, french]
---
Hello très chers étudiants,

Pour ce deuxième TP de GLI, nous allons étudier AngularJS. Pour la mise en place de l'environnement, la compilation, le lancement du serveur ..., nous utiliserons [maven](http://maven.apache.org/) pour la partie serveur, [npm](https://www.npmjs.org/) et [bower](http://bower.io/).

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

Dans le répertoire src/main/webapp de votre projet sur le covoiturage. 


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
mvn compile tomcat7:run
{% endhighlight %}

RDV sur [http://localhost:8080/app/index.html](http://localhost:8080/app/index.html)


###Etape 2: Réalisation d'une première intégration###
Modifiez l'url de téléchargement du contenu json
$http({method: 'GET', url: 'posts.json'}) pour charger le json issu de vos services Java. 

###Etape 3: Rechargement automatique###
Pour recharger automatiquement le contexte de votre application dès que vous modifier un fichier. Dans le pom.xml, configurez le plugin tomcat de la manière suivante. 

{% highlight xml %}
{% raw  %}
<plugin>
	<groupId>org.apache.tomcat.maven</groupId>
	<artifactId>tomcat7-maven-plugin</artifactId>
	<version>2.1</version>
	<configuration>
		<path>/</path>
		<contextFile>src/main/webapp/META-INF/context.xml</contextFile>
	</configuration>
</plugin>
{% endraw  %}
{% endhighlight %}

Dans le fichier src/main/webapp/META-INF/context.xml. 
Placez les lignes suivantes. 

{% highlight xml %}
{% raw  %}
<Context reloadable="true" backgroundProcessorDelay="1">
</Context>
{% endraw  %}
{% endhighlight %}

Relancez 

{% highlight bash %}
mvn compile tomcat7:run
{% endhighlight %}

 Dès que vous modifier une classe Java ou un fichier html, js, ou autres. Plus besoin de relancer maven. 


###Etape 4: Partir d'un squelette de projet plus classique###
Repartez de ce projet de squelette d'Angular pour structurer votre application de manière classique. 
Toujours dans le répertoire web de votre application. 
{% highlight bash %}
git clone https://github.com/angular/angular-seed
{% endhighlight %}


###Etape 5: Partir d'un squelette de projet plus classique###
Vous pouvez utilisez eclipse ou intelliJ pour éditer votre projet. 

[eclipse angular](http://marketplace.eclipse.org/content/angularjs-eclipse#.VEdV8XVtPUY)

[intelliJ angular](https://plugins.jetbrains.com/plugin/6971?pr=phpStorm)


###Etape 6: Construire l'IHM de votre application de covoiturage à l'aide d'angularjs.###


Have fun ;)

