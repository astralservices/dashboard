import * as SimpleIcons from '@icons-pack/react-simple-icons';
import { SVGProps } from 'react';

export default function SimpleIcon({
  icon,
  ...props
}: { icon: string } & SVGProps<SVGSVGElement>) {
  const Icon = SimpleIcons[icon];
  if (!Icon) {
    return <p>Icon not found.</p>;
  }
  return <Icon {...props} />;
}
