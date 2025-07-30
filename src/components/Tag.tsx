import Link from 'next/link';
import type { Tag as TagType, BadgeVariant, BadgeSize } from '@/types';
import { Badge } from './ui/Badge';

interface TagProps {
  tag: TagType;
  href?: string;
  showCount?: boolean;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

export function Tag({ tag, href, showCount = false, variant = 'info', size = 'sm', className = '' }: TagProps) {
  const content = (
    <>
      {tag.name}
      {showCount && <span className="ml-1 opacity-75">({tag.count})</span>}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="no-underline transition-transform hover:scale-105"
        aria-label={`View posts tagged with ${tag.name}`}
      >
        <Badge
          variant={variant}
          size={size}
          className={className}
        >
          {content}
        </Badge>
      </Link>
    );
  }

  return (
    <Badge
      variant={variant}
      size={size}
      className={className}
    >
      {content}
    </Badge>
  );
}
