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
          const begin = value.indexOf('data:') + 5;
          const end = value.indexOf(';');

          const mime = value.slice(begin, end).trim();

          for (const key in IMAGE_MIME_TYPES) {
            console.log(
              `Arquivo vindo ${mime} x validador ${IMAGE_MIME_TYPES[key]}`,
            );
            if (IMAGE_MIME_TYPES[key] === mime) {
              return true;
            }
          }

          return false;
        },
        defaultMessage() {
          return 'O arquivo deve ser uma imagem válida (png, jpeg, jpg, gif, webp)';
        },
      },
    });
};
