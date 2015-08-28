---
layout: blog-post
title: Tips for starting any X11 apps (e.g. eclipse) in a docker container from a linux host
place: Rennes, France
categories: [docker, eclipse]
---
Just a tips for starting any X11 apps (e.g. eclipse) in a docker container from a linux host

<!--more-->


{% highlight bash %}
docker run -i -t -e DISPLAY=unix$DISPLAY -v=/tmp/.X11-unix:/tmp/.X11-unix:rw barais/eclipse-xtend /eclipse/eclipse
{% endhighlight %}

Do not forget to let external app to connect to X.
{% highlight bash %}
{% raw  %}
xhost + # for lazy reckless idiot (as me)
#For others
xhost +local:`docker inspect --format='{{ .Config.Hostname }}' $containerId`
{% endraw  %}
{% endhighlight %}

Next you can restart your container using:

{% highlight bash %}
{% raw  %}
xhost +local:`docker inspect --format='{{ .Config.Hostname }}' $containerId`
docker start $containerId
{% endraw  %}
{% endhighlight %}

To start google chrome

{% highlight bash %}
{% raw  %}
docker run -i -t -e DISPLAY=unix$DISPLAY -v=/tmp/.X11-unix:/tmp/.X11-unix:rw barais/browser google-chrome --disable-setuid-sandbox --user-data-dir=/tmp
{% endraw  %}
{% endhighlight %}

To start firefox

{% highlight bash %}
{% raw  %}
docker run -i -t -e DISPLAY=unix$DISPLAY -v=/tmp/.X11-unix:/tmp/.X11-unix:rw barais/browser firefox
{% endraw  %}
{% endhighlight %}


I think that I have to test that for teaching or tutorials...

