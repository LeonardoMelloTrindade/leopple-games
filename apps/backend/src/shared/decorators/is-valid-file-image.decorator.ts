import { registerDecorator } from 'class-validator';
import { IMAGE_MIME_TYPES } from '../constants/index';

export const IsValidImage = () => {
  return (object: any, propertyName: string) =>
    registerDecorator({
      name: 'IsValidImage',
      target: object.constructor,
      propertyName,
      constraints: ['dfdsfdsf'],
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;

          const begin = value.indexOf('data:') + 5;
          const end = value.indexOf(';');

          if (begin < 5 || end <= begin) return false;

          const mime = value.slice(begin, end).trim();

          for (const key in IMAGE_MIME_TYPES) {
            if (IMAGE_MIME_TYPES[key] === mime) {
              return true;
            }
          }

          return false;
        },
        defaultMessage() {
          return 'O arquivo deve ser uma imagem válida (png, jpeg, jpg, gif, webp, svg+xml, bmp, tiff)';
        },
      },
    });
};
