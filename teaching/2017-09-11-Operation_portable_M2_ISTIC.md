---
layout: blog-post
title: Quelques règles pour l'installation des portables
description: documentation pour l'installation des ordinateurs portables par les étudiants
place: Rennes, France
categories: [teaching, istic, m2, french]
published: true
---

Hello très chers étudiants,

Pour la quatrième année, nous experimentons l'usage des TPs pour les M2. Nous sommes partis sur les configurations suivantes[Probook 650 avec 8GO de Ram et un I3](http://www8.hp.com/fr/fr/products/laptops/product-detail.html?oid=5405400#!tab=specs)

### Etape 0: Install OS

Pour l'install, tout marche très bien avec ubuntu 16.04. Pour ceux qui ne l'ont jamais installé. Récupérez une clé usb, téléchargez [Ubuntu Desktop 16.04 en version 64bit et Desktop](http://www.ubuntu.com/download/desktop). Créez votre clé ucb avec par exemple [unetbootin](http://unetbootin.sourceforge.net/). Choisissez DiskImage et l'iso que vous avez téléchargé et sélectionnez en bas votre clé usb, c'est parti. (10 mins de travail, un reboot et c'est bon)

<!--more-->

Au démarrage du PC. Appuyez sur la touche [Echap] puis [F9] et séléctionnez la clé usb pour bootez dessus. Installez ubuntu sur l'ensemble du disque.

Si certains veulent avoir une installation windows. C'est possible l'istic dispose d'un abonnement [MSDN AA](https://www.google.fr/search?q=msdn+aa+istic&oq=msdn+aa+istic&aqs=chrome..69i57.6842j0j7&sourceid=chrome&es_sm=122&ie=UTF-8) qui vous donne accès aux licences des princiaux OS des Microsoft. Dans ce cas commencez par l'install de Windows. Puis installez ubuntu ensuite en demandant un split du disque du type 120 Go pour Windows et 200 pour linux. .

Il est nécessaire de disposer d'une installation linux pour les TPs sans être dans une machine virtuelle.

Sous ubuntu, quand il est installé.

### Etape 1: Java et autres

Installez les paquets suviants:

```bash
sudo apt-get install nano git openjdk-8-jdk openjdk-8-doc maven inkscape
```

Installer aussi la JDK Oracle pour GLI

```bash
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
```

### tape 2: Eclipse

Téléchargez eclipse pour [Java developer](http://www.mirrorservice.org/sites/download.eclipse.org/eclipseMirror/technology/epp/downloads/release/oxygen/R/eclipse-java-oxygen-R-linux-gtk-x86_64.tar.gz) en version 64 et dezipper le par exemple dans /opt/eclipse

### Etape 3: Smartgit

Installez [Smartgit](http://www.syntevo.com/smartgit/)

### Etape 4: NodeJS

Installez nodejs au travers de nvm

Installer nvm (node version manager)

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.4/install.sh | bash
```

The script clones the nvm repository to ~/.nvm and adds the source line to your profile (~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc).

Start a new Terminal

Installez les paquets nodejs.

```bash
nvm install node
```

### Etape 5: VisualVM

[VisualVM](http://visualvm.java.net/eclipse-launcher.html)

### Etape 6: InteliJ

Installez [IntelliJ](http://www.jetbrains.com/idea/) dans /opt

### Etape 7: Docker

Installez Docker

Update the apt package index:

```bash
sudo apt-get update
```

Install packages to allow apt to use a repository over HTTPS:

```bash
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
```

Add Docker’s official GPG key:

```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

Verify that the key fingerprint is 9DC8 5822 9FC7 DD38 854A E2D8 8D81 803C 0EBF CD88.

```bash
sudo apt-key fingerprint 0EBFCD88
```

```
pub   4096R/0EBFCD88 2017-02-22
      Key fingerprint = 9DC8 5822 9FC7 DD38 854A  E2D8 8D81 803C 0EBF CD88
uid                  Docker Release (CE deb) <docker@docker.com>
sub   4096R/F273FCD8 2017-02-22
```

```bash
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
```

INSTALL DOCKER CE

Update the apt package index.

```bash
sudo apt-get update
```

Install the latest version of Docker CE, or go to the next step to install a specific version. Any existing installation of Docker is replaced.

```bash
sudo apt-get install docker-ce
```

Pour vérifier que tout est ok

```bash $ sudo docker run -i -t ubuntu /bin/bash``` Cette dernière commande télécharge un conteneur ubuntu minimal et démarre ce container. Pour plus de documentation sur [docker](http://fr.wikipedia.org/wiki/Docker_(Syst%C3%A8me_de_conteneur_Linux)\)

### Etape 8: Wifi ISTIC

1. Configuez eduroam suivant le [tuto suivant](http://www.eduroam.fr/conf_supplicants/).

1. RDV sur [istic-public](http://istic-public.istic.univ-rennes1.fr/) pour enregistrer votre mac adresse que vous pouvez récupérer à l'aide de la commande suivante: ```bash sudo /sbin/ifconfig``` prendre 'HWaddr XX:XX:XX:XX:XX:XX' de l'interface wlan0.

### Etape 9 Utiliser les imprimantes de l'ISTIC

* Vérifiez que cups est installé

```bash
sudo apt-get update
sudo apt-get install cups
```

* éditer le fichier /etc/cups/client.conf et ajouter la ligne suivante

```bash
ServerName printhost.istic.univ-rennes1.fr
```

pour imprimer, être connecté aux réseaux Wifsic ou Wifsic-free

### Etape 10: Bookmark services utiles

[vm istic](http://vm.istic.univ-rennes1.fr)

### Petit Problème: WIFI et autres

#### Wifi Pour installer le WIFI. Pluggez vous à un réseau filaire

Puis tapez les commandes suivantes

```bash
sudo apt-get update
sudo apt-get install firmware-b43-installer
sudo modprobe b43
sudo modprobe -r b43
sudo modprobe b43
```

#### Certificat incorrect pour OpenJDK (poblème Maven)

```bash
sudo update-ca-certificates
```

#### Problème ACPI (PC qui ne s'éteint pas)

```bash
sudo nano -w /boot/grub/menu.cfg
#Puis enlever tous les paramères, noacpi, noapic ...
```
