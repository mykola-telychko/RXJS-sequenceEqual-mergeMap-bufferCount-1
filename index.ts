console.clear();
import { from, fromEvent } from 'rxjs';
import { sequenceEqual, map, bufferCount, mergeMap, tap } from 'rxjs/operators';

// https://www.learnrxjs.io/learn-rxjs/operators/conditional/sequenceequal

const expectedSequence = from(['q', 'w', 'e', 'r', 't', 'y']);
const setResult = (text) =>
  (document.getElementById('result').innerText = text);

fromEvent(document, 'keydown')
  .pipe(
    map((e: KeyboardEvent) => e.key),
    tap((v) => setResult(v)),
    bufferCount(6),
    mergeMap((keyDowns) =>
      from(keyDowns).pipe(
        sequenceEqual(expectedSequence),
        tap((isItQwerty) =>
          setResult(isItQwerty ? 'WELL DONE!' : 'TYPE AGAIN!')
        )
      )
    )
  )
  .subscribe((e) => console.log(`did you say qwerty? ${e}`));
