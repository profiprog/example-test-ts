
export function strgen(sample: string, repeat: number): string {
  return new Array(repeat + 1).join(sample);
}

export function padding(str: string, minSize: number): string {
  return str.length >= Math.abs(minSize) ? str :
    minSize > 0 ? strgen(" ", minSize - str.length) + str :
    minSize < 0 ? str + strgen(" ", -minSize - str.length) :
    str;
}

