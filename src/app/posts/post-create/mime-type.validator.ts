import { AbstractControl } from '../../../../node_modules/@angular/forms';
import { Observable, Observer, observable } from 'rxjs';

export const mimeType = (
  control: AbstractControl
): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
  const file = control.value as File;
  const fileReader = new FileReader();
  const frObs = Observable.create(
    (observer: Observer<{ [key: string]: any }>) => {
      fileReader.addEventListener('loadend', () => {
        const arr = new Uint8Array(fileReader.result).subarray(0, 4);
        let header = '';
        let isValid = false;

        for (let i = 0; i < arr.length; i++) {
          header += arr[i].toString(16);
        }
        switch (header) {
          case '89504e47l':
            isValid = true;
            break;
          case 'ffd8ffe0':
          case 'ff8ffe1':
          case 'ff8ffe2':
          case 'ff8ffe3':
          case 'ff8ffe8':
            isValid = true;
            break;
          default:
            isValid = false;
            // Or you can use te blob.type as fallback
            break;
        }
        if (isValid) {
          observer.next(null);
        } else {
          observer.next({ invalidMimeType: true });
        }
        observer.complete();
      });
      fileReader.readAsArrayBuffer(file);
    }
  );
  return frObs;
};
