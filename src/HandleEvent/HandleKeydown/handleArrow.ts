import { MainDivViewModel } from "../../ViewModels/MainDivViewModel";
import { TextViewModel } from "../../ViewModels/TextViewModel";
import { ViewModelBase } from "../../ViewModels/ViewModelBase";
import { ViewModelMap } from "../../ViewModels/ViewModelMap";
import { assert } from "../../assert";
import { setCursor, setCursorOffset } from "../../setCursor";
import { Direction, inverseOf } from "../direction";
import { getHTMLElement } from "../getHTMLElement";
import { updateView } from "../updateView";

export function handleArrow(range: Range, container: HTMLElement, event: KeyboardEvent, direction: Direction)
{
    let viewModel = ViewModelMap.getViewModel(container);
    // if view model is not text view model, and the cursor is at the edge, create an empty text view model
    // if view model is text view model, then try find parent's view model and set the cursor to the left of the parent
    // if the parent is div, prevent the event
    if (viewModel instanceof MainDivViewModel) return; // main div will never trigger special arrow move
    if (viewModel.cursorAtEdge(range, direction))
    {
        console.log('Cursor at edge triggered.');
        updateView();
        range = window.getSelection()!.getRangeAt(0);
        container = getHTMLElement(range.startContainer);
        viewModel = ViewModelMap.getViewModel(container);
        console.log('handle arrow start container:');
        console.log(range.startContainer);
        console.log('handle arrow container:');
        console.log(container);
        event.preventDefault();
        if (viewModel instanceof TextViewModel)
        {
            handleArrowText(range, viewModel, event, direction);
        }
        else
        {
            handleArrowNonText(range, viewModel, event, direction);
        }
        
    }
    else if (direction == Direction.Left && range.startOffset == 1)
    {
        event.preventDefault();
        setCursorOffset(range, container,0);
        console.log('set cursor offset to 0');
    }
}
// try go to adjacent element
function handleArrowText(range: Range, textViewModel: TextViewModel, event: KeyboardEvent, direction: Direction)
{
    let textContainer = textViewModel.getMainContainer();
    let leftSibling = textContainer.previousSibling as HTMLElement;
    let rightSibling = textContainer.nextSibling as HTMLElement;
    assert(!leftSibling || leftSibling.nodeName != '#text');
    assert(!rightSibling || rightSibling.nodeName != '#text');
    let sibling = direction == Direction.Left? leftSibling: rightSibling;
    console.log(sibling);
    if (sibling != null)
    {
        console.log(sibling);
        let siblingViewModel = ViewModelMap.getViewModel(sibling);
        siblingViewModel.setCursor(range, inverseOf(direction));
    }
    else
    {
        let parent = textContainer.parentElement!;
        let parentViewModel = ViewModelMap.getViewModel(parent);
        handleArrowNonText(range, parentViewModel, event, direction);
    }
    if (textContainer.innerText == '')
    {
        textViewModel.destroy();
    }
}
// try go to adjacent element
function handleArrowNonText(range: Range, viewModel: ViewModelBase, event: KeyboardEvent, direction: Direction)
{
    if (viewModel instanceof MainDivViewModel) return;
    let mainContainer = viewModel.getMainContainer();
    let leftSibling = mainContainer.previousSibling as HTMLElement;
    let rightSibling = mainContainer.nextSibling as HTMLElement;
    assert(!leftSibling || leftSibling.nodeName != '#text');
    assert(!rightSibling || rightSibling.nodeName != '#text');
    let sibling = direction == Direction.Left? leftSibling: rightSibling;
    if (sibling != null)
    {
        let siblingViewModel = ViewModelMap.getViewModel(sibling);
        siblingViewModel.setCursor(range, inverseOf(direction));
    }
    else
    {
        let parent = mainContainer.parentElement!;
        let parentViewModel = ViewModelMap.getViewModel(parent);
        let parentSize = parentViewModel.getSize();
        let newTextViewModel = new TextViewModel(parentSize);
        let newTextContainer = newTextViewModel.getMainContainer();
        mainContainer.insertAdjacentElement(direction == Direction.Left? 'beforebegin': 'afterend', newTextContainer);
        newTextViewModel.setCursor(range, inverseOf(direction));
    }
}