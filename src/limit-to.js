export class LimitToValueConverter {
    toView(array, count) {
        if (array && array.slice)
          return array.slice(0, count);
    }
}