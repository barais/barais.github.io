---
layout: blog-post
title: Running MDMS and MDMS Diversified using docker
place: Rennes, France
categories: [docker,diversify]
---
I am just finishing the docker image to run [mdms](https://github.com/maxleiko/mdms-ringojs) quickly. 

To play with it, just pull the following images. 

{% highlight bash %}
docker pull barais/mdmsredis #contains the redis databases
docker pull barais/mdmssosies #contains the sosies (it is big)
docker pull barais/nginxsosies #contains nginx and the websocket server for displaying connection
{% endhighlight %}

To create quickly a cluster of regular mdms worker 

{% highlight bash %}
{% raw  %}
#!/bin/bash
#start nginx
export ID_REDIS=$(docker  run -i -d -t barais/mdmsredis /usr/bin/redis-server)
export IP_REDIS=`docker inspect --format='{{ .NetworkSettings.IPAddress }}' $ID_REDIS` 
#start some sosies
#run just once
export ID_SOSIES=$(docker  run -i -d -t barais/mdmssosies /bin/bash -xec "sed -i "s/172.17.0.8/$IP_REDIS/g" /opt/mdms-ringojs/config.json && /opt/sosies/ringojs-0.10/bin/ringo /opt/mdms-ringojs/tools/fakedb.js")

#run for each sosies

for i in {1..10}
do
	export ID_SOSIES=$(docker  run -i -d -t barais/mdmssosies /bin/bash -xec "sed -i "s/172.17.0.8/$IP_REDIS/g" /opt/mdms-ringojs/config.json && /opt/sosies/ringojs-0.10/bin/ringo /opt/mdms-ringojs/main.js")
	export IP_SOSIES=`docker inspect --format='{{ .NetworkSettings.IPAddress }}' $ID_SOSIES`
	if [ -z "$IPS_WORKER" ]; then export IPS_WORKER=$IP_SOSIES; else export IPS_WORKER="$IP_SOSIES;$IPS_WORKER"; fi  
done

#start some nginx and websocket server
export ID_NGINX=$(docker  run -i -d -t barais/nginxsosies /main $IPS_WORKER) #you can add a second parameter for the public name of your website e.g. cloud.diversify.org
export IP_NGINX=`docker inspect --format='{{ .NetworkSettings.IPAddress }}' $ID_NGINX`
echo $IP_NGINX
{% endraw  %}
{% endhighlight %}

To create quickly a cluster of diversified mdms workers:

<!--more-->


{% highlight bash %}
{% raw  %}#!/bin/bash
#start nginx
export ID_REDIS=$(docker  run -i -d -t barais/mdmsredis /usr/bin/redis-server)
export IP_REDIS=`docker inspect --format='{{ .NetworkSettings.IPAddress }}' $ID_REDIS`

#start some sosies
#run just once
export ID_SOSIES=$(docker  run -i -d -t barais/mdmssosies /bin/bash -xec "sed -i "s/172.17.0.8/$IP_REDIS/g" /opt/mdms-ringojs/config.json && /opt/sosies/ringojs-0.10/bin/ringo /opt/mdms-ringojs/tools/fakedb.js")

#run for each sosies

for i in {factory_and_indirection_on_RhinoEnginerhino15 factory_and_indirection_on_RhinoEnginerhino16 factory_and_indirection_on_RhinoEnginerhino4 factory_and_indirection_on_RhinoEnginerhino5 factory_and_indirection_on_RhinoEnginerhino8 indirection_on_Streamrhino15 indirection_on_Streamrhino16 indirection_on_Streamrhino4 indirection_on_Streamrhino5 indirection_on_Streamrhino8}
do
	export ID_SOSIES=$(docker  run -i -d -t barais/mdmssosies /bin/bash -xec "sed -i "s/172.17.0.8/$IP_REDIS/g" /opt/mdms-ringojs/config.json && /opt/sosies/$i/bin/ringo /opt/mdms-ringojs/main.js")
	export IP_SOSIES=`docker inspect --format='{{ .NetworkSettings.IPAddress }}' $ID_SOSIES`
	if [ -z "$IPS_WORKER" ]; then export IPS_WORKER=$IP_SOSIES; else export IPS_WORKER="$IP_SOSIES;$IPS_WORKER"; fi  
done

#start some nginx and websocket server
export ID_NGINX=$(docker  run -i -d -t barais/nginxsosies /main $IPS_WORKER) #you can add a second parameter for the public name of your website e.g. cloud.diversify.org
export IP_NGINX=`docker inspect --format='{{ .NetworkSettings.IPAddress }}' $ID_NGINX`
echo $IP_NGINX
{% endraw  %}
{% endhighlight %}

To mix, both of sosies and regular version
{% highlight bash %}
{% raw  %}
#!/bin/bash
#!/bin/bash
#start nginx
export ID_REDIS=$(docker  run -i -d -t barais/mdmsredis /usr/bin/redis-server)
export IP_REDIS=`docker inspect --format='{{ .NetworkSettings.IPAddress }}' $ID_REDIS`

#start some sosies
#run just once
export ID_SOSIES=$(docker  run -i -d -t barais/mdmssosies /bin/bash -xec "sed -i "s/172.17.0.8/$IP_REDIS/g" /opt/mdms-ringojs/config.json && /opt/sosies/ringojs-0.10/bin/ringo /opt/mdms-ringojs/tools/fakedb.js")

#run for each sosies

for i in {1..10}
do
	export ID_SOSIES=$(docker  run -i -d -t barais/mdmssosies /bin/bash -xec "sed -i "s/172.17.0.8/$IP_REDIS/g" /opt/mdms-ringojs/config.json && /opt/sosies/ringojs-0.10/bin/ringo /opt/mdms-ringojs/main.js")
	export IP_SOSIES=`docker inspect --format='{{ .NetworkSettings.IPAddress }}' $ID_SOSIES`
	if [ -z "$IPS_WORKER" ]; then export IPS_WORKER=$IP_SOSIES; else export IPS_WORKER="$IP_SOSIES;$IPS_WORKER"; fi  
done

for i in {factory_and_indirection_on_RhinoEnginerhino15 factory_and_indirection_on_RhinoEnginerhino16 factory_and_indirection_on_RhinoEnginerhino4 factory_and_indirection_on_RhinoEnginerhino5 factory_and_indirection_on_RhinoEnginerhino8 indirection_on_Streamrhino15 indirection_on_Streamrhino16 indirection_on_Streamrhino4 indirection_on_Streamrhino5 indirection_on_Streamrhino8}
do
	export ID_SOSIES=$(docker  run -i -d -t barais/mdmssosies /bin/bash -xec "sed -i "s/172.17.0.8/$IP_REDIS/g" /opt/mdms-ringojs/config.json && /opt/sosies/$i/bin/ringo /opt/mdms-ringojs/main.js")
	export IP_SOSIES=`docker inspect --format='{{ .NetworkSettings.IPAddress }}' $ID_SOSIES`
	if [ -z "$IPS_WORKER" ]; then export IPS_WORKER=$IP_SOSIES; else export IPS_WORKER="$IP_SOSIES;$IPS_WORKER"; fi  
done

#start some nginx and websocket server
export ID_NGINX=$(docker  run -i -d -t barais/nginxsosies /main $IPS_WORKER) #you can add a second parameter for the public name of your website e.g. cloud.diversify.org
export IP_NGINX=`docker inspect --format='{{ .NetworkSettings.IPAddress }}' $ID_NGINX`
echo $IP_NGINX
{% endraw  %}
{% endhighlight %}

To go quickly, shell script are [there](/docs/diversify/diversify.tar.gz)

if it is for a demo, you can switch quickly between version in doing:

{% highlight bash %}
docker kill $(docker ps -a -q) #kill all the running containers
diversify\ docker1.sh #start mdms with 10 regular backends
docker kill $(docker ps -a -q) #kill all the running containers
diversify\ docker2.sh #start mdms with 10 diversified backends
docker kill $(docker ps -a -q) #kill all the running containers
diversify\ docker3.sh #start mdms with 10 diversified backends and 10 regular backends
{% endhighlight %}



have fun ;)

