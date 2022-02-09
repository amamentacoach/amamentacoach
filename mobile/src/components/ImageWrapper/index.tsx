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
  height: heightProp,
  width: widthProp,
  style,
  ...props
}: WrapperImageType) => {
  // Evita passar as props height e width caso não seja necessário, já que se forem passadas como
  // undefined as imagens são alteradas.
  const height = heightProp ? { height: heightProp } : {};
  const width = widthProp ? { width: widthProp } : {};

  return typeof File === 'function' ? (
    // Arquivo svg
    <File {...props} {...height} {...width} />
  ) : (
    // Arquivo png
    <ReactImage
      {...props}
      source={File}
      style={[style, { ...height }, { ...width }]}
    />
  );
};

export default ImageWrapper;
