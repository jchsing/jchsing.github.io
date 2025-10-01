---
layout: page
title: climate emotions
description: an interactive data dashboard of emotions related to climate change
img: assets/img/dp3_photo.png
importance: 1
category: data stories
---

**background:** this project explores the emotional impact of climate change through interactive data visualizations, based on survey responses from around 600 participants in the [Stanford WELL for Life](https://med.stanford.edu/wellforlife.html). Participants were asked about their climate-related emotions in four Bay Area counties: San Mateo, Santa Clara, San Francisco, and Alameda. Recognizing that emotions are deeply linked to well-being, the study also examines how these emotions intersect with demographic factors and mental health conditions. Key questions include:
* who experiences the strongest emotional responses to climate change?
* how do climate emotions vary across age, gender, and other demographic variables?
* how do climate emotions interact with mental health conditions, such as depression or loneliness?

**project goals:**
* to analyze climate-related emotional data.
* to gain hands-on experience with interactive data visualization tools.
* to create a dashboard that allows users to explore findings dynamically.

*data were used with permission from the Principal Investigator of the Stanford WELL for Life Study.*


#### **about the dashboard**
**landing page:** we created a landing page, which introduces the project and provides context so users can orient themselves before interacting with the dashboard. Here, you’ll find background on the study, the dataset, and the questions guiding the research.
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/dp3_photo.png" title="idea_sketching_1" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

**navigation page:** after the landing page, you encounter the dashboard, which provides three main ways to explore the data:
* **about the data** – View descriptive statistics to understand the sample, including demographics, mental health measures, and reported climate emotions.
* **key findings** – Dive deeper into the core research questions. Examine patterns in climate emotions across demographics and mental health conditions.
* **beyond the bay** – Compare the Bay Area findings to global datasets and see how these emotions manifest in other countries.

this structure allows you to start broad and gradually explore more detailed insights.

we also include a navigation bar on the right, allowing you to return to the home page or navigate to the previous or next pages.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/dp3_navigation.png" title="idea_sketching_1" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

<br>
<br>

#### **final interactive dashboard**
we encourage you to explore the final dashboard <a href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAGGXjPLkJo&#x2F;BEVKalEE8R8GS7VCBA0LFA&#x2F;view?utm_content=DAGGXjPLkJo&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link" target="_blank" rel="noopener">here</a>, for the best experience, but here is a breakdown of the key findings.

*note: this project was completed for the class DESIGN 255: The Design of Data. It is by no means a comprehensive examination of the emotional impact of climate change; rather, it explores a small slice of the topic. All analyses are bivariate, and no multivariate regressions were conducted to assess associations. Please interpret these findings with caution, and remember that correlation does not imply causation!! We welcome any suggestions for improving the analyses.*

#### key findings
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/dp3_finding1.png" title="example image" class="img-fluid rounded z-depth-1" %}
        <div class="caption mt-2">a higher proportion of younger participants feel more anger and anxiety compared to older adults</div>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/dp3_finding2.png" title="example image" class="img-fluid rounded z-depth-1" %}
        <div class="caption mt-2">women are more likely to report frequent feelings of negative emotions than men</div>
    </div>
</div>
<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/dp3_finding3.png" title="example image" class="img-fluid rounded z-depth-1" %}
        <div class="caption mt-2">individuals who feel lonely are more likely to be more anxious about climate change</div>
    </div>
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/dp3_finding4.png" title="example image" class="img-fluid rounded z-depth-1" %}
        <div class="caption mt-2">however, frequent outdoor activities may help combat negative emotions related to climate change</div>
    </div>
</div>

<br>
<br>

<details> 
<summary><strong>interested in the data and methods?</strong> (click to expand)</summary>

<br>

*descriptive analyses were conducted in R and data visualizations were made using Flourish*

**data and information sources:**
* [Stanford WELL for Life (US data)](https://med.stanford.edu/wellforlife.html)
* Hickman, C., et al (2021). Climate anxiety in children and young people and their beliefs about government responses to climate change: a global survey. [The Lancet Planetary Health](https://www.thelancet.com/journals/lanplh/article/PIIS2542-5196(21)00278-3/fulltext#seccestitle80)
* A Guide to Climate Emotions by the [Climate Mental Health Network](https://www.climatementalhealth.net/wheel)

**measures:**
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

</details>