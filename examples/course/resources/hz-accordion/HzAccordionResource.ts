/**
 * @license
 * Copyright Davinchi. All Rights Reserved.
 */
import {$, EventEmitterFactory, Resource, ResourceController,DataOptions,ResourceSequence,Navigator} from "@haztivity/core/index";
import "jquery-ui-dist/jquery-ui.js";
interface IOptions {
    on?: string;
    trigger?: string;
}
@Resource(
    {
        name: "HzAccordion",
        dependencies: [
            $,
            EventEmitterFactory,
            DataOptions
        ]
    }
)
export class HzAccordionResource extends ResourceController {
    public static readonly NAMESPACE = "hzAccordion";
    protected static readonly DEFAULTS_ACCORDION = {
        heightStyle:"content"
    };
    protected _DataOptions:DataOptions;
    protected _id;
    protected _namespace;
    protected _triggers:JQuery;
    protected _accordionInstance;
    protected _activated = [];
    constructor (_$, _EventEmitterFactory, _DataOptions){
        super(_$,_EventEmitterFactory);
        this._DataOptions = _DataOptions;
    }
    public init(options: any, config?: any): any {
        this._config = config;
        this._options = options;
        this.refresh();
    }
    public refresh(){
        if(this._accordionInstance){
            this._accordionInstance.destroy();
        }
        let accordionOptions = this._DataOptions.getDataOptions(this._$element, "accordion");
        this._options.accordion = this._$.extend(true,{}, HzAccordionResource.DEFAULTS_ACCORDION, accordionOptions);
        this._$element.accordion(this._options.accordion);
        this._accordionInstance = this._$element.accordion("instance");
        this._accordionInstance.headers.addClass(HzAccordionResource.CLASS_UNCOMPLETED);
        this._storeActive();
        this._assignEvents();
    }
    protected _assignEvents(){
        this._$element.off("."+HzAccordionResource.NAMESPACE);
        this._$element.on( "accordionactivate"+"."+HzAccordionResource.NAMESPACE, {instance:this}, this._onPanelActivate );
        this._$element.on( "accordionbeforeactivate"+"."+HzAccordionResource.NAMESPACE, {instance:this}, this._onBeforePanelActivate );
    }
    protected _onBeforePanelActivate(e,ui){
        let instance = e.data.instance;
        if(instance._options.sequential != false){
            let newHeader = ui.newHeader;
            if(newHeader && newHeader.length > 0){
                let prevent = true,
                    index = instance._accordionInstance.headers.index(newHeader);
                //if the header is not the first
                if(index != 0){
                    //get the previous header
                    let sibling = instance._accordionInstance.headers.get(index-1),
                        siblingId = sibling.id;
                    //check if has been activated
                    if(instance._activated.indexOf(siblingId) != -1){
                        prevent = false;
                    }
                }else{
                    prevent = false;
                }
                if(prevent){
                    e.preventDefault();
                }
            }
        }
    }
    protected _onPanelActivate(e,ui){
        e.data.instance._storeActive();
    }
    protected _storeActive(){
        if(this._accordionInstance){
            if(this._accordionInstance.active.length > 0) {
                let id = this._accordionInstance.active.attr("id");
                if(this._activated.indexOf(id) == -1) {
                    this._activated.push(id);
                    this._accordionInstance.active.removeClass(HzAccordionResource.CLASS_UNCOMPLETED).addClass(HzAccordionResource.CLASS_COMPLETED);
                }
            }
            if(this.isCompleted() != true && this._activated.length == this._accordionInstance.headers.length){
                this._markAsCompleted();
            }
        }
    }
    public disable(){
        if(super.disable()){
            this._$element.accordion("option","disabled",true);
        }
    }
    public enable(){
        if(super.enable()){
            this._$element.accordion("option","disabled",false);
        }
    }
    public destroy(){
        if(this._accordionInstance) {
            this._accordionInstance.destroy();
        }
        super.destroy();
    }
    public getInstance(): any {
        return this._accordionInstance;
    }
}