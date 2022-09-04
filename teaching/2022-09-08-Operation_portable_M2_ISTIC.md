---
layout: blog-post
title: Quelques règles pour l'installation des portables
description: documentation pour l'installation des ordinateurs portables par les étudiants
place: Rennes, France
categories: [teaching, istic, m2, french]
published: true
---

Hello très chers étudiants,

### Etape 0: Install OS

Pour l'install des portables, tout marche très bien avec ubuntu 22.04. Pour ceux qui ne l'ont jamais installé. Récupérez une clé usb, téléchargez [Ubuntu Desktop 22.04 en version 64bit et Desktop](http://www.ubuntu.com/download/desktop). Créez votre clé ucb avec par exemple [unetbootin](http://unetbootin.sourceforge.net/). Choisissez DiskImage et l'iso que vous avez téléchargé et sélectionnez en bas votre clé usb, c'est parti. (10 mins de travail, un reboot et c'est bon)

<!--more-->

Au démarrage du PC. Appuyez sur la touche [Echap] puis [F9] et séléctionnez la clé usb pour bootez dessus. Installez ubuntu sur l'ensemble du disque.

Si certains veulent avoir une installation windows. C'est possible l'istic dispose d'un abonnement [MSDN AA](https://istic.univ-rennes1.fr/intranet/accord-microsoft) qui vous donne accès aux licences des princiaux OS des Microsoft. Dans ce cas commencez par l'install de Windows. Puis installez ubuntu ensuite en demandant un split du disque du type 120 Go pour Windows et 200 pour linux. .

Il est nécessaire de disposer d'une installation linux pour les TPs sans être dans une machine virtuelle.

Sous ubuntu, quand il est installé.

### Etape 1: Java et autres

Installez les paquets suviants:

```bash
sudo apt-get install nano git openjdk-11-jdk openjdk-11-doc maven inkscape curl  apt-transport-https  ca-certificates software-properties-common
```

### Etape 2: Eclipse

Téléchargez eclipse pour [Java developer](https://www.eclipse.org/downloads/download.php?file=/technology/epp/downloads/release/2022-06/R/eclipse-jee-2022-06-R-linux-gtk-x86_64.tar.gz) en version 64 et dezipper le par exemple dans /opt/eclipse

### Etape 3: VS-CODE

```bash
curl -sSL https://packages.microsoft.com/keys/microsoft.asc | sudo gpg --dearmor -o /usr/share/keyrings/ms-vscode-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/ms-vscode-keyring.gpg] https://packages.microsoft.com/repos/vscode stable main" | sudo tee /etc/apt/sources.list.d/vscode.list
sudo apt update
sudo apt install -y code
```

### Etape 4: NodeJS

Installez nodejs au travers de nvm

Installer nvm (node version manager)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

The script clones the nvm repository to ~/.nvm and adds the source line to your profile (~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc).

Start a new Terminal

Installez les paquets nodejs.

```bash
nvm install node
```

### Etape 5: VisualVM

[VisualVM](https://visualvm.github.io/)

### Etape 6: InteliJ

Installez [IntelliJ](http://www.jetbrains.com/idea/) dans /opt

### Etape 7: Docker

Remove old version

```bash
sudo apt-get remove docker docker-engine docker.io containerd runc
```

```bash
sudo apt-get update
sudo apt-get install gnupg lsb-release
```

Install keys

```bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

Ajoutez une nouvelle source

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Installez Docker


Update the apt package index.

```bash
sudo apt-get update
```

Install the latest version of Docker CE, or go to the next step to install a specific version. Any existing installation of Docker is replaced.

```bash
 sudo apt-get update
 sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
 ```

Pour vérifier que tout est ok

```bash
sudo docker run -i -t ubuntu /bin/bash
```

Cette dernière commande télécharge un conteneur ubuntu minimal et démarre ce container. Pour plus de documentation sur [docker](http://fr.wikipedia.org/wiki/Docker_(Syst%C3%A8me_de_conteneur_Linux)\))

### Etape 8: Smartgit

Installez [Smartgit](http://www.syntevo.com/smartgit/)

### Etape 9: Liens utiles à lire

[lien](https://ent.univ-rennes1.fr/f/intranet/p/rssEtuEsirIstic.u27l1n88/max/render.uP?pCp)

contient entres autres le lien vers la configuration du vpn et autres. 



### Etape 10: Wifi ISTIC

1. Configuez eduroam suivant le [tuto suivant](http://www.eduroam.fr/).

1. RDV sur [istic-public](http://istic-public.istic.univ-rennes1.fr/) pour enregistrer votre mac adresse que vous pouvez récupérer à l'aide de la commande suivante: 

```bash
sudo /sbin/ifconfig
``` 

prendre 'HWaddr XX:XX:XX:XX:XX:XX' de l'interface wlan0.

### Etape 11 Utiliser les imprimantes de l'ISTIC

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

### Etape 12: Bookmark services utiles

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
