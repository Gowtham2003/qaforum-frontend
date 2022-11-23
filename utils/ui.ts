export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function sortByKey(array:any[], key:string) {
  return array.sort(function(a, b) {
      var x = a[key]; var y = b[key];
      return ((x > y) ? -1 : ((x < y) ? 1 : 0));
  });
}