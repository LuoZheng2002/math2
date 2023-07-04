import { handleBeforeInput } from "./HandleEvent/HandleBeforeInput/handleBeforeInput";
import { handleKeydown } from "./HandleEvent/HandleKeydown/handleKeydown";
import { UpdateInfo, updateCountDown, updateView, updated } from "./HandleEvent/updateView";
import { MainDivViewModel } from "./ViewModels/MainDivViewModel";
import { CT } from "./constants";
import { setContainerID, setContainerType } from "./getSetContainerAttributes";

console.log('Hello world!');
// configure main div
let mainDiv = document.getElementById('main-div') as HTMLDivElement;
let mainDivViewModel = new MainDivViewModel(mainDiv);

mainDiv.addEventListener('beforeinput', handleBeforeInput);
mainDiv.addEventListener('keydown', handleKeydown);

let updateViewButton = document.getElementById('update-view')!;
updateViewButton.addEventListener('click', function(event){
    updateView();
});
let backgroundStyleLink = document.getElementById('color-css') as HTMLLinkElement;
let debugBackground = true;
let toggleBackgroundButton = document.getElementById('toggle-background')!;
toggleBackgroundButton.addEventListener('click', function(event){
    debugBackground = !debugBackground;
    if (debugBackground)
    {
        backgroundStyleLink.href = 'debug-color.css';
    }
    else
    {
        backgroundStyleLink.href = 'release-color.css';
    }
})

// setInterval(function(){
//     if (UpdateInfo.countDown > 0)
//     {
//         UpdateInfo.countDown--;
//     }
//     if (UpdateInfo.countDown == 0 && !UpdateInfo.updated)
//     {
//         UpdateInfo.updated = true;
//         updateView();
//     }
// }, 100);