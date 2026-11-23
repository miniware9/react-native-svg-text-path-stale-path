# Text in a `<TextPath>` stays put when the `<Path>` it references changes

A `<TextPath>` lays its text out along the `<Path>` its `href` names when the text is first drawn. When that path's `d` changes, the text keeps its first layout on Android and iOS, so it no longer runs along the path. In a browser it follows the path.

Versions: react-native-svg 15.16.0, React Native 0.88.1, Expo SDK 58 (`expo` 58.0.26), New Architecture. Seen on a Pixel 9a emulator (Android 17) and an iPhone 17 simulator (iOS 27.2).

## Steps

1. `npm install`
2. `npx expo run:android` or `npx expo run:ios`
3. Press **Bend the arc the other way**.

`App.tsx` draws one arc in `<Defs>`, the text on it through a `<TextPath>`, and the same arc again as a gray stroke, to show where the text belongs. The button swaps the arc's `d` between one bending up and one bending down.

## Expected

The text runs along the gray arc, bending down with it.

## Actual

The gray arc bends down, and the text stays where the arc was first drawn. A second press bends the arc back up under the text.

## Cause

The text span caches its layout along the path, and nothing clears that cache when the path changes:

- Android: `TSpanView.getPath` returns `mCachedPath` while it is set. `PathView.setD` calls `invalidate()`, which clears at most the path's own cache and those of its ancestors (`VirtualView.clearParentCache`). A `TextPathView` that names the path by `href` is not among them.
- iOS: `RNSVGTSpan`'s `getPath:` returns `self.path` while it is set, and `RNSVGPath`'s `setD:` invalidates the path and its containers, never a text path that names it.

A `key` on the `<TextPath>` that changes with the path's `d` mounts it again, with a fresh layout, and works around the defect.
