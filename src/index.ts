
export function strgen(sample: string, repeat: number): string {
  return new Array(repeat + 1).join(sample);
}

export function padding(text: string, minSize: number): string {
  return text.length >= Math.abs(minSize) ? text :
    minSize > 0 ? strgen(" ", minSize - text.length) + text :
    minSize < 0 ? text + strgen(" ", -minSize - text.length) :
    text;
}

