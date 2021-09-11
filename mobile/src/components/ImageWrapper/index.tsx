import { Image as ReactImage } from 'react-native';

import type { ImageProps, ImageSourcePropType } from 'react-native';
import type { SvgProps } from 'react-native-svg';

export type ImageWrapperSourcePropType =
  | ImageSourcePropType
  | React.FC<SvgProps>;

type WrapperImageType = Omit<ImageProps, 'source' | 'height' | 'width'> &
  SvgProps & {
    source: ImageWrapperSourcePropType;
    height?: string | number;
    width?: string | number;
  };

const ImageWrapper: React.FC<WrapperImageType> = ({
  source: File,
  height = undefined,
  width = undefined,
  style,
  ...props
}: WrapperImageType) => {
  // Evita passar a props height e width caso não seja necessário, já que se forem passadas como
  // undefined as imagens são alteradas.
  const size = [
    { ...(height ? { height } : {}) },
    { ...(width ? { width } : {}) },
  ];

  return typeof File === 'function' ? (
    // Arquivo svg
    <File {...props} {...size[0]} {...size[1]} />
  ) : (
    // Arquivo png
    <ReactImage
      {...props}
      style={[style, { ...size[0] }, { ...size[1] }]}
      source={File}
    />
  );
};

export default ImageWrapper;
