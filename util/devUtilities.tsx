// this function helps me figure out what certain variable types are so i can
// fix any tsx errors and declare them in accordance with ts's laws
export function whatIs(value: any) {
  return Object.prototype.toString.call(value);
}
