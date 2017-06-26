# hz-accordion
hz-accordion allows to create accordions as resources with all the advatages of an haztivity resource.\
hz-accordion uses [jquery ui accordion](https://jqueryui.com/accordion/) under the hood.
## Install
### NPM
```npm i --save @haztivity/hz-accordion```
## Dependencies
- JQuery
- JQuery UI accordion
- @haztivity/core
## Usage
1. Import @haztivity/hz-accordion
2. Add HzAccordionResource to the page
3. Create the accordion and set ```data-hz-resource="HzAccordion"```
### Ts
```typescript
import {PageFactory, Page, PageController, PageRegister} from "@haztivity/core";
import template from "./page.pug";
import {HzAccordionResource} from "@haztivity/hz-accordion";
export let page: PageRegister = PageFactory.createPage(
    {
        name: "myPage",
        resources: [
            HzAccordionResource
        ],
        template: template
    }
);
```
### Pug
```jade
div(data-hz-resource="HzAccordion")
    h3 Title 1
    div Content 1
    h3 Title 2
    div Content 2
    h3 Title 3
    div Content 3

```
or
### HTML
```html
<div data-hz-resource="HzAccordion">
    <h3>Title 1<h3>
    <div>Content 1</div>
    <h3>Title 2<h3>
    <div>Content 2</div>
    <h3>Title 3<h3>
    <div>Content 3</div>
</div>
```
## Sequence
By default, the accordion requires activate the panel sequentially, to activate the 3rd panel the 2nd muust have been activated before.\
It's possible disable this behavior using the attribute `data-opt-hz-accordion-sequential`
### Pug
```jade
div(data-hz-resource="HzAccordion" data-opt-hz-accordion-sequential="false")
   h3 Title 1
   div Content 1
   h3 Title 2
   div Content 2
   h3 Title 3
   div Content 3
```
or
### HTML
```html
<div data-hz-resource="HzAccordion" data-opt-hz-accordion-sequential="false">
    <h3>Title 1<h3>
    <div>Content 1</div>
    <h3>Title 2<h3>
    <div>Content 2</div>
    <h3>Title 3<h3>
    <div>Content 3</div>
</div>
```
## Options
All the options of jquery ui accordion **except** functions could be specified by attributes using:
```jade
    data-opt-accordion-[option]=[value]
```
If the option have multiple words, use dashes, for example ```heightStyle``` have to be provided as ```height-style```
### Examples:
### Pug
```jade
div(data-hz-resource="HzAccordion"
    data-opt-accordion-collapsible="true"
    data-opt-accordion-active="false"
    data-opt-accordion-header=">.hz-accordion__panel-wrapper > .hz-accordion__header")
    div.hz-accordion__panel-wrapper
        h3.hz-accordion__header Title 1
        div.hz-accordion__panel
            Content 1
    div.hz-accordion__panel-wrapper
        h3.hz-accordion__header Title 1
        div.hz-accordion__panel
            Content 1
    div.hz-accordion__panel-wrapper
        h3.hz-accordion__header Title 1
        div.hz-accordion__panel
            Content 1
```
or
### HTML
```html
<div data-hz-resource="HzAccordion"
     data-opt-accordion-collapsible="true"
     data-opt-accordion-active="false"
     data-opt-accordion-header=">.hz-accordion__panel-wrapper >.hz-accordion__header">
  <div class="hz-accordion__panel-wrapper">
    <h3 class="hz-accordion__header">Title 1</h3>
    <div class="hz-accordion__panel">
      <Content>Content 1</Content>
    </div>
  </div>
  <div class="hz-accordion__panel-wrapper">
    <h3 class="hz-accordion__header">Title 2</h3>
    <div class="hz-accordion__panel">
      <Content>Content 2</Content>
    </div>
  </div>
  <div class="hz-accordion__panel-wrapper">
    <h3 class="hz-accordion__header">Title 3</h3>
    <div class="hz-accordion__panel">
      <Content>Content 3</Content>
    </div>
  </div>
</div>
```