---
layout: blog-post
title: Projet ENSAI
description: Description d'un petit projet de développement donné aux étudiants de l'ENSAI
place: Rennes, France
categories: [teaching, ensai, french]
published: true
---

# Projet Ensai: éditeur universel de matrices de choix commentables

Le but du projet est de permettre la création d'un éditeur universel de matrices de choix pour les PCMs. 

## Cahier des charges

Le cahier des charges est simple:
- application en mode SaaS
- possibilité de charger un modèle de PCMs, de l'éditer, de laisser des commentaires
- Possibilité de sortir un certain nombre de statistiques sur ce modèle
- Possibilité de travailler de manière collaborative sur ce modèle (non requis)

## Environnement technique 
- Java-GWT ou Javascript pour la partie client, Java pour la partie serveur. 
 
## Rendu attendu
- modèle de conception claire (architecture et conception détaillée)
- code source de l'application rendu sur github ou bitbucket en utilisant maven. 

##Liens

Pour créer le projet. 
>  mvn archetype:generate \
   -DarchetypeGroupId=org.codehaus.mojo \
   -DarchetypeArtifactId=gwt-maven-plugin \
   -DarchetypeVersion=2.6.1

[Quelques tips sur GWT](http://olivier.barais.fr/blog/posts/2014.09.29/TPGWT.html)

# Date de rendu

### Livrable d'analyse: 

- Refonte du cahier des charges
- diagramme de cas d'utilisation
- modèle de scénarios,
- mockup écran http://balsamiq.com/products/mockups/
Rendu: 17/11 par mail

### Livrable de conception

- modèle métier
- diagrame de package
- diagramme d'architecture
Rendu: 1/12 par mail

### Livrable de développement

- url du repo github ou bitbucket à fournir
- pas forcément complet
- GWT 
Rendu 16/12

### Resources

[Squelette de projet SmartGWT + Maven](https://github.com/barais/smartgwt5maven.git)

[Exemple de code pour les PCMs](https://github.com/gbecan/Tools4PCM.git)

[Exemple JaxB](http://www.mkyong.com/java/jaxb-hello-world-example/)

[Exemple Jaxb sur les PCMs](https://github.com/barais/demojaxb.git)

Dans votre pom.xml
```xml

<dependency>
	<groupId>com.sun.xml.bind</groupId>
	<artifactId>jaxb-core</artifactId>
	<version>2.2.11</version>
</dependency>
  <dependency>
	<groupId>com.sun.xml.bind</groupId>
	<artifactId>jaxb-impl</artifactId>
	<version>2.2.11</version>
</dependency>

```

Bon courgage ...
