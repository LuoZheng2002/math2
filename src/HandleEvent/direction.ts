export enum Direction
{
    Left,
    Right
}
export function inverseOf(direction: Direction)
{
    return direction == Direction.Left?Direction.Right: Direction.Left;
}