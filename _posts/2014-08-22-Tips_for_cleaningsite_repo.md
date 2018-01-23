---
layout: blog-post
title: Tips for cleaning my personal website repo
place: Rennes, France
categories: [website]
---
Just a tips for cleaning my personal website repo

<!--more-->


{% highlight bash %}
rm -rf .git/
#clean the files that are too big
git init
git add .
git commit -m "Add README.md (initial commit)"
git remote add origin https://github.com/barais/barais.github.io.git
git push origin --mirror
{% endhighlight %}

I think that I have to test that on [Kevoree](http://www.kevoree.org) repo	 ;)

