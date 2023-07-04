import { Direction } from "../HandleEvent/direction";
import { ViewModelSize } from "../constants";
import { ViewModelMap } from "./ViewModelMap";

export abstract class ViewModelBase
{
    id: number;
    protected abstract size: ViewModelSize;
    constructor() {
        this.id = createID();
        ViewModelMap.register(this.id, this);
        console.log('Created a view model: ' + this.constructor.name + ', ID: ' + this.id);
    }
    abstract updateSize(parentSize: ViewModelSize): void;
    abstract getMainContainer(): HTMLElement;
    abstract setCursor(range: Range, direction: Direction): void;
    abstract cursorAtEdge(range: Range, direction: Direction): boolean;
    abstract canDelete(): boolean;
    abstract getContentContainers(): HTMLElement[];
    getSize(): ViewModelSize
    {
        return this.size;
    }
    destroy()
    {
        this.getMainContainer().remove();
        ViewModelMap.remove(this.id);
        console.log('Destroyed a view model');
    }
}

let nextId: number = 0;

function createID(): number
{
    let id = nextId;
    nextId++;
    return id;
}