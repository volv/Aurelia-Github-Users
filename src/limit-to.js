export class LimitToValueConverter {
    toView(array, count) {
        if (!array.slice) return;
        return array.slice(0, count);
    }
}