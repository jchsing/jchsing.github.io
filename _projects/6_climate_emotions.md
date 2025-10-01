---
layout: page
title: climate emotions
description: an interactive data dashboard of emotions related to climate change
img: assets/img/dp3_photo.png
importance: 3
category: stanford d.school
---

**background:** in this data visualization project, we delve into the emotional impact of climate change by visually exploring climate-related emotions surveyed in four Bay Area counties (i.e., San Mateo County, Santa Clara County, San Francisco County, and Alameda County). Data are from participants enrolled in the Stanford WELL for Life Study. Recognizing the link between well-being and emotions related to climate change, the study surveyed around 600 participants in 2022 about their emotions related to change change. Here, we compare how these emotions intersect across different demographic variables and mental health conditions, aiming to answer a crucial climate swerve question:  
* "who are most affected by the emotional challenges of climate change?"

we also wanted to know:
* how do climate emotions change across demographics?
* how do climate emotions compound across other mental health issues, including depression and loneliness?

**goal:** the purpose of this project was to (1) analyze data related to a climate-related question, (2) gain hands-on experience with various data visualization tools, and (3) make it as interactive as possible. Data for this project was used with permission from the Principal Investigator of the Stanford WELL for Life Study. 

#### **landing page**
this landing page provides a brief overview about the study and projects so the user can orient themselves before diving into the dashboard. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/dp3_photo.png" title="idea_sketching_1" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

#### **navigation page**
after the landing page, you are presented with three ways to explore the dashboard. 
1. about the data - descriptive statistics of the data
2. key findings - getting into the meat of the research question
3. beyond the bay - zooming out and seeing out the findings compare with participants in other countries. 

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/dp3_navigation.png" title="idea_sketching_1" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

#### **final interactive dasboard**
You can also explore this dashboard in a <a href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAGGXjPLkJo&#x2F;BEVKalEE8R8GS7VCBA0LFA&#x2F;view?utm_content=DAGGXjPLkJo&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link" target="_blank" rel="noopener">new window</a>.

<div style="position: relative; width: 100%; height: 0; padding-top: 56.2500%;
 padding-bottom: 0; box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); margin-top: 1.6em; margin-bottom: 0.9em; overflow: hidden;
 border-radius: 8px; will-change: transform;">
  <iframe loading="lazy" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0;margin: 0;"
    src="https://www.canva.com/design/DAGGXjPLkJo/BEVKalEE8R8GS7VCBA0LFA/view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
  </iframe>
</div>
<div class="caption">
    (c) 2024 Julianna Hsing | project from DESIGN 255: design of data
</div>
<br>
<br>

**data and methods:**

*Descriptive analyses were conducted in R and data visualizations were made using Flourish*

**Data and information sources:**
* [Stanford WELL for Life (US data)](https://med.stanford.edu/wellforlife.html)
* Hickman, C., et al (2021). Climate anxiety in children and young people and their beliefs about government responses to climate change: a global survey. [The Lancet Planetary Health](https://www.thelancet.com/journals/lanplh/article/PIIS2542-5196(21)00278-3/fulltext#seccestitle80)
* A Guide to Climate Emotions by the [Climate Mental Health Network](https://www.climatementalhealth.net/wheel)

**Measures:**
* <u>Climate emotions:</u>
    * Depending on the use case, we categorized the responses for each climate emotion in the following ways: 
        * Original: (1) Never, (2) Almost Never, (3) Sometimes, (4) Fairly Often, (5) Very Often
        * Method A: (1) Never or Almost Never, (2) Sometimes, (3) Fairly Often or Very Often
        * Method B: (1) Yes (Sometimes or Fairly Often or Very Often), (2) No (Almost Never or Never)
* <u>Clinical Depression:</u>
    * “Have you ever been told by a doctor or other health professional that you had or have depression?”
        * (1) Yes, (0) No, (2) Don't know
* <u>UCLA Loneliness Scale:</u>
    * “During the last two weeks, how often did you feel…”
            * ...that you lacked companionship?
            *...left out?
            * ...isolated from others?
        * (3) Often, (2) Sometimes, (1) Hardly Ever
    * Scoring: sum all three items, 3-5 = Not Lonely and 6-9 = Lonely
* <u>Exposure to nature:</u>
    * “How often did you do something outside for a period of time lasting more than 10 minutes?”
        * (1) Never, (2) Almost Never, (3) Sometimes, (4) Fairly oFten, (5) Very Often