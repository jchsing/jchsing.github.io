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
    {%- for section in page.sections %}
        <a id="{{section.text}}"></a>
        <h3 class="title">{{section.text}}</h3>
        {% bibliography -f {{ site.scholar.bibliography }} -q {{section.bibquery}}[type={{section.type}}] %}
    {%- endfor %}
    
</div>