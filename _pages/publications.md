---
layout: page
permalink: /publications/
title: publications
description:
nav: true
nav_order: 3
sections: 
  - bibquery: "@article"
    type: "journal article"
    text: "journal articles"
---

<!-- _pages/publications.md -->
<div class="publications">
{% for y in page.years %}
  <h2 class="year text-left">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}
    
</div>