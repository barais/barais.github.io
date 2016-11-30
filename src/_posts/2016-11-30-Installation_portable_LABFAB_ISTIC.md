---
layout: blog-post 
title: Quelques règles pour l'installation des portables 
place: Rennes, France
categories: [teaching, ISTIC, LABFAB, french]
---

Hello les makers,

Dans le cadre de cette année de formation, vous aurez un ordinateur portable par personne. Nous sommes partis sur les configurations suivantes[Probook 650 avec 8GO de Ram et un I3](http://www8.hp.com/fr/fr/products/laptops/product-detail.html?oid=5405400#!tab=specs)

###Etape 0: Install OS###

Pour l'install, tout marche très bien avec ubuntu 16.04. Pour ceux qui ne l'ont jamais installé. Récupérez une clé usb, téléchargez [Ubuntu Desktop 16.04 en version 64bit et Desktop](http://www.ubuntu.com/download/desktop). Créez votre clé ucb avec par exemple [unetbootin](http://unetbootin.sourceforge.net/). Choisissez DiskImage et l'iso que vous avez téléchargé et sélectionnez en bas votre clé usb, c'est parti. (10 mins de travail, un reboot et c'est bon)

<!--more-->

Au démarrage du PC. Appuyez sur la touche [Echap] puis [F9] et séléctionnez la clé usb pour bootez dessus. Installez ubuntu sur l'ensemble du disque.

Si certains veulent avoir une installation windows. C'est possible l'istic dispose d'un abonnement [MSDN AA](https://www.google.fr/search?q=msdn+aa+istic&oq=msdn+aa+istic&aqs=chrome..69i57.6842j0j7&sourceid=chrome&es_sm=122&ie=UTF-8) qui vous donne accès aux licences des princiaux OS des Microsoft. Dans ce cas commencez par l'install de Windows. Puis installez ubuntu ensuite en demandant un split du disque du type 120 Go pour Windows et 200 pour linux. .

Il est nécessaire de disposer d'une installation linux pour les TPs sans être dans une machine virtuelle.

Sous ubuntu, quand il est installé.

###Etape 1: Java et autres
Installez les paquets suviants:

{% highlight bash %} 
sudo apt-get install nano git openjdk-8-jdk openjdk-8-doc maven inkscape 
{% endhighlight %}

Installer aussi la JDK Oracle pour GLI

{% highlight bash %} 
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
{% endhighlight %}


###Etape 2: Eclipse

Téléchargez eclipse pour [Java developer](https://eclipse.org/downloads/download.php?file=/technology/epp/downloads/release/neon/R/eclipse-java-neon-R-linux-gtk-x86_64.tar.gz) en version 64 et dezipper le par exemple dans /opt/eclipse

###Etape 3: Smartgit
Installez [Smartgit](http://www.syntevo.com/smartgit/)

###Etape 4: Docker

Installez Docker

{% highlight bash %} 
sudo apt-get update 
sudo apt-get install apt-transport-https 
sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
echo "deb https://apt.dockerproject.org/repo ubuntu-xenial main" | sudo tee /etc/apt/sources.list.d/docker.list
sudo apt-get update 
apt-cache policy docker-engine
sudo apt-get install -y docker-engine
{% endhighlight %}

Pour vérifier que tout est ok

{% highlight bash %} $ sudo docker run -i -t ubuntu /bin/bash {% endhighlight %} Cette dernière commande télécharge un conteneur ubuntu minimal et démarre ce container. Pour plus de documentation sur [docker](http://fr.wikipedia.org/wiki/Docker_(Syst%C3%A8me_de_conteneur_Linux)\)

###Etape 5: NodeJS

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

###Etape 6: VisualVM

[VisualVM](http://visualvm.java.net/eclipse-launcher.html)

###Etape 7: InteliJ
Installez [IntelliJ](http://www.jetbrains.com/idea/) dans /opt

###Etape 8: Wifi ISTIC
1. Configuez eduroam suivant le [tuto suivant](http://www.eduroam.fr/conf_supplicants/).

1.	RDV sur [wifsic-free](http://wifsic-free.istic.univ-rennes1.fr/) pour enregistrer vore mac adresse que vous pouvez récupérer à l'aide de la commande suivante: {% highlight bash %} sudo /sbin/ifconfig {% endhighlight %} prendre 'HWaddr XX:XX:XX:XX:XX:XX' de l'interface wlan0.

###Etape 9 Utiliser les imprimantes de l'ISTIC

* Vérifiez que cups est installé

{% highlight bash %} 
sudo apt-get update 
sudo apt-get install cups 
{% endhighlight %}

-	éditer le fichier /etc/cups/client.conf et ajouter la ligne suivante

{% highlight bash %} 
ServerName printhost.istic.univ-rennes1.fr 
{% endhighlight %}

pour imprimer, être connecté aux réseaux Wifsic ou Wifsic-free

###Etape 10: Bookmark services utiles
[vm istic](http://vm.istic.univ-rennes1.fr)

###Petit Problème: WIFI et autres

####Wifi Pour installer le WIFI. Pluggez vous à un réseau filaire. 
Puis tapez les commandes suivantes 
{% highlight bash %} 
sudo apt-get update 
sudo apt-get install firmware-b43-installer 
sudo modprobe b43
sudo modprobe -r b43 
sudo modprobe b43 
{% endhighlight %}

####Certificat incorrect pour OpenJDK (poblème Maven)

{% highlight bash %} sudo update-ca-certificates {% endhighlight %}

####Problème ACPI (PC qui ne s'éteint pas)

{% highlight bash %} 
sudo nano -w /boot/grub/menu.cfg 
#Puis enlever tous les paramères, noacpi, noapic ... 
{% endhighlight %}
