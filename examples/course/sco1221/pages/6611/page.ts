/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import * as Prism "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jade";
import {PageFactory, PageRegister, PageController} from "@haztivity/core/index";
import template from "./page.pug";
import {HzAccordionResource} from "../../../resources/hz-accordion/HzAccordion";
export let page: PageRegister = PageFactory.createPage(
    {
        name: "6611",
        resources: [
            HzAccordionResource
        ],
        template: template,
        autoSequence:false
    }
);
page.on(
    PageController.ON_SHOW, null, (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) => {
        Prism.highlightAll(false);
    }
);
page.on(
    PageController.ON_RESOURCE_COMPLETED, null, (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) => {
        console.log("completed");
    }
);