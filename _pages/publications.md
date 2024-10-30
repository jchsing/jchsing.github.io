---
layout: page
permalink: /publications/
title: publications
description: (*) denotes equal contribution
nav: true
nav_order: 3
sections: 
  - bibquery: "@article"
    type: "peer-reviewed"
    text: "peer-reviewed articles"
  - bibquery: "@issue"
    type: "special issues"
    text: "special issues"
---

<!-- _pages/publications.md -->
<div class="publications">
    {%- for section in page.sections %}
        <a id="{{section.text}}"></a>
        <h3 class="title">{{section.text}}</h3>
        {% bibliography -f {{ site.scholar.bibliography }} -q {{section.bibquery}}[type={{section.type}}] %}
    {%- endfor %}
</div>