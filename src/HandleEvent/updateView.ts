import { FormulaViewModel } from "../ViewModels/FormulaViewModel";
import { MainDivViewModel } from "../ViewModels/MainDivViewModel";
import { TextViewModel } from "../ViewModels/TextViewModel";
import { ViewModelBase } from "../ViewModels/ViewModelBase";
import { ViewModelMap } from "../ViewModels/ViewModelMap";
import { assert } from "../assert";
import { CT, ViewModelSize } from "../constants";
import { getContainerType } from "../getSetContainerAttributes";
import { setCursor, setCursorOffset } from "../setCursor";
import { getHTMLElement } from "./getHTMLElement";

export let updateCountDown = 50;
export let updated = true;

export class UpdateInfo
{
    static countDown = 50;
    static updated = true;
    static stimulate()
    {
        this.countDown = 50;
        this.updated = false;
    }
}

export function updateView()
{
    let selection = window.getSelection();
    let range: Range|null = null;
    let rangeContainer: Node|null = null;
    let offset = 0;
    if (selection != null)
    {
        range = selection.getRangeAt(0);
        rangeContainer = range.startContainer;
        offset = range.startOffset;
    }
    
    ViewModelMap.map.forEach(function(viewModel, id, map){
        let containers = viewModel.getContentContainers();
        containers.forEach(function(container, index, array)
        {
            tryUnwrapTextFromContainer(range, rangeContainer, offset, container);
        });
    });

    if (selection != null)
    {
        range = selection.getRangeAt(0);
        rangeContainer = range.startContainer;
        offset = range.startOffset;
    }

    ViewModelMap.map.forEach(function(viewModel, id, map){
        let containers = viewModel.getContentContainers();
        containers.forEach(function(container, index, array)
        {
            tryWrapTextFromContainer(range, rangeContainer, offset, container, viewModel.getSize());
        });
    });
}
export function tryUnwrapTextFromContainer(range: Range|null, rangeContainer: Node|null, offset: number, container: HTMLElement)
{
    container.childNodes.forEach(element => {
        if (element instanceof HTMLElement && getContainerType(element) == CT.TEXTCONTAINER)
        {
            let textViewModel = ViewModelMap.getViewModel(element);
            let textNode = document.createTextNode(element.innerText);
            container.replaceChild(textNode, element);
            textViewModel.destroy();
            if (rangeContainer!=null && getHTMLElement(rangeContainer) == element)
            {
                setCursorOffset(range!, textNode, offset);
            }
        }
    });
    let hasAdjacentText = true;
    let counter = 0;
    while(hasAdjacentText)
    {
        counter++;
        assert(counter < 5, 'infinite loop');
        hasAdjacentText = false;
        for (let index = 0; index < container.childNodes.length; index++) {
            const element = container.childNodes[index];
            if (element.nodeName == '#text')
            {
                let sibling = element.nextSibling;
                if (sibling && sibling.nodeName == '#text')
                {
                    let elementLength = element.textContent!.length;
                    let newTextNode = document.createTextNode(element.textContent! + sibling.textContent!);
                    if (range)
                    {
                        rangeContainer = range.startContainer;
                    }
                    console.log('range container/ sibling:');
                    console.log(rangeContainer);
                    console.log(sibling);
                    container.replaceChild(newTextNode, element);
                    if (range)
                    {
                        if (rangeContainer == sibling)
                        {
                            console.log(offset);
                            console.log(element.textContent!.length);
                            setCursorOffset(range, newTextNode, offset + element.textContent!.length);
                        }
                        else if (rangeContainer == element)
                        {
                            setCursorOffset(range, newTextNode, offset);
                        }
                    }
                    sibling.remove();
                    console.log('merged a container!');
                    hasAdjacentText = true;
                    break;
                }
            }
        }
    }
}

export function tryWrapTextFromContainer(range: Range|null, rangeContainer: Node|null, offset:number, container: HTMLElement, size: ViewModelSize)
{
    container.childNodes.forEach(element => {
        if (element.nodeName == '#text')
        {
            let textViewModel = new TextViewModel(size);
            let textContainer = textViewModel.getMainContainer();
            textContainer.innerText = element.textContent!;
            container.replaceChild(textContainer, element);
            if (rangeContainer!=null && rangeContainer == element)
            {
                setCursorOffset(range!, textContainer, offset);
            }
        }
    });
}